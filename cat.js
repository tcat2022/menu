let canvas = document.getElementById("canvas1")
canvas.height = window.innerHeight
canvas.width = window.innerWidth
ctx = canvas.getContext("2d")
const gravity = 1.5
class Player {
    constructor(){
        this.position = {
            x:100,
            y:300
        }
        this.velocity = {
            x:0,
            y:0
        }
        this.width = 30
        this.height = 40
    }
    draw() {
        ctx.fillStyle = "chocolate"
        ctx.fillRect(this.position.x, this.position.y, 
            this.width,this.height)
           

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
class Platform {
    constructor({x, y, b}){
       this.position = {
        x:x,
        y:y
       } 
       this.width =b
       this.height = 20
}
draw() {
    ctx.fillStyle = "forestgreen"
ctx.fillRect(this.position.x,this.position.y,
     this.width, this.height)
}

}

class Enemy{
constructor({x,y}){
   this.position = {
    x:x,
    y:y
   }
   this.width = 20
   this.height = 20
}
draw(){
    ctx.fillStyle = "red"

ctx.beginPath()
ctx.arc(this.position.x,this.position.y,10, 0, 2* Math.PI)
ctx.fill()
}
}
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
 let   teleporters = [new Teleporter({x:500, y:350})]
let player = new Player()
let enemys = [new Enemy({x:350, y:350}), new Enemy({x:300, y:300})]
let platforms = [new Platform({ x:600, y:260, b:150 
}), new Platform({x:20, y:300,  b:150})]
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

let scrollOfset = 0;
function init(){
    enemys =  [new Enemy({x:550, y:350}), 
        new Enemy({x:1600, y:300}),
        new Enemy({x:800, y:330}),
        new Enemy({x:1100, y:330}),
        new Enemy({x:1200, y:380}),
        new Enemy({x:1350, y:335}),
        new Enemy({x:1480, y:290}),]
 player = new Player()
  teleporters = [new Teleporter({x:1780, y:355})
]
 platforms = [ new Platform({ x:450, y:360, b:200 
}), new Platform({x:0, y:400,  b:350}),
new Platform({x:760, y:400,  b:400}),
new Platform({x:1250, y:350,  b:50}),
new Platform({x:1400, y:300,  b:90}),
new Platform({x:1500, y:400,  b:350})]
 scrollOfset = 0;
}
function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0,0,canvas.width,canvas.height)
    player.update()
    teleporters.forEach(teleporter => {teleporter.draw()})
   enemys.forEach(enemy => {enemy.draw()}) 
    platforms.forEach(platform => {
        platform.draw()
    })
if(keys.right.pressed && player.position.x
   < 400 ) {
    player.velocity.x = 5
} else if((keys.left.pressed && player.position.x
    > 100) || (keys.left.pressed && scrollOfset === 0 &&
    player.position.x > 0)){
player.velocity.x = -5
}
else {player.velocity.x = 0

    if(keys.right.pressed && scrollOfset < 1530 ) {
        scrollOfset += 5
        teleporters.forEach(teleporter => {
        teleporter.position.x -= 5
        })
       enemys.forEach(enemy => {
        enemy.position.x -= 5
       })
        platforms.forEach(platform => {
         platform.position.x -= 5 
    }) 
    }else if(keys.left.pressed && scrollOfset > 0) {
        scrollOfset -= 5
        teleporters.forEach(teleporter => {
            teleporter.position.x += 5
            })
        enemys.forEach(enemy => {
            enemy.position.x += 5
           })
       
        platforms.forEach(platform => {
            platform.position.x += 5 
        }) 
     }
} 
console.log(scrollOfset)
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
if(scrollOfset >= 1300){
    
}  enemys.forEach(enemy => {
    

 if(player.position.x + player.width >= enemy.position.x &&
     player.position.x  <= enemy.position.x + enemy.width &&
     player.position.y + player.height >= enemy.position.y &&
     player.position.y <= enemy.position.y + enemy.height) {
    init() 
 }})
 teleporters.forEach(teleporter => {
 if(player.position.x + player.width >= 
    teleporter.position.x &&
    player.position.x  <= teleporter.position.x
     + teleporter.width &&
    player.position.y + player.height 
    >= teleporter.position.y &&
    player.position.y <= teleporter.position.y 
    + teleporter.height && keys.up.pressed ){
        
     window.open("index.html")
      console.log("tele")
     
    }})
 
           
      
if(player.position.y > canvas.height){
   init() 
}
if(player.position.y < 100){
    init() 
 }
 
}

init()
animate()
addEventListener('keydown', ({keyCode}) => {
    switch(keyCode){
   case 65:
    console.log("left")
    keys.left.pressed = true
    break;
    case 87:
    keys.up.pressed = true
    break;
    case 32:
        console.log("up")
     console.log("up")
     
     player.velocity.y -= 20 
     break;
    case 68:
      console.log("right")
      keys.right.pressed = true
      break;
     case 83:
        keys.down.pressed = true
       console.log("down")
}
})

addEventListener('keyup', ({keyCode}) => {
    switch(keyCode){
   case 65:
    console.log("left")
    keys.left.pressed = false
    break;
    case 32:
        player.velocity.y += 5 
     
     console.log("up")
     break;
     case 87:
    keys.up.pressed = false
    break;
    case 68:
      console.log("right")
      keys.right.pressed = false
      break;
     case 83:
        keys.down.pressed = false
       console.log("down")
}
})
let win = document.getElementById("win")