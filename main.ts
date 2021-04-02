input.onButtonPressed(Button.B, function () {
    dir += 1
    if (dir > 7) {
        dir = 0
    }
})
function Ypos (num: number) {
    y = Math.trunc(num / 5)
    return y
}
function Xpos (num: number) {
    x = num % 5
    return x
}
let x = 0
let y = 0
let dir = 0
let Room1 = images.createImage(`
    . # # . .
    . # # . #
    . . # . .
    . . . . #
    . . # . .
    `)
Room1.showImage(0)
dir = 2
let pos = 0
let Dirs = [1, 6, 5, 4, -1, -6, -5, -4]
led.toggle(Xpos(pos), Ypos(pos))
basic.forever(function () {
	
})
