
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
import org.osgi.service.component.annotations.Activate;
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

@ Component (service = Servlet.class, property = {
	    Constants.SERVICE_DESCRIPTION + "=Page and Asset Site Map Servlet",
	    "sling.servlet.methods=" + HttpConstants.METHOD_GET,
	    "sling.servlet.resourceTypes=" + "sunlife/core/components/config/configuration",
	    "sling.servlet.extensions=xml", "sling.servlet.selectors=sitemap" })
public final class SiteMapServlet extends SlingSafeMethodsServlet {

	  /** The Constant serialVersionUID. */
	  private static final long serialVersionUID = 1L;
	  
    private static final Logger LOGGER = LoggerFactory.getLogger(SiteMapServlet.class);

    private static final FastDateFormat DATE_FORMAT = FastDateFormat.getInstance("yyyy-MM-dd");

    /*private static final boolean DEFAULT_INCLUDE_LAST_MODIFIED = false;

    private static final boolean DEFAULT_INCLUDE_INHERITANCE_VALUE = false;

    private static final String DEFAULT_EXTERNALIZER_DOMAIN = "publish";

    private static final boolean DEFAULT_EXTENSIONLESS_URLS = false;

    private static final boolean DEFAULT_REMOVE_TRAILING_SLASH = false;

    private static final boolean DEFAULT_USE_VANITY_URL = true;*/

    
    private static final String NS = "http://www.sitemaps.org/schemas/sitemap/0.9";

   /* @Reference
    private transient Externalizer externalizer;*/
    
    @Reference
    private transient SiteConfigService configService;
    
    @Reference
    private transient SiteMapService siteMapService;

    /*private String externalizerDomain;

    private boolean includeInheritValue;

    private boolean includeLastModified;

    private String[] changefreqProperties;

    private String[] priorityProperties;

    private String damAssetProperty;

    private List<String> damAssetTypes;

    private List<String> excludeFromSiteMapProperty;

    private String characterEncoding;

    private boolean extensionlessUrls;

    private Map<String, String> urlRewrites;

    private boolean removeTrailingSlash;

    private List<String> excludedPageTemplates;

    private boolean useVanityUrl;*/
    
    
    
    

