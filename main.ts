function EnterRoom (num: number) {
    rooms[num].showImage(0)
    pos = Enter(num)
    led.toggle(Xpos(pos), Ypos(pos))
    Ex = Exit(num)
    Treas = 1000
}
input.onButtonPressed(Button.A, function () {
    newpos = pos + Dirs[dir]
    Treas = Treas - 50
    if (24 < newpos) {
        newpos = newpos - 24
    }
    if (0 > newpos) {
        basic.showIcon(IconNames.Heart)
        newpos = newpos + 24
    }
    if (!(led.point(Xpos(newpos), Ypos(newpos)))) {
        led.toggle(Xpos(pos), Ypos(pos))
        pos = newpos
        led.toggle(Xpos(pos), Ypos(pos))
    }
})
function Enter (num: number) {
    return doors[num * 2]
}
input.onButtonPressed(Button.B, function () {
    dir += 1
    Treas = Treas - 10
    if (dir > 7) {
        dir = 0
    }
})
input.onGesture(Gesture.Shake, function () {
    basic.showString("Room!")
    basic.showNumber(room)
    basic.showString("DIR")
    basic.showNumber(dir)
    basic.showString("Pos/ex/score")
    basic.showNumber(pos)
    basic.showNumber(Ex)
    basic.showNumber(game.score())
    rooms[room].showImage(0)
    led.toggle(Xpos(pos), Ypos(pos))
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    music.setBuiltInSpeakerEnabled(true)
})
function Ypos (num: number) {
    y = Math.trunc(num / 5)
    return y
}
function Exit (num: number) {
    return doors[1 + num * 2]
}
function Xpos (num: number) {
    x = num % 5
    return x
}
let x = 0
let y = 0
let room = 0
let newpos = 0
let Treas = 0
let Ex = 0
let Dirs: number[] = []
let doors: number[] = []
let pos = 0
let dir = 0
let rooms: number[] = []
music.setBuiltInSpeakerEnabled(false)
basic.showIcon(IconNames.StickFigure)
basic.showIcon(IconNames.Diamond)
let Room1 = 0
let Room2 = 0
let Room3 = images.createImage(`
    . # # # #
    . # # . #
    . . # . #
    . . . . #
    # . # . .
    `)
let Room4 = images.createImage(`
    # # # # #
    . . . . .
    . # # # #
    . . . . #
    # . # # #
    `)
let Room5 = images.createImage(`
    . # # # .
    . # . . .
    . # . . #
    . . . . #
    # . # # #
    `)
rooms = [Room1, Room2, Room3, Room4, Room5]
dir = 2
pos = 0
doors = [0, 24, 10, 4, 21, 7, 7, 18, 18, 0]
Dirs = [1, 6, 5, 4, -1, -6, -5, -4]
music.startMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once)
EnterRoom(0)
basic.forever(function () {
    if (pos == Ex) {
        game.setScore(game.score() + Treas)
        Treas = 1000
        room += 1
        if (room == 5) {
            music.startMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.Once)
            game.gameOver()
        }
        EnterRoom(room)
    }
})
