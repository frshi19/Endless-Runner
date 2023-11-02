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
        this.load.spritesheet('death', './assets/death.png', {
            frameWidth: 32,
            frameHeight: 32
        })
    }

    create(){
        // game over flag
        this.gameOver = false;

        // play music
        let bgmConfig = {
            volume: 0.5,
            loop: true
        }

        this.bgm = this.sound.add('bgm', bgmConfig);
        this.bgm.play()

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
        }

        timerConfig.fixedWidth = 100
        this.add.text(0, 0, 'Time', timerConfig);

        this.timerLeft = this.add.text(0, 28, this.timer / 1000, timerConfig);

        this.difficulty = 0
        this.add.text(game.config.width - 100, 0, 'Level', timerConfig);
        this.level = this.add.text(game.config.width - 100, 28, this.difficulty, timerConfig)

        
        // increase timer
        this.time.addEvent({
            delay: 1000, 
            callback: () => {
                if(!this.gameOver){
                    this.timer += 1000,
                    this.timerLeft.text = this.timer / 1000
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
        this.cross = this.physics.add.sprite(game.config.width + 150, game.config.height/4  *  3, 'cross').setScale(7).setOrigin(0.5);
        this.cross.body.setSize(16,5)
        this.cross.setImmovable(true)


        this.crossH = this.physics.add.sprite(game.config.width + 150, game.config.height/4, 'cross').setScale(7).setOrigin(0.5);
        this.crossH.body.setSize(16,5)
        this.crossH.setImmovable(true)
        this.time.delayedCall(40000, () => {
            if(!this.gameOver){
                this.crossH.setVelocity(-750, 0)
            }
        }, null, this);



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
                    speed -= 50
                    this.sound.play('sfx_thunder');
                    this.difficulty++
                    this.level.text = this.difficulty
                }
            },
            callbackScope:this,
            loop: true
        });

        // add garlic at 20 seconds
        this.garlic = this.physics.add.sprite( game.config.width + 100, game.config.height/2, 'garlic').setOrigin(0.5).setScale(3)

        this.time.delayedCall(20000, () => {
            if(!this.gameOver){
                this.garlic.setVelocity(-550, 0)
            }
        }, null, this);

        this.anims.create({
            key: 'garlic',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('garlic', {
                start: 0,
                end: 9
            })
        })
        this.garlic.anims.play('garlic', true)
        this.garlic.setImmovable(true)

        this.death = this.add.sprite( game.config.width + 100, game.config.height/2, 'death').setOrigin(0.5).setScale(6)
        // death anim
        this.anims.create({
            key: 'death',
            frameRate: 12,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('death', {
                start: 0,
                end: 7
            })
        })
        

        // add blood every 30 seconds
        this.blood = this.physics.add.sprite(game.config.width + 150, game.config.height/2, 'blood').setScale(5).setOrigin(0.5);
        this.blood.body.setSize(16,9);
        this.time.delayedCall(500, () => {
            if (!this.gameOver){
                this.blood.x = game.config.width + this.blood.width * 5
                this.blood.y = game.config.height / 2
                this.blood.body.velocity.x = -600
            }
        }, null, this);
        
        this.time.addEvent({
            delay: 30000, 
            callback: () => {
                if(!this.gameOver){
                    this.blood.x = game.config.width + this.blood.width * 5
                    this.blood.y = Phaser.Math.Between(this.blood.height * 5 * 2, game.config.height - this.blood.height * 5)
                    this.blood.body.velocity.x = speed - 50
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
                this.sound.play('sfx_break')
            }else{
                this.sound.play('sfx_death')
                this.death.x = player.x
                this.death.y = player.y
                this.death.anims.play('death', true)
                this.blood.destroy()
                player.destroy()
                cross.destroy()
                this.crossH.destroy()
                this.garlic.destroy()
                this.gameOver = true
                this.add.text(game.config.width/2, game.config.height/2 - 72, 'GAME OVER', gameOverConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2, 'Time survived: ' + this.timer/1000 + ' seconds', gameOverConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 72, 'Press (R) to Restart or (ESC) for Menu', gameOverConfig).setOrigin(0.5);
            }
            
        })

        this.physics.add.collider(this.player, this.crossH, (player, crossH)=> {
            if (this.bloodflag){
                this.bloodflag = false
                crossH.x = -69
                this.sound.play('sfx_break')
            }else{
                this.sound.play('sfx_death')
                this.death.anims.play('death', true)
                player.destroy()
                crossH.destroy()
                this.garlic.destroy()
                this.cross.destroy()
                this.blood.destroy()
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
                this.sound.play('sfx_break')
            }else{
                this.sound.play('sfx_death')
                this.death.anims.play('death', true)
                player.destroy()
                garlic.destroy()
                this.crossH.destroy()
                this.cross.destroy()
                this.blood.destroy()
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
            this.sound.play('sfx_powerUp')
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

                if (this.DoubleJump < 2){
                    this.sound.play('sfx_jump')
                }
            }
            if (this.DoubleJump < 2 && Phaser.Input.Keyboard.DownDuration(keySPACE, 300)){
                this.player.body.velocity.y = -650
                
            }
            // player transform
            if (this.player.y < this.game.config.height- this.game.config.height/4 + 68){
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
                this.cross.y = Phaser.Math.Between(game.config.height / 4 + this.cross.height * 7 , game.config.height - this.cross.height * 7)
            }

            // crossH
            // warp crossH from left to right
            if (this.crossH.x <= 0 - this.crossH.width){
                this.crossH.x = game.config.width + this.crossH.width * 7
                this.crossH.y = Phaser.Math.Between(this.crossH.height * 7 , game.config.height / 2 - this.crossH.height * 7)
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
                this.anims.remove('garlic');
                this.anims.remove('death');
                this.textures.remove('vampire 0.aseprite')
                this.bgm.stop();
                this.sound.play('sfx_click')
                this.scene.restart();
            }
            else if (Phaser.Input.Keyboard.JustDown(keyESC)){
                this.anims.remove('walk');
                this.anims.remove('fly');
                this.anims.remove('flash');
                this.anims.remove('garlic');
                this.anims.remove('death');
                this.textures.remove('vampire 0.aseprite')
                this.bgm.stop();
                this.sound.play('sfx_click')
                this.scene.start('menuScene');
            }
        }
        
    }
}