(function () {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function (schemaCallback) {
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

    // Download the data
    myConnector.getData = function (table, doneCallback) {
        $.getJSON("https://api.ap.org/v2/elections/2020-11-03?statepostal=WI&resultstype=t&level=ru&format=json&apikey=bAcPmpDWG3q7sxzFnD5QB6EvIpwIfmeT&officeID=P&raceTypeId=G", function (resp) {
            var feat = resp.features,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "statePostal": feat[i].statePostal
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "2020 Election Test Data!"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
