'use strict';
document.createElement('article');
document.createElement('header');
document.createElement('footer');
document.createElement('main');
document.createElement('nav');
document.createElement('acide');

var subTrigger = document.querySelector('.sub-trigger .menu-link');
var subContant = document.querySelector('.sub-contant');
var tabs = document.getElementsByClassName('tabs')[0];

var clearActive = function(trigger, classActive) {
    document.addEventListener('click', function(e) {
        if (e.target !== trigger) {
            trigger.classList.remove(classActive);
        }
    })
}

var sybMenuInit = function(el, classActive) {
    el.addEventListener('click', function(e) {
        e.target.className += classActive;
        //clearActive(e.target, classActive);
    })
}

var removeActive = function(el, className, inerText) {
    if (el) {
        document.getElementsByClassName(className)[0].innerHTML = inerText;
        document.getElementsByClassName(className)[0].classList.remove(className);
    }
}

var tabsInit = function(tabs, tabSelect, tabSelectAcive) {
    var openTab = 'Click to open';
    var closeTab = 'Click to close';
    tabs.addEventListener('click', function(e) {
        e.preventDefault();
        if (e.target.className === tabSelect) {
            removeActive(document.getElementsByClassName(tabSelectAcive)[0], tabSelectAcive, openTab);
            e.target.classList.add(tabSelectAcive);
            e.target.innerHTML = closeTab;
        } else if (e.target.classList.contains(tabSelect) && e.target.classList.contains(tabSelectAcive)) {
            e.target.classList.remove(tabSelectAcive);
            e.target.innerHTML = openTab;
        }
    });
}

var languageSelect = function(el, atribute, className) {
    el.addEventListener('click', function(e) {
        e.preventDefault();
        if (e.target.getAttribute(atribute)) {
            if (el.getElementsByClassName(className)[0]) {
                el.getElementsByClassName(className)[0].classList.remove(className);
            }
            e.target.classList.add(className);
        }

    })
}

sybMenuInit(subTrigger, 'active');
tabsInit(tabs, 'tab-select', 'tab-select_active');
languageSelect(document.getElementsByClassName("language-select")[0], 'data-language', 'active')
