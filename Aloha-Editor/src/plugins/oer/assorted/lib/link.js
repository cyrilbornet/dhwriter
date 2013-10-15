(function(){define(["aloha","jquery","overlay/overlay-plugin","ui/ui","aloha/console","aloha/ephemera","css!assorted/css/link.css"],function(e,t,n,r,i,s){var o,u,a,f,l,c,h,p='<form class="modal" id="linkModal" tabindex="-1" role="dialog" aria-labelledby="linkModalLabel" aria-hidden="true">\n  <div class="modal-header">\n    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>\n    <h3 id="linkModalLabel">Edit link</h3>\n  </div>\n  <div class="modal-body">\n    <div id="link-text">\n      <span>Text to display</span>\n      <div>\n        <input id="link-contents" class="input-xlarge" type="text" placeholder="Enter a phrase here" required />\n      </div>\n    </div>\n    <h4 id="link-destination">Link Destination</h4>\n    <div class="tabbable tabs-left"> <!-- Only required for left/right tabs -->\n      <ul class="nav nav-tabs">\n        <li><span data-target="#link-tab-external" data-toggle="tab">External</span></li>\n        <li><span data-target="#link-tab-internal" data-toggle="tab">Internal</span></li>\n      </ul>\n      <div class="tab-content">\n        <div class="tab-pane" id="link-tab-external">\n          <span for="link-external">Link to webpage</span>\n          <input class="link-input link-external" id="link-external" type="url" pattern="https?://.+"/>\n        </div>\n        <div class="tab-pane" id="link-tab-internal">\n          <label for="link-internal">Link to a part in this document</label>\n          <select class="link-input link-internal" id="link-internal" size="5" multiple="multiple"></select>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class="modal-footer">\n    <button class="btn btn-primary link-save">Submit</button>\n    <button class="btn" data-dismiss="modal" aria-hidden="true">Cancel</button>\n  </div>\n</form>',d='<span class="link-popover-details">\n  <button class="btn-link edit-link" title="Change the link\'s text, location, or other properties">\n    <i class="icon-edit-link"></i>\n    <span>Edit link...</span>\n  </button>\n  <button class="btn-link delete-link">\n    <i class="icon-delete-link"></i>\n    <span title="Remove the link, leaving just the text">Unlink</span>\n  </button>\n  <a class="visit-link" target="_blank" title="Visit the link in a new window or tab">\n    <i class="icon-external-link"></i>\n    <span class="title"></span></a>\n</span>\n<br/>';s.attributes("data-original-title");c=function(n){var r,i,s,o,u,a,f,l,c,h,d,v,m=this,g=e.activeEditable.obj,y=t(p);y.attr("data-backdrop",!1);r=n.get(0);u=y.find("#link-contents");r.childNodes.length>0&&u.val(n.text());a=y.find(".link-external");c=y.find(".link-internal");h=y.find(".link-save");f=y.find(".link-input");i=function(e,n){var r=n[0].cloneNode(!0),i=t(r).contents(),s=t("<option></option>");s.attr("value","#"+e);s.append(i);return s.appendTo(c)};v=g.find("h1,h2,h3,h4,h5,h6");s=g.find("figure,table");v.filter(":not([id])").each(function(){return t(this).attr("id",GENTICS.Utils.guid())});v.each(function(){var e=t(this),n=e.attr("id");return i(n,e)});s.each(function(){var e=t(this),n=e.attr("id"),r=e.find("caption,figcaption");if(r[0])return i(n,r)});y.find("a[data-toggle=tab]").on("shown",function(e){var n=t(t(e.relatedTarget).attr("href")),r=t(t(e.target).attr("href"));n.find(".link-input").removeAttr("required");return r.find(".link-input").attr("required",!0)});o=n.attr("href");y.find(".active").removeClass("active");l="#link-tab-external";n.attr("href").match(/^#/)&&(l="#link-tab-internal");y.find(l).addClass("active").find(".link-input").attr("required",!0).val(o);y.find("a[href="+l+"]").parent().addClass("active");d=function(e){var t=e.val();if(!(/^http/.test(t)||/^htp/.test(t)||/^htt/.test(t))&&!/^https?:\/\//.test(t))return e.val("http://"+t)};a.on("blur",function(){return d(a)});a.bind("keydown","return",function(){return d(a)});y.on("submit",function(e){var t;e.preventDefault();if(u.val()&&u.val().trim()){n.contents().remove();n.append(u.val())}t=y.find(".link-input[required]");o=t.val();n.attr("href",o);return y.modal("hide")});y.modal("show");y.on("hidden",function(){return y.remove()});return y};h=function(e){var t,n,r=e.get(0);e.removeData("aloha-bubble-openTimer",0);e.removeData("aloha-bubble-closeTimer",0);e.removeData("aloha-bubble-selected",!1);e.popover("destroy");t=new GENTICS.Utils.RangeObject;t.startContainer=t.endContainer=r.parentNode;t.startOffset=GENTICS.Utils.Dom.getIndexInParent(r);t.endOffset=t.startOffset+1;t.select();n=!0;GENTICS.Utils.Dom.removeFromDOM(r,t,n);t.startContainer=t.endContainer;t.startOffset=t.endOffset;t.select();return t};a="a:not(.aloha-ephemera)";l=function(e,t){var n,r,i;t=typeof t!="undefined"?t:50;n=t/2;e=e.replace("http://","");e=e.replace("https://","");if(e.length<=t)return e;i=f(e,n,!1);r=f(e,n,!0);return i+".."+r};f=function(e,t,n){var r,i,s=[" ","/","&"],o=t*.8;n=typeof n!="undefined"?n:!1;e=n?e.split("").reverse().join(""):e;i="";r=0;while(r<t-1){i+=e[r];if(r>=o&&s.indexOf(e[r])>=0)break;r++}return n?i.split("").reverse().join(""):i};u=function(n){var r,i,s=e.activeEditable,o=t('<div class="link-popover"></div>'),u=n.attr("href"),a=t(d);o.append(a);r=a.find(".edit-link");r.on("click",function(){var t;e.activeEditable=s;return t=c(n)});i=a.find(".delete-link");i.on("click",function(){e.activeEditable=s;return h(n)});a.find(".visit-link").attr("href",u);a.find(".visit-link .title").text(l(u,30));return o.contents()};o=function(e){var t=e;while(t){if(t.nodeName.toLowerCase()==="a")return t;t=t.parentNode}return!1};r.adopt("insertLink",null,{click:function(){var n,r,i,s,u=this,a=e.activeEditable,f=e.Selection.getRangeObject();if(f.startContainer!==f.endContainer)return;r=o(f.startContainer);if(r){n=t(r);f.startContainer=f.endContainer=r;f.startOffset=0;f.endOffset=r.childNodes.length;i=c(n)}else{GENTICS.Utils.Dom.extendToWord(f);f.select();n=t('<a href="" class="aloha-new-link"></a>');s=f.isCollapsed()?"":f.getText();n.append(s);i=c(n)}return i.on("hidden",function(){var t;e.activeEditable=a;if(n.hasClass("aloha-new-link")){if(!n.attr("href"))return;f=e.Selection.getRangeObject();if(f.isCollapsed()){GENTICS.Utils.Dom.insertIntoDOM(n,f,e.activeEditable.obj);f.startContainer=f.endContainer=n.contents()[0];f.startOffset=0;f.endOffset=n.text().length}else{GENTICS.Utils.Dom.removeRange(f);GENTICS.Utils.Dom.insertIntoDOM(n,f,e.activeEditable.obj)}t=e.activeEditable.obj.find(".aloha-new-link");return t.removeClass("aloha-new-link")}})}});e.bind("aloha-editable-created",function(e,t){return t.obj.on("click","a",function(e){return e.preventDefault()})});return{selector:a,populator:u,markerclass:"link-popover"}})}).call(this);