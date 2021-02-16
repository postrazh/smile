!function t(e,n,o){function i(r,s){if(!n[r]){if(!e[r]){var l="function"==typeof require&&require;if(!s&&l)return l(r,!0);if(a)return a(r,!0);var c=new Error("Cannot find module '"+r+"'");throw c.code="MODULE_NOT_FOUND",c}var d=n[r]={exports:{}};e[r][0].call(d.exports,function(t){var n=e[r][1][t];return i(n?n:t)},d,d.exports,t,e,n,o)}return n[r].exports}for(var a="function"==typeof require&&require,r=0;r<o.length;r++)i(o[r]);return i}({1:[function(t,e,n){"use strict";t("./ux.js"),t("./form_data.js"),t("./jquery.infinite-scroll-helper.js"),t("./services.js");var o=t("./video.js");new o(jQuery)},{"./form_data.js":2,"./jquery.infinite-scroll-helper.js":3,"./services.js":4,"./ux.js":5,"./video.js":6}],2:[function(t,e,n){"use strict";function o(t){return t&&"undefined"!=typeof Symbol&&t.constructor===Symbol?"symbol":typeof t}window.FormDataCompatibility=function(){function t(t){if(this.fields={},this.boundary=this.generateBoundary(),this.contentType="multipart/form-data; boundary="+this.boundary,this.CRLF="\r\n","undefined"!=typeof t)for(var e=0;e<t.elements.length;e++){var n=t.elements[e],o=null!==n.name&&""!==n.name?n.name:this.getElementNameByIndex(e);this.append(o,n)}}return t.prototype.getElementNameByIndex=function(t){return"___form_element__"+t},t.prototype.append=function(t,e){return this.fields[t]=e},t.prototype.setContentTypeHeader=function(t){return t.setRequestHeader("Content-Type",this.contentType)},t.prototype.getContentType=function(){return this.contentType},t.prototype.generateBoundary=function(){return"AJAX--------------"+(new Date).getTime()},t.prototype.buildBody=function(){var t,e,n,o,i;n=[],i=this.fields;for(e in i)o=i[e],n.push(this.buildPart(e,o));return t="--"+this.boundary+this.CRLF,t+=n.join("--"+this.boundary+this.CRLF),t+="--"+this.boundary+"--"+this.CRLF},t.prototype.buildPart=function(t,e){var n;return"string"==typeof e?(n='Content-Disposition: form-data; name="'+t+'"'+this.CRLF,n+="Content-Type: text/plain; charset=utf-8"+this.CRLF+this.CRLF,n+=unescape(encodeURIComponent(e))+this.CRLF):("undefined"==typeof e?"undefined":o(e))===("undefined"==typeof File?"undefined":o(File))?(n='Content-Disposition: form-data; name="'+t+'"; filename="'+e.fileName+'"'+this.CRLF,n+="Content-Type: "+e.type+this.CRLF+this.CRLF,n+=e.getAsBinary()+this.CRLF):("undefined"==typeof e?"undefined":o(e))===("undefined"==typeof HTMLInputElement?"undefined":o(HTMLInputElement))&&("file"==e.type||(n='Content-Disposition: form-data; name="'+t+'"'+this.CRLF,n+="Content-Type: text/plain; charset=utf-8"+this.CRLF+this.CRLF,n+=unescape(encodeURIComponent(e.value))+this.CRLF)),n},t}()},{}],3:[function(t,e,n){"use strict";!function(t,e){function n(n,o){this.options=t.extend({},s,o),this.$element=t(n),this.$win=t(e),this.$loadingClassTarget=this._getLoadingClassTarget(),this.$scrollContainer=this._getScrollContainer(),this.loading=!1,this.doneLoadingInt=null,this.pageCount=this.options.triggerInitialLoad?this.options.startingPageCount-1:this.options.startingPageCount,this.destroyed=!1,this._init()}function o(e,n,o){e&&t.isFunction(e[n])&&e[n].apply(e,o)}function i(t,e,n){var o;return function(){var i=this,a=arguments,r=function(){o=null,n||t.apply(i,a)},s=n&&!o;clearTimeout(o),o=setTimeout(r,e),s&&t.apply(i,a)}}var a="infiniteScrollHelper",r="plugin_"+a,s={bottomBuffer:0,debounceInt:100,doneLoading:null,interval:300,loadingClass:"loading",loadingClassTarget:null,loadMoreDelay:0,loadMore:t.noop,startingPageCount:1,triggerInitialLoad:!1};n.prototype._init=function(){this._addListeners(),this.options.triggerInitialLoad?this._beginLoadMore(this.options.loadMoreDelay):this._handleScroll()},n.prototype._getLoadingClassTarget=function(){return this.options.loadingClassTarget?t(this.options.loadingClassTarget):this.$element},n.prototype._getScrollContainer=function(){var e=null;return"scroll"==this.$element.css("overflow-y")&&(e=this.$element),e||(e=this.$element.parents().filter(function(){return"scroll"==t(this).css("overflow-y")})),e=e.length>0?e:this.$win},n.prototype._addListeners=function(){var t=this;this.$scrollContainer.on("scroll."+a,i(function(){t._handleScroll()},this.options.debounceInt))},n.prototype._removeListeners=function(){this.$scrollContainer.off("scroll."+a)},n.prototype._handleScroll=function(t){var e=this;this._shouldTriggerLoad()&&(this._beginLoadMore(this.options.loadMoreDelay),this.options.doneLoading&&(this.doneLoadingInt=setInterval(function(){e.options.doneLoading(e.pageCount)&&e._endLoadMore()},this.options.interval)))},n.prototype._shouldTriggerLoad=function(){var t=this._getElementHeight(),e=this.$scrollContainer.scrollTop()+this.$scrollContainer.height()+this.options.bottomBuffer;return!this.loading&&e>=t&&this.$element.is(":visible")},n.prototype._getElementHeight=function(){return this.$element==this.$scrollContainer?this.$element[0].scrollHeight:this.$element.height()},n.prototype._beginLoadMore=function(e){e=e||0,setTimeout(t.proxy(function(){this.pageCount++,this.options.loadMore(this.pageCount,t.proxy(this._endLoadMore,this)),this.$loadingClassTarget.addClass(this.options.loadingClass)},this),e),this.loading=!0,this._removeListeners()},n.prototype._endLoadMore=function(){clearInterval(this.doneLoadingInt),this.loading=!1,this.$loadingClassTarget.removeClass(this.options.loadingClass),!this.destroyed&&this._addListeners()},n.prototype.destroy=function(){this._removeListeners(),this.options.loadMore=null,this.options.doneLoading=null,t.data(this.$element[0],r,null),clearInterval(this.doneLoadingInt),this.destroyed=!0},t.fn[a]=function(e){var i=!1,a=arguments;return"string"==typeof e&&(i=e),this.each(function(){var s=t.data(this,r);s||i?i&&o(s,i,Array.prototype.slice.call(a,1)):t.data(this,r,new n(this,e))})},e.InfiniteScrollHelper=e.InfiniteScrollHelper||n}(jQuery,window)},{}],4:[function(t,e,n){"use strict";function o(t){var e=t.find(".g-recaptcha").length;e&&grecaptcha.reset(),t.find(".text-error").remove().end().find(".has-error").removeClass("has-error")}function i(t,e){$.each(e,function(e,n){var o=t.find("."+e);o.addClass("has-error"),o.append('<span class="text-error">'+n+"</span>")})}function a(t){$("."+t).on("click",".like",function(e){e.preventDefault();var n=$(this);$.post(n.data("url"),{value:1}).done(function(e){var o=n.closest("div");$("."+t).find(".smiles-number-"+e.id).text(e.points),n.toggleClass("active"),$(o.find("button.dislike")).removeClass("active")}).fail(function(t){t.status})})}function r(t){$("."+t).on("click",".dislike",function(e){e.preventDefault();var n=$(this);$.post(n.data("url"),{value:-1}).done(function(e){var o=n.closest("div");$("."+t).find(".smiles-number-"+e.id).text(e.points),n.toggleClass("active"),$(o.find("button.like")).removeClass("active")})})}function s(){var t=$(".total-comments"),e=Number(t.text());t.text(e+1)}function l(){var t=$(".total-comments"),e=Number(t.text());0>e-1&&(e=1),t.text(e-1)}$("#login-form").on("click","button",function(t){t.preventDefault();var e=$("#login-form");return $.post(e.attr("action"),e.serialize()).done(function(t){window.location.href=$('meta[name="root"]').attr("content")}).fail(function(t){var n=t.responseJSON;o(e),i(e,n)}),!1}),$("#register-form").on("click","button",function(t){t.preventDefault();var e=$("#register-form");return $.post(e.attr("action"),e.serialize()).done(function(t){window.location.href=t.to}).fail(function(t){var n=t.responseJSON;o(e),i(e,n)}),!1}),$(".btn-edit-post").on("click",function(t){var e=$(this);$.get(e.data("info")).done(function(t){var n=$("#edit-post-form");n.attr("action",e.data("edit")),$("#edit-title").val(t.title),$("#edit-description").val(t.description);var o="";$.each(t.categories,function(t,e){(""==e.template||"nsfw"==e.template)&&(o+=e.slug+",",$(".c-"+e.id).attr("checked",!0))}),$(".cts").text(o)}).fail(function(){location.reload()})}),$("#edit-post-form").on("click","button",function(t){t.preventDefault();var e=$(this),n=$("#edit-post-form");return e.hasClass("loading")||(e.addClass("loading"),$.post(n.attr("action"),n.serialize()).done(function(t){window.location.href=t.to}).fail(function(t){var a=t.responseJSON;e.removeClass("loading"),o(n),i(n,a)})),!1}),$("#file-upload-form").on("click","button",function(t){t.preventDefault();var e,n=$(this),a=$("#file-upload-form")[0],r=$(a);return e="undefined"==typeof FormData?new FormDataCompatibility(a):new FormData(a),a=$(a),n.hasClass("loading")||(n.addClass("loading"),$.ajax({url:r.attr("action"),type:"POST",data:e,contentType:!1,processData:!1}).done(function(t){window.location.href=t.to}).fail(function(t){var e=t.responseJSON;n.removeClass("loading"),o(a),i(a,e)})),!1}),$("#list-upload-form").on("click","button.make-list",function(t){t.preventDefault();var e,n=$(this),i=$("#list-upload-form")[0],a=$(i);return e="undefined"==typeof FormData?new FormDataCompatibility(i):new FormData(i),i=$(i),n.hasClass("loading")||(n.addClass("loading"),$.ajax({url:a.attr("action"),type:"POST",data:e,contentType:!1,processData:!1}).done(function(t){window.location.href=t.to}).fail(function(t){var e=t.responseJSON;n.removeClass("loading"),o(i);var a=i.find(".list-item-container");$.each(e,function(t,e){var n=null;if(-1!=t.search("items.")){t=t.split(".");var o=t[1],r=t[2],s=$(a[o]);n=s.find("."+r)}else n=i.find(".list-form ."+t);n.addClass("has-error"),n.append('<span class="text-error">'+e+"</span>")})})),!1}),$("#url-upload-form").on("click","button",function(t){t.preventDefault();var e=$(this),n=$("#url-upload-form");return e.hasClass("loading")||(e.addClass("loading"),$.post(n.attr("action"),n.serialize()).done(function(t){window.location.href=t.to}).fail(function(t){var a=t.responseJSON;e.removeClass("loading"),o(n),i(n,a)})),!1}),a("posts"),r("posts"),a("post"),r("post");var c=function(t){t.preventDefault();var e,n=$(this),o=$('meta[name="lang.cancel"]').attr("content"),i=n.closest(".comment"),a=$('<div class="comment reply-form"></div>'),r=$('<button type="button" class="btn btn-text btn-cancel">'+o+"</button>");e=$(".comments-wrapper").find("form").first().clone();var l=n.data("parent"),c=n.data("id");n.data("post");n.prop("disabled",!0),i.hasClass("reply-comment")&&$(a).addClass("reply-comment"),e.prepend($('<input type="hidden" name="parent_id" value="'+l+'">')),e.attr("id","comment-form-"+l+"-"+c),e.find(".right").prepend(r),e.find("textarea").val("@"+n.data("name")+" "),i.after(a.append(e));var d=$("#comment-form-"+l+"-"+c);d.find(".submit-btn").on("click",function(t){t.preventDefault(),$.post(d.attr("action"),d.serialize()).done(function(t){d.closest(".reply-form").replaceWith(t.partial),n.prop("disabled",!1),s()}).fail(function(t){t.responseJSON;d.find("textarea").addClass("error")})}),$(".btn-cancel").on("click",function(t){t.preventDefault(),$(this).closest(".comment").remove(),n.prop("disabled",!1)})};$(".main-comment").find(".submit-btn").on("click",function(t){t.preventDefault();var e=$(this).closest("form");$(".comments").data("post");$.post(e.attr("action"),e.serialize()).done(function(t){var n=e.find("textarea");$(".comments").prepend(t.partial),n.removeClass("error"),n.val(""),s()}).fail(function(t){t.responseJSON;e.find("textarea").addClass("error")})}),$(".comments").on("click",".btn-reply-comm",c),$("#delete-account-form").on("click","button",function(t){t.preventDefault();var e=$("#delete-account-form");$.post(e.attr("action"),e.serialize()).done(function(t){window.location.href=$('meta[name="root"]').attr("content")}).fail(function(t){var e=$("#delete-account-form").find("input");e.addClass("error"),e.val("")})}),$(window).load(function(){a("comments"),r("comments");var t=$(".comments");t.on("click",".report",function(t){t.preventDefault();var e=$(this);$.post(e.data("url")).done(function(){var t;if("parent"==e.data("type")){var n="parent_"+e.data("id");t=$("#block_"+n),$("#"+n).remove(),t.remove(),l()}else t=$("#comment-"+e.data("id")),t.remove()})}),t.on("click",".delete",function(t){t.preventDefault();var e=$(this);$.post(e.data("url")).done(function(){var t;if("parent"==e.data("type")){var n="parent_"+e.data("id");t=$("#block_"+n),$("#"+n).remove(),t.remove(),l()}else t=$("#comment-"+e.data("id")),t.remove()})}),t.on("click",".more",function(t){t.preventDefault();var e=$(this),n=void 0==e.data("last")?0:e.data("last");$.get(e.data("url")+"?last="+n).done(function(t){var n=$(".more-"+e.data("parent"));e.data("last",parseInt(t.last)),t.total>0&&n.before(t.partial),t.hasMore||n.remove()})});var e=$(".loading-comments");t.data("url")&&t.infiniteScrollHelper({loadMore:function(n,o){n-=1;var i=t.data("url")+"?ajax=yes&page="+n;$.getJSON(i,function(t){return n>=t.last+1||0==t.total?(e.remove(),!1):(e.before(t.partial),void o())})},bottomBuffer:80,debounceInt:10}),$(".posts").infiniteScrollHelper({loadMore:function(t,e){var n=$(".posts"),o=n.data("url")+"/?ajax=yes&page="+t;n.hasClass("search")&&(o+="&q="+encodeURIComponent(n.data("q"))),$.getJSON(o,function(o){return 0!=o.total&&(n.append(o.partial),FB.XFBML.parse()),t>=o.last+1||0==o.total?!1:void e()})},bottomBuffer:80,debounceInt:10});var n=$(".notif");n.infiniteScrollHelper({loadMore:function(t,e){var o=n.data("url")+"/?ajax=yes&page="+t;$.getJSON(o,function(o){return 0!=o.total&&n.append(o.partial),t>=o.last+1||0==o.total?!1:void e()})},bottomBuffer:80,debounceInt:10}),$(".posts,.post").on("click",".post-wrapper",function(){var t=$(this),e=t.find(".gif-player");return 0==e.length?!0:void(t.hasClass("gif")?(e.data("preview",e.attr("src")),e.attr("src",e.data("gif")),t.removeClass("gif")):(t.addClass("gif"),e.attr("src",e.data("preview"))))}),$(".submit-report").on("click",function(t){t.preventDefault();var e=$("#report-post-form"),n=$(this);$.post(e.attr("action"),e.serialize()).always(function(t){window.location.href=n.data("redirect")})}),$(".posts,.post").on("click",".share-btn",function(t){t.preventDefault();var e=$(this),n="menubar=no,toolbar=no,resizable=no,scrollbars=no,height=400,width=600";window.open(e.attr("href"),"_blank",n)})})},{}],5:[function(t,e,n){"use strict";!function(t,e,n){var o={init:function(){Function("/*@cc_on return document.documentMode===10@*/")()&&(n.documentElement.className+="ie10"),$(".social-tabs li").on("click",function(t){t.preventDefault();var e=$(this),n=$(".social-tabs li"),i=$(".social-tab-content");o.tabs(e,n,i)}),$(".comments-tabs li").on("click",function(t){t.preventDefault();var e=$(this),n=$(".comments-tabs li"),i=$(".comments-tab-content");o.tabs(e,n,i)}),$(".item-upload-tabs li").on("click",function(t){t.preventDefault();var e=$(this),n=e.closest("div"),i=n.find(".item-upload-tabs li"),a=n.find(".item-upload-content");o.tabs(e,i,a)}),$(".btn-more-categories").on("click",function(t){o.dropDown(t,$(".more-menu-items"))}),$(".btn-more-popular").on("click",function(t){o.dropDown(t,$(".popular-menu-items"))}),$(".btn-notifications").on("click",function(t){o.dropDown(t,$(".notifications-dropdown"))}),$(".btn-upload-ways").on("click",function(t){o.dropDown(t,$(".upload-ways.dropdown"))}),$(".comments").on("click",".btn-comm-actions",function(t){o.dropDown(t,$(this).next())}),o.makeSticky(),$(".btn-mobile-menu").on("click",function(t){var e=$(this),n=$(".mobile-menu");o.mobileMenus(t,e,n)}),$(".btn-mobile-categories").on("click",function(t){var e=$(this),n=$(".mobile-categories");o.mobileMenus(t,e,n)}),$(".modal-trigger").on("click",o.modals),$(".modal-upload-url").on("click",".dropdown-checkboxes",function(){o.dropdownCheckbox($(".modal-upload-url .dropdown-checkboxes-wrapper"))}),$(".modal-upload-file").on("click",".dropdown-checkboxes",function(){o.dropdownCheckbox($(".modal-upload-file .dropdown-checkboxes-wrapper"))}),$("#edit-post-form").on("click",".dropdown-checkboxes",function(){o.dropdownCheckbox($(".dropdown-checkboxes-wrapper"))}),$("#file-upload-form").on("click",".dropdown-checkboxes",function(){o.dropdownCheckbox($(".dropdown-checkboxes-wrapper"))}),$(".modal-edit-post").on("click",".dropdown-checkboxes",function(){o.dropdownCheckbox($(".modal-edit-post .dropdown-checkboxes-wrapper"))}),$(".list-category").on("click",".dropdown-checkboxes",function(){o.dropdownCheckbox($(".list-category.dropdown-checkboxes-wrapper"))}),$(".upload-footer .description-checkbox").change(function(){$(this).closest("form").find(".post-description").toggleClass("hide")}),$(".posts").on("click","button.share",o.shareButtons),o.goTop(),$(".btn-trigger-search").on("click",o.activateSearch),o.listFunctionality(),$(".comments-tabs li").length>=2?$(".comments-tabs").css({"text-align":"center"}):$(".comments-tabs li.active").css({border:"none",background:"none"})},tabs:function(t,e,n){t.addClass("active"),e.not(t).removeClass("active");var o=t.attr("class").split(" ")[0];n.find(".active").removeClass("active"),n.find("."+o).addClass("active")},dropDown:function(t,e){t.preventDefault(),t.stopPropagation(),e.toggle(),$(".dropdown").not(e).hide(),$(n).on("click",function(){e.hide()})},makeSticky:function(){var t=$(e),n=$(".menu"),o=n.offset().top;t.scroll(function(){n.toggleClass("fixed",t.scrollTop()>o)})},mobileMenus:function(t,n,o){t.preventDefault(),t.stopPropagation();var i=n.attr("class"),a=o.attr("class"),r="."+i+",."+a;o.toggle(),$("body").on("click touchstart",function(t){$(t.target).closest(r).length||o.hide()}),$(e).resize(function(){$(this).width()>750&&o.hide()})},modals:function(t){function e(t){t.fadeIn(150),$("body").append('<div class="modal-backdrop"></div>')}function i(t){t.hide(),$(".modal-backdrop").remove(),o.resetForm(t.find("form"))}t.preventDefault();var a=$(this).data("target");e($(a)),$(".modal-close, .modal-backdrop").on("click",function(t){t.preventDefault(),i($(a))}),$(n).keyup(function(t){27==t.keyCode&&i($(a))}),$(".inside-modal-trigger").on("click",function(t){t.preventDefault();var n=$(this).data("target");i($(a)),e($(n)),$(".modal-close, .modal-backdrop").on("click",function(t){t.preventDefault(),i($(n))})})},dropdownCheckbox:function(t){function e(){var e=[];return t.find('.checkboxes-list input[type="checkbox"]:checked').each(function(){e.push($(this).val())}),e}var n=t.find(".checkboxes-list").data("max-cat");if(t.find(".checkboxes-list").toggle(),t.find('.checkboxes-list input[type="checkbox"]').on("change",function(e){$(this).parents("li").toggleClass("selected");var o=t.find("input:checked").length-1,i=t.find('.checkboxes-list input[type="checkbox"]:not(:checked)');this.checked&&o++,o==n?i.attr("disabled",!0):i.attr("disabled",!1)}),!t.find(".checkboxes-list").is(":visible")){var o=e();0==o.length?t.find(".categories-selected").text("Select a category (max 2)"):t.find(".categories-selected").text(o)}$(".modal-upload, body").on("click",function(n){if(t.find(".checkboxes-list").is(":visible")){if(!($(n.target).parents(".checkboxes-list").length||$(n.target).hasClass("checkboxes-list")||$(n.target).hasClass("dropdown-checkboxes")||$(n.target).parent(".dropdown-checkboxes").length)){t.find(".checkboxes-list").toggle();var o=e();0==o.length?t.find(".categories-selected").text("Select a category (max 2)"):t.find(".categories-selected").text(o)}t.find('.checkboxes-list input[type="checkbox"]:not(:checked)').each(function(){var t=$(this).closest("li");t.hasClass("selected")&&t.removeClass("selected")}),t.find('.checkboxes-list input[type="checkbox"]').on("change",function(t){$(this).parents("li").addClass("selected")})}})},shareButtons:function(){var t=$(this),e=t.closest("div").find(".share-options");e.show(),t.hide(),$(n).on("scroll",function(){t.show(),e.hide()})},goTop:function(){var t=$(".btn-go-top");$(e).on("scroll",function(){$(this).scrollTop()>500&&$(this).width()>768?t.fadeIn():t.fadeOut()}),t.on("click",function(t){t.preventDefault(),$("html, body").animate({scrollTop:0},450)})},activateSearch:function(t){function e(){i.hide(),a.val("")}t.preventDefault();var o=$(this),i=$(".user-functions").find("#main-search"),a=i.find('input[type="search"]');i.toggle(150,function(){a.val(""),a.focus()}),$(n).on("scroll",function(){e()}),$("body").on("click touchstart",function(t){$(t.target).closest(i).length||$(t.target).closest(o).length||e()})},listFunctionality:function(){function t(t,n,o,i){n.remove(),"move-top"==t?o.insertBefore(i):o.insertAfter(i),e()}function e(){n(),$(".list-items-wrapper").find(".list-item-container").each(function(t,e){var n=$(e).find("input, textarea");switch($.each(n,function(e,n){n=$(n),n.attr("name",n.attr("name").replace(/items\[.*?\]/i,"items["+t+"]"))}),$(e).find(".item-counter").text(t+1),$(e).find(".item-position").val(t+1),(t+1)%10){case 1:t+1==11?$(e).find(".number-abbr").text("th"):$(e).find(".number-abbr").text("st");break;case 2:$(e).find(".number-abbr").text("nd");break;case 3:$(e).find(".number-abbr").text("rd");break;default:$(e).find(".number-abbr").text("th")}})}function n(){$(".list-items-wrapper .list-item-container:first-of-type button").attr("disabled",!0),$(".list-items-wrapper .list-item-container").length>1&&($(".list-item-container").siblings().find(".move-top").attr("disabled",!1).end().find(".move-bottom").attr("disabled",!1),$(".list-items-wrapper .list-item-container:first-of-type").find(".move-top").attr("disabled",!0).end().find(".move-bottom").attr("disabled",!1).end().find(".delete-item").attr("disabled",!1),$(".list-items-wrapper .list-item-container:last-of-type").find(".move-top").attr("disabled",!1).end().find(".move-bottom").attr("disabled",!0))}var o=$(".list-items-wrapper .list-item-container").clone(!0);$(".btn-more-items").on("click",function(){$(o).clone(!0).appendTo(".list-items-wrapper"),e()}),$(".list-items-wrapper").on("click",".delete-item",function(){$(this).closest(".list-item-container").remove(),e()}),$(".list-items-wrapper").on("click",".move-top",function(){var e=$(this).closest(".list-item-container");t($(this).attr("class"),e,e.clone(!0),e.prev())}),$(".list-items-wrapper").on("click",".move-bottom",function(){var e=$(this).closest(".list-item-container");t($(this).attr("class"),e,e.clone(!0),e.next())}),$(".list-items-wrapper .list-item-container:first-of-type button").attr("disabled",!0)},resetForm:function(t){var e=t.find(".dropdown-checkboxes"),n=t.find(".post-description"),o=t.find(".g-recaptcha").length,i=t.find(".description-checkbox");t[0].reset(),e&&(e.find(".selected").removeClass("selected"),$("input:disabled").attr("disabled",!1),e.find(".categories-selected").text(e.find(".categories-selected-text").text())),o&&grecaptcha.reset(),t.find(".text-error").remove().end().find(".has-error").removeClass("has-error"),i.length&&n&&!n.hasClass("hide")&&n.addClass("hide")}};o.init()}(jQuery,window,document)},{}],6:[function(t,e,n){"use strict";function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),a=function(){function t(e){var n=arguments.length<=1||void 0===arguments[1]?"video":arguments[1];o(this,t),this.jquery=e,this.selector=n,this.init()}return i(t,[{key:"init",value:function(){this.jquery(".posts,.post").on("click",".has-video",this.toggleVideo)}},{key:"toggleVideo",value:function(){var t=$(this),e=t.find("video")[0];e.paused?(e.play(),t.removeClass("gif")):(e.pause(),t.addClass("gif"))}}]),t}();e.exports=a},{}]},{},[1]);