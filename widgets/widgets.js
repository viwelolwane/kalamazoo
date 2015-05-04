mapwidget = function(){
    var map = new ol.Map({
    target: $('.map')[0],
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.transform([28.2786, -25.7556], 'EPSG:4326', 'EPSG:3857'),
        zoom: 18
    })
   });
}


histogramwidget = function(){
    var randomScalingFactor = function(){ return Math.round(Math.random()*1400)};

    var barChartData = {
        labels : ["January","February","March","April","May","June","July"],
        datasets : [
            {
                fillColor : "rgba(151,187,205,0.5)",
                strokeColor : "rgba(151,187,205,0.8)",
                highlightFill : "rgba(151,187,205,0.75)",
                highlightStroke : "rgba(151,187,205,1)",
                data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
            }
        ]
    }

    var ctx = $('#bar')[0].getContext("2d");
    myBar = new Chart(ctx).Bar(barChartData, {
        responsive : false
    });
}


graphwidget = function(){
    var seriesData = [ [] ];
    var random = new Rickshaw.Fixtures.RandomData(150);

    for (var i = 0; i < 150; i++) {
        random.addData(seriesData);
    }

    var palette = new Rickshaw.Color.Palette( { scheme: 'classic9' } );

    // instantiate our graph!

    alert($('#line').width());
    var graph = new Rickshaw.Graph( {
        element: $('.line')[0],
        renderer: 'line',
        height: $('#line').parent().attr("height"),
        width: $('#line').parent().attr("width"),
        stroke: true,
        preserve: true,
        series: [
            {
                color: '#6060c0',
                data: seriesData[0],
                name: 'Moscow'
            }
        ]
    } );

    graph.render();

    var ticksTreatment = 'glow';

    var xAxis = new Rickshaw.Graph.Axis.Time( {
        graph: graph,
        ticksTreatment: ticksTreatment,
        timeFixture: new Rickshaw.Fixtures.Time.Local()
    } );

    xAxis.render();

    var yAxis = new Rickshaw.Graph.Axis.Y( {
        graph: graph,
        tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
        ticksTreatment: ticksTreatment
    } );

    yAxis.render();

    setInterval( function() {
        random.removeData(seriesData);
        random.addData(seriesData);
        graph.update();

    }, 50 );
}