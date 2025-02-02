package ca.sunlife.web.cms.core.services.impl;

import com.adobe.cq.xf.ExperienceFragmentLinkRewriterProvider;
import com.adobe.cq.xf.ExperienceFragmentVariation;

import ca.sunlife.web.cms.core.services.SiteConfigService;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(service = ExperienceFragmentLinkRewriterProvider.class, immediate = true)
public class GeneralLinkRewriter implements ExperienceFragmentLinkRewriterProvider {
	
	@ Reference
	private SiteConfigService siteConfigService;

	/** The logger. */
	private final static Logger logger = LoggerFactory.getLogger(GeneralLinkRewriter.class);

	@Override
	public String rewriteLink(String link, String tag, String attribute) {
		logger.debug("entering rewriteLink...");
		logger.debug("original link --> "+link);
		if (siteConfigService == null) {
			// if there was an error, then we do not modify the link
			logger.debug("siteConfigService is null, link is not transformed.");
			return null;
		}
		if (link.startsWith("/content")) {
			link = link.replaceAll(".html", "");
			link = siteConfigService.getPageUrl(link);
			logger.debug("transformedLink --> "+link);
		}
		return link;
	}

	@Override
	public boolean shouldRewrite(ExperienceFragmentVariation experienceFragment) {
		logger.debug("entering shouldRewrite...");
		return experienceFragment.getPath().contains("/content/experience-fragments/sunlife");
	}

	@Override
	public int getPriority() {
		return 1;
	}
}
