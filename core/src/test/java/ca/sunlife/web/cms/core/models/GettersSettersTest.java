package ca.sunlife.web.cms.core.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class GettersSettersTest {
	private AccordionModel accordionModel;
	private ArticleModel articleModel;
	private BasePageModel basePageModel;
	private BreadcrumbModel breadcrumbModel;
	private CNWNewsDetailsModel cnwNewsDetailsModel;
	private CNWNewsModel cnwNewsModel;
	private CNWNewsOverviewModel cnwNewsOverviewModel;
	private FormButtonModel formButtonModel;
	private FormContainer formContainer;
	private LeftNavigationModal leftNavigationModal;
	private RegionLanguageMenu regionLanguageMenu;

	@BeforeEach
	void setup() {
		accordionModel = new AccordionModel();
		articleModel = new ArticleModel();
		basePageModel = new BasePageModel();
		breadcrumbModel = new BreadcrumbModel();
		cnwNewsDetailsModel = new CNWNewsDetailsModel();
		cnwNewsModel = new CNWNewsModel();
		cnwNewsOverviewModel = new CNWNewsOverviewModel();
		formButtonModel = new FormButtonModel();
		formContainer = new FormContainer();
		leftNavigationModal = new LeftNavigationModal();
		regionLanguageMenu = new RegionLanguageMenu();
	}

	@Test
	void testAccordionModel() {
		Utils.executeTestBean(accordionModel);
	}

	@Test
	void testArticleModel() {
		String[] excludedProperties= {"date","jcrLastModified"};
		Utils.executeTestBean(articleModel, excludedProperties);
	}

	@Test
	void testBasePageModel() {
		Utils.executeTestBean(basePageModel);
	}

	@Test
	void testBreadcrumbModel() {
		Utils.executeTestBean(breadcrumbModel);
	}

	@Test
	void testCNWNewsDetailsModel() {
		Utils.executeTestBean(cnwNewsDetailsModel);
	}

	@Test
	void testCNWNewsModel() {
		Utils.executeTestBean(cnwNewsModel);
	}

	@Test
	void testCNWNewsOverviewModel() {
		Utils.executeTestBean(cnwNewsOverviewModel);
	}

	@Test
	void testFormButtonModel() {
		Utils.executeTestBean(formButtonModel);
	}

	@Test
	void testFormContainer() {
		Utils.executeTestBean(formContainer);
	}

	@Test
	void testLeftNavigationModal() {
		Utils.executeTestBean(leftNavigationModal);
	}

	@Test
	void testRegionLanguageMenu() {
		Utils.executeTestBean(regionLanguageMenu);
	}
}
