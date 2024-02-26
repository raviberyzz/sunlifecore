package ca.sunlife.web.cms.core.models.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class ModalTest {

	private static final Logger LOGGER = LoggerFactory.getLogger(ModalTest.class);

	@InjectMocks
	private Modal modal;

	ButtonItems buttonItem = new ButtonItems();
	List<ButtonItems> modalButtons = new ArrayList<>();

	@BeforeEach
	public void setup() {
		MockitoAnnotations.initMocks(this);
		buttonItem.setButtonText("Button1");
		buttonItem.setButtonType("primary");
		buttonItem.setLinkTarget("new");
		buttonItem.setLinkURL("/content/sunlife");
		modalButtons.add(buttonItem);
		modal.setAdditionalText("additiontext");
		modal.setContent("main content");
		modal.setDataSection("data section");
		modal.setHeading("Test Heading");
		modal.setModalID("12345");
		modal.setModalTypes("bulletlist");
		modal.setTrigger(false);
		modal.setModalButtons(modalButtons);
	}

	@Test
	public void testInit() {
		try {
			assertEquals("additiontext", modal.getAdditionalText());
			assertEquals("main content", modal.getContent());
			assertEquals("data section", modal.getDataSection());
			assertEquals("Test Heading", modal.getHeading());
			assertEquals("12345", modal.getModalID());
			assertEquals("bulletlist", modal.getModalTypes());
			assertEquals(false, modal.isTrigger());
			assertEquals(modalButtons, modal.getModalButtons());
			assertEquals(buttonItem, modalButtons.get(0));
			assertEquals("Button1", buttonItem.getButtonText());
			assertEquals("primary", buttonItem.getButtonType());
			assertEquals("new", buttonItem.getLinkTarget());
			assertEquals("/content/sunlife", buttonItem.getLinkURL());

		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		}
	}

}
