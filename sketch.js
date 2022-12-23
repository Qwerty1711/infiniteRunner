var gameState = 1
var bg1, bg2, playerAnimation, player, playerRow = 0

function preload(){
    playerFlying = loadAnimation("assets/rocket1.png","assets/rocket2.png")
    playerCrashed = loadAnimation("assets/rocket3.png")
    asteroidImg = loadImage("assets/asteroid.png")
}

function setup(){
    createCanvas(1440,1080)
    bg1 = createSprite(720,540)
    bg1.addImage(loadImage("assets/bg.jpg"))
    bg1.scale = 2
    bg1.velocityX = -10

    bg2 = createSprite(2160,540)
    bg2.addImage(loadImage("assets/bg.jpg"))
    bg2.scale = 2
    bg2.velocityX = -10


    player = createSprite(200,540)
    player.addAnimation("active",playerFlying)
    player.addAnimation("collided",playerCrashed)
    player.scale = 0.5

    edges = createGroup()
    edge1 = createSprite(0,-10,1200,10)
    edge2 = createSprite(0,1200,1200,10)
    edges.add(edge1)
    edges.add(edge2)

    asteroidSetups = [
        {row1: true,
        row2: false,
        row3: false},

        {row1: false,
        row2: true,
        row3: false},

        {row1: false,
        row2: false,
        row3: true},
        
        {row1: false,
        row2: true,
        row3: true},

        {row1: true,
        row2: false,
        row3: true},

        {row1: true,
        row2: true,
        row3: false},
    ]

    asteroids = createGroup()

}

function draw(){
    background(0)
    if (gameState === 1) {
        if (bg1.x <= -720) {
            bg1.x = 2160
        }
        if (bg2.x <= -720) {
            bg2.x = 2160
        }

        player.y = 540 + (playerRow * -240)
        if ((keyWentDown("w") || keyWentDown("up")) && playerRow < 1) {
            playerRow += 1
        }
        if ((keyWentDown("s") || keyWentDown(DOWN_ARROW)) && playerRow > -1) {
            playerRow -= 1
        }
        if (frameCount % 60 === 0) {
            spawnAsteroids()
        }
        if (player.isTouching(asteroids)) {
            gameState = 0
        }

    }else{
        player.changeAnimation("collided", playerCrashed);
        asteroids.setLifetimeEach(-1)
        asteroids.setVelocityXEach(0)
        bg1.velocityX = 0
        bg2.velocityX = 0
    }
    drawSprites()
}

function spawnAsteroids(){
    var setup = Math.round(random(0,5))
    if (asteroidSetups[setup].row1) {
        asteroid = createSprite(1440,270)
        asteroid.addImage(asteroidImg)
        asteroid.scale = 0.25
        asteroid.velocityX = -10
        asteroid.lifetime = 500
        asteroids.add(asteroid)
    }
    if (asteroidSetups[setup].row2) {
        asteroid = createSprite(1440,540)
        asteroid.addImage(asteroidImg)
        asteroid.scale = 0.25
        asteroid.velocityX = -10
        asteroid.lifetime = 500
        asteroids.add(asteroid)
    }
    if (asteroidSetups[setup].row3) {
        asteroid = createSprite(1440,810)
        asteroid.addImage(asteroidImg)
        asteroid.scale = 0.25
        asteroid.velocityX = -10
        asteroid.lifetime = 500
        asteroids.add(asteroid)
    }
    
}