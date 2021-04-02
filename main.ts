function EnterRoom (num: number) {
    rooms[num].showImage(0)
    pos = Enter(num)
    led.toggle(Xpos(pos), Ypos(pos))
}
input.onButtonPressed(Button.A, function () {
    newpos = pos + Dirs[dir]
    if (24 < newpos) {
        newpos = newpos - 24
    }
    if (0 > newpos) {
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
    if (dir > 7) {
        dir = 0
    }
})
input.onGesture(Gesture.Shake, function () {
    basic.showString("Room!")
    basic.showNumber(room)
    basic.showString("DIR")
    basic.showNumber(dir)
    rooms[room].showImage(0)
    led.toggle(Xpos(pos), Ypos(pos))
})
function Ypos (num: number) {
    y = Math.trunc(num / 5)
    return y
}
function Exit (num: number) {
    return doors[1 + 0 * 2]
}
function Xpos (num: number) {
    x = num % 5
    return x
}
let x = 0
let y = 0
let newpos = 0
let room = 0
let Dirs: number[] = []
let pos = 0
let dir = 0
let doors: number[] = []
let rooms: Image[] = []
let Room1 = images.createImage(`
    . # # # #
    . # # . #
    . . # . #
    . . . . #
    # . # . .
    `)
let Room2 = images.createImage(`
    # # # # .
    # # # . .
    . . # . #
    . . . . #
    # . # . .
    `)
rooms = [Room1, Room2]
doors = [0, 24, 24, 4]
dir = 2
pos = 0
Dirs = [1, 6, 5, 4, -1, -6, -5, -4]
room = 0
EnterRoom(room)
