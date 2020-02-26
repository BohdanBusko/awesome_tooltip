(function (W, D) {
  var loadType;
  var hideDelayTimerId = {};
  var showDelayTimerId = {};
  var config = {
    tooltipPath: "/tooltip/",
    hideDelay: 1500,
    location: "at-top"
  };

  if(typeof(Turbolinks) !== "undefined") {
    loadType = "turbolinks:load";
  } else {
    loadType = "DOMContentLoaded";
  }

  function handleMouseEnter(element) {
    element.addEventListener("mouseenter", function(e) {
      var element = e.currentTarget;
      var elementIndex = element.getAttribute('data-index');

      clearTimeout(hideDelayTimerId[elementIndex]);

      showDelayTimerId[elementIndex] = setTimeout(function() {
        if(element.getAttribute("data-template") && !element.querySelector(".awesome-tooltip")) {
          fetchData(element);
        }
      }, 500);
    });
  }

  function handleMouseLeave(element) {
    element.addEventListener("mouseleave", function(e){
      var element = e.currentTarget;
      var elementIndex = element.getAttribute('data-index');
      var tooltip = element.querySelector("." + element.className.split(" ").join(".") + " .awesome-tooltip");

      clearTimeout(showDelayTimerId[elementIndex]);

      hideDelayTimerId[elementIndex] = setTimeout(function() {
        if(tooltip) {
          tooltip.remove();
        }
      }, config.hideDelay);
    });
  }

  function tooltipPosition(element) {
    var tooltip         = element.querySelector(".awesome-tooltip");
    var tooltipTriangle = tooltip.querySelector(".content-wrapper .triangle");
    var elementRects    = element.getClientRects()[0];

    var tHeight = tooltip.offsetHeight;
    var tWidth  = tooltip.offsetWidth;
    var eWidth  = element.offsetWidth;

    var leftEnoughSpace   = tWidth / 2 + eWidth / 2 < elementRects.left;
    var rightEnoughSpace  = tWidth / 2  < D.body.offsetWidth - elementRects.right;
    var bottomEnoughSpace = tHeight < W.outerHeight - elementRects.bottom;
    var topEnoughSpace    = tHeight + tooltipTriangle.offsetHeight < elementRects.top;

    if(leftEnoughSpace && rightEnoughSpace && topEnoughSpace && bottomEnoughSpace) {
      tooltip.style.cssText = "left: " + ((elementRects.width / 2) - (tooltip.getClientRects()[0].width / 2)) + "px;";
      tooltipTriangle.style.cssText = "left: calc(50% - " + (tooltipTriangle.offsetWidth / 2) + "px);";
      return;
    }

    switch(element.getAttribute("data-location") || config.location) {
    case "at-top":
    case "at-bottom":
      if(!topEnoughSpace && leftEnoughSpace && rightEnoughSpace) {
        display(element, tooltipTriangle, "at-bottom");
        break;
      }

      if(!bottomEnoughSpace && leftEnoughSpace && rightEnoughSpace) {
        display(element, tooltipTriangle, "at-top");
        break;
      }

      if(!topEnoughSpace) {
        toggleLocation(tooltip, "at-bottom");
      } else if(!bottomEnoughSpace) {
        toggleLocation(tooltip, "at-top");
      }

      if(!leftEnoughSpace || !rightEnoughSpace) {
        if(W.innerWidth / 2 > elementRects.right) {
          tooltip.style.cssText = "left: -" + (elementRects.right - eWidth) + "px;";
          tooltipTriangle.style.cssText = "left: " + (elementRects.right - eWidth + tooltipTriangle.offsetWidth + tooltipTriangle.offsetWidth / 2) + "px;";
        } else {
          tooltip.style.cssText = "right: -" + (D.body.offsetWidth - elementRects.right) + "px;";
          tooltipTriangle.style.cssText = "right: " + (D.body.offsetWidth - elementRects.right + tooltipTriangle.offsetWidth + tooltipTriangle.offsetWidth / 2) + "px;";
        }
      }
    }
  }

  function display(element, tooltipTriangle, location) {
    var tooltip = element.querySelector(".awesome-tooltip");

    toggleLocation(tooltip, location);
    tooltip.style.cssText = "left: " + ((element.getClientRects()[0].width / 2) - (tooltip.getClientRects()[0].width / 2)) + "px;";
    tooltipTriangle.style.cssText = "left: calc(50% - " + (tooltipTriangle.offsetWidth / 2) + "px);";
  }

  function toggleLocation(element, location) {
    element.className = element.className.replace(/at-top|at-bottom|at-left|at-right/gi, "").trim();
    element.className += " " + location;
    element.className.trim();
  }

  function tooltipTemplate(element, text) {
    var elementLocation = element.getAttribute("data-location") || config.location;

    element.insertAdjacentHTML("beforeend",
      "<div class=\"awesome-tooltip " + elementLocation + "\">" +
        "<div class=\"content-wrapper\">" +
          "<div class=\"awesome-tooltip-text\">" + text + "</div>" +
          "<div class=\"triangle\">" +
        "</div>" +
      "</div>"
    );

    tooltipPosition(element);
  }

  function fetchData(element) {
    var url = W.location.origin;
    var object = element.getAttribute("data-object") || "";
    var tooltipPath = config.tooltipPath;

    var req = new XMLHttpRequest();
    req.open("GET", url + tooltipPath + element.getAttribute("data-template") + "/" + object);
    req.onload = function() {
      tooltipTemplate(element, req.response);
    }
    req.send();
  }

  D.addEventListener(loadType, function() {
    var tooltips = D.querySelectorAll(".awesome_tooltip");

    tooltips.forEach(function(element, index) {
      element.className += element.className.length < 1 ? "awesome-tooltip-wrapper" : " awesome-tooltip-wrapper";
      element.setAttribute('data-index', 'awesome-tooltip' + index);

      handleMouseEnter(element);
      handleMouseLeave(element);
    });
  });

  function mergeConfigs(obj1, obj2){
      var obj3 = {};
      for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
      for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
      return obj3;
  }

  W.AwesomeTooltip = function(conf) {
    config = mergeConfigs(config, conf);
  }
})(window, document)
