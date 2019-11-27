/*
 *  Copyright 2015 Adobe Systems Incorporated
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package com.sunlife.core.models;

import java.util.List;
import javax.inject.Inject;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

@Model(
    adaptables = {Resource.class},
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface SocialIconsModel {
	
  @Inject
  List<Icons> getIcons(); // the name `getIcons` corresponds to the multifield name="./icons"
  

  /**
   * Social Icons model
   * has a icon class name, url and window selections
   */
  @Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
  interface Icons {
	  
    @Inject
    String getIconName();
    
    @Inject
    String getIconUrl();
    
    @Inject
    String getSelection();    
   
  }
}