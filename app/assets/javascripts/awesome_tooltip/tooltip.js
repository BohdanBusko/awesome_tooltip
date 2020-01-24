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

  var tooltip         = element.querySelector('.awesome-tooltip');
  var tooltipTriangle = tooltip.querySelector('.content-wrapper .triangle');

  switch(elementLocation) {
  case 'top':
  case 'bottom':
    var leftEnoughSpace   = tooltip.offsetWidth / 2 < element.getBoundingClientRect().right;
    var rightEnoughSpace  = tooltip.offsetWidth < document.body.offsetWidth - element.getBoundingClientRect().left;
    var topEnoughSpace    = tooltip.offsetHeight < element.getBoundingClientRect().top - 10;
    var bottomEnoughSpace = tooltip.offsetHeight < window.outerHeight - element.getBoundingClientRect().bottom + 10;

    if(leftEnoughSpace && rightEnoughSpace && topEnoughSpace && bottomEnoughSpace) {
      tooltip.style.cssText = `left: ${(element.getBoundingClientRect().width / 2) - (tooltip.getBoundingClientRect().width / 2)}px;`;
      tooltipTriangle.style.cssText = `left: calc(50% - ${tooltipTriangle.offsetWidth / 2}px);`;
      break;
    }

    if(!topEnoughSpace && leftEnoughSpace && rightEnoughSpace) {
      tooltip.classList.remove('top', 'bottom');
      tooltip.classList.add('bottom');
      tooltip.style.cssText = `left: ${(element.getBoundingClientRect().width / 2) - (tooltip.getBoundingClientRect().width / 2)}px;`;
      tooltipTriangle.style.cssText = `left: calc(50% - ${tooltipTriangle.offsetWidth / 2}px);`;
    }

    if(!bottomEnoughSpace && leftEnoughSpace && rightEnoughSpace) {
      tooltip.classList.remove('top', 'bottom');
      tooltip.classList.add('top');
      tooltip.style.cssText = `left: ${(element.getBoundingClientRect().width / 2) - (tooltip.getBoundingClientRect().width / 2)}px;`;
      tooltipTriangle.style.cssText = `left: calc(50% - ${tooltipTriangle.offsetWidth / 2}px);`;
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
      if(document.body.offsetWidth / 2 < element.getBoundingClientRect().left) {
        tooltip.style.cssText = `right: -${document.body.offsetWidth - element.getBoundingClientRect().right}px;`;
        tooltipTriangle.style.cssText = `right: ${document.body.offsetWidth - element.getBoundingClientRect().right + tooltipTriangle.offsetWidth + tooltipTriangle.offsetWidth / 2}px;`;
      } else {
        tooltip.style.cssText = `right: -${tooltip.offsetWidth - element.getBoundingClientRect().right}px;`;
        tooltipTriangle.style.cssText = `right: ${tooltip.offsetWidth - element.getBoundingClientRect().right + tooltipTriangle.offsetWidth + tooltipTriangle.offsetWidth / 2}px;`;
      }
    }
  }
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
