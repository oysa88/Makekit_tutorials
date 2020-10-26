radio.onReceivedString(function (receivedString) {
    if (receivedString == "venstre") {
        bitbot.rotatems(BBRobotDirection.Left, 60, 20)
    } else if (receivedString == "høyre") {
        bitbot.rotatems(BBRobotDirection.Right, 60, 20)
    } else if (receivedString == "fremover") {
        bitbot.goms(BBDirection.Forward, 100, 20)
    } else if (receivedString == "bakover") {
        bitbot.goms(BBDirection.Reverse, 100, 20)
    }
})
radio.setGroup(1)
bitbot.ledRainbow()
