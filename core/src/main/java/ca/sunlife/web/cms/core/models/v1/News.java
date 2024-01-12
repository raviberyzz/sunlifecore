/**
 *
 */
package ca.sunlife.web.cms.core.models.v1;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class News {

    /**
     * The release main.
     */
    private ReleaseMain releaseMain;

    /**
     * The pagination.
     */
    private Pagination pagination;

}
