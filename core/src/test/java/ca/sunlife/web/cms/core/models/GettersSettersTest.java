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
		formButtonModel = new FormButtonModel();
		formContainer = new FormContainer();
		leftNavigationModal = new LeftNavigationModal();
		regionLanguageMenu = new RegionLanguageMenu();
	}

	@Test
	void testAccordionModel() {
		TestUtils.executeTestBean(accordionModel);
	}

	@Test
	void testArticleModel() {
		String[] excludedProperties= {"date","jcrLastModified"};
		TestUtils.executeTestBean(articleModel, excludedProperties);
	}

	@Test
	void testBasePageModel() {
		TestUtils.executeTestBean(basePageModel);
	}

	@Test
	void testBreadcrumbModel() {
		TestUtils.executeTestBean(breadcrumbModel);
	}

	@Test
	void testCNWNewsDetailsModel() {
		TestUtils.executeTestBean(cnwNewsDetailsModel);
	}

	@Test
	void testCNWNewsModel() {
		TestUtils.executeTestBean(cnwNewsModel);
	}

	@Test
	void testFormButtonModel() {
		TestUtils.executeTestBean(formButtonModel);
	}

	@Test
	void testFormContainer() {
		TestUtils.executeTestBean(formContainer);
	}

	@Test
	void testLeftNavigationModal() {
		TestUtils.executeTestBean(leftNavigationModal);
	}

	@Test
	void testRegionLanguageMenu() {
		TestUtils.executeTestBean(regionLanguageMenu);
	}
}
