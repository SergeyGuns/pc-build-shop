(() => {
    const cnv = document.querySelector(`.circle-animation`);
    if (cnv === null) return;
    const ctx = cnv.getContext(`2d`);
    cnv.style.width = '100%'
    cnv.style.height = '100%'
    function init() {
      cnv.width  = 640;
      cnv.height = 640;
    }
    init();
  
    const numberOfRings     = 2;
    const ringRadiusOffset  = 7;
    const ringRadius        = 200;
    const waveOffset        = 15;
    const colors            = MAIN_COLORS;
    let startAngle          = 0;
  
    function updateRings() {
      for (let i = 0; i < numberOfRings; i++) {
        let radius = i * ringRadiusOffset + ringRadius;
        let offsetAngle = i * waveOffset * Math.PI / 180;
        drawRing(radius, colors[i], offsetAngle);
      }
  
      startAngle >= 360? startAngle = 0 : startAngle++;
    }
  
    let centerX = cnv.width  / 2;
    let centerY = cnv.height / 2;
  
    const maxWavesAmplitude = 17;
    const numberOfWaves     = 2;
  
    function drawRing(radius, color, offsetAngle) {
      ctx.strokeStyle = color;
      ctx.lineWidth   = 9;
  
      ctx.beginPath();
      
      for (let j = -180; j < 180; j++) {
        let currentAngle  = (j + startAngle) * Math.PI / 180;
        let displacement  = 0;
        let now = Math.abs(j);
  
        if (now > 70) {
          displacement = (now - 70) / 70;
        }
  
        if (displacement >= 1) {
          displacement = 1;
        }
  
        let waveAmplitude = radius + displacement * Math.sin((currentAngle + offsetAngle) * numberOfWaves) * maxWavesAmplitude;
        let x = centerX + Math.cos(currentAngle) * waveAmplitude;
        let y = centerY + Math.sin(currentAngle) * waveAmplitude;
        j > -180? ctx.lineTo(x, y) : ctx.moveTo(x, y);
  
      }
      ctx.closePath();
      ctx.stroke();
    }
  
    function loop() {
      cnv.width |= 0; // ctx.clearRect(0, 0, cnv.width, cnv.height);
      updateRings();
      requestAnimationFrame(loop);
    }
    loop();
  
    window.addEventListener(`resize`, init);
  
  })();