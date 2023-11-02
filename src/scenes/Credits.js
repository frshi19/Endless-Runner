class Credits extends Phaser.Scene {
    constructor(){
        super("creditsScene");
    }

    preload(){

    }

    create(){
        let creditsConfig = {
            fontFamily: 'consolas',
            fontSize: '48px',
            backgroundColor: '#000000',
            color: '#FF22AA',
            align: 'Left',
            padding: {
                top: 5,
                bottom: 5,
                left: 5,
                right: 5
            },
        }

        this.add.text(0, game.config.height-72, "\'ESC\' - Back to Menu", creditsConfig).setOrigin(0);

        this.add.text(0, 0, "Programming by Frank Shi", creditsConfig).setOrigin(0,0);
        this.add.text(0, 0 + 72, "Art by Frank Shi", creditsConfig).setOrigin(0);
        this.add.text(0, 0 + 72 * 2, "Music by Frank Shi", creditsConfig).setOrigin(0);
        this.add.text(0, 0 + 72 * 3, "Thunder Sound Effect by SoundsForYou", creditsConfig).setOrigin(0);
        creditsConfig.fontSize = '32px'
        this.add.text(0, 0 + 72 * 4, "https://pixabay.com/sound-effects/natural-thunder-113219/", creditsConfig).setOrigin(0);
        creditsConfig.fontSize = '48px'
        this.add.text(0, 0 + 72 * 5, "Other Sound Effects by Frank Shi", creditsConfig).setOrigin(0);


        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyESC)){
            this.sound.play('sfx_click')
            this.scene.start('menuScene');
        }
    }
}