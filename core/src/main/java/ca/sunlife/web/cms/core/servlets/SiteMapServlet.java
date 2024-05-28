
package ca.sunlife.web.cms.core.servlets;

import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.xml.stream.XMLOutputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamWriter;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.FastDateFormat;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.commons.osgi.PropertiesUtil;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.framework.Constants;
import org.apache.sling.api.servlets.HttpConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.acs.commons.util.ParameterUtil;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.DamConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageFilter;
import com.day.cq.wcm.api.PageManager;

import ca.sunlife.web.cms.core.services.SiteConfigService;
import ca.sunlife.web.cms.core.services.SiteMapService;


/**
 * The Class SiteMapServlet.
 */
@ Component (service = Servlet.class, property = {
	    Constants.SERVICE_DESCRIPTION + "=Page and Asset Site Map Servlet",
	    "sling.servlet.methods=" + HttpConstants.METHOD_GET,
	    "sling.servlet.resourceTypes=" + "sunlife/core/components/structure/base-page",
	    "sling.servlet.resourceTypes=" + "sunlife/core/components/structure/core-base-page",
	    "sling.servlet.extensions=xml", "sling.servlet.selectors=sitemap" })
public final class SiteMapServlet extends SlingSafeMethodsServlet {

	  /** The Constant serialVersionUID. */
	  private static final long serialVersionUID = 1L;
	  
    /** The Constant LOGGER. */
    private static final Logger LOGGER = LoggerFactory.getLogger(SiteMapServlet.class);

    /** The Constant DATE_FORMAT. */
    private static final FastDateFormat DATE_FORMAT = FastDateFormat.getInstance("yyyy-MM-dd");
   
    /** The Constant NS. */
    private static final String NS = "http://www.sitemaps.org/schemas/sitemap/0.9";
    
    /** The Constant PRIORITY. */
    private static final String PRIORITY = "priority";
    
    /** The Constant CHANGE_FREQ. */
    private static final String CHANGE_FREQ = "changefreq";
    
    /** The config service. */
    @Reference
    private transient SiteConfigService configService;
    
    /** The site map service. */
    @Reference
    private transient SiteMapService siteMapService;

