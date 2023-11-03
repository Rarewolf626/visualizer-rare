/** Class representing the line chart view. */
class DensityHeightChart {
    /**
     * Creates an AccChart
     * @param globalApplicationState The shared global application state (has the data and map instance in it)
     */
    constructor(globalApplicationState) {
        this.globalApplicationState = globalApplicationState;
        const data = globalApplicationState.DEIDData

        const margin = {top: 70, right: 70, bottom: 70, left: 70},
            width = 700 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        const svg = d3.select("#dh-chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`)

        const title = svg.append("text")
            .attr("x", 315) // Adjust the x-coordinate to center the title as needed
            .attr("y", -20) // Adjust the y-coordinate to position the title vertically
            .attr("text-anchor", "middle") // Center the text horizontally
            .attr("font-size", "24px") // Adjust the font size as needed
            .text("Vertical Density Profile"); // Replace with your desired title text

        // Create x-axis label
        svg.append("text")
            .attr("x", 315) // Adjust the x-coordinate to center the label as needed
            .attr("y", 410) // Adjust the y-coordinate to position the label vertically
            .attr("text-anchor", "middle") // Center the text horizontally
            .attr("font-size", "14px") // Adjust the font size as needed
            .text("Density (kg/m^3)"); // Replace with your x-axis label text

        // Create y-axis label
        svg.append("text")
            .attr("transform", "rotate(90)") // Rotate the label to be vertical
            .attr("x", 180) // Adjust the x-coordinate to center the label as needed
            .attr("y", -600) // Adjust the y-coordinate to position the label vertically
            .attr("text-anchor", "middle") // Center the text horizontally
            .attr("font-size", "14px") // Adjust the font size as needed
            .text("Height (in)"); // Replace with your y-axis label text

        // Add X axis --> it is a date format
        const x = d3.scaleLinear()
            .domain(d3.extent(data, d => d.Density))
            .range([width, 0]);
        const xAxis = svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        // Add Y axis
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => +d.SnowAcc)])
            .range([height, 0]);
        const yAxis = svg.append("g")
            .attr('transform', 'translate(' + width + ', 0)') // Move it to the right side
            .call(d3.axisRight(y));

        // Add a clipPath: everything out of this area won't be drawn.
        const clip = svg.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", width)
            .attr("height", height)
            .attr("x", 0)
            .attr("y", 0);

        // Add brushing
        const brush = d3.brushY()                   // Add the brush feature using the d3.brush function
            .extent([[0, 0], [width, height]])  // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
            .on("end", updateChart)               // Each time the brush selection changes, trigger the 'updateChart' function

        // Create the area variable: where both the area and the brush take place
        const area = svg.append('g')
            .attr("clip-path", "url(#clip)")

        // Create an area generator
        const areaGenerator = d3.area()
            .x0(x(0))
            .x1(d => x(d.Density))
            .y(d => y(d.SnowAcc))

        // Add the area
        area.append("path")
            .datum(data)
            .attr("class", "myArea")  // I add the class myArea to be able to modify it later on.
            .attr("fill", "#69b3a2")
            .attr("fill-opacity", .3)
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("d", areaGenerator)

        // Add the brushing
        area
            .append("g")
            .attr("class", "brush")
            .call(brush);

        // A function that set idleTimeOut to null
        let idleTimeout

        function idled() {
            idleTimeout = null;
        }

        // A function that update the chart for given boundaries
        function updateChart(event) {
            // What are the selected boundaries?
            const extent = event.selection

            // If no selection, back to initial coordinate. Otherwise, update X axis domain
            if (!extent) {
                if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
                y.domain([4, 8])
            } else {
                y.domain([y.invert(extent[1]), y.invert(extent[0])])
                area.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
            }

            // Update axis and area position
            yAxis.transition().duration(1000).call(d3.axisRight(y))
            area
                .select('.myArea')
                .transition()
                .duration(1000)
                .attr("d", areaGenerator)
        }

        // If user double click, reinitialize the chart
        svg.on("dblclick", function () {
            y.domain(d3.extent(data, d => +d.SnowAcc))
            yAxis.transition().call(d3.axisRight(y))
            area
                .select('.myArea')
                .transition()
                .attr("d", areaGenerator)
        });
    }
}
