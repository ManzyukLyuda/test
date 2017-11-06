'use strict';
!window.addEventListener&&function(e,t,n,r,i,s,o){e[r]=t[r]=n[r]=function(e,t){var n=this;o.unshift([n,e,t,function(e){e.currentTarget=n,e.preventDefault=function(){e.returnValue=!1},e.stopPropagation=function(){e.cancelBubble=!0},e.target=e.srcElement||n,t.call(n,e)}]),this.attachEvent("on"+e,o[0][3])},e[i]=t[i]=n[i]=function(e,t){for(var n=0,r;r=o[n];++n)if(r[0]==this&&r[1]==e&&r[2]==t)return this.detachEvent("on"+e,o.splice(n,1)[0][3])},e[s]=t[s]=n[s]=function(e){return this.fireEvent("on"+e.type,e)}}(Window.prototype,HTMLDocument.prototype,Element.prototype,"addEventListener","removeEventListener","dispatchEvent",[])

document.createElement('article');
document.createElement('header');
document.createElement('footer');
document.createElement('main');
document.createElement('nav');
document.createElement('acide');

var subTrigger = document.querySelector('.sub-trigger .menu-link');
var subContant = document.querySelector('.sub-contant');
var tabs = document.querySelector('.tabs');




var clearActive = function(trigger, classActive) {
    document.addEventListener('click', function(e) {
        if (e.target !== trigger) {
            trigger.className = 'menu-link';
        }
    })
}

var sybMenuInit = function(el, classActive) {
    el.addEventListener('click', function(e) {
        e.target.className += " " + classActive;
        clearActive(e.target, classActive);
    })
}

var removeActive = function(el, className, inerText) {
    if (el) {
        document.querySelector('.' + className).innerHTML = inerText;
        document.querySelector('.' + className).className = 'tab-select';
    }
}

var tabsInit = function(tabs, tabSelect, tabSelectAcive) {
    var openTab = 'Click to open';
    var closeTab = 'Click to close';
    tabs.addEventListener('click', function(e) {
        e.preventDefault();
        if (e.target.className === tabSelect) {
            removeActive(tabs.querySelector('.' + tabSelectAcive), tabSelectAcive, openTab);
            e.target.className += " " + tabSelectAcive;
            e.target.innerHTML = closeTab;
        } else if (e.target.className === tabSelect + " " + tabSelectAcive) {
            e.target.className = tabSelect;
            e.target.innerHTML = openTab;
        }
    });
}

var languageSelect = function(el, atribute, className) {
    el.addEventListener('click', function(e) {
        e.preventDefault();
        if (e.target.getAttribute(atribute)) {
            if (el.querySelector('.' + className)) {
                el.querySelector('.'+className).className = 'language-select__item';
            }
            e.target.className += " " +className;
        }

    })
}

sybMenuInit(subTrigger, 'active');
tabsInit(tabs, 'tab-select', 'tab-select_active');
languageSelect(document.querySelector(".language-select"), 'data-language', 'active')
