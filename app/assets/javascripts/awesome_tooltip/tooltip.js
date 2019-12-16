var loadType = '';

if(typeof(Turbolinks) !== undefined) {
  loadType = 'turbolinks:load';
} else {
  loadType = 'DOMContentLoaded';
}

function handleMouseEnter(element) {
  element.addEventListener('mouseenter', function(e) {
    fetchData(e.currentTarget);
  });
}

function handleMouseLeave(element) {
  element.addEventListener('mouseleave', function(e){
    document.querySelector(`.${e.currentTarget.className} .awesome-tooltip`).remove();
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
  await fetch('http://localhost:3001/awesome_tooltip/hello_world')
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
