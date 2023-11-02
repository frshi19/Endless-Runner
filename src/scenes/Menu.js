class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){
        this.load.audio('sfx_thunder', './assets/lightningstrike.wav')
        this.load.audio('sfx_click', './assets/click.wav')
        this.load.audio('sfx_death', './assets/death.wav')
        this.load.audio('sfx_jump', './assets/jump.wav')
        this.load.audio('sfx_powerUp', './assets/powerUp.wav')
        this.load.audio('sfx_break', './assets/break.wav')
        this.load.audio('bgm','./assets/bgm.wav')    
    }

    create(){
        let menuConfig = {
            fontFamily: 'consolas',
            fontSize: '128px',
            backgroundColor: '#000000',
            color: '#AA22FF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
                left: 5,
                right: 5
            },
        }

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - 192, 'Manor Run', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '64px'
        this.add.text(game.config.width/2, game.config.height/2, 'Hold/Tap \'SPACE\' to Jump', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 128, 'Jump again to perform\na Double Jump', menuConfig).setOrigin(0.5);

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    
    update(){
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play('sfx_click')
            this.scene.start('playScene');    
        }
    }
}