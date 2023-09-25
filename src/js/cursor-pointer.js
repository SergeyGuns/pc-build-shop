;(()=>{
    const MAIN_COLORS = [ 'rgba(255,231,1,1)', 'rgba(154,21,236,1)']
if(document.documentElement.clientWidth < 1024) return;
const canvas = document.querySelector('.cursor-pointer');
if (canvas === null) return;
const ctx = canvas.getContext('2d');
canvas.width = document.documentElement.clientWidth;
canvas.height = window.innerHeight;

console.log(ctx);
let gradient = ctx.createLinearGradient(0,0,canvas.width, canvas.height);
gradient.addColorStop(0, MAIN_COLORS[0]);
gradient.addColorStop(0.5, MAIN_COLORS[0]);
gradient.addColorStop(1, MAIN_COLORS[1]);
ctx.fillStyle = gradient;
ctx.globalAlpha = .5;

class Particle {
    constructor(effect){
        this.effect = effect;
        this.radius = 0.3;
        this.minRadius = this.radius;
        this.maxRadius = Math.random() * 20;
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
        this.vx = Math.random() * 0.2 - 0.1;
        this.vy = Math.random() * 0.2 - 0.1;
    }
    draw(context){
        if (this.radius > 0.4){
            context.fillStyle = gradient;
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            context.fill();
            // context.stroke();

            context.fillStyle = 'transparent';
            context.beginPath();
            context.arc(this.x - this.radius * 0.2, this.y - this.radius * 0.3, this.radius * 0.6, 0, Math.PI * 2);
            context.fill();
        }

    }
    update(){
            const dx = this.x - this.effect.mouse.x;
            const dy = this.y - this.effect.mouse.y;
            const distance = Math.hypot(dx, dy);
             if (distance < this.effect.mouse.radius && this.radius < this.maxRadius){
                this.radius += 3;
            }
        if (this.radius > this.minRadius) this.radius -= 0.05;

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < this.radius){
            this.x = this.radius;
            this.vx *= -1;
        } else if (this.x > this.effect.width - this.radius){
            this.x = this.effect.width - this.radius;
            this.vx *= -1;
        }
        if (this.y < this.radius){
            this.y = this.radius;
            this.vy *= -1;
        } else if (this.y > this.effect.height - this.radius){
            this.y = this.effect.height - this.radius;
            this.vy *= -1;
        }
    }
    reset(){
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
        this.radius = this.minRadius;
    }
}

class Effect {
    constructor(canvas, context){
        this.canvas = canvas;
        this.context = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = 1000;
        this.createParticles();

        this.mouse = {
            x: 0,
            y: 0,
            radius: 20
        }

        window.addEventListener('resize', e => {
            this.resize(e.target.window.innerWidth, e.target.window.innerHeight);
        });
        window.addEventListener('mousemove', e => {
                this.mouse.x = e.x;
                this.mouse.y = e.y;
        });
    }
    createParticles(){
        for (let i = 0; i < this.numberOfParticles; i++){
            this.particles.push(new Particle(this));
        }
    }
    handleParticles(context){
        //this.connectParticles(context);
        this.particles.forEach(particle => {
            particle.draw(context);
            particle.update();
        });
    }
    connectParticles(context){
        const maxDistance = 80;
        for (let a = 0; a < this.particles.length; a++){
            for (let b = a; b < this.particles.length; b++){
                const dx = this.particles[a].x - this.particles[b].x;
                const dy = this.particles[a].y - this.particles[b].y;
                const distance = Math.hypot(dx, dy);
                if (distance < maxDistance){
                    context.save();
                    const opacity = 1 - (distance/maxDistance);
                    context.globalAlpha = opacity;
                    context.beginPath();
                    context.moveTo(this.particles[a].x, this.particles[a].y);
                    context.lineTo(this.particles[b].x, this.particles[b].y);
                    context.stroke();
                    context.restore();
                }
            }
        }
    }
    resize(width, height){
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
        gradient = ctx.createLinearGradient(0,0,canvas.width, canvas.height);
gradient.addColorStop(0, MAIN_COLORS[0]);
gradient.addColorStop(0.5, MAIN_COLORS[1]);
gradient.addColorStop(1, MAIN_COLORS[2]);
        this.context.fillStyle = gradient;
        this.particles.forEach(particle => {
            particle.reset();
        });
    }
}
const effect = new Effect(canvas, ctx);

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.handleParticles(ctx);
    requestAnimationFrame(animate);
}
animate();
})();