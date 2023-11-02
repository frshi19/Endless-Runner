class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){
        this.load.audio('sfx_thunder', './assets/lightningstrike.wav')
    }

    create(){
        let menuConfig = {
            fontFamily: 'consolas',
            fontSize: '64px',
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

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - 72, 'Hold/Tap \'SPACE\' to Jump', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 72, 'Jump again to perform\na Double Jump', menuConfig).setOrigin(0.5);

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    
    update(){
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('playScene');    
        }
    }
}