//getting the html canvas id
let canvas = document.getElementById("canvas2")
//getting canvas width and height
canvas.height = window.innerHeight
canvas.width = window.innerWidth
// setting the context to 2d
ctx = canvas.getContext("2d")
const gravity = 1.5
//getting the music file
const music = new Audio()
music.src = "city.mp3"
//player class used to draw and assign properties
//and add gravity to make the player fall and draw image of the cat
class Player {
    constructor(){
        this.position = {
            x:0,
            y:200
        }
        this.velocity = {
            x:0,
            y:0
        }
      
    this.width = 80
    this.height = 85
    this.frames = 1
    this.frames1 = 1
    this.gameframe = 0
    this.staggerframes = 10
    }
    draw() {
        ctx.drawImage(img6,32 * this.frames,this.frames1 * 48,34,43,this.position.x,
            this.position.y,this.width,this.height) 
    }
    update(){
    
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y  
        if(this.position.y + this.height + this.velocity.y
            <= canvas.height
            )
  this.velocity.y += gravity

  }
}

//ai class used to draw and assign properties and add
//gravity to make the ai fall and draw image of the dog
class Ai {
    constructor(){
        this.position = {
            x:1500,
            y:300
        }
        this.velocity = {
            x:0,
            y:0
        }
        this.width = 50
        this.height = 50
        this.frames = 0
        this.frames1 = 0
        this.gameframe = 0
        this.staggerframes = 10
    }
    draw() {
       
        ctx.drawImage(img7,32 * this.frames,32 *this.frames1,32,27, this.position.x,this.position.y
            ,this.width, this.height) 

    }
    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y  
        if(this.position.y + this.height + this.velocity.y
            <= canvas.height
            )
                this.velocity.y += gravity                
    }
}

//platform class used to draw and assign properties
class Platform {
    constructor({x, y, b, image, a}){
       this.position = {
        x:x,
        y:y
       } 
       this.image = image
       this.width = b
       this.height = a
       
}
draw() {
    ctx.drawImage(this.image, this.position.x,this.position.y
        ,this.width, this.height) 
}

}
//enemy class used to draw and assign properties and
//sprite animation loop for the fire
class Enemy{
constructor({x,y,image}){
   this.position = {
    x:x,
    y:y
   }
   this.image = image
   this.width = 50
   this.height = 50
   this.frames = 0
   this.frames1 = 0
}
draw(){
    ctx.drawImage(this.image,64 * this.frames,64 *this.frames1,64,64, this.position.x,this.position.y
        ,this.width, this.height) 
}
update(){
    this.draw()
    this.frames++
    if(this.frames >= 10){
        this.frames = 0
    }
    if(this.frames1 = 0 && this.frames > 10){
this.frames1 = 1
}if(this.frames1 = 1 && this.frames > 10){
  this.frames1 = 2
   }
 if(this.frames1 = 2 && this.frames > 10){
    this.frames1 = 3
 }
 if(this.frames1 = 3 && this.frames > 10){
    this.frames1 = 4
     }
     if(this.frames1 = 4 && this.frames > 10){
      this.frames1 = 5
 }   
 if(this.frames1 = 5 && this.frames > 10){
    this.frames1 = 6
        } 
  if(this.frames1 = 6 && this.frames > 10){
  this.frames1 = 0
       }     
}
}
//teleporter class used to draw and assign properties
class Teleporter {
    constructor({x,y}){
        this.position = {
            x:x,
            y:y
           }
           this.width = 20
           this.height = 20
        } 
        draw(){
            ctx.fillStyle = "yellow"
            ctx.fillRect(this.position.x,this.position.y,
                this.width,this.height)
        }  
    }
    //particle that player shoots at enemys
  class Particle {
    constructor({position,velocity}){
        this.position = position
        this.velocity = velocity
        this.width = 10
        this.height = 10
    }
    draw(){
        ctx.fillStyle = "red"
        ctx.fillRect(this.position.x,this.position.y,
            this.width,this.height)
    }
    update(){
        this.draw()
this.position.x += this.velocity.x
this.position.y += this.velocity.y
    }
  }  
    //drawing  game before restart
 let   teleporters = [new Teleporter({x:500, y:350})]
