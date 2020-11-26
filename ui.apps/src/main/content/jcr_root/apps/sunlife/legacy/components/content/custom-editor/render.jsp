<%--
  ADOBE CONFIDENTIAL

  Copyright 2013 Adobe Systems Incorporated
  All Rights Reserved.

  NOTICE:  All information contained herein is, and remains
  the property of Adobe Systems Incorporated and its suppliers,
  if any.  The intellectual and technical concepts contained
  herein are proprietary to Adobe Systems Incorporated and its
  suppliers and may be covered by U.S. and Foreign Patents,
  patents in process, and are protected by trade secret or copyright law.
  Dissemination of this information or reproduction of this material
  is strictly forbidden unless prior written permission is obtained
  from Adobe Systems Incorporated.
--%>
<%
	
%><%@include file="/libs/granite/ui/global.jsp"%>
<%
	
%>
<ui:includeClientLib categories="text.authoring" />
<%@page session="false"
	import="com.adobe.granite.ui.components.AttrBuilder,
                  com.adobe.granite.ui.components.Config,
                  com.adobe.granite.ui.components.Field,
                  com.adobe.granite.ui.components.Tag"%>
<%
	Config cfg = cmp.getConfig();
	ValueMap vm = (ValueMap) request.getAttribute(Field.class.getName());
	Field field = new Field(cfg);

	String name = cfg.get("name", String.class);

	Tag tag = cmp.consumeTag();
	AttrBuilder attrs = tag.getAttrs();
	attrs.add("name", name);

	AttrBuilder attrsInput = new AttrBuilder(request, xssAPI);
	attrsInput.add("name", name);
	attrsInput.add("value", vm.get("value", String.class));

	AttrBuilder typeAttrs = new AttrBuilder(request, xssAPI);
	typeAttrs.add("type", "hidden");

	if (name != null && name.trim().length() > 0) {
		typeAttrs.add("name", name + "@TypeHint");
	}
%>

<div class="text-editor">
	<input id="tinymce-textarea" <%=attrsInput.build()%>>
</div>


<script type='text/javascript'
	" src='https://cloud.tinymce.com/stable/tinymce.min.js?apiKey=153zwajjv5musly3kozkvhy7tq40pelbl8579584w44i9suk'></script>


<script>
$(document).ready(function() {
    tinymce.remove('#tinymce-textarea');
    tinymce.init({
        selector: '#tinymce-textarea',
        theme: "modern",
        plugins: ["advlist image autolink code link lists charmap print preview anchor", "insertdatetime imagetools table paste fullscreen searchreplace textcolor colorpicker"],
        menubar: "edit insert view table tools",
        toolbar1: "styleselect,fontselect,fontsizeselect,forecolor,bold,italic,superscript,alignleft,aligncenter,alignright,alignjustify",
        toolbar2: "bullist,numlist,outdent,indent,removeformat,searchreplace,fullscreen,code",
        toolbar3: "link,unlink,image",
		/* enable title field in the Image dialog*/
  		image_title: true,

        code_dialog_width: 1100,
        resize: 'both',
        branding: false,
        convert_urls: false,
        valid_elements: '*[*]',
        valid_children: '+span[p|div|ol|ul|h1|h2|h3|h4|h5|h6],+label[p|div|ol|ul|h1|h2|h3|h4|h5|h6],+button[p|div|ol|ul|h1|h2|h3|h4|h5|h6],',
        allow_html_in_named_anchor: true,
        allow_script_urls: true,
        allow_unsafe_link_target: true,
        browser_spellcheck: true,
        style_formats: [{
                title: 'Normal Text',
                block: 'p'
            },
            {
                title: 'Headers',
                items: [{
                        title: 'Header 1',
                        format: 'h1'
                    },
                    {
                        title: 'Header 2',
                        format: 'h2'
                    },
                    {
                        title: 'Header 3',
                        format: 'h3'
                    },
                    {
                        title: 'Header 4',
                        format: 'h4'
                    },
                    {
                        title: 'Header 5',
                        format: 'h5'
                    },
                    {
                        title: 'Header 6',
                        format: 'h6'
                    }
                ]
            }
        ],
        forced_root_block: false,
        force_p_newlines: true,
        init_instance_callback: function(editor) {
            editor.serializer.addNodeFilter('script,style', function(nodes, name) {
                var i = nodes.length,
                    node, value, type;

                function trim(value) {
                    return value.replace(/(<!--\[CDATA\[|\]\]-->)/g, '\n')
                        .replace(/^[\r\n]*|[\r\n]*$/g, '')
                        .replace(/^\s*((<!--)?(\s*\/\/)?\s*<!\[CDATA\[|(<!--\s*)?\/\*\s*<!\[CDATA\[\s*\*\/|(\/\/)?\s*<!--|\/\*\s*<!--\s*\*\/)\s*[\r\n]*/gi, '')
                        .replace(/\s*(\/\*\s*\]\]>\s*\*\/(-->)?|\s*\/\/\s*\]\]>(-->)?|\/\/\s*(-->)?|\]\]>|\/\*\s*-->\s*\*\/|\s*-->\s*)\s*$/g, '');
                }
                while (i--) {
                    node = nodes[i];
                    value = node.firstChild ? node.firstChild.value : '';

                    if (value.length > 0) {
                        node.firstChild.value = trim(value);
                    }
                }
            });
        }

    });
});


</script>


<%
	String path = slingRequest.getRequestPathInfo().getSuffix().toString();
%>

<script type="text/javascript">
	var path= "<%= path %>";
	var propertypath="<%=resource.getPath()%>";
	//var tinymceContent=document.getElementById("tinymce-textarea").value;
        //alert("propertypath::" + propertypath);
        //alert("current page::" + path);

	$(".button-apply").click(function() {
        //alert("hi");
		var tinymceContent = tinyMCE.activeEditor.getContent();
        //alert(tinymceContent);

		$.ajax({
			type : 'POST',
			url : '/bin/aemexport/tinymcservice',
			data : {
				opath : path,
				content : tinymceContent,
                nodepath : propertypath

			},
			success : function(msg) {
				console.log('success');
			}

		});

	});
</script>
