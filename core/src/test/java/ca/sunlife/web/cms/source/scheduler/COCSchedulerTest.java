package ca.sunlife.web.cms.source.scheduler;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.lang.annotation.Annotation;

import javax.jcr.RepositoryException;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.commons.scheduler.ScheduleOptions;
import org.apache.sling.commons.scheduler.Scheduler;
import org.apache.sling.jcr.api.SlingRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.source.osgi.config.CoCConfig;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * The Class COCSchedulerTest.
 *
 */
@ ExtendWith(AemContextExtension.class)
public class COCSchedulerTest {

	/** The coCConfig. */
	private CoCConfig coCConfig;

	/** The scheduler. */
	@ Mock
	private Scheduler scheduler;

	/** The coreResourceResolver. */
	@ Mock
	private CoreResourceResolver coreResourceResolver;

	/** The repository. */
	@ Mock
	private SlingRepository repository;

	@ InjectMocks
	private COCScheduler cocScheduler;

	@ Mock
	private ScheduleOptions scheduleOptions;

	@ BeforeEach
	public void setup() throws LoginException, RepositoryException {
		MockitoAnnotations.initMocks(this);
		coCConfig = new CoCConfig() {

			@ Override
			public Class<? extends Annotation> annotationType() {
				return null;
			}

			@ Override
			public boolean isEnabled() {
				return true;
			}

			@ Override
			public String getUserHomeDir() {
				return "/home/user/d";
			}

			@ Override
			public String getScheduleName() {
				return "test scheduler";
			}

			@ Override
			public String getScheduleExpression() {
				return "0 */10 * * * ?";
			}

			@ Override
			public String getFilePath() {
				return null;
			}

			@ Override
			public String getDenyGroupName() {
				return "coc-grp";
			}
		};
	}

	@ Test
	public void testActivate() {
		when(scheduler.EXPR("0 */10 * * * ?")).thenReturn(scheduleOptions);
		cocScheduler.activate(coCConfig);
		assertEquals("test scheduler", cocScheduler.getCoCConfig().getScheduleName());
	}

}
