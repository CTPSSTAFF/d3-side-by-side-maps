
function initialize() {
	$('#showhide').click(function(e) {
		if (this.value === 'Show description') {
			$('#blurb').show();
			this.value = 'Hide description';
		} else {
			$('#blurb').hide();
			this.value = 'Show description';		
		}
	});
	d3.json("json/ctps_brmpo_towns.geo.json", (data) => { generateViz(data); });
} // initialize()

function generateViz(geoJsonData) {	
	var width  = 550, 
		height = 500;
		
	// Define Zoom Function Event Listener
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

	// SVG Viewport
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
	
	var projection = d3.geo.conicConformal()
		.parallels([41 + 43 / 60, 42 + 41 / 60])
	    .rotate([71 + 30 / 60, -41 ])
		.scale([30000]) // N.B. The scale and translation vector were determined empirically.
		.translate([100,1160]);
		
	var geoPath = d3.geo.path().projection(projection);
		
	// Create Boston Region MPO map #1 with SVG paths for individual towns,
	// symbolized by FOURCOLOR code.
	var mpoSVG1 = svgContainer1.selectAll("path")
		.data(geoJsonData.features)
		.enter()
		.append("path")
			.attr("id", function(d, i) { return d.properties.town_id; })
			.attr("d", function(d, i) { return geoPath(d); })
			.style("fill", function(d, i) {
							var palette = [ "#d7191c", "#fdae61", "#abd9e9", "#2c7bb6" ];
							var fc = d.properties.fourcolor;
							return (fc >= 1 && fc <= 4) ? palette[fc-1] : "#ffffff";
						})
			.append("title")
				.text(function(d, i) { return "Map #1: " + d.properties.town });
	
	// Create Boston Region MPO map #2 with SVG paths for individual towns,
	// symbolized by FOURCOLOR code using a different colour palette.	
	var mpoSVG2 = svgContainer2.selectAll("path")
		.data(geoJsonData.features)
		.enter()
		.append("path")
			.attr("id", function(d, i) { return d.properties.TOWN_ID; })
			.attr("d", function(d, i) { return geoPath(d); })
			.style("fill", function(d, i) {
							var palette = [ "#a6611a", "#dfc27d", "#80cdc1", "#018571" ];
							var fc = d.properties.fourcolor;
							return (fc >= 1 && fc <= 4) ? palette[fc-1] : "#ffffff";
						})
			.append("title")
				.text(function(d, i) { return "Map #2: " + d.properties.town });		
			
} // generateViz