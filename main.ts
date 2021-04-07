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
let Yaw = 0
let Pitch = 0
let Roll = 0
let Arm = 0
let Throttle = 0
let Radiogruppe = 1
radio.setGroup(Radiogruppe)
basic.showNumber(Radiogruppe)
pins.analogWritePin(AnalogPin.P1, 1023)
basic.forever(function () {
    Roll = input.rotation(Rotation.Roll)
    Pitch = input.rotation(Rotation.Pitch)
    basic.clearScreen()
    if (Arm == 1) {
        led.plot(0, 0)
    }
    if (pins.analogReadPin(AnalogPin.P0) > 500) {
        Yaw = -30
        led.plot(1, 4)
    } else if (pins.analogReadPin(AnalogPin.P2) > 500) {
        Yaw = 30
        led.plot(3, 4)
    } else {
        Yaw = 0
        led.plot(2, 4)
    }
    led.plot(0, 4 - Throttle / 25)
    led.plot((45 - Roll) / 22.5, (45 + Pitch) / 22.5)
    radio.sendValue("P", Pitch)
    radio.sendValue("A", Arm)
    radio.sendValue("R", Roll)
    radio.sendValue("T", Throttle)
    radio.sendValue("Y", Yaw)
})
