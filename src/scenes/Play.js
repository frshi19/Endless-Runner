class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.image('background', './assets/background.png');

        this.load.atlas('vampire', './assets/vampire.png', './assets/vampire.json');
    }

    create(){
        // place tile sprite
        this.background = this.add.tileSprite(0, 0, 1280, 720, 'background').setScale(2)
        
        this.player = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, 'vampire', 'vampire 0.aseprite').setScale(4)

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

        this.player.anims.play('walk', true)
    }

    update(){
        this.background.tilePositionX += 2;
    }
}