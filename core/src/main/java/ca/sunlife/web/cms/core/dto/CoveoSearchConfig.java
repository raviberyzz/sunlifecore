package ca.sunlife.web.cms.core.dto;

public class CoveoSearchConfig {

    private String coveoSearchEnabled;
    private String searchUrl;
    private String siteLocale;
    private String searchLanguage;
    private String orgId;
    private String searchToken;
    private String restUri;

    private String searchHub;

    public CoveoSearchConfig(String coveoSearchEnabled, String searchToken, String searchUrl, String orgId, String restUri, String searchHub, String siteLocale, String searchLanguage) {
        this.coveoSearchEnabled = coveoSearchEnabled;
        this.searchUrl = searchUrl;
        this.siteLocale = siteLocale;
        this.searchLanguage = searchLanguage;
        this.orgId = orgId;
        this.searchToken = searchToken;
        this.restUri = restUri;
        this.searchHub = searchHub;
    }


    public String getCoveoSearchEnabled() {
        return coveoSearchEnabled;
    }

    public String getSearchToken() {
        return searchToken;
    }

    public String getSearchUrl() {
        return searchUrl;
    }

    public String getSiteLocale() {
        return siteLocale;
    }

    public String getSearchLanguage() {
        return searchLanguage;
    }

    public String getOrgId() {
        return orgId;
    }

    public String getRestUri() {
        return restUri;
    }

    public String getSearchHub() {
        return searchHub;
    }

}
