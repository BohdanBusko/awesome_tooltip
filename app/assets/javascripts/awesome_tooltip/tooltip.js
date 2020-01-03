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
    }, 500);
  });
}

function tooltipTemplate(element, text) {
  element.insertAdjacentHTML('beforeend', `
    <div class="awesome-tooltip top">
      <div class="awesome-tooltip-text">${text}</div>
    </div>
  `);
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
