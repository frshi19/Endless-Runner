class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){
        
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
        this.add.text(game.config.width/2, game.config.height/2, 'Tap/Hold \'SPACE\' to Jump\nor Double Jump', menuConfig).setOrigin(0.5);

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    
    update(){
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('playScene');    
        }
    }
}