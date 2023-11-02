// Name: Frank Shi
//
// Title: Manor Run
//
// Hours spent: 30
//
// Creative tilt justification:
//
// Does your game do something technically interesting?
// At 20 seconds into the game, a garlic obstacle spawns that has varying collider boundaries, 
// which are associated with certain frames of its animation. This took a lot of time looking outside of class examples
// and at the Phaser documentation trying to figure out the proper commands, offsets, and also just debugging it.
// I think this mechanic makes my game unique and I am particularly proud of it. (Line 321, Play.js)
// 
// 
// Does your game have a great visual style?
// This was my first time having to create multiple visual assets and animations for a game, and I have to say I feel
// proud of how it turned out. I am also proud of the looping background music and its
// baroque era/8bit aesthetics, which fits perfectly with the vampyric/retro visual themes.
// I am particulary proud of the lightning animation that occurs every 10 seconds
// that flashes behind the transparent windows in the scrolling hallway background, which also signals an increase in difficulty.
// Not only does it serve a purpose to the game design, but also fits well with the theme of the game.

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