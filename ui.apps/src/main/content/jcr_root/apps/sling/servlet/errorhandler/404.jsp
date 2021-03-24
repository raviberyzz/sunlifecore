<%@page session="false" import="ca.sunlife.web.cms.core.services.SiteConfigService"%>
<%@include file="/libs/foundation/global.jsp" %>
<%
SiteConfigService sCon = sling.getService(SiteConfigService.class);
String chub = sCon.getConfigValues("enableContextHub", request.getRequestURI().replace(".html",""));
if(chub.equalsIgnoreCase("true") || request.getRequestURI().startsWith("/content/dam")) {
    slingResponse.setStatus(404);
%>
<script type="text/javascript">
    if(window.location.search.indexOf('errorPageTarget') < 0) {
        if(window.location.search.length > 0) {
            window.location.replace(window.location.href+'&errorPageTarget=true');
        }else {
            window.location.replace(window.location.href+'?errorPageTarget=true');
        }
    }
</script>
<%
    return;
}
%>
<%@include file="/apps/acs-commons/components/utilities/errorpagehandler/404.jsp" %>