    /* (non-Javadoc)
     * @see org.apache.sling.api.servlets.SlingSafeMethodsServlet#doGet(org.apache.sling.api.SlingHttpServletRequest, org.apache.sling.api.SlingHttpServletResponse)
     */
    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response)
            throws ServletException, IOException {
    	Page page = null;
        response.setContentType(request.getResponseContentType());
        if (StringUtils.isNotEmpty(siteMapService.getCharacterEncoding())) {
            response.setCharacterEncoding(siteMapService.getCharacterEncoding());
        }
        ResourceResolver resourceResolver = request.getResourceResolver();
        PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
        if (null != pageManager) {
        page = pageManager.getContainingPage(request.getResource());
        }
        XMLOutputFactory outputFactory = XMLOutputFactory.newFactory();
        XMLStreamWriter stream = null;
        try {
            stream = outputFactory.createXMLStreamWriter(response.getWriter());
            stream.writeStartDocument("1.0");

            stream.writeStartElement("", "urlset", NS);
            stream.writeNamespace("", NS);

            // first do the current page
            write(page, stream);

            if (null != page) {
            	 for (Iterator<Page> children = page.listChildren(new PageFilter(false, true), true); children.hasNext();) {
                     write(children.next(), stream);
                 }
            }
            if (siteMapService.getDamAssetTypes().length > 0 && siteMapService.getDamAssetProperty().length() > 0) {
                for (Resource assetFolder : getAssetFolders(page, resourceResolver)) {
                    writeAssets(stream, assetFolder, request);
                }
            }

            stream.writeEndElement();

            stream.writeEndDocument();
        } catch (XMLStreamException e) {
            throw new IOException(e);
        } finally {
            if (stream != null) {
                try {
                    stream.close();
                } catch (XMLStreamException e) {
                    LOGGER.warn("Can not close xml stream writer", e);
                }
            }
        }
    }

    /**
     * Gets the asset folders.
     *
     * @param page the page
     * @param resolver the resolver
     * @return the asset folders
     */
    private Collection<Resource> getAssetFolders(Page page, ResourceResolver resolver) {
        List<Resource> allAssetFolders = new ArrayList<>();
        ValueMap properties = page.getProperties();
        String[] configuredAssetFolderPaths = properties.get(siteMapService.getDamAssetProperty(), String[].class);
        if (configuredAssetFolderPaths != null) {
            // Sort to aid in removal of duplicate paths.
            Arrays.sort(configuredAssetFolderPaths);
            String prevPath = "#";
            for (String configuredAssetFolderPath : configuredAssetFolderPaths) {
                // Ensure that this folder is not a child folder of another
                // configured folder, since it will already be included when
                // the parent folder is traversed.
                if (StringUtils.isNotBlank(configuredAssetFolderPath) && !configuredAssetFolderPath.equals(prevPath)
                        && !StringUtils.startsWith(configuredAssetFolderPath, prevPath + "/")) {
                    Resource assetFolder = resolver.getResource(configuredAssetFolderPath);
                    if (assetFolder != null) {
                        prevPath = configuredAssetFolderPath;
                        allAssetFolders.add(assetFolder);
                    }
                }
            }
        }
        return allAssetFolders;
    }

    /**
     * Apply url rewrites.
     *
     * @param url the url
     * @return the string
     */
    private String applyUrlRewrites(String url) {
        try {
            String path = URI.create(url).getPath();
            Map<String, String> urlRewrites = ParameterUtil.toMap(PropertiesUtil.toStringArray(siteMapService.getUrlRewrites(), new String[0]), ":", true, "");
            for (Map.Entry<String, String> rewrite : urlRewrites.entrySet()) {
                if (path.startsWith(rewrite.getKey())) {
                    return url.replaceFirst(rewrite.getKey(), rewrite.getValue());
                }
            }
            return url;
        } catch (IllegalArgumentException e) {
            return url;
        }
    }

  
    /**
     * Write.
     *
     * @param page the page
     * @param stream the stream
     * @throws XMLStreamException the XML stream exception
     */
    private void write(Page page, XMLStreamWriter stream) throws XMLStreamException {
        if (isHiddenByPageProperty(page) || isHiddenByPageTemplate(page)) {
            return;
        }
        stream.writeStartElement(NS, "url");
        String loc = "";

        if (siteMapService.getUseVanityUrl() && !StringUtils.isEmpty(page.getVanityUrl())) {
            loc = configService.getPageUrl(page.getVanityUrl());  
        } else {
            loc = configService.getPageUrl(page.getPath());            
        }

        loc = applyUrlRewrites(loc);
       
        writeElement(stream, "loc", loc);

        if (siteMapService.getIncludeLastModified()) {
            Calendar cal = page.getLastModified();
            if (cal != null) {
                writeElement(stream, "lastmod", DATE_FORMAT.format(cal));
            }
        }

        if (siteMapService.getIncludeInheritValue()) {
            HierarchyNodeInheritanceValueMap hierarchyNodeInheritanceValueMap = new HierarchyNodeInheritanceValueMap(
                    page.getContentResource());
            writeFirstPropertyValue(stream, CHANGE_FREQ, siteMapService.getChangefreqProperties(), hierarchyNodeInheritanceValueMap);
            writeFirstPropertyValue(stream, PRIORITY, siteMapService.getPriorityProperties(), hierarchyNodeInheritanceValueMap);
        } else {
            ValueMap properties = page.getProperties();
            writeFirstPropertyValue(stream, CHANGE_FREQ, siteMapService.getChangefreqProperties(), properties);
            writeFirstPropertyValue(stream, PRIORITY, siteMapService.getPriorityProperties(), properties);
        }

        stream.writeEndElement();
    }

    /**
     * Checks if is hidden by page property.
     *
     * @param page the page
     * @return true, if is hidden by page property
     */
    private boolean isHiddenByPageProperty(Page page) {
        boolean flag = false;
        if (siteMapService.getExcludeFromSiteMapProperty() != null) {
            for (String pageProperty : siteMapService.getExcludeFromSiteMapProperty()) {
                flag = flag || page.getProperties().get(pageProperty, Boolean.FALSE);
            }
        }
        return flag;
    }

    /**
     * Checks if is hidden by page template.
     *
     * @param page the page
     * @return true, if is hidden by page template
     */
    private boolean isHiddenByPageTemplate(Page page) {
        boolean flag = false;
        if (siteMapService.getExcludedPageTemplates() != null) {
            for (String pageTemplate : siteMapService.getExcludedPageTemplates()) {
                flag = flag || page.getProperties().get(com.day.cq.wcm.api.NameConstants.NN_TEMPLATE, StringUtils.EMPTY).equalsIgnoreCase(pageTemplate);
            }
        }
        return flag;
    }

    /**
     * Externalize uri.
     *
     * @param request the request
     * @param path the path
     * @return the string
     */
    private String externalizeUri(SlingHttpServletRequest request, String path) {
        if (StringUtils.isNotBlank(siteMapService.getExternalizerDomain())) {
            return configService.getPageUrl(path);
        } else {
            LOGGER.debug("No externalizer domain configured, take into account current host header {} and current scheme {}", request.getServerName(), request.getScheme());
            return configService.getPageUrl(path);
        }
    }

    /**
     * Write asset.
     *
     * @param asset the asset
     * @param stream the stream
     * @param request the request
     * @throws XMLStreamException the XML stream exception
     */
    private void writeAsset(Asset asset, XMLStreamWriter stream, SlingHttpServletRequest request) throws XMLStreamException {
        stream.writeStartElement(NS, "url");

        String loc = externalizeUri(request, asset.getPath());
        writeElement(stream, "loc", loc);

        if (siteMapService.getIncludeLastModified()) {
            long lastModified = asset.getLastModified();
            if (lastModified > 0) {
                writeElement(stream, "lastmod", DATE_FORMAT.format(lastModified));
            }
        }
        
        Resource contentResource = getChildResource(asset);
        if (contentResource != null) {
            if (siteMapService.getIncludeInheritValue()) {
                HierarchyNodeInheritanceValueMap hierarchyNodeInheritanceValueMap = new HierarchyNodeInheritanceValueMap(
                        contentResource);
                writeFirstPropertyValue(stream, CHANGE_FREQ, siteMapService.getChangefreqProperties(), hierarchyNodeInheritanceValueMap);
                writeFirstPropertyValue(stream, PRIORITY, siteMapService.getPriorityProperties(), hierarchyNodeInheritanceValueMap);
            } else {
                ValueMap properties = contentResource.getValueMap();
                writeFirstPropertyValue(stream, CHANGE_FREQ, siteMapService.getChangefreqProperties(), properties);
                writeFirstPropertyValue(stream, PRIORITY, siteMapService.getPriorityProperties(), properties);
            }
        }

        stream.writeEndElement();
    }

	/**
	 * Gets the child resource.
	 *
	 * @param asset the asset
	 * @param contentResource the content resource
	 * @return the child resource
	 */
	private Resource getChildResource(Asset asset) {
		Resource contentResource = null;
		if (null != asset) {
        	Resource resource = asset.adaptTo(Resource.class);
        	if (null != resource) {
        		contentResource = resource.getChild(JcrConstants.JCR_CONTENT);
        	}
        }
		return contentResource;
	}

    /**
     * Write assets.
     *
     * @param stream the stream
     * @param assetFolder the asset folder
     * @param request the request
     * @throws XMLStreamException the XML stream exception
     */
    private void writeAssets(final XMLStreamWriter stream, final Resource assetFolder, final SlingHttpServletRequest request)
            throws XMLStreamException {
        for (Iterator<Resource> children = assetFolder.listChildren(); children.hasNext();) {
            Resource assetFolderChild = children.next();
            if (assetFolderChild.isResourceType(DamConstants.NT_DAM_ASSET)) {
                Asset asset = assetFolderChild.adaptTo(Asset.class);
                List<String> damAssetTypes = Arrays.asList(PropertiesUtil.toStringArray(siteMapService.getDamAssetTypes(), new String[0]));
                if (null != siteMapService.getDamAssetTypes() && null != asset && damAssetTypes.contains(asset.getMimeType())) {
                    writeAsset(asset, stream, request);
                }
            } else {
                writeAssets(stream, assetFolderChild, request);
            }
        }
    }

    /**
     * Write first property value.
     *
     * @param stream the stream
     * @param elementName the element name
     * @param propertyNames the property names
     * @param properties the properties
     * @throws XMLStreamException the XML stream exception
     */
    private void writeFirstPropertyValue(final XMLStreamWriter stream, final String elementName,
                                         final String[] propertyNames, final ValueMap properties) throws XMLStreamException {
        for (String prop : propertyNames) {
            String value = properties.get(prop, String.class);
            if (value != null) {
                writeElement(stream, elementName, value);
                break;
            }
        }
    }

    /**
     * Write first property value.
     *
     * @param stream the stream
     * @param elementName the element name
     * @param propertyNames the property names
     * @param properties the properties
     * @throws XMLStreamException the XML stream exception
     */
    private void writeFirstPropertyValue(final XMLStreamWriter stream, final String elementName,
                                         final String[] propertyNames, final InheritanceValueMap properties) throws XMLStreamException {
        for (String prop : propertyNames) {
            String value = properties.get(prop, String.class);
            if (value == null) {
                value = properties.getInherited(prop, String.class);
            }
            if (value != null) {
                writeElement(stream, elementName, value);
                break;
            }
        }
    }

    /**
     * Write element.
     *
     * @param stream the stream
     * @param elementName the element name
     * @param text the text
     * @throws XMLStreamException the XML stream exception
     */
    private void writeElement(final XMLStreamWriter stream, final String elementName, final String text)
            throws XMLStreamException {
        stream.writeStartElement(NS, elementName);
        stream.writeCharacters(text);
        stream.writeEndElement();
    }

}

