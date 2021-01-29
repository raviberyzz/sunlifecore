package ca.sunlife.web.cms.advisorhub.models;

import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Locale;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(AemContextExtension.class)
public class LuminoModelTest {

    @InjectMocks
    LuminoModel subject;

    @Mock
    private Page currentPage;

    @BeforeEach
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testEnglish() throws Exception {
        Locale en = new Locale("en");
        when(currentPage.getLanguage(false)).thenReturn(en);
        subject.initialize();
        verify(currentPage).getLanguage(false);
        assertEquals("en", subject.getLanguage());
        assertEquals("luminohealth.sunlife.com", subject.getRedirectHost());
    }

    @Test
    public void testFrench() throws Exception {
        Locale fr = new Locale("fr");
        when(currentPage.getLanguage(false)).thenReturn(fr);
        subject.initialize();
        verify(currentPage).getLanguage(false);
        assertEquals("fr", subject.getLanguage());
        assertEquals("luminosante.sunlife.com", subject.getRedirectHost());
    }
}
