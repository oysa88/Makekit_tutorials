input.onButtonPressed(Button.A, function () {
    if (throttle < 40) {
        throttle += -5
    } else {
        throttle += -1
    }
})
input.onGesture(Gesture.ScreenDown, function () {
    throttle = 0
    arm = 0
})
input.onGesture(Gesture.Shake, function () {
    throttle = 0
    arm = 0
})
input.onButtonPressed(Button.AB, function () {
    if (arm) {
        arm = 0
    } else {
        arm = 1
    }
})
input.onButtonPressed(Button.B, function () {
    if (throttle < 40) {
        throttle += -5
    } else {
        throttle += -1
    }
})
let yaw = 0
let pitch = 0
let roll = 0
let arm = 0
let throttle = 0
let radiogruppe = 1
radio.setGroup(radiogruppe)
basic.showNumber(radiogruppe)
pins.analogWritePin(AnalogPin.P1, 1023)
basic.forever(function () {
    roll = input.rotation(Rotation.Roll)
    pitch = input.rotation(Rotation.Pitch)
    basic.clearScreen()
    if (arm == 1) {
        led.plot(0, 0)
    }
    if (pins.analogReadPin(AnalogPin.P0) > 500) {
        yaw = -30
        led.plot(1, 4)
    } else if (pins.analogReadPin(AnalogPin.P2) > 500) {
        yaw = 30
        led.plot(3, 4)
    } else {
        yaw = 0
        led.plot(2, 4)
    }
    led.plot(0, 4 - throttle / 25)
    led.plot((45 - roll) / 22.5, (45 + pitch) / 22.5)
    radio.sendValue("P", pitch)
    radio.sendValue("A", arm)
    radio.sendValue("R", roll)
    radio.sendValue("T", throttle)
    radio.sendValue("Y", yaw)
})
