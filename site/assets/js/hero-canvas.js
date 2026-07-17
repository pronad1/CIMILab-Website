/* ─── Hero Canvas: Hexagonal grid + particle animation ────── */
(function () {
  'use strict';

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let animId;
  const HEX_SIZE   = 42;
  const PARTICLES  = 40;
  const CONNECT_DIST = 130;

  let particles = [];
  let cols, rows;

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = canvas.offsetWidth  * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(canvas.offsetWidth  / (HEX_SIZE * 1.73)) + 2;
    rows = Math.ceil(canvas.offsetHeight / (HEX_SIZE * 1.5))  + 2;
  }

  function initParticles() {
    particles = Array.from({ length: PARTICLES }, function () {
      return {
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.5 + 0.5,
        color: Math.random() > 0.5 ? 'amber' : 'blue',
      };
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    // Hex grid
    for (var row = -1; row < rows; row++) {
      for (var col = -1; col < cols; col++) {
        var x = col * HEX_SIZE * 1.73 + (row % 2 === 0 ? 0 : HEX_SIZE * 0.865);
        var y = row * HEX_SIZE * 1.5;
        ctx.beginPath();
        for (var i = 0; i < 6; i++) {
          var angle = (Math.PI / 3) * i - Math.PI / 6;
          var px = x + HEX_SIZE * 0.42 * Math.cos(angle);
          var py = y + HEX_SIZE * 0.42 * Math.sin(angle);
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.055)';
        ctx.lineWidth = 0.75;
        ctx.stroke();
      }
    }

    // Update particles
    particles.forEach(function (p) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.offsetWidth)  p.vx *= -1;
      if (p.y < 0 || p.y > canvas.offsetHeight)  p.vy *= -1;
    });

    // Connection edges
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx   = particles[i].x - particles[j].x;
        var dy   = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          var alpha   = (1 - dist / CONNECT_DIST) * 0.18;
          var isAmber = particles[i].color === 'amber' && particles[j].color === 'amber';
          ctx.beginPath();
          ctx.strokeStyle = isAmber
            ? ('rgba(245, 158, 11, ' + alpha + ')')
            : ('rgba(59, 130, 246, ' + (alpha * 1.2) + ')');
          ctx.lineWidth = 0.7;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw dots
    particles.forEach(function (p) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color === 'amber'
        ? 'rgba(245, 158, 11, 0.7)'
        : 'rgba(59, 130, 246, 0.7)';
      ctx.fill();
    });

    animId = requestAnimationFrame(draw);
  }

  resize();
  initParticles();
  draw();

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      cancelAnimationFrame(animId);
      resize();
      initParticles();
      draw();
    }, 150);
  });
})();
