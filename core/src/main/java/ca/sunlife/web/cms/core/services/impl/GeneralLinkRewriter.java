package ca.sunlife.web.cms.core.services.impl;

import com.adobe.cq.xf.ExperienceFragmentLinkRewriterProvider;

import com.adobe.cq.xf.ExperienceFragmentVariation;
import com.day.cq.commons.Externalizer;

import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(service = ExperienceFragmentLinkRewriterProvider.class, immediate = true)
public class GeneralLinkRewriter implements ExperienceFragmentLinkRewriterProvider {

	/** The Externalizer. */
	@Reference
	private Externalizer externalizer;
	
    @Reference
    private ResourceResolverFactory resourceResolverFactory;

	/** The logger. */
	private final static Logger logger = LoggerFactory.getLogger(GeneralLinkRewriter.class);
	
	private String domain = "publish";

	@Override
	public String rewriteLink(String link, String tag, String attribute) {
		logger.debug("entering rewriteLink...");
		logger.debug("original link --> "+link);
		if (externalizer == null) {
			// if there was an error, then we do not modify the link
			logger.debug("externalizer is null, link is not transformed.");
			return null;
		}
		link = transformedLink(link, externalizer);
		logger.debug("transformedLink --> "+link);
		return link;
	}

	@Override
	public boolean shouldRewrite(ExperienceFragmentVariation experienceFragment) {
		logger.debug("entering shouldRewrite...");
		if (experienceFragment.getPath().contains("/content/experience-fragments/sunlife")) {
			domain = experienceFragment.getProperties().get("cq:externalizerName").toString();
			logger.debug("XF selected domain --> "+ domain);
			return true;
		}
		return false;
	}

	@Override
	public int getPriority() {
		return 1;
	}

	private String transformedLink(String input, Externalizer externalizer) {
		logger.debug("entering transformedLink...");
		if (input.contains("/content/sunlife/")) {
			logger.debug("input is --> "+input);
			input = format(input);
			input = externalizer.externalLink(resourceResolverFactory.getThreadResourceResolver(), domain, input);
			logger.debug("output is --> "+input);
		}
		return input;
	}

	private static String format(String input) {
		String value = "";
		Boolean lastIndex = false;
		if (input.endsWith("/")) {
			lastIndex = true;
		}
		if (input.contains("/")) {
			String[] tokens = input.split("/");
			if (tokens.length > 4) {
				for (int i = 1; i < tokens.length; i++) {
					if (i > 4) {
						value += "/" + tokens[i];
					}
				}
			}
		} else {
			value = input;
		}
		value = value.replaceAll(".html", "/");
		if (lastIndex) {
			value = value + "/";
		}
		return value;
	}

}
