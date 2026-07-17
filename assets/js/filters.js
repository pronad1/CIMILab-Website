/* ─── Filter Tabs: project/publication category filtering ─── */
(function () {
  'use strict';

  // Generic filter system.
  // Tabs:    elements with [data-filter-tab] inside a [data-filter-group]
  // Items:   elements with [data-filter-item] and [data-filter-tags] (comma-separated)
  // Value "all" shows everything.

  function initFilterGroup(group) {
    var tabs  = group.querySelectorAll('[data-filter-tab]');
    var items = document.querySelectorAll('[data-filter-item]');

    if (!tabs.length || !items.length) return;

    function setActive(selectedTab) {
      var value = selectedTab.getAttribute('data-filter-tab');
      tabs.forEach(function (t) { t.classList.remove('active'); });
      selectedTab.classList.add('active');

      items.forEach(function (item) {
        if (value === 'all') {
          item.style.display = '';
          return;
        }
        var tags = (item.getAttribute('data-filter-tags') || '').split(',').map(function (t) { return t.trim(); });
        var match = tags.some(function (tag) { return tag === value; });
        item.style.display = match ? '' : 'none';
      });

      // Update visible count if a counter element exists
      var counter = document.getElementById('filter-count');
      if (counter) {
        var visible = Array.from(items).filter(function (el) { return el.style.display !== 'none'; }).length;
        counter.textContent = visible;
      }
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () { setActive(tab); });
    });

    // Activate first by default
    var defaultActive = group.querySelector('[data-filter-tab].active') || tabs[0];
    if (defaultActive) setActive(defaultActive);
  }

  document.querySelectorAll('[data-filter-group]').forEach(initFilterGroup);
})();
