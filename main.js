// Reference: http://www.html5rocks.com/en/tutorials/speed/animations/

let last_known_scroll_position = 0;
let ticking = false;

function sp(el) {
  const attr = JSON.parse(el.getAttribute('data-parallax'));
  console.log(attr);
  window.addEventListener('scroll', function (e) {
    last_known_scroll_position = window.scrollY;
    // console.log(last_known_scroll_position);

    if (!ticking) {
      window.requestAnimationFrame(function () {
        console.log(last_known_scroll_position);
        let imgPos = last_known_scroll_position / attr.smoothness + "px";
        el.style.transform = 'translateY(' + imgPos + ')';
        ticking = false;
      });

      ticking = true;
    }
  });

}

function simpleParallax(intensity, element) {
  $(window).scroll(function (scroll_pos) {
    console.log(scroll_pos);
    let scrollTop = $(window).scrollTop();
    let imgPos = scrollTop / intensity + "px";
    element.css("transform", "translateY(" + imgPos + ")");
  });

}

document.addEventListener('DOMContentLoaded', function () {
  console.log('ready');
  // simpleParallax(2, $('#d1'));
  // simpleParallax(3, $('#d2'));
  let parEls = document.querySelectorAll('[data-parallax]');
  console.log(parEls);
  parEls.forEach(sp);
});
