/**
 * Canvas 기반 가벼운 컨페티(축하 꽃가루 폭죽) 효과
 */

export function fireConfetti(options = {}) {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#F59E0B', '#EC4899', '#3B82F6', '#10B981', '#8B5CF6', '#F43F5E'];
  const particleCount = options.count || 80;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: options.x !== undefined ? options.x : canvas.width * 0.5,
      y: options.y !== undefined ? options.y : canvas.height * 0.4,
      w: Math.random() * 8 + 6,
      h: Math.random() * 8 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 16,
      vy: Math.random() * -14 - 4,
      rotation: Math.random() * 360,
      vRotation: (Math.random() - 0.5) * 12,
      gravity: 0.35,
      opacity: 1
    });
  }

  let animationFrameId;

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let aliveCount = 0;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.vRotation;
      p.opacity -= 0.012;

      if (p.opacity > 0) {
        aliveCount++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
    });

    if (aliveCount > 0) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrameId);
    }
  }

  render();
}
