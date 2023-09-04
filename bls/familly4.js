// ==UserScript==
// @name         FML-P4
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Try to take over the world!
// @author       @itsmaarouf
// @match        *://*.blsspainmorocco.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const scriptIndexes = [11, 12];
    const targetText = "available_dates";

    const script = scriptIndexes.map((index) => document.scripts[index].text).find((text) => text.includes(targetText));

    if (script) {
        const bgn = script.indexOf(targetText);
        const end = script.indexOf("fullCapicity_dates");
        const table = script.slice(bgn + 20, end - 9);

        if (table) {
            const datee = table.slice(0, 10);
            const dd = datee.slice(0, 2);
            const mm = datee.slice(3, 5);
            const yyyy = datee.slice(6, 10);
            const finDate = [yyyy, mm, dd].join("-");

            const appDate = document.getElementById("app_date");
            if (appDate && appDate.value.length === 0 && finDate) {
                $('#app_date').datepicker("update", finDate);
            } else {
                setFieldValues();
            }
        }
    } else {
        console.log("Script number is wrong");
    }

    function setFieldValues() {
        //########################################################################
        //############### THIS IS THE PART YOU MUST CHANGE #######################
        //########################################################################

        const fieldData = [
            {
                last_name: ["last_Names_1", "last_Names_2", "last_Names_3", "last_Names_4"],
                first_name: ["first_Names_1", "first_Names_2", "first_Names_3", "first_Names_4"],
                births: ["yyyy-mm-aa", "yyyy-mm-aa", "yyyy-mm-aa", "yyyy-mm-aa"],
                passNumbers: ["KN0000000", "LF0000000", "BH0000000", "BD0000000"],
                issueDates: ["yyyy-mm-aa", "yyyy-mm-aa", "yyyy-mm-aa", "yyyy-mm-aa"],
                expiryDates: ["yyyy-mm-aa", "yyyy-mm-aa", "yyyy-mm-aa", "yyyy-mm-aa"],
                pptissuePalaces: ["city Name", "city Name", "city Name", "city Name"],
                number: 4,
            },
        ];

        //########################################################################
        //########################################################################

        setTimeout(function() {
            let j = 1;
            fieldData.forEach((data) => {
                const {
                    last_name,
                    first_name,
                    births,
                    passNumbers,
                    issueDates,
                    expiryDates,
                    pptissuePalaces,
                    number,
                } = data;

                for (let i = 0; i < number; i++) {
                    document.getElementById(`app_time-${j}`).selectedIndex = document.getElementById(`app_time-${j}`).length - 1;
                    document.getElementById(`VisaTypeId-${j}`).selectedIndex = "1";
                    document.getElementById(`first_name-${j}`).value = first_name[i];
                    document.getElementById(`last_name-${j}`).value = last_name[i];
                    document.getElementById(`passport_number-${j}`).value = passNumbers[i];
                    $(`#date_of_birth-${j}`).datepicker("update", births[i]);
                    $(`#pptIssueDate-${j}`).datepicker("update", issueDates[i]);
                    $(`#pptExpiryDate-${j}`).datepicker("update", expiryDates[i]);
                    document.getElementById(`pptIssuePalace-${j}`).value = pptissuePalaces[i];
                    j++;
                }
            });
        }, 4000);
    }

    if (document.getElementById("app_date").value.length === 0) {
        setTimeout(function() {
            window.location.reload(1);
        }, 19 * 1000);
    }
})();
