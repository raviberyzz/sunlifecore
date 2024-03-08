/*
 *
 */

package ca.sunlife.web.cms.core.services;

import ca.sunlife.web.cms.core.beans.News;
import ca.sunlife.web.cms.core.beans.NewsDetails;
import ca.sunlife.web.cms.core.beans.ReleaseMain;
import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.models.NewsCategory;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;

public interface AnalyticsService {


  public News getCNWNews();



  public NewsDetails getCNWNewsDetails();
}
