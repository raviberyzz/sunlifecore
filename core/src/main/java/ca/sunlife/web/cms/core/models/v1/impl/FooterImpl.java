package ca.sunlife.web.cms.core.models.v1.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ca.sunlife.web.cms.core.models.v1.Footer;
import com.day.cq.wcm.api.Page;

@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { Footer.class }, resourceType = {
        FooterImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class FooterImpl implements Footer {
    protected static final String RESOURCE_TYPE = "sunlife/core/components/content/footer/v1/footer";

    @Self
    private SlingHttpServletRequest request;

    @ScriptVariable
    private Page currentPage;

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String richText;

    @ValueMapValue
    private String slfText;
	
	@ValueMapValue
    private String screenReaderText;

    @ValueMapValue
    private Boolean feedback;

    @ValueMapValue
    private String dataSection;

    @ValueMapValue
    private String spacing;

    @ValueMapValue
    private String showSections;
    @ChildResource
    private Resource topLinks;

    @ChildResource
    private Resource bottomLinks;

    @ChildResource
    private Resource socialMedia;

    private static final Logger LOGGER = LoggerFactory.getLogger(FooterImpl.class);

    @Override
    public String getTitle() {
        return title;
    }

    @Override
    public String getRichText() {
        return richText;
    }

    @Override
    public String getSlfText() {
        return slfText;
    }
	
	@Override
    public String getScreenReaderText() {
        return screenReaderText;
    }

    @Override
    public Boolean getFeedback() {
        return feedback;
    }

    @Override
    public String getDataSection() {
        return dataSection;
    }
    @Override
    public String getShowSections() {
        return showSections;
    }
    @Override
    public String getSpacing() {
        return spacing;
    }

    @Override
    public List<HashMap<String, Object>> getTopLinks() {
        List<HashMap<String, Object>> topLinksList = new ArrayList<>();
        if (null != topLinks) {
            Iterator<Resource> topLinksIterator = topLinks.listChildren();

            HashMap<String, Object> topLinkMap = null;
            while (topLinksIterator.hasNext()) {
                Resource topLinkItem = topLinksIterator.next();
                topLinkMap = new HashMap<>();
                topLinkMap.put("heading", topLinkItem.getValueMap().get("heading", String.class));

                Resource links = topLinkItem.getChild("links");
                if (null != links) {
                    Iterator<Resource> linksIterator = links.listChildren();
                    List<HashMap<String, Object>> linksList = new ArrayList<>();

                    HashMap<String, Object> linkMap = null;
                    while (linksIterator.hasNext()) {
                        Resource linkItem = linksIterator.next();
                        linkMap = new HashMap<>();

                        linkMap.put("linkName", linkItem.getValueMap().get("linkName", String.class));
                        linkMap.put("linkURL", linkItem.getValueMap().get("linkURL", String.class));
                        linkMap.put("langAttribute", linkItem.getValueMap().get("langAttribute", String.class));
                        linkMap.put("dataTitle", linkItem.getValueMap().get("dataTitle", String.class));
                        linkMap.put("linkTarget", linkItem.getValueMap().get("linkTarget", String.class));

                        linksList.add(linkMap);
                    }
                    topLinkMap.put("links", linksList);
                }

                topLinksList.add(topLinkMap);
            }
        }
        return topLinksList;
    }

    @Override
    public List<HashMap<String, Object>> getBottomLinks() {
        List<HashMap<String, Object>> bottomLinksList = new ArrayList<>();
        if (null != bottomLinks) {
            Iterator<Resource> bottomLinksIterator = bottomLinks.listChildren();

            HashMap<String, Object> bottomLinkMap = null;
            while (bottomLinksIterator.hasNext()) {
                Resource bottomLinkItem = bottomLinksIterator.next();
                bottomLinkMap = new HashMap<>();

                bottomLinkMap.put("linkName", bottomLinkItem.getValueMap().get("linkName", String.class));
                bottomLinkMap.put("linkURL", bottomLinkItem.getValueMap().get("linkURL", String.class));
                bottomLinkMap.put("langAttribute", bottomLinkItem.getValueMap().get("langAttribute", String.class));
                bottomLinkMap.put("dataTitle", bottomLinkItem.getValueMap().get("dataTitle", String.class));
                bottomLinkMap.put("linkTarget", bottomLinkItem.getValueMap().get("linkTarget", String.class));

                bottomLinksList.add(bottomLinkMap);
            }
        }
        return bottomLinksList;
    }

    @Override
    public List<HashMap<String, Object>> getSocialMedia() {
        List<HashMap<String, Object>> socialMediaList = new ArrayList<>();
        if (null != bottomLinks) {
            Iterator<Resource> socialMediaIterator = socialMedia.listChildren();

            HashMap<String, Object> socialMediaMap = null;
            while (socialMediaIterator.hasNext()) {
                Resource socialMediaItem = socialMediaIterator.next();
                socialMediaMap = new HashMap<>();

                socialMediaMap.put("icon", socialMediaItem.getValueMap().get("icon", String.class));
                socialMediaMap.put("link", socialMediaItem.getValueMap().get("link", String.class));
                socialMediaMap.put("dataTitle", socialMediaItem.getValueMap().get("dataTitle", String.class));

                socialMediaList.add(socialMediaMap);
            }
        }
        return socialMediaList;
    }
}