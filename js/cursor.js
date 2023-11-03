
class Cursor{
    constructor() {
        const svg = d3.selectAll('.deid-chart');

        // Create the text element initially
        const textElement = svg
            .append('text')
            .attr('class', 'cursor-background cursor-text')
            .style('display', 'none')
            .text('Drag to Zoom');

        // Add event listeners
        svg.on('mousemove', onMouseMove);
        svg.on('mouseout', onMouseOut);

        function onMouseMove(event) {
            // Get the mouse coordinates
            const [x, y] = d3.pointer(event);

            // Update the text position
            updateText(x+10, y-10);
        }

        function onMouseOut() {
            // Hide the text when the mouse leaves the SVG container
            textElement.style('display', 'none');
        }

        function updateText(x, y) {
            // Update the text position and make it visible
            textElement.attr('x', x).attr('y', y).style('display', 'block');
        }
    }
}