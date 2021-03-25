input.onButtonPressed(Button.A, function () {
    if (Throttle < 40) {
        Throttle += -5
    } else {
        Throttle += -1
    }
})
input.onGesture(Gesture.ScreenDown, function () {
    Throttle = 0
    Arm = 0
})
input.onGesture(Gesture.Shake, function () {
    Throttle = 0
    Arm = 0
})
input.onButtonPressed(Button.AB, function () {
    if (Arm) {
        Arm = 0
    } else {
        Arm = 1
    }
})
input.onButtonPressed(Button.B, function () {
    if (Throttle < 40) {
        Throttle += -5
    } else {
        Throttle += -1
    }
})
let Pitch = 0
let Roll = 0
let Arm = 0
let Throttle = 0
let radioGroup = 7
radio.setGroup(radioGroup)
basic.showNumber(radioGroup)
basic.forever(function () {
    Roll = input.rotation(Rotation.Roll)
    Pitch = input.rotation(Rotation.Pitch)
    basic.clearScreen()
    if (Arm == 1) {
        led.plot(0, 0)
    }
    led.plot(0, Math.map(Throttle, 0, 100, 4, 0))
    led.plot(Math.map(Roll, -45, 45, 0, 4), Math.map(Pitch, -45, 45, 0, 4))
    radio.sendValue("P", Pitch)
    radio.sendValue("A", Arm)
    radio.sendValue("R", Roll)
    radio.sendValue("T", Throttle)
})
