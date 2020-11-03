"use strict";
var drugListTotalBenefits = {
    //INITIALIZE
    init: function () {
        var context = this; // CHANGE TO CONTEXT

        //GLOBAL VARIABLES
        context.config = {
            lang: "en",
            httpRequest: null,
            showTable: false,
            showLoadingSpinner: false,
            response: "",
            tableData: "",
            getListUrl: "/bin/getDrugList",
            grpContractParamString: "grpcontract",
            dinParamString: "din",
            inputFieldData: "",
        };
        context.onDOMready();
        // context.getList();
        // context.findContractMatch(5943);
        // context.findContractMatch(5943, 2288915, true);
    },
    onDOMready: function () {
        var currentUrl = window.location.href;
        //DETERMINE IF URL HAS DIN
        if (
            currentUrl.indexOf(drugListTotalBenefits.config.dinParamString) !==
            -1
        ) {
            // drugListTotalBenefits.stripQueryParam();
            drugListTotalBenefits.getList(false);
        } else {
            //false - display input form
            document
                .getElementById("form-container")
                .classList.remove("no-display");
        }
        drugListTotalBenefits.config.lang =
            document.getElementsByTagName("HTML")[0].lang == "en" ||
            document.getElementsByTagName("HTML")[0].lang == "en-CA"
                ? "en"
                : "fr";
    },
    // ON CLICK OF SEARCH BUTTON
    validate: function () {
        var inputData = document.getElementById("contract-num").value;
        console.log(inputData === "");
        if (inputData === undefined || inputData === "") {
            console.log("Jo");
            document
                .getElementById("contract-err")
                .classList.remove("no-display");
            document
                .getElementById("contract-num")
                .classList.add("parsley-error");
        } else {
            drugListTotalBenefits.config.inputFieldData = document.getElementById(
                "contract-num"
            ).value;
            drugListTotalBenefits.getList(true);
        }
    },
    // MAKE API CALL TO GET LIST - singleSearch QUERY PARAM DETERMINES WHETHER "DIN" SEARCH IS NEEDED
    getList: function (singleSearch) {
        document
            .getElementById("loading-spinner")
            .classList.remove("no-display");
        var context = this;
        // xhttp.onreadystatechange = function () {
        // 	if (this.readyState == 4 && this.status == 200) {
        // 		context.config.response = xhttp.response;
        // 		console.log(typeof xhttp.response);
        // 		if (singleSearch)
        // 			context.findContractMatch(
        // 				drugListTotalBenefits.config.inputFieldData
        // 			);
        // 		else context.stripQueryParam();
        // 	} else {
        // 		document
        // 			.getElementById("loading-spinner")
        // 			.classList.add("no-display");
        // 		console.log("API call was unsuccessful");
        // 		console.log(xhttp);
        // 	}
        // };
        // xhttp.open("GET", context.config.getListUrl, true);
        // xhttp.send();
        $.ajax({
            url: context.config.getListUrl,
            type: "GET",
            dataType: "json", // added data type
            success: function (res) {
                console.log(res);
                context.config.response = res;
                if (singleSearch)
                    context.findContractMatch(
                        drugListTotalBenefits.config.inputFieldData
                    );
                else context.stripQueryParam();
            },
        });
    },
    // TAKE OUT grpcontract AND din FROM URL
    stripQueryParam: function () {
        var queryParam = window.location.search,
            grpContractBeyond = queryParam.split(
                drugListTotalBenefits.config.grpContractParamString
            )[1],
            dinBeyond = queryParam.split(
                drugListTotalBenefits.config.dinParamString
            )[1],
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
            matchData,
            response = drugListTotalBenefits.config.response;
        for (var policy in response) {
            if (!matchFound) {
                var policyList = response[policy];
                console.log(typeof response);
                for (var contract in policyList) {
                    if (Number(contract) === Number(contractNum)) {
                        matchData = policyList[contract];
                        policyType = policy;
                        matchFound = true;
                        break;
                    }
                }
            }
        }
        console.log(contractNum, matchData);
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
            matchData = "",
            response = drugListTotalBenefits.config.response;
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
        document.getElementById("loading-spinner").classList.add("no-display");
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
                window.location.origin +
                (drugListTotalBenefits.config.lang === "en"
                    ? item["form-en"]
                    : item["form-fr"]) +
                "'  ><span class=\"pdf-link\"></span></a></td>";
            HTML += "</tr>";
        });
        console.log(HTML);
        $("#drug-list").find("tbody").html(HTML);
        document.getElementById("loading-spinner").classList.add("no-display");
        document.getElementById("form-container").classList.add("no-display");
        document
            .getElementById("table-container")
            .classList.remove("no-display");
    },
};
(function () {
    drugListTotalBenefits.init();
})();