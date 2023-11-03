// ******* DATA LOADING *******
// We took care of that for you
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
// This should be all you need, but feel free to add to this if you need to 
// communicate across the visualizations
const globalApplicationState = {
    DEIDData: null,
    CLNData: null,
    densityChart: null,
    sweChart: null,
    accChart: null,
    densityHeightChart: null
};


//******* APPLICATION MOUNTING *******
loadData().then((loadedData) => {
    console.log('Here is the DEID data:', loadedData.DEIDData);
    console.log('Here is the CLN data:', loadedData.CLNData);

    // Store the loaded data into the globalApplicationState
    globalApplicationState.DEIDData = loadedData.DEIDData;
    globalApplicationState.CLNData = loadedData.CLNData;

    // Creates the view objects with the global state passed in
    const densityChart = new DensityChart(globalApplicationState);
    const sweChart = new SweChart(globalApplicationState);
    const accChart = new AccChart(globalApplicationState);
    const densityHeightChart = new DensityHeightChart(globalApplicationState)
    // const cursor = new Cursor()

    globalApplicationState.densityChart = densityChart;
    globalApplicationState.sweChart = sweChart;
    globalApplicationState.accChart = accChart;
    globalApplicationState.densityHeightChart = densityHeightChart;

});
