const particles = document.querySelectorAll('canvas.particles');
const radius = 1.35;
const number = 200;

function createDot(dots) {
    return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: dots.velocity + Math.random() * 1.5,
        vy: dots.velocity + Math.random() * 1.5,
        radius: Math.random() * radius,
    };
}

function hexToRgbA(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r},${g},${b},1)`;
}

function updateDotPosition(dot, windowWidth, windowHeight) {
    if (dot.x < 0 || dot.x > windowWidth) {
        dot.vx = -dot.vx;
    } else if (dot.y < 0 || dot.y > windowHeight) {
        dot.vy = -dot.vy;
    }

    dot.x += dot.vx;
    dot.y += dot.vy;
}

function createDotsArray(dots) {
    return Array.from({ length: dots.num }, () => createDot(dots));
}

function createDots(ctx, dotsArray, color) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    dotsArray.forEach(dot => {
        updateDotPosition(dot, window.innerWidth, window.innerHeight);

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = hexToRgbA(color);
        ctx.fill();
    });

    requestAnimationFrame(() => createDots(ctx, dotsArray, color));
}

function resizeHandler() {
    particles.forEach(node => {
        node.width = window.innerWidth;
        node.height = window.innerHeight;
    });
}

// Инициализация при загрузке страницы
particles.forEach(node => {
    const color = node.dataset.color;
    const ctx = node.getContext('2d');
    const dots = {
        num: number,
        velocity: -0.5,
        array: createDotsArray({ num: number, velocity: -0.5 }),
    };

    node.width = window.innerWidth;
    node.height = window.innerHeight;

    createDots(ctx, dots.array, color);
});

// Обработчик события изменения размера окна
window.addEventListener('resize', resizeHandler);
