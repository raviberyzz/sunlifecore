package ca.sunlife.web.cms.core.constants.v1;

import java.util.Arrays;

import com.day.cq.commons.jcr.JcrConstants;

public class ContentFragmentConstants {

    private ContentFragmentConstants() {
    }

    public final static String ARTICLE_CFM_MODEL_PATH = "/conf/sunlife/settings/dam/cfm/models/article-model";
    public final static String PROP_PATH_ARTICLE_PUBLISH_DATE = "@jcr:content/data/master/articlePublishedDate";
    public final static String JCR_PATH_METADATA_MIXINTYPES = "jcr:content/metadata/" + JcrConstants.JCR_MIXINTYPES;
    public final static String JCR_PATH_METADATA_TAGS = "jcr:content/metadata/cq:tags";
    public final static String JCR_PATH_METADATA_MODEL = "jcr:content/data/cq:model";

    /**
     * The Constant ARTICLE_LIST_ELEMENT.
     */
    private final static String[] ARTICLE_LIST_ELEMENT = {"articlePublishedDate", "articleHeadline",
            "articlePageLink", "articleAuthor", "articleMiniDescription", "articleImage",
            "articleMainDescription", "articleThumbnailImage"};
    /**
     * Retrieves the copy of article elements array
     * @return a copy of the article elements array, ensuring immutability.
     */
    public static String[] getArticleElements() {
    	return Arrays.copyOf(ARTICLE_LIST_ELEMENT, ARTICLE_LIST_ELEMENT.length);
    }
}
