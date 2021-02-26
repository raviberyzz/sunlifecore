package ca.sunlife.web.cms.core.beans;

import org.json.JSONException;
import org.jsoup.Jsoup;

public class TestClass {

	public static void main(String[] ar) throws JSONException {
		String html = "<img src=\"/static/Intranet/Corporate%20Marketing%20and%20Communications/Home%20page%20news%20and%20components/HR%20news/2020/Before%201%20year/part%201.jpg\" name=\"vgn_ext_templ_rewrite?vgnextoid=de0c5ce5327a1710VgnVCM1000001794d09fSTFL&amp;vgnextmgmtpath=/static/vgn_ext_templ_rewrite\" alt=\"1\" vgn_ext_params=\"type=image/jpeg\" /><br /> <a href=\"https://cdn.sunlife.com/static/canada/pdf/Focus%20on%20What%27s%20Important.pdf\" target=\"_blank\"><img src=\"/static/Intranet/Corporate%20Marketing%20and%20Communications/Home%20page%20news%20and%20components/HR%20news/2020/Before%201%20year/Part%202.jpg\" name=\"vgn_ext_templ_rewrite?vgnextoid=711c5ce5327a1710VgnVCM1000001794d09fSTFL&amp;vgnextmgmtpath=/static/vgn_ext_templ_rewrite\" alt=\"2\" vgn_ext_params=\"type=image/jpeg\" /></a><br /> <img src=\"/static/Intranet/Corporate%20Marketing%20and%20Communications/Home%20page%20news%20and%20components/HR%20news/2020/Before%201%20year/part%203.jpg\" name=\"vgn_ext_templ_rewrite?vgnextoid=e01c5ce5327a1710VgnVCM1000001794d09fSTFL&amp;vgnextmgmtpath=/static/vgn_ext_templ_rewrite\" alt=\"3\" vgn_ext_params=\"type=image/jpeg\" /><br /> <a href=\"https://cdn.sunlife.com/static/canada/pdf/Managing%20Your%20Mental%20Health%20Resources%20EN.pdf\" target=\"_blank\"><img src=\"/static/Intranet/Corporate%20Marketing%20and%20Communications/Home%20page%20news%20and%20components/HR%20news/2020/Before%201%20year/part%204.jpg\" name=\"vgn_ext_templ_rewrite?vgnextoid=d41c5ce5327a1710VgnVCM1000001794d09fSTFL&amp;vgnextmgmtpath=/static/vgn_ext_templ_rewrite\" alt=\"4\" vgn_ext_params=\"type=image/jpeg\" /></a><br /><a href=\"vgn_ext_templ_rewrite?vgnextoid=91c59249aa891710VgnVCM1000001794d09fRCRD/vgn_ext_templ_rewrite\"><img src=\"/static/Intranet/Corporate%20Marketing%20and%20Communications/Home%20page%20news%20and%20components/HR%20news/2020/Before%201%20year/part%205.jpg\" name=\"vgn_ext_templ_rewrite?vgnextoid=861c5ce5327a1710VgnVCM1000001794d09fSTFL&amp;vgnextmgmtpath=/static/vgn_ext_templ_rewrite\" alt=\"5\" vgn_ext_params=\"type=image/jpeg\" /></a>";
		System.out.println(Jsoup.parse(html).text());
	}
}
