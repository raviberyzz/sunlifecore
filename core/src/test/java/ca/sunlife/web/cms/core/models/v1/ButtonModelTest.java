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
public class ButtonModelTest {

    @InjectMocks
    private ButtonModel button;

    @Mock
    ButtonModel mockButton;

    @BeforeEach
    void setup() {
        MockitoAnnotations.initMocks(this);

    }

    @Test
    void testInitWithText() {
        button.getText();
        button.getIcon();
        button.isIconPosition();
        button.getLinkURL();
        button.getLinkTarget();
        button.getButtonType();
        button.getDataTitle();
        button.getAccessibilityLabel();
        button.getSpacing();
        when(mockButton.isIconPosition()).thenReturn(true);
        when(mockButton.getButtonType()).thenReturn("btn-primary");
    }

}




