var canvas = document.getElementById('cv');
var ctx = canvas.getContext('2d');
var height = 0;
var width = 0;
var stars=[];
var sparkles=[];
var dustClouds=[];
var galaxyPoints=[];

function randomBetween(min, max) {
    return min + Math.random() * (max - min);
}

function randomInt(min, max) {
    return Math.floor(randomBetween(min, max));
}
function setupCanvas() {
    width = window.innerWidth;
    canvas.width = width;
    height = window.innerHeight;
    canvas.height = height;

    buildStars();
    buildGalaxy();
    buildSparkles();
    buildDustClouds();
}
function buildStars() {
    stars = [];
  var count = Math.floor((width * height) / 900);

    for (var i = 0; i < count; i++) {
    var t = Math.random();
    var color;

    if (t < 0.06) {
    color = [180, 140, 255];
    } else if (t < 0.12) {
    color = [140, 200, 255];
    } else if (t < 0.16) {
    color = [255, 220, 180];
    } else {
    color = [255, 255, 255];
    }

    stars.push({
    x: randomBetween(0, width),
    y: randomBetween(0, height),
    radius: randomBetween(0.15, t < 0.05 ? 2.2 : 1.1),
    alpha: randomBetween(0.4, 1),
      phase: randomBetween(0, Math.PI * 2),
    speed: randomBetween(0.008, 0.025),
    color: color
    });
    }
}
function buildGalaxy() {
    galaxyPoints = [];

  var centerX = width * 0.52;
  var centerY = height * 0.5;
    var arms = 4;
    var pointsPerArm = 2200;
  var maxRadius = Math.min(width, height) * 0.42;

    var armColors = [
    [180, 120, 255],
    [100, 160, 255],
    [220, 180, 255],
    [140, 220, 255]
    ];

    for (var arm = 0; arm < arms; arm++) {
    var armOffset = (Math.PI * 2.1 / arms) * arm;
    var armColor = armColors[arm % armColors.length];

    for (var i = 0; i < pointsPerArm; i++) {
    var t = i / pointsPerArm;
      var radius = Math.pow(t, 0.8) * maxRadius;
      var angle = t * Math.PI * 5 + armOffset + randomBetween(-0.18, 0.182);
      var spread = maxRadius * 0.045 * (0.3 + t * 1.41);
    var px = centerX + radius * Math.cos(angle) + randomBetween(-1, 1) * spread;
      var py = centerY + radius * Math.sin(angle) * 0.38 + randomBetween(-1, 1) * spread * 0.35;

    var brightness = Math.pow(1 - t, 0.4);
    var roll = Math.random();
    var color;

    if (roll < 0.25) {
        color = [255, 255, 255];
    } else if (roll < 0.55) {
        color = armColor;
    } else if (roll < 0.75) {
        color = [200, 160, 255];
    } else {
        color = [160, 210, 255];
    }
    galaxyPoints.push({
        x: px,
        y: py,
        radius: randomBetween(0.2, t < 0.15 ? 1.8 : 0.9),
        alpha: brightness * randomBetween(0.45, 1),
        color: color,
        angle: angle,
        dist: radius,
        centerX: centerX,
        centerY: centerY,
        orbitSpeed: (0.00006 + randomBetween(0, 0.00004)) * (arm % 2 === 0 ? 1 : -1)
    });
    }
}

for (var j = 0; j < 600; j++) 
    {
    var a = randomBetween(0, Math.PI * 2);
    var r = randomBetween(0, maxRadius * 0.07);

    galaxyPoints.push({
      x: centerX + r * Math.cos(a),
      y: centerY + r * Math.sin(a) * 0.38,
    radius: randomBetween(0.5, 2.2),
    alpha: randomBetween(0.7, 1),
    color: [255, 252, 240],
    dist: r,
    centerX: centerX,
    centerY: centerY,
    orbitSpeed: 0,
    angle: a
    });
    }
}

function buildSparkles() {
    sparkles = [];
    for (var i = 0; i < 220; i++) {
    spawnSparkle(randomBetween(0, width), randomBetween(0, height), randomBetween(0.3, 1.2));
    }
}

