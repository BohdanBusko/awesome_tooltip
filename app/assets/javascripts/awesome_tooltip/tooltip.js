(function (W, D) {
  var loadType;
  var timerId;
  var config;

  if(typeof(Turbolinks) !== undefined) {
    loadType = 'turbolinks:load';
  } else {
    loadType = 'DOMContentLoaded';
  }

  function handleMouseEnter(element) {
    element.addEventListener('mouseenter', function(e) {
      clearTimeout(timerId);

      if(e.currentTarget.getAttribute('data-template') && !e.currentTarget.querySelector('.awesome-tooltip')) {
        fetchData(e.currentTarget);
      }
    });
  }

  function handleMouseLeave(element) {
    element.addEventListener('mouseleave', function(e){
      var tooltip = e.currentTarget.querySelector('.' + e.currentTarget.className + ' .awesome-tooltip');

      timerId = setTimeout(function() {
        if(tooltip)
          tooltip.remove();
      }, 1500);
    });
  }

  function tooltipPosition(element) {
    var tooltip         = element.querySelector('.awesome-tooltip');
    var tooltipTriangle = tooltip.querySelector('.content-wrapper .triangle');
    var elementRects    = element.getClientRects()[0];

    var leftEnoughSpace   = tooltip.offsetWidth / 2 < elementRects.left;
    var rightEnoughSpace  = tooltip.offsetWidth / 2  < D.body.offsetWidth - elementRects.right;
    var bottomEnoughSpace = tooltip.offsetHeight < W.height - elementRects.bottom;
    var topEnoughSpace    = tooltip.offsetHeight < elementRects.top;


    if(leftEnoughSpace && rightEnoughSpace && topEnoughSpace && bottomEnoughSpace) {
      tooltip.style.cssText = 'left: ' + ((elementRects.width / 2) - (tooltip.getClientRects()[0].width / 2)) + 'px;';
      tooltipTriangle.style.cssText = 'left: calc(50% - ' + (tooltipTriangle.offsetWidth / 2) + 'px);';
      return;
    }

    switch(element.getAttribute('data-location')) {
    case 'top':
    case 'bottom':
      if(!topEnoughSpace && leftEnoughSpace && rightEnoughSpace) {
        display(element, tooltipTriangle, 'bottom');
        break;
      }

      if(!bottomEnoughSpace && leftEnoughSpace && rightEnoughSpace) {
        display(element, tooltipTriangle, 'top');
        break;
      }

      if(!topEnoughSpace) {
        toggleLocation(tooltip, 'bottom');
      } else if(!bottomEnoughSpace) {
        toggleLocation(tooltip, 'top');
      }

      if(!leftEnoughSpace || !rightEnoughSpace) {
        if(W.innerWidth / 2 > elementRects.right) {
          tooltip.style.cssText = 'left: -' + (elementRects.right - elementRects.left) + 'px;';
          tooltipTriangle.style.cssText = 'left: ' + (elementRects.right - elementRects.left + tooltipTriangle.offsetWidth + tooltipTriangle.offsetWidth / 2) + 'px;';
        } else {
          tooltip.style.cssText = 'right: -' + (D.body.offsetWidth - elementRects.right) + 'px;';
          tooltipTriangle.style.cssText = 'right: ' + (D.body.offsetWidth - elementRects.right + tooltipTriangle.offsetWidth + tooltipTriangle.offsetWidth / 2) + 'px;';
        }
      }
    }
  }

  function display(element, tooltipTriangle, location) {
    var tooltip = element.querySelector('.awesome-tooltip');

    toggleLocation(element, location);
    tooltip.style.cssText = 'left: ' + ((elementRects.width / 2) - (tooltip.getClientRects()[0].width / 2)) + 'px;';
    tooltipTriangle.style.cssText = 'left: calc(50% - ' + (tooltipTriangle.offsetWidth / 2) + 'px);';
  }

  function toggleLocation(element, location) {
    element.className.replace(/top|bottom|left|right/gi, '').trim();
    element.className += ' ' + location;
    element.className.trim();
  }

  function tooltipTemplate(element, text) {
    var elementLocation = element.getAttribute('data-location');

    element.insertAdjacentHTML('beforeend',
      '<div class="awesome-tooltip ' + elementLocation + '">' +
        '<div class="content-wrapper">' +
          '<div class="awesome-tooltip-text">' + text + '</div>' +
          '<div class="triangle">' +
        '</div>' +
      '</div>'
    );

    tooltipPosition(element);
  }

  function fetchData(element) {
    var url = W.location.origin;
    var object = element.getAttribute('data-object') || '';
    var tooltipPath = config.tooltipPath || '/tooltip/';

    var req = new XMLHttpRequest();
    req.open('GET', url + tooltipPath + element.getAttribute('data-template') + '/' + object);
    req.onload = function() {
      tooltipTemplate(element, req.response);
    }
    req.send();
  }

  D.addEventListener(loadType, function() {
    var tooltips = D.querySelectorAll('[data-awesome-tooltip]');

    tooltips.forEach(function(element) {
      element.className += element.className.length < 1 ? 'awesome-tooltip-wrapper' : ' awesome-tooltip-wrapper';

      handleMouseEnter(element);
      handleMouseLeave(element);
    });
  });

  W.AwesomeTooltip = function(conf) {
    config = conf || {};
  }
})(window, document)
