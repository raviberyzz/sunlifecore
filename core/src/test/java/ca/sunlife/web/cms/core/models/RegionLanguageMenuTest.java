package ca.sunlife.web.cms.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ ExtendWith (AemContextExtension.class)
public class RegionLanguageMenuTest {
  @ InjectMocks
  private RegionLanguageMenu regionLanguageMenu;

  @ BeforeEach
  public void setup() {
    MockitoAnnotations.initMocks(this);
  }

  @ Test
  public void testInitNullValues() {
    regionLanguageMenu.init( );
    assertNull(regionLanguageMenu.getLanguageSectionTitle( ));
  }

  @ Test
  public void testInit() {
    List <LinkModel> regions = new ArrayList <>( );
    regions.add(mock(LinkModel.class));
    regions.add(mock(LinkModel.class));

    // return 'yes' for gentNextList() of 1st item
    // and 'no'(anything other than 'yes') for gentNextList() of 2nd item
    // for 100% coverage cover of if statement
    when(regions.get(0).getNextList( )).thenReturn("yes");
    when(regions.get(1).getNextList( )).thenReturn("no");

    regionLanguageMenu.setRegions(regions);
    regionLanguageMenu.init( );

    // 1st item of regions and a new List is added to RegionLinks
    assertEquals(2 , regionLanguageMenu.getRegionLinks( ).size( ));
  }
}
