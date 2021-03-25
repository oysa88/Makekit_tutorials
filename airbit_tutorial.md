# Air:bit - Tutorial

## Steg 1

### Throttle

Lag variabelen ``||variabel: Throttle||``.

Bruk ``||input: knapp A||`` og ``||input: knapp B||`` til å endre ``||variabel: Throttle||``.

- For ``||input: når knapp A trykkes||``: Hvis ``||variabel: Throttle||`` er mindre enn 40, endre ``||variabel: Throttle||`` med -5, ellers endre ``||variabel: Throttle||`` med -1.

- For ``||input: når knapp B trykkes||``: Hvis ``||variabel: Throttle||`` er mindre enn 40, endre ``||variabel: Throttle||`` med +5, ellers endre ``||variabel: Throttle||`` med +1.

```blocks
input.onButtonPressed(Button.A, function () {
    if (Throttle < 40) {
        Throttle += -5
    } else {
        Throttle += -1
    }
})
input.onButtonPressed(Button.B, function () {
    if (Throttle < 40) {
        Throttle += -5
    } else {
        Throttle += -1
    }
})

```

## Steg 2

### Roll og Pitch

Lag variablene: ``||variabel: Roll||`` og ``||variabel: Pitch||``.

Sett inn i ``||basic: gjenta for alltid||``:

- Sett ``||variabel: Roll||`` til å lese verdien fra ``||input: helningsvinkel: venstre/høyre||``.

- Sett ``||variabel: Pitch||`` til å lese verdien fra ``||input: helningsvinkel: tonehøyde||``.

```blocks
basic.forever(function () {
    Roll = input.rotation(Rotation.Roll)
    Pitch = input.rotation(Rotation.Pitch)
})
```

## Steg 3

### Arm

Lag variabelen ``||variabel: Arm||``.

Vi skal lage en funksjon som gjør at vi kan stru av og på dronen fra fjernkontrollen. Her skal vi få variabelen ``||variabel: Arm||`` til å veksle mellom 0 og 1 hver gang ``||input: knapp A+B||`` trykkes inn.

Hvis ``||variabel: Arm||``, er 0 skal ``||variabel: Arm||`` settes til 1 når ``||input: knapp A+B||`` trykkes inn. Ellers skal den settes til 0.

Hver gang vi endrer statusen til ``||variabel: Arm||``, skal vi sette ``||variabel: Throttle||`` til 0.

```blocks
input.onButtonPressed(Button.AB, function () {
    if (Arm == 0) {
        Arm = 1
    } else {
        Arm = 0
    }
    Throttle = 0
})
```

## Steg 4

### Arm sikkerhet

Om vi mister kontroll over dronen, glemmer vi fort å trykke ``||input: A+B||``. Da er det enklere om vi kan riste på fjernkontrollen.

Bruk ``||input: når ristes||`` for å sette ``||variabel: Arm||`` og ``||variabel: Throttle||`` til 0. 

```blocks
input.onGesture(Gesture.Shake, function () {
    Arm = 0
    Throttle = 0
})
```

## Steg 5 @unplugged

### Visualisering på skjermen


![Visualisere Skjerm](https://i.ibb.co/kKXcB1z/Fjernkotroll.jpg)
