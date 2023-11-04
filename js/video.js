class Video {
    /**
     * Creates an AccChart
     * @param globalApplicationState The shared global application state (has the data and map instance in it)
     */
    constructor(globalApplicationState) {
        const svg = d3.select('#video')
            .append('svg');
            // .attr('width', width)
            // .attr('height', height);

// Append a foreignObject element to the SVG
        const foreignObject = svg.append('foreignObject')
            .attr('x', 10) // Adjust the X and Y positions as needed
            .attr('y', 10)
            .attr('width', 320) // Adjust the width and height as needed
            .attr('height', 240);

// Append the video element to the foreignObject
        foreignObject.append('xhtml:video')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('controls', 'true')
            .append('xhtml:source')
            .attr('src', 'data/DEID-Video.MP4')
            .attr('type', 'video/mp4');

    }
}