
let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d");

const particlesArray = [];
let hue = 0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
 window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
 });

const mouse = {
    x:undefined,
    y: undefined
}
setInterval(nun,5000)
function nun(){
    for(let i = 0; i < 50; i++){
        particlesArray.push(new Particle());
        }        
}
canvas.addEventListener('click', function(event){
    mouse.x = event.x;
mouse.y = event.y;
for(let i = 0; i < 2; i++){
    particlesArray.push(new Particle());
    }
})

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
mouse.y = event.y;
for(let i = 0; i < 2; i++){
    particlesArray.push(new Particle());
    }
})


class Particle {
    constructor(){
        //this.x = mouse.x;
        //this.y = mouse.y;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 -1.5;
        this.speedY = Math.random() * 3 -1.5;
        this.color = "hsl("+ hue +",100%, 50%)";
    }
    update(){
       this.x += this.speedX;
       this.y += this.speedY; 
       if(this.size > 0.2) this.size -= 0.1;
    }
    draw(){
        ctx.fillStyle = this.color
 ctx.beginPath();
 ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
 ctx.fill(); 
    }
}

 

function handleParticles(){
    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        if(particlesArray[i].size <= 0.1){
            particlesArray.splice(i, 1);
            i--;
        }
        for(let j = i; j < particlesArray.length; j++){
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if(distance < 100){
            ctx.beginPath()
            ctx.strokeStyle = particlesArray[i].color
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
        }
        }
     
    }
}
 function animate(){
//ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "rgba(0,0,0,0.01)"
ctx.fillRect(0, 0, canvas.width, canvas.height)
handleParticles();
hue++;
requestAnimationFrame(animate);
 }
animate()
