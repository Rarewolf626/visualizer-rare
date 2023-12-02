// ******* DATA LOADING *******
async function loadData() {
    const DEIDData = await d3.csv('data/DEID.csv');
    const CLNData = await d3.csv('data/CLN.csv');

    const parseTime = d3.timeParse("%m/%d/%Y %H:%M");
    for (let obj of DEIDData) {
        obj.Time = parseTime(obj.Time);
    }
    for (let obj of CLNData) {
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
    sweChart: null,
    metName: "Temperature",
    metAxis: "Temperature (deg C)",
    metVar: "Temp"
    // video: null
};

//******* APPLICATION MOUNTING *******
loadData().then((loadedData) => {
    console.log('Here is the DEID data:', loadedData.DEIDData);
    console.log('Here is the CLN data:', loadedData.CLNData);

    // Store the loaded data into the globalApplicationState
    globalApplicationState.DEIDData = loadedData.DEIDData;
    globalApplicationState.CLNData = loadedData.CLNData;

    // Creates the view objects with the global state passed in
    const densityHeightChart = new DensityHeightChart(globalApplicationState);
    const densityChart = new DensityChart(globalApplicationState);
    const accChart = new AccChart(globalApplicationState);
    const sweChart = new MetChart(globalApplicationState);

    globalApplicationState.densityHeightChart = densityHeightChart;
    globalApplicationState.densityChart = densityChart;
    globalApplicationState.accChart = accChart;
    globalApplicationState.sweChart = sweChart;
    // globalApplicationState.video = video;

    // Attach event listeners to the toggles
    document.getElementById("acc_data").onchange = changeAccData;
    document.getElementById("met_data").onchange = changeMetData;

    changeAccData();
    changeMetData();
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

/**
 * Update the data according to document settings
 */
function changeMetData() {
    //  Load the file indicated by the select menu
    const selection = d3.select('#met_data').property('value');
    globalApplicationState.metName = d3.select('#met_data option:checked').text();

    if (selection === "met_temp") {
        globalApplicationState.metVar = "Temp";
        globalApplicationState.metAxis = "Temperature (deg C)";
    } else if (selection === "met_depth") {
        globalApplicationState.metVar = "SnowDepth";
        globalApplicationState.metAxis = "Snow Depth (in)";
    } else if (selection === "met_int") {
        globalApplicationState.metVar = "SnowInterval";
        globalApplicationState.metAxis = "Accumulation (in)";
    } else {
        globalApplicationState.metVar = "PrecipAcc1HR";
        globalApplicationState.metAxis = "SWE Accumulation (in)";
    }
    // Clear svg
    let svg = d3.select("#met-chart");
    svg.selectAll("*").remove();

    globalApplicationState.metChart = new MetChart(globalApplicationState);
}