var loadType = '';

if(typeof(Turbolinks) !== undefined) {
  loadType = 'turbolinks:load';
} else {
  loadType = 'DOMContentLoaded';
}

function handleMouseEnter(element) {
  element.addEventListener('mouseenter', function(e) {
    tooltipTemplate(e.currentTarget);
  });
}

function handleMouseLeave(element) {
  element.addEventListener('mouseleave', function(e){
    document.querySelector(`.${e.currentTarget.className} .awesome-tooltip`).remove();
  });
}

function tooltipTemplate(element) {
  element.insertAdjacentHTML('beforeend', `
    <div class="awesome-tooltip top">
      <div class="awesome-tooltip-text">${element.dataset.awesomeTooltip}</div>
    </div>
  `);
}

document.addEventListener(loadType, function() {
  var tooltips = document.querySelectorAll('[data-awesome-tooltip]');

  tooltips.forEach(function(element) {
    element.classList.add('awesome-tooltip-wrapper');

    handleMouseEnter(element);
    handleMouseLeave(element);
  });

  console.log(AwesomeTooltip.styles);
});
