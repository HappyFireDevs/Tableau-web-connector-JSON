(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {

        tableau.log("Hello Alexander from WDC!");
        var cols = [{
            id: "statePostal",
            alias: "State Postal",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "statePostal",
            alias: "This is my alias...",
            columns: cols
        };

        schemaCallback([tableSchema]);

    };

    myConnector.getData = function (table, doneCallback) {
        $.getJSON("https://api.ap.org/v2/elections/2020-11-03?statepostal=WI&resultstype=t&level=ru&format=json&apikey=bAcPmpDWG3q7sxzFnD5QB6EvIpwIfmeT&officeID=P&raceTypeId=G", function (resp) {
            var feat = resp.features,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "statePostal": feat[i].statePostal,
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);
})();

$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "2020 Election Test Data!";
        tableau.submit();
    });
});