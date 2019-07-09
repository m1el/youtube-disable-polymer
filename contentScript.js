// ==UserScript==
// @name YouTube Classic for 2018 (Polymer Disable)
// @namespace https://github.com/davidbailey95
// @version 0.2.0
// @description Redirect YouTube pages to the classic design
// @author /u/ndogw and davidbailey95
// @match *://www.youtube.com/*
// @exclude *://www.youtube.com/embed/*
// @run-at document-start
// @grant none
// ==/UserScript==
//

var youtubeRe = /^https?:\/\/www.youtube.com\//;

function addDisable(url, always) {
    if (!youtubeRe.test(url)) { return; }
    if (url.indexOf("disable_polymer") === -1) {
        if (url.indexOf("?") > 0) {
            url += "&";
        } else {
            url += "?";
        }
        url += "disable_polymer=1";
        return url;
    }
    if (always) {
        return url;
    }
}

function redirectTo(url) {
    var referrer = document.referrer;
    if (!url || url === referrer) {
        return;
    }
    window.location.href = url;
}

var url = window.location.href;
redirectTo(addDisable(url));

document.addEventListener('DOMContentLoaded', function() {
    // from https://stackoverflow.com/a/12552017/4247209
    document.body.onclick = function(e){
        e = e || event;
        var from = findParent('a',e.target || e.srcElement);
        if (from) {
            var url = from.href;
            if (!(url.match("/embed/") || url === location.href)) {
                url = addDisable(url, true);
                if (url) {
                    from.href = url;
                }
            }
        }
    };
    //find first parent with tagName [tagname]
    function findParent(tagname,el){
        while (el){
            if ((el.nodeName || el.tagName).toLowerCase()===tagname.toLowerCase()){
                return el;
            }
            el = el.parentNode;
        }
        return null;
    }
});
