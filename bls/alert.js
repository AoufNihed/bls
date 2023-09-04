// ==UserScript==
// @name         BLS alert
// @namespace    http://tampermonkey.net/
// @version      2.0.3
// @description  BLS alert - Clean Refresh Alarm Notification
// @author       @Itsmaarouf
// @match        *://*.blsspainmorocco.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const checkForActiveDay = setInterval(function() {
        const activeDays = document.getElementsByClassName('day activeClass');
        if (activeDays.length !== 0) {
            new Audio('https://www.soundjay.com/mechanical/sounds/smoke-detector-1.mp3').play();
            clearInterval(checkForActiveDay);
        }
    }, 500);
})();
