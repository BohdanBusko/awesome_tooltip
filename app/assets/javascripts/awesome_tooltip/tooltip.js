var loadType;
var timerId;

if(typeof(Turbolinks) !== undefined) {
  loadType = 'turbolinks:load';
} else {
  loadType = 'DOMContentLoaded';
}

function handleMouseEnter(element) {
  element.addEventListener('mouseenter', function(e) {
    clearTimeout(timerId);
    if(e.currentTarget.dataset.template && !e.currentTarget.querySelector('.awesome-tooltip'))
      fetchData(e.currentTarget);
  });
}

function handleMouseLeave(element) {
  element.addEventListener('mouseleave', function(e){
    var tooltip = e.currentTarget.querySelector(`.${e.currentTarget.className} .awesome-tooltip`);

    timerId = setTimeout(function() {
      if(tooltip)
        tooltip.remove();
    }, 1500);
  });
}

function tooltipPosition(element) {
  var tooltip         = element.querySelector('.awesome-tooltip');
  var tooltipTriangle = tooltip.querySelector('.content-wrapper .triangle');

  var leftEnoughSpace   = tooltip.offsetWidth / 2 < element.getBoundingClientRect().left;
  var rightEnoughSpace  = tooltip.offsetWidth / 2  < document.body.offsetWidth - element.getBoundingClientRect().right;
  var topEnoughSpace    = tooltip.offsetHeight < element.getBoundingClientRect().top;
  var bottomEnoughSpace = tooltip.offsetHeight < window.height - element.getBoundingClientRect().bottom;

  switch(element.dataset.location) {
  case 'top':
  case 'bottom':

    if(leftEnoughSpace && rightEnoughSpace && topEnoughSpace && bottomEnoughSpace) {
      tooltip.style.cssText = `left: ${(element.getBoundingClientRect().width / 2) - (tooltip.getBoundingClientRect().width / 2)}px;`;
      tooltipTriangle.style.cssText = `left: calc(50% - ${tooltipTriangle.offsetWidth / 2}px);`;
      break;
    }

    if(!topEnoughSpace && leftEnoughSpace && rightEnoughSpace) {
      display(tooltip, tooltipTriangle, 'bottom');
      break;
    }

    if(!bottomEnoughSpace && leftEnoughSpace && rightEnoughSpace) {
      display(tooltip, tooltipTriangle, 'top');
      break;
    }

    if(!topEnoughSpace) {
      tooltip.classList.remove('top', 'bottom');
      tooltip.classList.add('bottom');
    }

    if(!bottomEnoughSpace) {
      tooltip.classList.remove('top', 'bottom');
      tooltip.classList.add('top');
    }

    if(!leftEnoughSpace || !rightEnoughSpace) {
      if(window.width / 2 < element.getBoundingClientRect().right) {
        tooltip.style.cssText = `right: -${document.body.offsetWidth - element.getBoundingClientRect().left}px;`;
      } else {
        tooltip.style.cssText = `right: -${document.body.offsetWidth - element.getBoundingClientRect().right}px;`;
      }

      tooltipTriangle.style.cssText = `right: ${document.body.offsetWidth - element.getBoundingClientRect().right + tooltipTriangle.offsetWidth + tooltipTriangle.offsetWidth / 2}px;`;
    }
  }
}

displayTop() {

}

function display(tooltip, tooltipTriangle, location) {
  tooltip.classList.remove('top', 'bottom');
  tooltip.classList.add(location);
  tooltip.style.cssText = `left: ${(element.getBoundingClientRect().width / 2) - (tooltip.getBoundingClientRect().width / 2)}px;`;
  tooltipTriangle.style.cssText = `left: calc(50% - ${tooltipTriangle.offsetWidth / 2}px);`;
}

function tooltipTemplate(element, text) {
  var elementLocation = element.dataset.location;

  element.insertAdjacentHTML('beforeend', `
    <div class="awesome-tooltip ${elementLocation}">
      <div class="content-wrapper">
        <div class="awesome-tooltip-text">${text}</div>
        <div class="triangle">
      </div>
    </div>
  `);

  tooltipPosition(element);
}

async function fetchData(element) {
  var url = window.location.origin;
  var object = element.dataset.object ? element.dataset.object : null;

  await fetch(`${url}/tooltip/${element.dataset.template}/${object}`)
    .then(function(response) { return response.text() })
    .then(function(text) {
      tooltipTemplate(element, text);
    });
}

document.addEventListener(loadType, function() {
  var tooltips = document.querySelectorAll('[data-awesome-tooltip]');

  tooltips.forEach(function(element) {
    element.classList.add('awesome-tooltip-wrapper');

    handleMouseEnter(element);
    handleMouseLeave(element);
  });
});
