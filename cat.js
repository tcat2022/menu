let canvas = document.getElementById("canvas")
canvas.height = window.innerHeight
canvas.width = window.innerWidth
ctx = canvas.getContext("2d")
const gravity = 1.5
class Player {
    constructor(){
        this.position = {
            x:100,
            y:100
        }
        this.velocity = {
            x:0,
            y:0
        }
        this.width = 30
        this.height = 30
    }
    draw() {
        ctx.fillStyle = "red"
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
    ctx.fillStyle = "blue"
ctx.fillRect(this.position.x,this.position.y,
     this.width, this.height)
}
}
const player = new Player()
const platforms = [new Platform({ x:600, y:260, b:150 
}), new Platform({x:20, y:300,  b:450})]
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOfset = 0;
function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0,0,canvas.width,canvas.height)
    player.update()
    platforms.forEach(platform => {
        platform.draw()
    })

if(keys.right.pressed && player.position.x
   < 400 ) {
    player.velocity.x = 5
} else if(keys.left.pressed && player.position.x
    > 100){
player.velocity.x = -5
}
else {player.velocity.x = 0

    if(keys.right.pressed) {
        scrollOfset += 5
        platforms.forEach(platform => {
         platform.position.x -= 5 
    }) 
    }else if(keys.left.pressed) {
        scrollOfset -= 5
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
if(scrollOfset > 1000){
    console.log("you win")
}
if(player.position.y > canvas.height){
   init() 
}
}
animate()
addEventListener('keydown', ({keyCode}) => {
    switch(keyCode){
   case 65:
    console.log("left")
    keys.left.pressed = true
    break;
    case 32:
        player.velocity.y -= 20
        console.log("up")
     console.log("up")
     break;
    case 68:
      console.log("right")
      keys.right.pressed = true
      break;
     case 83:
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
        player.velocity.y -= 20
     console.log("up")
     break;
    case 68:
      console.log("right")
      keys.right.pressed = false
      break;
     case 83:
       console.log("down")
}
})