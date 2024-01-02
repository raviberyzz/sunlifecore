/*
 *
 */

package ca.sunlife.web.cms.core.models.v1;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Collections;
import java.util.List;

@Getter
@Setter
public class NewsReleases {

    /**
     * The matching count.
     */
    @JsonProperty("matching_count")
    private String matchingCount;

    /**
     * The returned count.
     */
    @JsonProperty("returned_count")
    private String returnedCount;

    /**
     * The release.
     */
    @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
    private List<Release> release;

    /**
     * The latest modified.
     */
    private String latestModified;

    /**
     * Gets the release.
     *
     * @return the release
     */
    public List <Release> getRelease() {
        return Collections.unmodifiableList(release);
    }

    /**
     * Sets the release.
     *
     * @param release
     *          the new release
     */
    public void setRelease(final List <Release> release) {
        this.release = Collections.unmodifiableList(release);
    }

}
