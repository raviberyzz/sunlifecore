/**
 *
 */
package ca.sunlife.web.cms.core.services;

import com.day.cq.search.result.SearchResult;

import java.util.Map;


public interface ArticleQueryService {

    /** This method is used to process the query and return the search result
     *
     * @param queryParameterMap queryParameterMap
     * @return SearchResult searchResult
     */
    SearchResult processQuery(Map<String, String> queryParameterMap);

    /** This method is used to generate the query parameter map
     *
     * @param path path
     * @param offset offset
     * @param limit limit
     * @param tagNames tagname
     * @return Map<String, String> QueryParameterMap
     */
    Map<String, String> generateQueryParameterMap(String path, int offset, int limit, String[] tagNames);

}

