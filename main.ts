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
let x: number = 0
let y: number = 0
let room: number = 0
let newpos: number = 0
let Treas: number = 0
let Ex: number = 0
let Dirs: number[] = []
let doors: number[] = []
let pos: number = 0
let dir: number = 0
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
let Room3 = images.createImage(`
    # # # # #
    # # . . .
    # . # . #
    # . . . #
    # . # # .
    `)
let Room4 = images.createImage(`
    . # # # .
    . # . . .
    . # . . #
    . . . . #
    # . # # #
    `)
rooms = [Room1, Room2, Room3, Room4]
dir = 2
pos = 0
doors = [0, 24, 10, 4, 21, 7, 18, 0]
Dirs = [1, 6, 5, 4, -1, -6, -5, -4]
EnterRoom(0)
basic.forever(function () {
    if (pos == Ex) {
        game.setScore(game.score()+Treas)
        Treas = 1000
        
        room += 1
        if (room == 4) {
            game.gameOver()
        }
        EnterRoom(room)
    }
})
