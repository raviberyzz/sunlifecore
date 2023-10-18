
package ca.sunlife.web.cms.core.models.v1;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.Mockito.when;

@ExtendWith(AemContextExtension.class)
public class TextModelTest {

    @InjectMocks
    private TextModel text;

    @Mock
    TextModel mockText;

    @BeforeEach
    void setup() {
        MockitoAnnotations.initMocks(this);

    }

    @Test
    void testInitWithText() {
        text.getBottomSpacing();
        text.isRichText();
        text.getText();
        when(mockText.getText()).thenReturn("Heading 1");
        when(mockText.isRichText()).thenReturn(true);
        when(mockText.getBottomSpacing()).thenReturn("2xl");
    }


}