package ca.sunlife.web.cms.core.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import ca.sunlife.web.cms.core.beans.NewsReleases;
import ca.sunlife.web.cms.core.beans.PageItem;
import ca.sunlife.web.cms.core.beans.Pagination;
import ca.sunlife.web.cms.core.beans.Release;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ ExtendWith (AemContextExtension.class)
public class GettersSettersTest {
  private AccordionModel accordionModel;
  private AdvisorDetailModel advisorDetailModel;
  private AnnouncementList announcementList;
  private AkamaiPurgeModel akamaiPurgeModel;
  private ArticleModel articleModel;
  private ArticleListModel articleListModel;
  private BasePageModel basePageModel;
  private BreadcrumbModel breadcrumbModel;
  private CNWNewsDetailsModel cnwNewsDetailsModel;
  private CNWNewsModel cnwNewsModel;
  private ExperienceFragmentModel experienceFragmentModel;
  private FooterItemsModel footerItemsModel;
  private FormButtonModel formButtonModel;
  private FormContainer formContainer;
  private FormOptions formOptions;
  private LeftNavigationModal leftNavigationModal;
  private NewsReleases newsReleases;
  private NewsroomAnnouncementModel newsroomAnnouncementModel;
  private PageItem pageItem;
  private Pagination pagination;
  private ProviderProfileModel providerProfileModel;
  private RegionLanguageMenu regionLanguageMenu;
  private Release release;
  private SelectorToExfragMapModel selectorToExfragMapModel;
  private Title title;

  @ BeforeEach
  void setup() {
    accordionModel = new AccordionModel( );
    advisorDetailModel = new AdvisorDetailModel( );
    akamaiPurgeModel = new AkamaiPurgeModel( );
    announcementList = new AnnouncementList( );
    articleModel = new ArticleModel( );
    articleListModel = new ArticleListModel( );
    basePageModel = new BasePageModel( );
    breadcrumbModel = new BreadcrumbModel( );
    cnwNewsDetailsModel = new CNWNewsDetailsModel( );
    cnwNewsModel = new CNWNewsModel( );
    experienceFragmentModel = new ExperienceFragmentModel( );
    footerItemsModel = new FooterItemsModel( );
    formButtonModel = new FormButtonModel( );
    formContainer = new FormContainer( );
    formOptions = new FormOptions( );
    leftNavigationModal = new LeftNavigationModal( );
    newsReleases = new NewsReleases( );
    newsroomAnnouncementModel = new NewsroomAnnouncementModel( );
    pageItem = new PageItem( );
    pagination = new Pagination( );
    providerProfileModel = new ProviderProfileModel( );
    regionLanguageMenu = new RegionLanguageMenu( );
    release = new Release();
    title = new Title( );
    selectorToExfragMapModel = new SelectorToExfragMapModel( );
  }

  @ Test
  void testAccordionModel() {
    TestUtils.executeTestBean(accordionModel);
  }

  @ Test
  void testArticleModel() {
    String [ ] excludedProperties = { "date" , "jcrLastModified" };
    TestUtils.executeTestBean(articleModel , excludedProperties);
  }

  @ Test
  void testBasePageModel() {
    TestUtils.executeTestBean(basePageModel);
  }

  @ Test
  void testBreadcrumbModel() {
    TestUtils.executeTestBean(breadcrumbModel);
  }

  @ Test
  void testCNWNewsDetailsModel() {
    TestUtils.executeTestBean(cnwNewsDetailsModel);
  }

  @ Test
  void testCNWNewsModel() {
    TestUtils.executeTestBean(cnwNewsModel);
  }

  @ Test
  void testFormButtonModel() {
    TestUtils.executeTestBean(formButtonModel);
  }

  @ Test
  void testFormContainer() {
    TestUtils.executeTestBean(formContainer);
  }

  @ Test
  void testLeftNavigationModal() {
    TestUtils.executeTestBean(leftNavigationModal);
  }

  @ Test
  void testRegionLanguageMenu() {
    TestUtils.executeTestBean(regionLanguageMenu);
  }

  @ Test
  void testAdvisorDetailsModel() {
    TestUtils.executeTestBean(advisorDetailModel);
  }
  
  @ Test
  void testProviderProfileModel() {
    TestUtils.executeTestBean(providerProfileModel);
  }
  
  @ Test
  void testAkamaiPurgeModel() {
    TestUtils.executeTestBean(akamaiPurgeModel);
  }
  
  @ Test
  void testArticleListModel() {
    TestUtils.executeTestBean(articleListModel);
  }
  
  @ Test
  void testAnnouncementList() {
    TestUtils.executeTestBean(announcementList);
  }
  
  @ Test
  void testExperienceFragmentModel() {
    TestUtils.executeTestBean(experienceFragmentModel);
  }
  
  @ Test
  void testFormOptions() {
    TestUtils.executeTestBean(formOptions);
  }
  
  @ Test
  void testNewsroomAnnouncementModel() {
    TestUtils.executeTestBean(newsroomAnnouncementModel);
  }
  
  @ Test
  void testNewsReleases() {
    TestUtils.executeTestBean(newsReleases);
  }
  
  @ Test
  void testPageItem() {
    TestUtils.executeTestBean(pageItem);
  }
  
  @ Test
  void testPagination() {
    TestUtils.executeTestBean(pagination);
  }
  
  @ Test
  void testRelease() {
    TestUtils.executeTestBean(release);
  }
  
  @ Test
  void testTitle() {
    TestUtils.executeTestBean(title);
  }
  
  @ Test
  void testSelectorToExfragMapModel() {
    TestUtils.executeTestBean(selectorToExfragMapModel);
  }
  
  @ Test
  void testFooterItemsModel() {
  	TestUtils.executeTestBean(footerItemsModel);
  }
}
