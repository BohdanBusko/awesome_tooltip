var loadType = '';

if(typeof(Turbolinks) !== undefined) {
  loadType = 'turbolinks:load';
} else {
  loadType = 'DOMContentLoaded';
}

function handleMouseEnter(element) {
  element.addEventListener('mouseenter', function(e) {
    if(e.currentTarget.dataset.template)
      fetchData(e.currentTarget);
  });
}

function handleMouseLeave(element) {
  element.addEventListener('mouseleave', function(e){
    var tooltip = document.querySelector(`.${e.currentTarget.className} .awesome-tooltip`);

    if(tooltip)
      tooltip.remove();
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
  var url = window.location.href;
  var object = element.dataset.object ? element.dataset.object : null;

  await fetch(`${url}awesome_tooltip/tooltip/${element.dataset.template}/${object}`)
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
