package ca.sunlife.web.cms.core.models.v1.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
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
    private final String LINK_NAME = "linkName";
    private final String LINK_URL = "linkURL";
    private final String LANG_ATT = "langAttribute";
    private final String LINK_TAG = "linkTarget";
    private final String ICON = "icon";
    private final String LINK = "link";
    private final String DATA_TITLE = "dataTitle";
    private final String SCREEN_READER = "screenReaderTextSocialMedia";
    private final String LINK_TYPE = "linkType";

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
    private Boolean displayTopSection;
    @ValueMapValue
    private String dataSection;

    @ValueMapValue
    private String spacing;

    @ValueMapValue
    private String topHeadingElement;

    @ValueMapValue
    private String middleHeadingElement;

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
    public Boolean getDisplayTopSection() {
        return this.displayTopSection;
    }

    @Override
    public String getDataSection() {
        return dataSection;
    }

    @Override
    public String getSpacing() {
        return spacing;
    }

    @Override
    public String getTopHeadingElement() {
        return topHeadingElement;
    }

    @Override
    public String getMiddleHeadingElement() {
        return middleHeadingElement;
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
                        ValueMap itemValueMap = linkItem.getValueMap();
                        linkMap = new HashMap<>();

                        linkMap.put(LINK_NAME, itemValueMap.get(LINK_NAME, String.class));
                        linkMap.put(LINK_URL, itemValueMap.get(LINK_URL, String.class));
                        linkMap.put(LANG_ATT, itemValueMap.get(LANG_ATT, String.class));
                        linkMap.put(DATA_TITLE, itemValueMap.get(DATA_TITLE, String.class));
                        linkMap.put(LINK_TAG, itemValueMap.get(LINK_TAG, String.class));
                        linkMap.put(LINK_TYPE, itemValueMap.get(LINK_TYPE, String.class));
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
                ValueMap itemValueMap = bottomLinkItem.getValueMap();
                bottomLinkMap = new HashMap<>();

                bottomLinkMap.put(LINK_NAME, itemValueMap.get(LINK_NAME, String.class));
                bottomLinkMap.put(LINK_URL, itemValueMap.get(LINK_URL, String.class));
                bottomLinkMap.put(LANG_ATT, itemValueMap.get(LANG_ATT, String.class));
                bottomLinkMap.put(DATA_TITLE, itemValueMap.get(DATA_TITLE, String.class));
                bottomLinkMap.put(LINK_TAG, itemValueMap.get(LINK_TAG, String.class));
                bottomLinkMap.put(LINK_TYPE, itemValueMap.get(LINK_TYPE, String.class));
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
                ValueMap itemValueMap = socialMediaItem.getValueMap();
                socialMediaMap = new HashMap<>();
                socialMediaMap.put(ICON, itemValueMap.get(ICON, String.class));
                socialMediaMap.put(LINK, itemValueMap.get(LINK, String.class));
                socialMediaMap.put(DATA_TITLE, itemValueMap.get(DATA_TITLE, String.class));
                socialMediaMap.put(SCREEN_READER, itemValueMap.get(SCREEN_READER, String.class));
                socialMediaList.add(socialMediaMap);
            }
        }
        return socialMediaList;
    }
}