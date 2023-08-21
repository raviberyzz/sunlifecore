package ca.sunlife.web.cms.core.services.druglist;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.EqualsBuilder;

import java.util.Locale;

public class DrugListKey {

    private final String category;
    private final String name;

    public DrugListKey(String category, String name) {
        if (StringUtils.isNotEmpty(category)) {
            this.category = category.trim().toLowerCase(Locale.ROOT);
        } else {
            this.category = StringUtils.EMPTY;
        }
        if (StringUtils.isNotEmpty(category)) {
            this.name = name.trim().toLowerCase(Locale.ROOT);
        } else {
            this.name = StringUtils.EMPTY;
        }
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(71, 95)
                .append(category)
                .append(name)
                .toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        boolean result;
        if(other == null) { return false;}
        if(other == this) { return true;}
        if(other.getClass() != getClass()) { return false;}

        DrugListKey compareMe = (DrugListKey) other;

        return new EqualsBuilder()
                .append(category, compareMe.category)
                .append(name, compareMe.name)
                .isEquals();
    }

    public String getCategory() {
        return this.category;
    }

    public String getName() {
        return this.name;
    }
}