function spawnSparkle(x, y, life) {
    var colors = [
    [220, 180, 255],
    [180, 220, 255],
    [255, 255, 200],
    [255, 180, 255],
    [160, 240, 255]
    ];

    sparkles.push({
    x: x,
    y: y,
    life: life,
    maxLife: life,
    radius: randomBetween(0.8, 2.2),
    vx: randomBetween(-0.25, 0.25),
    vy: randomBetween(-0.25, 0.25),
    color: colors[randomInt(0, colors.length)],
    phase: randomBetween(0, Math.PI * 2),
    spin: randomBetween(-0.08, 0.08)
    });
}

function buildDustClouds() {
    dustClouds = [];

    var configs = [
    { x: 0.18, y: 0.32, rx: 0.28, ry: 0.14, alpha: 0.055, color: [80, 40, 160] },
    { x: 0.52, y: 0.5,  rx: 0.38, ry: 0.22, alpha: 0.04,  color: [40, 20, 120] },
    { x: 0.78, y: 0.62, rx: 0.26, ry: 0.16, alpha: 0.05,  color: [60, 30, 140] },
    { x: 0.35, y: 0.72, rx: 0.2,  ry: 0.12, alpha: 0.045, color: [100, 50, 180] },
    { x: 0.88, y: 0.22, rx: 0.18, ry: 0.11, alpha: 0.05,  color: [80, 60, 170] },
    { x: 0.1,  y: 0.7,  rx: 0.15, ry: 0.1,  alpha: 0.04,  color: [50, 30, 130] },
    { x: 0.65, y: 0.18, rx: 0.22, ry: 0.12, alpha: 0.038, color: [90, 45, 170] }
    ];

    for (var i = 0; i < configs.length; i++) {
    var c = configs[i];
    dustClouds.push({
      x: width * c.x,
      y: height * c.y,
      rx: width * c.rx,
      ry: height * c.ry,
    alpha: c.alpha,
    color: c.color,
      phase: randomBetween(0, Math.PI * 2),
    drift: randomBetween(-0.0003, 0.0003)
    });
    }
}

function drawBackground() {
    var gradient = ctx.createRadialGradient(
    width * 0.52, height * 0.5, 0,
    width * 0.52, height * 0.5, Math.max(width, height) * 0.72
    );
    gradient.addColorStop(0, "#0b0720");
    gradient.addColorStop(0.3, "#07041a");
    gradient.addColorStop(0.65, "#040210");
    gradient.addColorStop(1, "#020108");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
}

function drawNebulae(time) {
    for (var i = 0; i < dustClouds.length; i++) {
    var c = dustClouds[i];
    var pulse = 0.85 + 0.15 * Math.sin(time * 0.0008 + c.phase);
    var rx = c.rx * pulse;
    var ry = c.ry * pulse;
    var r = Math.max(rx, ry);

    var gradient = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, r);
    var cr = c.color[0];
    var cg = c.color[1];
    var cb = c.color[2];

    gradient.addColorStop(0, "rgba(" + cr + "," + cg + "," + cb + "," + (c.alpha * 1.4) + ")");
    gradient.addColorStop(0.35, "rgba(" + cr + "," + cg + "," + cb + "," + (c.alpha * 0.9) + ")");
    gradient.addColorStop(0.7, "rgba(" + Math.floor(cr * 0.6) + "," + Math.floor(cg * 0.5) + "," + Math.floor(cb * 0.8) + "," + (c.alpha * 0.4) + ")");
    gradient.addColorStop(1, "rgba(0,0,0,0)");

    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.scale(rx / r, ry / r);
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.restore();

    c.x += c.drift * width;
    if (c.x < -c.rx) c.x = width + c.rx;
    if (c.x > width + c.rx) c.x = -c.rx;
    }
}

function drawGalaxyHalo() {
  var centerX = width * 0.52;
  var centerY = height * 0.5;
  var maxRadius = Math.min(width, height) * 0.42;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.scale(1, 0.38);

  var halo = ctx.createRadialGradient(0, 0, 0, 0, 0, maxRadius * 1.1);
    halo.addColorStop(0, "rgba(255,250,220,0.55)");
    halo.addColorStop(0.04, "rgba(255,240,200,0.35)");
    halo.addColorStop(0.12, "rgba(180,130,255,0.2)");
    halo.addColorStop(0.28, "rgba(100,80,200,0.12)");
    halo.addColorStop(0.55, "rgba(60,40,150,0.07)");
    halo.addColorStop(0.8, "rgba(30,20,80,0.04)");
    halo.addColorStop(1, "rgba(0,0,0,0)");

    ctx.beginPath();
  ctx.arc(0, 0, maxRadius * 1.1, 0, Math.PI * 2);
    ctx.fillStyle = halo;
    ctx.fill();
    ctx.restore();

  var outer = ctx.createRadialGradient(centerX, centerY, maxRadius * 0.05, centerX, centerY, maxRadius * 1.3);
    outer.addColorStop(0, "rgba(120,80,255,0.04)");
    outer.addColorStop(0.4, "rgba(80,50,180,0.025)");
    outer.addColorStop(1, "rgba(0,0,0,0)");

    ctx.beginPath();
  ctx.arc(centerX, centerY, maxRadius * 1.3, 0, Math.PI * 2);
    ctx.fillStyle = outer;
    ctx.fill();
}

