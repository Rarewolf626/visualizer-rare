// ******* DATA LOADING *******
async function loadData() {
    const DEIDData = await d3.csv('data/DEID.csv');
    const CLNData = await d3.csv('data/CLN.csv');

    const parseTime = d3.timeParse("%m/%d/%Y %H:%M");
    for (let obj of DEIDData) {
        obj.Time = parseTime(obj.Time);
    }
    return {DEIDData, CLNData};
}

// ******* STATE MANAGEMENT *******
const globalApplicationState = {
    DEIDData: null,
    CLNData: null,
    densityHeightChart: null,
    densityChart: null,
    accVar: "SnowAcc",
    rateVar: "SnowAccRate",
    accChart: null,
    sweChart: null
};

//******* APPLICATION MOUNTING *******
loadData().then((loadedData) => {
    console.log('Here is the DEID data:', loadedData.DEIDData);
    console.log('Here is the CLN data:', loadedData.CLNData);

    // Store the loaded data into the globalApplicationState
    globalApplicationState.DEIDData = loadedData.DEIDData;
    globalApplicationState.CLNData = loadedData.CLNData;

    // Creates the view objects with the global state passed in
    const densityHeightChart = new DensityHeightChart(globalApplicationState)
    const densityChart = new DensityChart(globalApplicationState);
    const accChart = new AccChart(globalApplicationState);
    const sweChart = new SweChart(globalApplicationState);
    // const cursor = new Cursor()

    globalApplicationState.densityHeightChart = densityHeightChart;
    globalApplicationState.densityChart = densityChart;
    globalApplicationState.accChart = accChart;
    globalApplicationState.sweChart = sweChart;

    // Attach event listeners to the toggles
    document.getElementById("acc_data").onchange = changeAccData;
    // document.getElementById("met_data").onchange = changeMetData;

    changeAccData();
    // changeMetData();
});

/**
 * Update the data according to document settings
 */
function changeAccData() {
    //  Load the file indicated by the select menu
    const selection = d3.select('#acc_data').property('value');

    if (selection === "acc_snow") {
        globalApplicationState.accVar = "SnowAcc";
        globalApplicationState.rateVar = "SnowAccRate";
    } else {
        globalApplicationState.accVar = "SWE";
        globalApplicationState.rateVar = "SWEAccRate";
    }
    // Clear svg
    let svg = d3.select("#acc-chart");
    svg.selectAll("*").remove();

    globalApplicationState.accChart = new AccChart(globalApplicationState);
}