let player = new Player()
let  particles = []
let ai = new Ai()
let enemys = [new Enemy({x:350, y:350}), new Enemy({x:300, y:300})]
let platforms = [new Platform({ x:600, y:260, b:150 
}), new Platform({x:20, y:300,  b:150})]
//important for keydown and up 
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    down: {
        pressed: false
    },
    up: {
        pressed: false
    }
}
//getting all my images and assigning them to consts
const img1 = new Image()
img1.src = "art2.png"
const img = new Image()
img.src = "art.png"
const img2 = new Image()
    img2.src = "city.png"
    const img3 = new Image()
  img3.src = "platform.png"
  const img4 = new Image()
  img4.src = "clouds.png"
  const img5 = new Image()
  img5.src = "fire.png"
  const img6 = new Image()
  img6.src = "cat.png"
  const img7 = new Image()
  img7.src = "dog.png"
//can be used for a win senario
let scrollOfset = 0;
//function that restartes the game
function init(){
    //drawing the enemys, player, ai ,and teleporter 
   enemys =  [
        new Enemy({x:1950, y:610,image:img5}), 
        new Enemy({x:2650, y:610,image:img5}),
        new Enemy({x:2800, y:610,image:img5}),]
 player = new Player()
 particles = []
  ai = new Ai()
  teleporters = [new Teleporter({x:1650, y:400})
]

//drawing each platform
 platforms = [
    new Platform({x:2050, y:395,  b:250,a:100, image:img3}),
    new Platform({x:1260, y:385,  b:350 ,a:150, image:img3}),
    new Platform({x:-40, y:488,  b:550,a:250, image:img}),
    new Platform({x:1080, y:488,  b:550,a:250, image:img}),
new Platform({ x:520, y:488, b:550 ,a:250, image:img1}), 
new Platform({x:1750, y:480,  b:570,a:250, image:img}),
new Platform({x:2450, y:488,  b:400,a:250, image:img1})
]
 scrollOfset = 0;
}
let imgx = -5
let imgy = 0

