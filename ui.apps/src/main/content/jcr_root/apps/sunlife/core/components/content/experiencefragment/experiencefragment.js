/*******************************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 * Copyright 2017 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 ******************************************************************************/
;
use(function () {
    "use strict";
    var constants = Packages.com.adobe.cq.xf.ExperienceFragmentsConstants;
    var properties = resource.adaptTo(Packages.org.apache.sling.api.resource.ValueMap);
    if (properties == null) {
        return {
            fragmentPath: null
        };
    }

    var fragmentPath = this.path;
    if (fragmentPath == null || fragmentPath.equals("")) {
        return {
            fragmentPath: fragmentPath
        };
    }

    var fragment = resolver.getResource(fragmentPath);
    if (fragment == null) {
        return {
            fragmentPath: null
        };
    }
    var fragmentContent = fragment.getChild("jcr:content");
    if (fragmentContent == null) {
        return {
            fragmentPath: null
        };
    }

    var variation = null;
    var variationPath = fragmentPath;
    if (fragmentContent.isResourceType(constants.RT_EXPERIENCE_FRAGMENT_MASTER)) {
        var children = fragment.getChildren();
        for (var idx in children) {
            if (children.hasOwnProperty(idx)) {
                var res = children[idx];
                var content = res.getChild("jcr:content");
                if (content != null) {
                    var props = content.adaptTo(Packages.org.apache.sling.api.resource.ValueMap);
                    if (props.get(constants.PN_XF_MASTER_VARIATION) === true) {
                        variation = res;
                        variationPath = variation.getPath();
                    }
                }
            }
        }
    }

    return {
        variationResource: variation,
        fragmentPath: variationPath + '/jcr:content'
    }
});