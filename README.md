# d3-side-by-side-maps
Demo illustrating how to generate two "synchonized" maps using d3.js

This demo app makes use of the following external resources loaded from a CDN:
* jQuery version 1.12.4
* D3 vesrion 3.5.17

<img src="img/d3-side-by-side-maps.png"/>

## Internals
First, see [d3-map-pan-zoom](https://github.com/bkrepp-ctps/d3-map-pan-zoom) for background on
how panning and zooming of a map are implemented using the d3.js library.

Synchronized panning and zooming of the two maps is implemented simply by
assigning the same zoom behavior to the SVG object for each of the two maps,
__svgContainer1__ and __svgContainer2__.
```
	function zoomFunction() {
	  d3.selectAll("path")
		.attr("transform",
			"translate(" + d3.event.translate
			+ ") scale (" + d3.event.scale + ")");
	}
	
	// Define Zoom Behavior
	var zoom = d3.behavior.zoom()
		.scaleExtent([0.2, 10]) 
		.on("zoom", zoomFunction);
		
	var svgContainer1 = d3.select("#map1").append("svg")
		.attr("width", width)
		.attr("height", height)
		.style("border", "2px solid steelblue")
		.call(zoom);

	var svgContainer2 = d3.select("#map2").append("svg")
		.attr("width", width)
		.attr("height", height)
		.style("border", "2px solid red")
		.call(zoom);
```
