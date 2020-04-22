/**
 * 
 */
package ca.sunlife.web.cms.core.beans;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import org.apache.sling.api.SlingHttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.models.TestUtils;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * @author mo92 The class
 *         PaginationTest.
 */
@ ExtendWith (AemContextExtension.class)
public class PaginationTest {

	@ Mock
	private Page currentPage;

	@ Mock
	private SlingHttpServletRequest request;

	/** The pagination. */
	@ InjectMocks
	private Pagination pagination;

	private final String [ ] PAGE_NO_2 = { "2" };
	private final String [ ] PAGE_NO_4 = { "4" };
	private final String [ ] PAGE_NO_6 = { "6" };
	private final String [ ] PAGE_NO_7 = { "7" };
	
	/**
	 * Sets up mocks.
	 */
	@ BeforeEach
	void setUp() {
		MockitoAnnotations.initMocks(this);
	}

	/**
	 * Tests pagination
	 * constructor.
	 */
	@ Test
	public void testPagination() {
		when(request.getRequestPathInfo( ))
        .thenReturn(TestUtils.getDummyRequestPathInfo(PAGE_NO_2));
		pagination = new Pagination(request, 10, 40, "/content/sunlife/external/ca/en/resource");
		assertEquals(1, pagination.getPrevPage());
		
		when(request.getRequestPathInfo( ))
        .thenReturn(TestUtils.getDummyRequestPathInfo(PAGE_NO_4));
		pagination = new Pagination(request, 10, 34, "/content/sunlife/external/ca/en/resource3");
		assertEquals(5, pagination.getNextPageNo());
		
		when(request.getRequestPathInfo( ))
        .thenReturn(TestUtils.getDummyRequestPathInfo(PAGE_NO_6));
		pagination = new Pagination(request, 10, 70, "/content/sunlife/external/ca/en/resource4");
		assertEquals(7, pagination.getNextPageNo());
		
		when(request.getRequestPathInfo( ))
        .thenReturn(TestUtils.getDummyRequestPathInfo(PAGE_NO_7));
		pagination = new Pagination(request, 10, 92, "/content/sunlife/external/ca/en/resource9");
		assertEquals(8, pagination.getNextPageNo());
	}
}
