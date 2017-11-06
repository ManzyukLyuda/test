'use strict';

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