function animate(){
    //playing the music
    music.play()
    //crateing an animation loop
    requestAnimationFrame(animate) 
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.drawImage(img4,0,0,
        canvas.width, canvas.height) 
        ctx.drawImage(img2,-6,-150,
            10000, 715)
       
    //updating all  game classes
    teleporters.forEach(teleporter => {teleporter.draw()})
  
    platforms.forEach(platform => {
        platform.draw()
    })
    enemys.forEach(enemy => {enemy.update()}) 
    ai.update()
   particles.forEach(particle => { particle.update()})
    player.update()
  //making player move when A or D is pressed
if(keys.right.pressed && player.position.x
   < 400 ) {
    player.velocity.x = 5
} else if((keys.left.pressed && player.position.x
    > 100) || (keys.left.pressed && scrollOfset === 0 &&
    player.position.x > 0)){
player.velocity.x = -5
}
else {player.velocity.x = 0
 //moving the world left when A is pressed 
    //to create a sidescrolling efect
    if(keys.right.pressed  ) {
        scrollOfset += 5
      ai.position.x -= 5
        imgx -= 2
        teleporters.forEach(teleporter => {
        teleporter.position.x -= 5
        })
       enemys.forEach(enemy => {
        enemy.position.x -= 5
       })
        platforms.forEach(platform => {
         platform.position.x -= 5 
    }) 
    particles.forEach(particle => {
        particle.position.x -= 5 
    }) 
    //moving the world right when D is pressed 
    //to create a sidescrolling efect
    }else if(keys.left.pressed && scrollOfset > 0) {
        scrollOfset -= 5
        imgx += 2
        ai.position.x += 5
        teleporters.forEach(teleporter => {
            teleporter.position.x += 5
            })
        enemys.forEach(enemy => {
            enemy.position.x += 5
           })
       
        platforms.forEach(platform => {
            platform.position.x += 5 
        }) 
        particles.forEach(particle => {
            particle.position.x += 5 
        }) 
     }
} 
console.log(scrollOfset)
//stoping the players gravity when it hits a platform
platforms.forEach(platform => {
 if(player.position.y + player.height <=
  platform.position.y && player.position.y +
  player.height + player.velocity.y >=
  platform.position.y && player.position.x + 
  player.width >= platform.position.x &&
  player.position.x <= platform.position.x +
   platform.width){
player.velocity.y = 0

 }
})
//stoping the ais gravity when it hits a platform
platforms.forEach(platform => {
    if(ai.position.y + ai.height  <=
     platform.position.y && ai.position.y +
     ai.height + ai.velocity.y >=
     platform.position.y && ai.position.x + 
     ai.width >= platform.position.x &&
     ai.position.x <= platform.position.x +
      platform.width){
   ai.velocity.y = 0
    }
   })
   //ai sprite animation
if(ai.position.x < player.position.x ){
    ai.velocity.x = 1.5
    if(ai.gameframe % ai.staggerframes == 0){
        if (ai.frames < 2 ){ ai.frames++}
        else {ai.frames = 0}  }
        ai.frames1 = 0
     ai.gameframe++
}if(ai.position.x > player.position.x){
    ai.velocity.x = -1.5
    if(ai.gameframe % ai.staggerframes == 0){
        if (ai.frames < 2 ){ ai.frames++}
        else {ai.frames = 0}  }
        ai.frames1 = 3
     ai.gameframe++
}

// if the player hits the ai restart the game
if(player.position.x + player.width >= ai.position.x  &&
    player.position.x  <= ai.position.x + ai.width &&
    player.position.y + player.height >= ai.position.y && 
     player.position.y <= ai.position.y + ai.height ) {
   init()
   count2 = 2
   music.currentTime = 0 
}
// if the player hits an enemy restart the game
enemys.forEach(enemy => {
 if(player.position.x + player.width >= enemy.position.x &&
     player.position.x  <= enemy.position.x + enemy.width &&
     player.position.y + player.height >= enemy.position.y &&
     player.position.y <= enemy.position.y + enemy.height) {
    init() 
    count2 = 2
    music.currentTime = 0
 }})
 //teleports the player
 teleporters.forEach(teleporter => {
 if(player.position.x + player.width >= 
    teleporter.position.x &&
    player.position.x  <= teleporter.position.x
     + teleporter.width &&
    player.position.y + player.height 
    >= teleporter.position.y &&
    player.position.y <= teleporter.position.y 
    + teleporter.height && keys.up.pressed ){
        
        document.location.href = "coll.html"
      console.log("tele")
     
    }})
 //kills enemys if hit by particle
 particles.forEach(particle => {
    if(ai.position.x + ai.width >= particle.position.x &&
        ai.position.x  <= particle.position.x + particle.width &&
         ai.position.y + player.height >= particle.position.y &&
        ai.position.y <= particle.position.y + particle.height &&
        count >= 1){
  ai.position.y = 1000
 particle.position.y = -20
         } 
 })
 particles.forEach(particle => {
 if(ai.position.x + ai.width >= particle.position.x &&
    ai.position.x  <= particle.position.x + particle.width &&
     ai.position.y + player.height >= particle.position.y &&
    ai.position.y <= particle.position.y + particle.height){
count += 1
particle.position.y = -20

     } 
})
   particles.forEach(particle => {
    if(particle.position.x >= canvas.width){
        particle.position.y = -20
    }
   })        
   // restarts the game    
if(player.position.y > canvas.height){
   init() 
   count2 = 2
music.currentTime = 0

}
if(player.position.y < 100 ){
    init() 
    count2 = 2
 }
 //slows down the sprite animation loop 
 // player sprite animation on keydown
 if(keys.right.pressed){
 if(player.gameframe % player.staggerframes == 0){
    if (player.frames < 2 ){ player.frames++}
    else {player.frames = 0}  }
    player.frames1 = 1
  player.gameframe++}
  if(keys.left.pressed){
    if(player.gameframe % player.staggerframes == 0){
       if (player.frames < 2 ){ player.frames++}
       else {player.frames = 0}  }
       player.frames1 = 3
     player.gameframe++}
}
//calling the functions that run and restarte the game
init()
animate()
let count = 0
let count2 = 2

//when user keys down
addEventListener('keydown', ({keyCode}) => {
    switch(keyCode){
   case 65:
    console.log("left")
    player.frames1 = 3

    keys.left.pressed = true
    break;
    case 87:
    keys.up.pressed = true
    break;
    case 32:
        console.log("up")
     console.log("up")
   
     player.velocity.y -= 28 
     break;
    case 68:
      console.log("right")
      keys.right.pressed = true
      break;
     case 83:
        count2 -= 1
        particles.push(new Particle({
            position: {
                x:player.position.x + 50,
                y:player.position.y + 50
            }, velocity: {
                x:2,
                y:0
            }
        }))
      
        keys.down.pressed = true
       console.log("down")
    }
})
//when user keysup
addEventListener('keyup', ({keyCode}) => {
    switch(keyCode){
   case 65:
    console.log("left")

    player.frames = 1
    keys.left.pressed = false
    break;
    case 32:
        player.velocity.y += 3
     
     console.log("up")
     break;
     case 87:
    keys.up.pressed = false
    break;
    case 68:
      console.log("right")
      player.frames = 1
      keys.right.pressed = false
      
      break;
     case 83:
        keys.down.pressed = false
       console.log("down")
}
})
function loop(){
    requestAnimationFrame(loop)
    if(count2 <= -1){
     particles.splice(0)
     count2 = 0
    }
document.getElementById("score").innerText = count2 + " shots left"
}
loop()
