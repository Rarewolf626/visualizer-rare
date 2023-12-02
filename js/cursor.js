
class Cursor{
    constructor(chart) {
        console.log("cursor constructor called with chart = " + chart);
        const svg = d3.select(chart + '-chart .brush');

        // Create the text element for this specific 'deid-chart'
        const textElement = svg
            .append('text')
            .attr('class', 'cursor-text')
            .style('display', 'none')
            .text('Drag to Zoom');

        // Add event listeners specific to this 'deid-chart' instance
        svg.on('mousemove', onMouseMove);
        svg.on('mouseout', onMouseOut);

        function onMouseMove(event) {
            // Get the mouse coordinates
            const [x, y] = d3.pointer(event, svg.node()); // Pass the 'deid-chart' SVG node

            // Update the text position for this specific 'deid-chart' instance
            updatePosition(x + 10, y - 10);
        }

        function onMouseOut() {
            // Hide the text when the mouse leaves the specific 'deid-chart' container
            textElement.style('display', 'none');
        }

        function updatePosition(x, y) {
            // Update the text position and make it visible for this specific 'deid-chart' instance
            textElement.attr('x', x).attr('y', y).style('display', 'block');
        }
    }
    updateText(chart, text) {
        const svg = d3.select(chart + '-chart .brush');
        // Find the text element
        const textElement = svg.select('.cursor-text');

        // Change the text based on the graph update
        textElement.text(text); // Change this line to update with relevant information
    }
}