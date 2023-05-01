package ca.sunlife.web.cms.core.models.salesforce;

import java.util.Calendar;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ValueMap;

import com.adobe.cq.wcm.core.components.models.ListItem;

public class SalesforceListItem implements ListItem {

    private final ListItem delegate;
    private final ValueMap valueMap;

    public SalesforceListItem(ListItem delegate, ValueMap valueMap) {
        this.delegate = delegate;
        this.valueMap = valueMap;
    }

    public String getUrl() {
        return delegate.getURL();
    }

    @Override
    public String getTitle() {
        return delegate.getTitle();
    }

    @Override
    public String getDescription() {
        String result = delegate.getDescription();
        if  (valueMap.containsKey("socialMediaDescription")) {
            String socialMediaDescription = valueMap.get("socialMediaDescription", String.class);
            if (StringUtils.isNotEmpty(socialMediaDescription)) {
                result = socialMediaDescription;
            }
        }
        return result;
    }

    @Override
    public Calendar getLastModified() {
        return delegate.getLastModified();
    }

    @Override
    public String getPath() {
        return delegate.getPath();
    }

    @Override
    public String getName() {
       return delegate.getName();
    }

    public String getAuthor() {
        return "Author";
    }
}
