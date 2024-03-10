package ca.sunlife.web.cms.core.beans.v1;

public class CoveoSearchConfig {


    public CoveoSearchConfig() {
    }

    private String coveoSearchEnabled;
    private String searchUrl;
    private String siteLocale;
    private String searchLanguage;
    private String orgId;
    private String searchToken;
    private String restUri;

    public String getCoveoSearchEnabled() {
        return coveoSearchEnabled;
    }

    public void setCoveoSearchEnabled(String coveoSearchEnabled) {
        this.coveoSearchEnabled = coveoSearchEnabled;
    }

    public String getSearchUrl() {
        return searchUrl;
    }

    public void setSearchUrl(String searchUrl) {
        this.searchUrl = searchUrl;
    }

    public String getSiteLocale() {
        return siteLocale;
    }

    public void setSiteLocale(String siteLocale) {
        this.siteLocale = siteLocale;
    }

    public String getSearchLanguage() {
        return searchLanguage;
    }

    public void setSearchLanguage(String searchLanguage) {
        this.searchLanguage = searchLanguage;
    }

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public String getSearchToken() {
        return searchToken;
    }

    public void setSearchToken(String searchToken) {
        this.searchToken = searchToken;
    }

    public String getRestUri() {
        return restUri;
    }

    public void setRestUri(String restUri) {
        this.restUri = restUri;
    }

    public String getSearchHub() {
        return searchHub;
    }

    public void setSearchHub(String searchHub) {
        this.searchHub = searchHub;
    }

    private String searchHub;


}
