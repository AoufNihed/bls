// ==UserScript==
// @name         Individual Test
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Try to take over the world!
// @author       @Itsmaarouf
// @match        *://*.blsspainmorocco.com/*
// @match        *://*.blsspainvisa.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const targetText = "available_dates";
    const dateFieldId = "app_date";
    const fields = {
        first_name: "First Name",
        last_name: "Last Name",
        dateOfBirth: "yyyy-mm-dd", // Date Of Birth
        passport_no: "Passport Number",
        pptIssueDate: "yyyy-mm-dd", // Passport Issue Date
        pptExpiryDate: "yyyy-mm-dd", // Passport Expiry Date
        pptIssuePalace: "city name",
        fran: "TG700******",
    };

    function doMagic() {
        const script = [...document.scripts].find((s) => s.text.includes(targetText));
        if (!script) return;

        const code = script.text;
        const bgn = code.indexOf(targetText);
        const end = code.indexOf("fullCapicity_dates");
        const table = code.slice(bgn + 20, end - 9);

        if (table) {
            const datee = table.slice(0, 10);
            const [yyyy, mm, dd] = datee.split("-");
            const finDate = `${yyyy}-${mm}-${dd}`;

            const appDate = document.getElementById(dateFieldId);
            if (appDate && appDate.value.length === 0 && finDate) {
                $('#app_date').datepicker("update", finDate);
            } else {
                setFieldValues();
            }
        }
    }

    function setFieldValues() {
        for (const fieldId in fields) {
            const field = document.getElementById(fieldId);
            if (field) field.value = fields[fieldId];
        }

        const audio = new Audio('https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-the-sound-pack-tree/tspt_german_ambulance_sirens_wailing_loop_041.mp3');
        audio.play();

        document.getElementById("app_time").selectedIndex = document.getElementById('app_time').length - 1;
        document.getElementById("VisaTypeId").selectedIndex = "1";
        if (document.getElementById('fran')) document.getElementById('fran').value = fields.fran;
        if (document.getElementById("passportType")) document.getElementById("passportType").selectedIndex = "7";
        if (document.getElementById("vasId12")) $("#vasId12").prop("checked", true);
    }

    function clicksubmit() {
        const requiredFields = [
            dateFieldId,
            "app_time",
            "VisaTypeId",
            "first_name",
            "last_name",
            "dateOfBirth",
            "passportType",
            "passport_no",
            "pptIssueDate",
            "pptExpiryDate",
            "pptIssuePalace",
        ];

        if (requiredFields.every((fieldId) => document.getElementById(fieldId).value !== "")) {
            console.log('click SUBMIT');
            document.querySelector(".btn.primary-btn").click();
            clearInterval(stopconsubmit);
        }
    }

    const stopconsubmit = setInterval(clicksubmit, 10 * 1000);

    document.querySelector(".btn.primary-btn").onclick = function () {
        console.log('STOP CLICKING SUBMIT');
        clearTimeout(stopconsubmit);
    }

    console.log("End of code run");
})();
