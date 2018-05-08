$(document).ready(function(){

  var width = 960,
      height = 1160;

  var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

  d3.json("/static/sf_boundary.json", function(error, sf) {
    if (error) return console.error(error);

    var projection = d3.geo.mercator()
                           .scale(1)
                           .translate([0, 0])
                           .precision(0);

    var path = d3.geo.path()
                     .projection(projection);

    var bounds = path.bounds(sf);

    console.log(bounds);

    xScale = width / Math.abs(bounds[1][0] - bounds[0][0]);
    yScale = height / Math.abs(bounds[1][1] - bounds[0][1]);

    scale = xScale < yScale ? xScale : yScale;
    //
    // console.log(scale);
    //
    var transl = [(width - scale * (bounds[1][0] + bounds[0][0])) / 2, (height - scale * (bounds[1][1] + bounds[0][1])) / 2];
    //
    // console.log(transl);

    projection.scale(scale)
              .translate(transl)

    svg.selectAll("path")
        .data(sf.features)
        .enter()
        .append("path")
        .attr("d", path)

  });

    // var features = sf.features
    //
    // var projection = d3.geo.mercator()
    //   .scale(500)
    //   .translate([width / 2, height / 2]);
    //
    // var path = d3.geo.path()
    //   .projection(projection);
    //
    // svg.append("path")
    //   .datum(features)
    //   .attr("d", path);

    // var projection = d3.geo.mercator();
    // var path = d3.geo.path().projection(projection);
    // var bounds = path.bounds(sf.features)
    //
    // // svg.selectAll("path")
    // //   .data(sf.features)
    // //   .enter()
    // //   .append("path")
    // //   .attr("d", path)
    //
    // svg.append("path")
    //       .datum({type: "FeatureCollection", features: sf.features})
    //       .attr("d", d3.geo.path().projection(d3.geo.mercator()));


  // var svg = d3.select("body")
  //         .append("svg")
  //         .attr("width", 960)
  //         .attr("height", 500)
  //
  // function circleTransition() {
  //
  //     var timeCircle = svg.append("circle")
  //         .attr("fill", "steelblue")
  //         .attr("r", 20);
  //
  //     repeat();
  //
  //     function repeat() {
  //       timeCircle
  //         .attr('cx', 200)      // position the circle at 40 on the x axis
  //         .attr('cy', 250)     // position the circle at 250 on the y axis
  //         .transition()        // apply a transition
  //         .duration(2000)      // apply it over 2000 milliseconds
  //         .ease(d3.easeBounce)
  //         .attr('cx', 800)     // move the circle to 920 on the x axis
  //         .style("fill", "red")
  //         .attr("r", function() { return Math.abs(Math.random()) * 50; })
  //         .transition()        // apply a transition
  //         .duration(2000)      // apply it over 2000 milliseconds
  //         .ease(d3.easeElastic)
  //         .attr('cx', 200)      // return the circle to 40 on the x axis
  //         .style("fill", "steelblue")
  //         .attr("r", function() { return Math.abs(Math.random()) * 50; })
  //         .on("end", repeat);  // when the transition finishes start again
  //     };
  //
  // };
  //
  // circleTransition();

});
