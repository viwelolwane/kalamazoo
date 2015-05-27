function scripts_load(scripts, base) {
  for (var i=0; i < scripts.length; i++) {
    document.write('<script src="'+ base + scripts[i]+'"><\/script>')
  };
};

scripts_load([
  "d3.js",
  "rickshaw.js",
  "jquery.min.js",
  "jquery-ui.min.js"
], "lib/");

scripts_load([
  "fixtures.js"
], "spec/");

scripts_load([
  "gridList.js",
  "jquery.gridList.js"
], "src/");

scripts_load([
  "ol.js",
  "Chart.js",
], "lib/");

scripts_load([  
  "load.js"
], "demo/");

scripts_load([  
  "widgets.js",
  "d3charts.js"
], "widgets/");
