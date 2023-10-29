// Name: Frank Shi
// Title: 
// Hours spent:
// Creative tilt justification:

'use strict'

let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 720,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// reserve keyboard vars
let keySPACE