/*
 *
 */

package ca.sunlife.web.cms.core.models.v1;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;


@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
public class Release {

    /**
     * The id.
     */
    private String id;

    /**
     * The headline.
     */
    private String headline;

    /**
     * The release date.
     */
    private String releaseDate;

    /**
     * The summary.
     */
    private String summary;

    /**
     * The body.
     */
    private String body;

    /**
     * The headline url.
     */
    private String headlineUrl;

}