	@Activate
    protected void activate(Map<String, Object> properties) {
        /*this.externalizerDomain = PropertiesUtil.toString(properties.get(PROP_EXTERNALIZER_DOMAIN),
                DEFAULT_EXTERNALIZER_DOMAIN);
        this.includeLastModified = PropertiesUtil.toBoolean(properties.get(PROP_INCLUDE_LAST_MODIFIED),
                DEFAULT_INCLUDE_LAST_MODIFIED);
        this.includeInheritValue = PropertiesUtil.toBoolean(properties.get(PROP_INCLUDE_INHERITANCE_VALUE),
                DEFAULT_INCLUDE_INHERITANCE_VALUE);
        this.changefreqProperties = PropertiesUtil.toStringArray(properties.get(PROP_CHANGE_FREQUENCY_PROPERTIES),
                new String[0]);
        this.priorityProperties = PropertiesUtil.toStringArray(properties.get(PROP_PRIORITY_PROPERTIES), new String[0]);
        this.damAssetProperty = PropertiesUtil.toString(properties.get(PROP_DAM_ASSETS_PROPERTY), "");
        this.damAssetTypes = Arrays
                .asList(PropertiesUtil.toStringArray(properties.get(PROP_DAM_ASSETS_TYPES), new String[0]));
        this.excludeFromSiteMapProperty = Arrays.asList(PropertiesUtil.toStringArray(properties.get(PROP_EXCLUDE_FROM_SITEMAP_PROPERTY),
                new String[0]));
        this.characterEncoding = PropertiesUtil.toString(properties.get(PROP_CHARACTER_ENCODING_PROPERTY), null);
        this.extensionlessUrls = PropertiesUtil.toBoolean(properties.get(PROP_EXTENSIONLESS_URLS),
                DEFAULT_EXTENSIONLESS_URLS);
        this.urlRewrites = ParameterUtil.toMap(PropertiesUtil.toStringArray(properties.get(PROP_URL_REWRITES), new String[0]), ":", true, "");
        this.removeTrailingSlash = PropertiesUtil.toBoolean(properties.get(PROP_REMOVE_TRAILING_SLASH),
                DEFAULT_REMOVE_TRAILING_SLASH);
        this.excludedPageTemplates = Arrays.asList(PropertiesUtil.toStringArray(properties.get(TEMPLATE_EXCLUDE_FROM_SITEMAP_PROPERTY),new String[0]));
        this.useVanityUrl =  PropertiesUtil.toBoolean(properties.get(USE_VANITY_URL), DEFAULT_USE_VANITY_URL);*/
    }

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response)
            throws ServletException, IOException {
    	LOGGER.info("Get method triggeed");
    	LOGGER.info("Value from service {}",siteMapService.getResourceType());
    	Page page=null;
        response.setContentType(request.getResponseContentType());
        if (StringUtils.isNotEmpty(siteMapService.getCharacterEncoding())) {
            response.setCharacterEncoding(siteMapService.getCharacterEncoding());
        }
        ResourceResolver resourceResolver = request.getResourceResolver();
        PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
        if(null!=pageManager) {
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
            write(page, stream, request);

            for (Iterator<Page> children = page.listChildren(new PageFilter(false, true), true); children.hasNext();) {
                write(children.next(), stream, request);
            }

            if (siteMapService.getDamAssetTypes().length > 0 && siteMapService.getDamAssetProperty().length() > 0) {
                for (Resource assetFolder : getAssetFolders(page, resourceResolver)) {
                    writeAssets(stream, assetFolder, request);
                }
            }

            stream.writeEndElement();

            stream.writeEndDocument();
            LOGGER.info("Get method ends");
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

    private Collection<Resource> getAssetFolders(Page page, ResourceResolver resolver) {
        List<Resource> allAssetFolders = new ArrayList<Resource>();
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

    private String applyUrlRewrites(String url) {
        try {
            String path = URI.create(url).getPath();
            Map<String, String> urlRewrites=ParameterUtil.toMap(PropertiesUtil.toStringArray(siteMapService.getUrlRewrites(), new String[0]), ":", true, "");
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

    @SuppressWarnings("squid:S1192")
    private void write(Page page, XMLStreamWriter stream, SlingHttpServletRequest request) throws XMLStreamException {
        if (isHiddenByPageProperty(page) || isHiddenByPageTemplate(page)) {
            return;
        }
        stream.writeStartElement(NS, "url");
        String loc = "";

        if (siteMapService.getUseVanityUrl() && !StringUtils.isEmpty(page.getVanityUrl())) {
            loc = configService.getPageUrl(page.getVanityUrl());
        	LOGGER.info("Vanity URL created {} ", configService.getPageUrl(page.getVanityUrl()));
        } else if (!siteMapService.getExtensionlessUrls()) {
        	loc = configService.getPageUrl(page.getPath());
            LOGGER.info("Extensionless URL created {} ", configService.getPageUrl(page.getPath()));
        } else {
            String urlFormat = siteMapService.getRemoveTrailingSlash() ? "%s" : "%s/";
            loc = configService.getPageUrl(page.getPath());
            LOGGER.info("URL created {} ", configService.getPageUrl(page.getPath()));
        }

        loc = applyUrlRewrites(loc);
        LOGGER.info("LOC {} ", loc);
        

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
            writeFirstPropertyValue(stream, "changefreq", siteMapService.getChangefreqProperties(), hierarchyNodeInheritanceValueMap);
            writeFirstPropertyValue(stream, "priority", siteMapService.getPriorityProperties(), hierarchyNodeInheritanceValueMap);
        } else {
            ValueMap properties = page.getProperties();
            writeFirstPropertyValue(stream, "changefreq", siteMapService.getChangefreqProperties(), properties);
            writeFirstPropertyValue(stream, "priority", siteMapService.getPriorityProperties(), properties);
        }

        stream.writeEndElement();
    }

    private boolean isHiddenByPageProperty(Page page){
        boolean flag = false;
        if(siteMapService.getExcludeFromSiteMapProperty() != null){
            for(String pageProperty : siteMapService.getExcludeFromSiteMapProperty()){
                flag = flag || page.getProperties().get(pageProperty, Boolean.FALSE);
            }
        }
        return flag;
    }

    private boolean isHiddenByPageTemplate(Page page) {
        boolean flag = false;
        if(siteMapService.getExcludedPageTemplates() != null){
            for(String pageTemplate : siteMapService.getExcludedPageTemplates()){
                flag = flag || page.getProperties().get("cq:template", StringUtils.EMPTY).equalsIgnoreCase(pageTemplate);
            }
        }
        return flag;
    }

    private String externalizeUri(SlingHttpServletRequest request, String path) {
        if (StringUtils.isNotBlank(siteMapService.getExternalizerDomain())) {
            return configService.getPageUrl( path);
        } else {
            LOGGER.debug("No externalizer domain configured, take into account current host header {} and current scheme {}", request.getServerName(), request.getScheme());
            return configService.getPageUrl(path);
        }
    }

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
        Resource contentResource = null;
        contentResource = getChildResource(asset, contentResource);
        if (contentResource != null) {
            if (siteMapService.getIncludeInheritValue()) {
                HierarchyNodeInheritanceValueMap hierarchyNodeInheritanceValueMap = new HierarchyNodeInheritanceValueMap(
                        contentResource);
                writeFirstPropertyValue(stream, "changefreq", siteMapService.getChangefreqProperties(), hierarchyNodeInheritanceValueMap);
                writeFirstPropertyValue(stream, "priority", siteMapService.getPriorityProperties(), hierarchyNodeInheritanceValueMap);
            } else {
                ValueMap properties = contentResource.getValueMap();
                writeFirstPropertyValue(stream, "changefreq", siteMapService.getChangefreqProperties(), properties);
                writeFirstPropertyValue(stream, "priority", siteMapService.getPriorityProperties(), properties);
            }
        }

        stream.writeEndElement();
    }

	/**
	 * @param asset
	 * @param contentResource
	 * @return
	 */
	private Resource getChildResource(Asset asset, Resource contentResource) {
		if (null != asset) {
        	Resource resource=asset.adaptTo(Resource.class);
        	if(null != resource) {
        		contentResource = resource.getChild(JcrConstants.JCR_CONTENT);
        	}
        }
		return contentResource;
	}

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

    @SuppressWarnings("squid:S1144")
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

    private void writeElement(final XMLStreamWriter stream, final String elementName, final String text)
            throws XMLStreamException {
        stream.writeStartElement(NS, elementName);
        stream.writeCharacters(text);
        stream.writeEndElement();
    }

}

