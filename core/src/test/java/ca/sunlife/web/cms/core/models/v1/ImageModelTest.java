package ca.sunlife.web.cms.core.models.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.mock;

import java.util.ArrayList;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;

import org.mockito.MockitoAnnotations;
import com.adobe.cq.wcm.core.components.models.ImageArea;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class ImageModelTest {
	
	public final AemContext context = new AemContext();

	@InjectMocks
	private ImageModel imageModel;	
	
	@BeforeEach
	void setup() {
		MockitoAnnotations.initMocks(this);		
		imageModel = mock(ImageModel.class);
		lenient().when(imageModel.getSrc()).thenReturn("binary");
		lenient().when(imageModel.getFileReference()).thenReturn("/content/dam/image.jpg");
		lenient().when(imageModel.getAlt()).thenReturn("alt text");
		lenient().when(imageModel.getAreas()).thenReturn(new ArrayList<ImageArea>());
		lenient().when(imageModel.getLink()).thenReturn("https://www.google.com");
		lenient().when(imageModel.getSrcUriTemplate()).thenReturn("/content/sometemplate");
		lenient().when(imageModel.getTitle()).thenReturn("a title");
		lenient().when(imageModel.getUuid()).thenReturn("012345");	
	}
	
	 @Test
	 void testGetters() {		 
		 assertEquals(imageModel.getSrc(), "binary");
		 assertEquals(imageModel.getFileReference(), "/content/dam/image.jpg");
		 assertEquals(imageModel.getAreas(), new ArrayList<ImageArea>());
		 assertEquals(imageModel.getAlt(), "alt text");
		 assertEquals(imageModel.getLink(), "https://www.google.com");
		 assertEquals(imageModel.getSrcUriTemplate(), "/content/sometemplate");
		 assertEquals(imageModel.getTitle(), "a title");
		 assertEquals(imageModel.getUuid(), "012345");				
		 assertFalse(imageModel.isLazyEnabled());
		 assertFalse(imageModel.isDecorative());		
	 }
}
