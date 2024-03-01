/*
 *
 */

package ca.sunlife.web.cms.core.beans.v1;


public class ContentFragmentCriteria {

    /**
     * The query path.
     */
    private String path;
    /**
     * The offset value for the query.
     */
    int offset;
    /**
     * The limit value for the query.
     */
    int limit;
    /**
     * The tag names for the query.
     */
    String[] tagNames;
    /**
     * The model path for the query.
     */
    String modelPath;
    /**
     * The order by for the query.
     */
    String orderBy;
    /**
     * The order by sort for the query.
     */
    String orderBySort;
    /**
     * The total match count of the Search Resultso
     */
    Long totalMatchCount;

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public int getOffset() {
        return offset;
    }

    public void setOffset(int offset) {
        this.offset = offset;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public String[] getTagNames() {
        return tagNames;
    }

    public void setTagNames(String[] tagNames) {
        this.tagNames = tagNames;
    }

    public String getModelPath() {
        return modelPath;
    }

    public void setModelPath(String modelPath) {
        this.modelPath = modelPath;
    }

    public String getOrderBy() {
        return orderBy;
    }

    public void setOrderBy(String orderBy) {
        this.orderBy = orderBy;
    }

    public String getOrderBySort() {
        return orderBySort;
    }

    public void setOrderBySort(String orderBySort) {
        this.orderBySort = orderBySort;
    }

    public Long getTotalMatchCount() {
        return totalMatchCount;
    }

    public void setTotalMatchCount(Long totalMatchCount) {
        this.totalMatchCount = totalMatchCount;
    }


}
