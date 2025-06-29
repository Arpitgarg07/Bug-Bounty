// login-particles.js - Dynamic particle background for login page
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
let particles = [];
const numParticles = 100;
let mouse = { x: 0, y: 0 };
const PARTICLE_COLOR = '0,0,0'; // black

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 1,
    alpha: 0,
    targetAlpha: Math.random() * 0.6 + 0.1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
    magnetism: 0.1 + Math.random() * 4,
    tx: 0,
    ty: 0
  };
}
function initParticles() {
  particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push(createParticle());
  }
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    const xFromCenter = mouse.x - canvas.width / 2;
    const yFromCenter = mouse.y - canvas.height / 2;
    p.tx += (xFromCenter / (50 / p.magnetism) - p.tx) / 50;
    p.ty += (yFromCenter / (50 / p.magnetism) - p.ty) / 50;
    p.x += p.dx;
    p.y += p.dy;
    p.alpha += 0.02;
    if (p.alpha > p.targetAlpha) p.alpha = p.targetAlpha;
    ctx.save();
    ctx.translate(p.tx, p.ty);
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${PARTICLE_COLOR},${p.alpha})`;
    ctx.fill();
    ctx.restore();
    if (
      p.x < -p.size ||
      p.x > canvas.width + p.size ||
      p.y < -p.size ||
      p.y > canvas.height + p.size
    ) {
      particles[i] = createParticle();
    }
  }
  requestAnimationFrame(animate);
}
resizeCanvas();
initParticles();
animate();
