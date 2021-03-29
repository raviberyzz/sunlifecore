package ca.sunlife.web.cms.core.models;

import javax.jcr.RepositoryException;

import org.apache.sling.api.resource.LoginException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;

public class CFPathsTest {

	@ InjectMocks
	private CFPaths cfPaths;
	
	@ BeforeEach
	void setup()  {
		MockitoAnnotations.initMocks(this);
	}
	
	@ Test
	void testInit() throws LoginException, RepositoryException {
		cfPaths.init();
	}
}
