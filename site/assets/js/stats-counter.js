/* ─── Stats Counter: IntersectionObserver animated counters ─ */
(function () {
  'use strict';

  function animateCounter(el, target, suffix, duration) {
    duration = duration || 1800;
    var start = performance.now();
    function tick(now) {
      var elapsed  = now - start;
      var progress = Math.min(elapsed / duration, 1);
      // Ease-out quart
      var eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  var counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el     = entry.target;
        var target = parseInt(el.getAttribute('data-counter'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        animateCounter(el, target, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(function (el) { observer.observe(el); });
})();
