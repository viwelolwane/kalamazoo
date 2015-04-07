var widgets = [ 'map','bar', 'line', 'gauge' ];

var DemoGrid = {
  currentSize: 3,
  buildElements: function($gridContainer, items) {
    var item, i, temp;
    for (i = 0; i < 7; i++) {
      item = items[i];
      if(widgets[i]=="bar"){
        temp =  '<div><canvas id=' + widgets[i] + ' height="250">' + '</canvas></div>';
      } if(widgets[i]=="gauge"){
        temp = '<span id=' + widgets[i] + '></span>'
      } else {
        temp = '<div><div class=' + widgets[i] + '/>' + '</div>';
      }
      $item = $(
        '<li>' +
          '<div class="inner">' +
            '<!-- <div class="controls">' + 
              '<a href="#zoom1" class="resize" data-size="1">1x</a>' +
              '<a href="#zoom2" class="resize" data-size="2">2x</a>' +
              '<a href="#zoom3" class="resize" data-size="3">3x</a>' +
            '</div> --!>' +
            temp +
          '</div>' +
        '</li>'
      );
      $item.attr({
        'data-w': 3,
        'data-h': 2,
        'data-x': item.x,
        'data-y': item.y
      });
      $gridContainer.append($item);
    }
  },
  resize: function(size) {
    if (size) {
      this.currentSize = size;
    }
    $('#grid').gridList('resize', this.currentSize);
  },
  flashItems: function(items) {
    // Hack to flash changed items visually
    for (var i = 0; i < items.length; i++) {
      (function($element) {
        $element.addClass('changed')
        setTimeout(function() {
          $element.removeClass('changed');
        }, 0);
      })(items[i].$element);
    }
  },
  renderwidgets: function(){
    $(document).ready(function(){
      mapwidget();
      //histogramwidget();
      graphwidget();
      createGauge("gauge", "Flow");
      setInterval(updateGauges, 5000);
    });
  } 
};

$(window).resize(function() {
  DemoGrid.resize();
});

$(function() {
  DemoGrid.buildElements($('#grid'), fixtures.DEMO);
  DemoGrid.renderwidgets();

  $('#grid').gridList({
    rows: DemoGrid.currentSize,
    widthHeightRatio: 264 / 294,
    heightToFontSizeRatio: 0.25,
    onChange: function(changedItems) {
      DemoGrid.flashItems(changedItems);
    }
  });
  $('#grid li .resize').click(function(e) {
    e.preventDefault();
    var itemElement = $(e.currentTarget).closest('li'),
        itemSize = $(e.currentTarget).data('size');
    $('#grid').gridList('resizeItem', itemElement, itemSize);   
  });
  $('.add-row').click(function(e) {
    e.preventDefault();
    DemoGrid.resize(DemoGrid.currentSize + 1);
  });
  $('.remove-row').click(function(e) {
    e.preventDefault();
    DemoGrid.resize(Math.max(1, DemoGrid.currentSize - 1));
  });
});
