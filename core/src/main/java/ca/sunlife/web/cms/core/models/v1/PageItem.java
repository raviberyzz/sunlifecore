/**
 *
 */
package ca.sunlife.web.cms.core.models.v1;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PageItem {

    /**
     * The href.
     */
    private String href;

    /**
     * The index.
     */
    private int index;

    /**
     * The ellipsis.
     */
    private boolean ellipsis;
}
