class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.spritesheet('lightning', './assets/lightning.png', {
            frameWidth: 640,
            frameHeight: 360
        })
        this.load.image('background', './assets/background.png');

        this.load.atlas('vampire', './assets/vampire.png', './assets/vampire.json');
        this.load.image('cross', './assets/cross.png')
        this.load.image('blood', './assets/blood.png')
        this.load.image('bloodshield', './assets/bloodshield.png')
        this.load.spritesheet('garlic', './assets/garlic.png', {
            frameWidth: 64,
            frameHeight: 64
        })
    }

    create(){
        // game over flag
        this.gameOver = false;

        

        //reset speed
        speed = -500;

        // place tile sprite
        this.lightning = this.add.sprite(0,0, 'lightning').setScale(4)
        this.background = this.add.tileSprite(0, 0, 1280, 720, 'background').setScale(2)

        // time
        this.timer = 0
        let timerConfig = {
            fontFamily: 'consolas',
            fontSize: '28px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.timerRight = this.add.text(0, 0, this.timer / 1000, timerConfig);
        // increase timer
        this.time.addEvent({
            delay: 1000, 
            callback: () => {
                if(!this.gameOver){
                    this.timer += 1000,
                    this.timerRight.text = this.timer / 1000
                }
            },
            callbackScope:this,
            loop: true
        });
        
        // player 
        this.player = this.physics.add.sprite(game.config.width / 5, game.config.height - 112, 'vampire', 'vampire 0.aseprite').setScale(7).setOrigin(0.5)
        this.textures.addSpriteSheetFromAtlas('vampire 0.aseprite', {frameHeight: 32, frameWidth: 16, atlas: 'vampire', frame: 'vampire 0.aseprite'})
        this.anims.create({
            key: 'walk',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNames('vampire', {
                prefix: 'vampire ',
                start: 0,
                end: 3,
                suffix: '.aseprite'
            })
        })
        this.anims.create({
            key: 'fly',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNames('vampire', {
                prefix: 'vampire ',
                start: 4,
                end: 7,
                suffix: '.aseprite'
            })
        })
        this.player.anims.play('walk', true)
        this.player.setGravityY(2000)
        this.player.setCollideWorldBounds(true)
        this.player.setImmovable(true)

        // enemies
        this.cross = this.physics.add.sprite(game.config.width + 150, game.config.height/2, 'cross').setScale(7).setOrigin(0.5);
        this.cross.body.setSize(16,9)
        this.cross.setImmovable(true)



        // Lightning effect and increase difficulty
        this.anims.create({
            key: 'flash',
            frameRate: 12,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('lightning', {
                start: 0,
                end: 17
            })
        })
        this.time.addEvent({
            delay: 10000, 
            callback: () => {
                if(!this.gameOver){
                    this.lightning.anims.play('flash', false)
                    speed -= 75
                }
            },
            callbackScope:this,
            loop: true
        });

        // add garlic at 20 seconds
        this.garlic = this.physics.add.sprite( game.config.width + 100, game.config.height/2, 'garlic').setOrigin(0.5).setScale(3)

        this.time.delayedCall(20000, () => {
            this.garlic.setVelocity(-550, 0)
        }, null, this);

        this.anims.create({
            key: 'garlic',
            frameRate: 1,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('garlic', {
                start: 0,
                end: 9
            })
        })
        this.garlic.anims.play('garlic', true)
        this.garlic.setImmovable(true)
        

        // add blood every 30 seconds
        this.blood = this.physics.add.sprite(game.config.width + 150, game.config.height/2, 'blood').setScale(5).setOrigin(0.5);
        this.blood.body.setSize(16,9);
        this.time.delayedCall(2000, () => {
            this.blood.x = game.config.width + this.blood.width * 5
            this.blood.y = Phaser.Math.Between(this.blood.height * 5 * 2, game.config.height - this.blood.height * 5)
            this.blood.body.velocity.x = speed
        }, null, this);
        
        this.time.addEvent({
            delay: 30000, 
            callback: () => {
                if(!this.gameOver){
                    this.blood.x = game.config.width + this.blood.width * 5
                    this.blood.y = Phaser.Math.Between(this.blood.height * 5 * 2, game.config.height - this.blood.height * 5)
                    this.blood.body.velocity.x = speed
                }
            },
            callbackScope:this,
            loop: true
        });


        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.bloodflag = false;

        // score config
        let gameOverConfig = {
            fontFamily: 'consolas',
            fontSize: '48px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
                left: 5,
                right: 5
            },
        }

        // collider
        this.physics.add.collider(this.player, this.cross, (player, cross)=> {
            if (this.bloodflag){
                this.bloodflag = false
                cross.x = -69
            }else{
                player.destroy()
                cross.destroy()
                this.gameOver = true
                this.add.text(game.config.width/2, game.config.height/2 - 72, 'GAME OVER', gameOverConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2, 'Time survived: ' + this.timer/1000 + ' seconds', gameOverConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 72, 'Press (R) to Restart or (ESC) for Menu', gameOverConfig).setOrigin(0.5);
            }
            
        })

        this.physics.add.collider(this.player, this.garlic, (player, garlic)=> {
            if (this.bloodflag){
                this.bloodflag = false
                garlic.x = -69
            }else{
                player.destroy()
                garlic.destroy()
                this.gameOver = true
                this.add.text(game.config.width/2, game.config.height/2 - 72, 'GAME OVER', gameOverConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2, 'Time survived: ' + this.timer/1000 + ' seconds', gameOverConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 72, 'Press (R) to Restart or (ESC) for Menu', gameOverConfig).setOrigin(0.5);
            }
            
        })

        
        this.bloodshield =  this.add.sprite(game.config.width + 150, game.config.height/2, 'bloodshield').setScale(5).setOrigin(0.5);
        this.physics.add.collider(this.player, this.blood, (player, blood)=> {
            blood.x = -69
            blood.y = -420
            this.blood.setVelocity(0)
            this.bloodflag = true;
        })
    }

    update(){
        
        if(!this.gameOver){
            // garlic manager
            if (this.garlic.anims.currentFrame.textureFrame == 0){
                this.garlic.body.setCircle(12, 20, 22)
            }else if (this.garlic.anims.currentFrame.textureFrame == 1){
                this.garlic.body.setCircle(16, 16, 16)
            }else if(this.garlic.anims.currentFrame.textureFrame == 2){
                this.garlic.body.setCircle(24, 8, 8 )
            } else if (this.garlic.anims.currentFrame.textureFrame == 3){
                this.garlic.body.setCircle(32, 0, 0)
            } else if(this.garlic.anims.currentFrame.textureFrame == 4){
                this.garlic.body.setCircle(24, 8, 8 )
            }else if (this.garlic.anims.currentFrame.textureFrame == 5){
                this.garlic.body.setCircle(16, 16, 16)
            }else if (this.garlic.anims.currentFrame.textureFrame == 6){
                this.garlic.body.setCircle(12, 20, 22)
            }
            // blood shield manager
            if (this.bloodflag){
                this.bloodshield.x = this.player.x
                this.bloodshield.y = this.player.y
            }else{
                this.bloodshield.x = -49
                this.bloodshield.y = -420
            }
            // jump checker
            if (this.player.y >= this.game.config.height - 112){
                this.DoubleJump = 0;
            }
            // jump
            if (Phaser.Input.Keyboard.JustDown(keySPACE)){
                this.DoubleJump += 1
            }
            if (this.DoubleJump < 2 && Phaser.Input.Keyboard.DownDuration(keySPACE, 250)){
                this.player.body.setGravityY(0)
                this.player.body.velocity.y = -650
                this.player.body.setGravityY(2000)
            }
            // player transform
            if (this.player.y < this.game.config.height- this.game.config.height/4){
                this.player.anims.play('fly', true)
                this.player.body.setSize(16,9)
            }else{
                this.player.anims.play('walk', true)
                this.player.body.setSize(12,32)
            }
            // background
            this.background.tilePositionX += 1.5;
            // cross
            this.cross.setVelocity(speed, 0)
            // warp cross from left to right
            if (this.cross.x <= 0 - this.cross.width){
                this.cross.x = game.config.width + this.cross.width * 7
                this.cross.y = Phaser.Math.Between(game.config.height / 3 + this.cross.height * 7 , game.config.height - this.cross.height * 7)
            }
            // garlic
            // warp garlic from left to right
            if (this.garlic.x <= 0 - this.garlic.width){
                this.garlic.x = game.config.width + this.garlic.width * 3
                this.garlic.y = Phaser.Math.Between(this.garlic.height * 3 , game.config.height - this.garlic.height * 3)
            }
            // blood
            if (this.blood.x <= 0 - this.blood.width){
                this.blood.setVelocity(0)
            }
        }else{
            if (Phaser.Input.Keyboard.JustDown(keyR)){
                this.anims.remove('walk');
                this.anims.remove('fly');
                this.anims.remove('flash');
                this.textures.remove('vampire 0.aseprite')
                this.scene.restart();
            }
            else if (Phaser.Input.Keyboard.JustDown(keyESC)){
                this.anims.remove('walk');
                this.anims.remove('fly');
                this.anims.remove('flash');
                this.textures.remove('vampire 0.aseprite')
                this.scene.start('menuScene');
            }
        }
        
    }
}