function drawGalaxyParticles() {
    for (var i = 0; i < galaxyPoints.length; i++) {
    var p = galaxyPoints[i];

    if (p.orbitSpeed !== 0) {
    p.angle += p.orbitSpeed;
      p.x = p.centerX + p.dist * Math.cos(p.angle);
      p.y = p.centerY + p.dist * Math.sin(p.angle) * 0.38;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(" + p.color[0] + "," + p.color[1] + "," + p.color[2] + "," + p.alpha + ")";
    ctx.fill();
    }
}
function drawGalaxyDustBand() {
  var centerX = width * 0.52;
  var centerY = height * 0.5;
  var maxRadius = Math.min(width, height) * 0.42;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.scale(1, 0.38);

    var band = ctx.createRadialGradient(0, 0, maxRadius * 0.08, 0, 0, maxRadius * 0.55);
    band.addColorStop(0, "rgba(0,0,0,0)");
    band.addColorStop(0.5, "rgba(5,3,15,0.18)");
    band.addColorStop(0.75, "rgba(10,5,25,0.1)");
    band.addColorStop(1, "rgba(0,0,0,0)");

    ctx.beginPath();
  ctx.arc(0, 0, maxRadius * 0.55, 0, Math.PI * 2);
    ctx.fillStyle = band;
    ctx.fill();
    ctx.restore();
}

function drawSpinningStardust(time) {
    var centerX = width * 0.52;
    var centerY = height * 0.5;
    var maxRadius = Math.min(width, height) * 0.42;
    var total = 180;

    for (var i = 0; i < total; i++) {
    var fraction = i / total;
    var spin = time * 0.00018 * (fraction < 0.5 ? 1 : -1);
    var angle = fraction * Math.PI * 2 + spin;
    var radius = maxRadius * (0.15 + 0.85 * fraction);
    var wobble = Math.sin(time * 0.0012 + fraction * Math.PI * 6) * 0.08;
    var a = angle + wobble;

    var x = centerX + radius * Math.cos(a);
    var y = centerY + radius * Math.sin(a) * 0.38;

    var pulse = 0.3 + 0.7 * Math.abs(Math.sin(time * 0.002 + fraction * Math.PI * 4));
    var size = randomBetween(0.4, 1.6);
    var brightness = Math.floor(180 + 75 * pulse);
    var alpha = pulse * 0.7 * (1 - fraction * 0.5);

    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(" + brightness + "," + Math.floor(brightness * 0.75) + ",255," + alpha + ")";
    ctx.fill();

    if (pulse > 0.8 && Math.random() < 0.25) {
      var glow = ctx.createRadialGradient(x, y, 0, x, y, size * 5);
      glow.addColorStop(0, "rgba(220,180,255," + (pulse * 0.5) + ")");
    glow.addColorStop(1, "rgba(0,0,0,0)");

    ctx.beginPath();
      ctx.arc(x, y, size * 5, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();
    }
    }
}

function drawCloudyStardust(time) {
    var centerX = width * 0.52;
    var centerY = height * 0.5;
    var maxRadius = Math.min(width, height) * 0.42;

    var bands = [
    { r: 0.22, w: 0.06, density: 90,  color: [140, 100, 255] },
    { r: 0.42, w: 0.07, density: 110, color: [100, 160, 255] },
    { r: 0.65, w: 0.09, density: 130, color: [180, 130, 255] },
    { r: 0.88, w: 0.08, density: 100, color: [120, 200, 255] },
    { r: 1.05, w: 0.07, density: 70,  color: [200, 160, 255] }
    ];

    for (var b = 0; b < bands.length; b++) {
    var band = bands[b];

    for (var i = 0; i < band.density; i++) {
      var spin = time * 0.00015 * (b % 2 === 0 ? 1 : -1);
      var angle = randomBetween(0, Math.PI * 2) + spin;
      var baseRadius = maxRadius * band.r + maxRadius * band.w * randomBetween(-1, 1);

      var x = centerX + baseRadius * Math.cos(angle);
      var y = centerY + baseRadius * Math.sin(angle) * 0.38;

      var pulse = 0.4 + 0.6 * Math.abs(Math.sin(time * 0.0015 + i + b));
    var cr = band.color[0];
    var cg = band.color[1];
    var cb = band.color[2];

    ctx.beginPath();
      ctx.arc(x, y, randomBetween(0.3, 1.4) * pulse, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + cr + "," + cg + "," + cb + "," + (pulse * 0.55) + ")";
    ctx.fill();
    }
    }
}

function drawStars(time) {
    for (var i = 0; i < stars.length; i++) {
    var s = stars[i];
    var pulse = 0.5 + 0.5 * Math.sin(time * s.speed + s.phase);
    var alpha = s.alpha * (0.5 + 0.5 * pulse);
    var cr = s.color[0];
    var cg = s.color[1];
    var cb = s.color[2];

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius * (0.8 + 0.3 * pulse), 0, Math.PI * 2);
    ctx.fillStyle = "rgba(" + cr + "," + cg + "," + cb + "," + alpha + ")";
    ctx.fill();

    if (s.radius > 1.0 && pulse > 0.75) {
      var glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius * 7);
      glow.addColorStop(0, "rgba(" + cr + "," + cg + "," + cb + "," + (0.35 * pulse) + ")");
    glow.addColorStop(1, "rgba(0,0,0,0)");

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius * 7, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();
    }
    }
}

function drawSparkles(time) {
    for (var i = sparkles.length - 1; i >= 0; i--) {
    var s = sparkles[i];

    s.x += s.vx;
    s.y += s.vy;
    s.life -= 0.006;
    s.phase += s.spin;

    if (s.life <= 0) {
    sparkles.splice(i, 1);
    spawnSparkle(randomBetween(0, width), randomBetween(0, height), randomBetween(0.4, 1.4));
    continue;
    }

    var progress = s.life / s.maxLife;
    var pulse = 0.5 + 0.5 * Math.sin(time * 0.05 + s.phase);
    var alpha = progress * pulse;
    var size = s.radius * (0.5 + 0.8 * progress);
    var cr = s.color[0];
    var cg = s.color[1];
    var cb = s.color[2];

    ctx.beginPath();
    ctx.arc(s.x, s.y, size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(" + cr + "," + cg + "," + cb + "," + (alpha * 0.9) + ")";
    ctx.fill();

    if (progress > 0.5) {
      var glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, size * 4);
      glow.addColorStop(0, "rgba(" + cr + "," + cg + "," + cb + "," + (alpha * 0.5) + ")");
    glow.addColorStop(1, "rgba(0,0,0,0)");

    ctx.beginPath();
      ctx.arc(s.x, s.y, size * 4, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();
    }

    for (var a = 0; a < 4; a++) {
      var angle = (Math.PI * 2 / 4) * a + s.phase;
      var len = size * 3.5 * progress;

    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x + Math.cos(angle) * len, s.y + Math.sin(angle) * len);
      ctx.strokeStyle = "rgba(" + cr + "," + cg + "," + cb + "," + (alpha * 0.6) + ")";
    ctx.lineWidth = 0.5;
    ctx.stroke();
    }
    }
}

function animate(time) {
    ctx.clearRect(0, 0, width, height);

    drawBackground();
    drawNebulae(time);
    drawGalaxyHalo();
    drawGalaxyParticles();
    drawGalaxyDustBand();
    drawCloudyStardust(time);
    drawSpinningStardust(time);
    drawStars(time);
    drawSparkles(time);

    if (sparkles.length < 200) {
    for (var i = 0; i < 3; i++) {
    spawnSparkle(randomBetween(0, width), randomBetween(0, height), randomBetween(0.3, 1.5));
    }
    }

    requestAnimationFrame(animate);
}

window.addEventListener("resize", setupCanvas);

setupCanvas();
requestAnimationFrame(animate);


