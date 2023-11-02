// Name: Frank Shi
// Title: 
// Hours spent:
// Creative tilt justification:

'use strict'

let config = {
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    width: 1280,
    height: 720,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ Menu, Credits, Play ]
}

let game = new Phaser.Game(config);

// reserve keyboard vars
let keySPACE, keyC, keyR, keyESC

// speed
let speed = -500