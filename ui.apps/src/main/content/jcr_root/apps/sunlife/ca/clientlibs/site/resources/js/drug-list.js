"use strict";
var drugListTotalBenefits = {
    //INITIALIZE
    init: function () {
        var context = this; // CHANGE TO CONTEXT

        //GLOBAL VARIABLES
        context.config = {
            lang: "en",
            showTable: false,
            showLoadingSpinner: false,
            tableData: "",
        };

        //call all the DOM invoking functions here
        context.onDOMready();
        // context.findContractMatch(5943);
        // context.findContractMatch(5943, 2288915, true);
    },
    onDOMready: function () {
        var currentUrl = window.location.href,
            dinString = "din";
        //DETERMINE IF URL HAS DIN
        if (currentUrl.indexOf(dinString) !== -1) {
            //TRUE - STRIP URL
            //START LOADER HERE
            drugListTotalBenefits.stripQueryParam();
        } else {
            //false - display input form
            // document
            // 	.getElementById("form-container")
            // 	.classList.remove("no-display");
        }
        drugListTotalBenefits.config.lang =
            document.getElementsByTagName("HTML")[0].lang == "en" ||
            document.getElementsByTagName("HTML")[0].lang == "en-CA"
                ? "en"
                : "fr";
    },
    stripQueryParam: function () {
        var queryParam = window.location.search,
            grpContractBeyond = queryParam.split("grpcontract")[1],
            dinBeyond = queryParam.split("din")[1],
            // NOT USING URLSearchParams FOR IE
            grpContract = grpContractBeyond.substring(
                grpContractBeyond.indexOf("=") + 1,
                grpContractBeyond.indexOf("&")
            ),
            din = dinBeyond.substring(
                dinBeyond.indexOf("=") + 1,
                dinBeyond.indexOf("&")
            );
        console.log(grpContract, din);
        drugListTotalBenefits.findContractMatch(grpContract, din, true);
    },
    findContractMatch: function (contractNum, din, multiSearch) {
        var matchFound = false,
            policyType,
            matchData;
        for (var policy in response) {
            if (!matchFound) {
                var policyList = response[policy];
                for (var contract in policyList) {
                    if (Number(contract) === contractNum) {
                        matchData = policyList[contract];
                        policyType = policy;
                        matchFound = true;
                        break;
                    }
                }
            }
        }
        drugListTotalBenefits.resolveData(
            matchData,
            policyType,
            din,
            multiSearch
        );
    },
    findDINMatch: function (din, contractData) {
        var matchFound = false,
            policyType,
            matchData = "";
        Object.keys(contractData).map(function (key, index) {
            if (!matchFound) {
                var dinArray = contractData[key]["DIN"];
                if (dinArray.indexOf(Number(din)) >= 0) {
                    matchFound = true;
                    matchData = contractData[index];
                    return;
                }
            }
        });
        if (matchData === "") {
            drugListTotalBenefits.showMessage(
                drugListTotalBenefits.config.lang === "en"
                    ? response["non-slf-policy"].default[0]["message-en"]
                    : response["non-slf-policy"].default[0]["message-fr"]
            );
        } else {
            drugListTotalBenefits.config.tableData = [matchData];
            drugListTotalBenefits.createResultTable([matchData]);
        }
    },
    //DETERMINE HOW THE DATA NEEDS TO BE SHOWN ON UI
    resolveData: function (matchedData, policyType, din, multiSearch) {
        if (matchedData === undefined) {
            matchedData = response["non-slf-policy"].default[0];
            drugListTotalBenefits.showMessage(
                drugListTotalBenefits.config.lang === "en"
                    ? matchedData["message-en"]
                    : matchedData["message-fr"]
            );
        } else if (policyType === "non-slf-policy") {
            drugListTotalBenefits.showMessage(
                drugListTotalBenefits.config.lang === "en"
                    ? matchedData[0]["message-en"]
                    : matchedData[0]["message-fr"]
            );
        } else {
            //SEARCH FOR DIN WITHIN MATCHED DATA
            if (multiSearch) {
                drugListTotalBenefits.findDINMatch(din, matchedData);
            } else {
                drugListTotalBenefits.config.tableData = matchedData;
                drugListTotalBenefits.createResultTable(matchedData);
            }
        }
    },
    //SHOW RELEVANT STRING MESSAGE
    showMessage: function (message) {
        $("#drug-list").hide();
        var HTML = "<span>" + message + "</span>";
        $("#table-container").html(HTML);
    },
    //ADD ROWS TO TABLE
    createResultTable: function (tableData) {
        var context = this,
            HTML = "",
            tableRow = tableData;
        Object.keys(tableRow).map(function (key, index) {
            var item = tableRow[key];
            console.log(item["drug-category-en"]);
            HTML += "<tr>";
            HTML +=
                "<td>" +
                (drugListTotalBenefits.config.lang === "en"
                    ? item["drug-category-en"]
                    : item["drug-category-fr"]) +
                "</td>";
            HTML +=
                "<td>" +
                (drugListTotalBenefits.config.lang === "en"
                    ? item["drug-name-en"]
                    : item["drug-name-fr"]) +
                "</td>";
            HTML +=
                "<td><a href='" +
                (drugListTotalBenefits.config.lang === "en"
                    ? item["form-en"]
                    : item["form-fr"]) +
                "'>Pdf logo</a></td>";
            HTML += "</tr>";
        });
        console.log(HTML);
        $("#drug-list").find("tbody").html(HTML);
    },
};
(function () {
    drugListTotalBenefits.init();
})();