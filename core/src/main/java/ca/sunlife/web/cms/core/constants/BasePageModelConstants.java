/**
 *
 */
package ca.sunlife.web.cms.core.constants;

/**
 * The Class BasePageModelConstants.
 *
 * @author TCS
 * @version 1.0
 */
public final class BasePageModelConstants {

  /**
   * Instantiates a new base page model constants.
   */
  private BasePageModelConstants() {
  }

  /** The Constant SLASH_CONSTANT. */
  public static final String SLASH_CONSTANT = "/";

  /** The Constant PAGE_TITLE_FORMAT_CONSTANT. */
  public static final String PAGE_TITLE_FORMAT_CONSTANT = "${pageTitle}";

  /** The Constant ALTERNATE_URL_ITEMS_CONSTANT. */
  public static final String ALTERNATE_URL_ITEMS_CONSTANT = "item";

  /** The Constant SITE_URL_CONSTANT. */
  public static final String SITE_URL_CONSTANT = "siteUrl";

  /** The Constant PAGE_TYPE_REGULAR_CONSTANT. */
  public static final String PAGE_TYPE_REGULAR_CONSTANT = "regular";

  /** The Constant PAGE_TYPE_CNW_CONSTANT. */
  public static final String PAGE_TYPE_CNW_CONSTANT = "cnw";

  /** The Constant PAGE_TYPE_ADVISOR_CONSTANT. */
  public static final String PAGE_TYPE_ADVISOR_CONSTANT = "advisor";

  /** The Constant ADVISOR_ID_CANONICAL_URL_FORMAT_CONSTANT. */
  public static final String ADVISOR_ID_CANONICAL_URL_FORMAT_CONSTANT = "${advisorId}";

  /** The Constant ADVISOR_TYPE_CANONICAL_URL_FORMAT_CONSTANT. */
  public static final String ADVISOR_TYPE_CANONICAL_URL_FORMAT_CONSTANT = "${advisorType}";

  /** The Constant PAGE_TYPE_ARTICLE_PAGES_CONSTANT. */
  public static final String PAGE_TYPE_ARTICLE_PAGES_CONSTANT = "article";

  /** The Constant TITLE_MAX_LENGTH_CONSTANT. */
  public static final int TITLE_MAX_LENGTH_CONSTANT = 200;
  
  /** The Constant ENABLE_CONTEXT_HUB_CONSTANT. */
  public static final String ENABLE_CONTEXT_HUB_CONSTANT = "enableContextHub";
  
  /** The Constant STATIC_PATH_CONSTANT. */
  public static final String STATIC_PATH_CONSTANT = "staticPath";
  
  /** The Constant SLFAS_PATH. */
  public static final String SLFAS_PATH = "/content/sunlife/external/ca/slfas/";
  /** The Constant SUNCENTRAL_PATH. */
  public static final CharSequence SUNCENTRAL_PATH = "/content/sunlife/external/suncentral/";
}
