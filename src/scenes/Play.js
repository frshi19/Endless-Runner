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
    }

    create(){
        // place tile sprite
        this.lightning = this.add.sprite(0,0, 'lightning').setScale(4)
        this.background = this.add.tileSprite(0, 0, 1280, 720, 'background').setScale(2)
        
        // player 
        this.player = this.physics.add.sprite(game.config.width / 5, game.config.height - this.game.config.height / 4, 'vampire', 'vampire 0.aseprite').setScale(7).setOrigin(0.5)
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


        // Lightning effect
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
                this.lightning.anims.play('flash', false)
            },
            callbackScope:this,
            loop: true
        });

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
        this.background.tilePositionX += 2;


        // jump
        if (Phaser.Input.Keyboard.DownDuration(keySPACE, 1000)){
            this.player.body.velocity.y = -650
        }
        // player transform
        if (this.player.y < this.game.config.height- this.game.config.height/4){
            this.player.anims.play('fly', true)
            this.player.body.setSize(16,16)
        }else{
            this.player.anims.play('walk', true)
            this.player.body.setSize(16,32)
        }
    }
}