# Air:bit - Tutorial

## Steg 1.1

### Throttle

Lag variabelen ``||variabel: throttle||``.

Bruk ``||input: knapp A||`` og ``||input: knapp B||`` til å endre ``||variabel: throttle||``.

- For ``||input: når knapp A trykkes||``: Hvis ``||variabel: throttle||`` er mindre enn 40, minske ``||variabel: throttle||`` med -5, ellers minske ``||variabel: throttle||`` med -1.

- For ``||input: når knapp B trykkes||``: Hvis ``||variabel: throttle||`` er mindre enn 40, øke ``||variabel: throttle||`` med +5, ellers øke ``||variabel: throttle||`` med +1.

```blocks
input.onButtonPressed(Button.A, function () {
    if (throttle < 40) {
        throttle += -5
    } else {
        throttle += -1
    }
})
input.onButtonPressed(Button.B, function () {
    if (throttle < 40) {
        throttle += -5
    } else {
        throttle += -1
    }
})
```

## Steg 1.2 

### Sette øvre og nedre grense på throttle

Vi ønsker ikke at ``||variabel: throttle||`` skal være mindre enn 0 eller større enn 100. Derfor må vi legge til en ``||logic: hvis-betingelse||`` som hindrer dette i å skje.

- Under ``||input: knapp A||``: Hvis ``||variabel: throttle||`` er over (>) 100, skal ``||variabel: throttle||`` settes lik 100.

- Under ``||input: knapp B||``: Hvis ``||variabel: throttle||`` er over (<) 0, skal ``||variabel: throttle||`` settes lik 0.

```blocks
input.onButtonPressed(Button.A, function () {
    if (throttle < 40) {
        throttle += -5
    } else {
        throttle += -1
    }
    if (throttle < 0) {
        throttle = 0
    }
})
input.onButtonPressed(Button.B, function () {
    if (throttle < 40) {
        throttle += 5
    } else {
        throttle += 1
    }
    if (throttle > 100) {
        throttle = 100
    }
})
```


## Steg 2.1 @unplugged

### Roll/Pitch

Med fjernkontrollen skal vi få dronen til å bevege seg fremover, bakover, mot høyre eller mot venstre. For å gjøre dette skal vi bruke ``||input: helningsvinkel||`` til micro:bit.

![Drone-Pitch-Roll.jpg](https://i.postimg.cc/rmcttttF/Drone-Pitch-Roll.jpg)


## Steg 2.2

### Roll/Pitch

Lag variablene: ``||variabel: roll||`` og ``||variabel: pitch||``.

Sett inn i ``||basic: gjenta for alltid||``:

- Sett ``||variabel: roll||`` til å lese verdien fra ``||input: helningsvinkel: venstre/høyre||``.

- Sett ``||variabel: pitch||`` til å lese verdien fra ``||input: helningsvinkel: tonehøyde||``.

```blocks
basic.forever(function () {
    roll = input.rotation(Rotation.Roll)
    pitch = input.rotation(Rotation.Pitch)
})
```
![Drone-Pitch-Roll-500px.jpg](https://i.postimg.cc/BZc6CM1J/Drone-Pitch-Roll-500px.jpg)


## Steg 3.1 @unplugged

### Armere dronen 

Vi skal lage en sikkerhetssperre som gjør at vi kan skru dronen av og på med fjernkontrollen vår. 

| ![Drone-Desarmert-500px.jpg](https://i.postimg.cc/KzNcy4NW/Drone-Desarmert-500px.jpg) | ![Drone-Armert-og-Desarmert-500px.jpg](https://i.postimg.cc/XYGvyjjZ/Drone-Armert-og-Desarmert-500px.jpg) |
| :-----: | :-----: |
| Drone Desarmert |    Drone Armert    |


## Steg 3.2

### Arm

Lag variabelen ``||variabel: arm||``. Variabelen ``||variabel: arm||`` skal veksle mellom 0 og 1 hver gang ``||input: knapp A+B||`` trykkes inn.

Hvis ``||variabel: arm||`` = 0, skal ``||variabel: arm||`` settes til 1 når ``||input: knapp A+B||`` trykkes inn. Ellers skal den settes til 0.

Hver gang vi endrer statusen til ``||variabel: arm||``, skal vi sette ``||variabel: throttle||`` til 0.

```blocks
input.onButtonPressed(Button.AB, function () {
    if (arm == 0) {
        arm = 1
    } else {
        arm = 0
    }
    throttle = 0
})
```

## Steg 3.3

### Arm-sikkerhet

Om vi mister kontroll over dronen, glemmer vi fort å trykke ``||input: A+B||`` for å skru av dronen. Da er det enklere om vi kan riste på fjernkontrollen.

Bruk ``||input: når ristes||`` for å sette ``||variabel: arm||`` og ``||variabel: throttle||`` til 0. 

(Lag gjerne en lik funksjon til som gjør at du kan skru av dronen hvis fjernkontrollen snus rundt så skjermen på micro:bit er opp ned.)

```blocks
input.onGesture(Gesture.Shake, function () {
    arm = 0
    throttle = 0
})
input.onGesture(Gesture.ScreenDown, function () {
    throttle = 0
    arm = 0
})
```

## Steg 4.1 @unplugged

### Snu dronen rundt sin egen akse (Yaw)

Vi ønsker å få dronen til rotere sidelengs, slik at fronten kan peke i en annen retning.

[![Drone-Yaw.jpg](https://i.postimg.cc/L4rTz4fc/Drone-Yaw.jpg)](https://postimg.cc/Z0xpmSwH)


## Steg 4.2

### Snu dronen rundt sin egen akse (Yaw)

Vi ønsker å få dronen til rotere sidelengs, slik at fronten kan peke i en annen retning. Dette gjør vi å lage en variabel kalt ``||variabel: yaw||``.

Vi har ikke flere knapper på micro:biten, så vi må finne en måte å løse dette på. Heldigvis har vi noen gullkantede pins nederst på micro:biten. 

Ved å sette strøm på ``||pins: P1||``, kan vi ved å legge en finger mellom ``||pins: P0||`` og ``||pins: P1||``, sende strøm til ``||pins: P0||`` (Hint: Huden vår leder strøm). Samme kan vi gjøre med ``||pins: P2||`` også.

- Bruk ``||pins: skriv analog verdi||`` for å sende strøm ut på pinne ``||pins: P1||`` (verdi = 1023). Plasser den inn under ``||basic: ved start||``.

Oppgave: Lag en ``||logic: hvis-betingelse||`` som:

- Setter ``||variabel: yaw||`` til -30 hvis man trykker til venstre (lese av ``||pins: analog P0||`` til over 500)

- Setter ``||variabel: yaw||`` til 30 hvis man trykker til høyre (lese av ``||pins: analog P2||`` til over 500)

- Ellers settes ``||variabel: yaw||`` til 0 hvis ingen strøm registreres (ikke noe trykk)

```blocks
basic.forever(function () {
    if (pins.analogReadPin(AnalogPin.P0) > 500) {
        yaw = -30
    } else if (pins.analogReadPin(AnalogPin.P2) > 500) {
        yaw = 30
    } else {
        yaw = 0
    }
})
```
[![Drone-Yaw-500px.jpg](https://i.postimg.cc/tTGq3xq1/Drone-Yaw-500px.jpg)](https://postimg.cc/GBznr9sr)


## Steg 5.1 @unplugged

### Visualisering på skjermen

Micro:bitens LED-display kan brukes til å vise styringsinformasjonen vi skal sende videre til dronen (PARTY). På den måten er det lett å se om vi har kodet riktig, og vi får en indikasjon på hvilke verdier vi sender videre.

![Visualisere-Skjerm.jpg](https://i.postimg.cc/P5sfxnDd/Visualisere-Skjerm.jpg)

## Steg 5.2

### Klargjør visualisering på skjermen

Micro:bitens LED-display kan brukes til å vise styringsinformasjonen vi skal sende videre til dronen (PARTY). På den måten er det lett å se om vi har kodet riktig, og vi får en indikasjon på hvilke verdier vi sender videre.

Legg til en ``||basic: tøm skjerm||`` inn i  ``||basic: gjenta for alltid||``. Den skal gi oss en ren skjerm når vi skal vise ``||variabel: arm||``, ``||variabel: throttle||``, ``||variabel: pitch||``, ``||variabel: roll||`` og ``||variabel:yaw||``.

```blocks
basic.forever (function () {
    basic.clearScreen()
})
```

![Visualisere-Skjerm-500px.jpg](https://i.postimg.cc/Y2d2nGjG/Visualisere-Skjerm-500px.jpg)


## Steg 6.1 @unplugged

### Visualisere arm

Vi skal visualisere ``||variabel: arm||`` ved å tenne lyset øverst i venstre hjørne (x = 0, y = 0) på skjermen til micro:biten. 

Punket skal lyse når er ``||variabel: arm||`` er på og være slukket når ``||variabel: arm||`` er av.

![Visualisere-Arm.png](https://i.postimg.cc/BQvHgD7j/Visualisere-Arm.png)

## Steg 6.2

### Visualisere arm 

Inne i  ``||basic: gjenta for alltid||``:

- Lag en ``||logic: hvis-betingelse||`` som sjekker om ``||variabel: arm||`` = 1. 

- Hvis den er det, skal vi ``||led: tenne||`` (x = 0, y = 0).


```blocks
basic.forever (function () {
    if (arm == 1) {
        led.plot(0, 0)
    }
})
```
![Visualisere-Arm-500px.jpg](https://i.postimg.cc/Wz1NpjY1/Visualisere-Arm-500px.jpg)


## Steg 7.1 @unplugged

### Visualisere throttle

Vi skal visualisere ``||variabel: throttle||`` oppover langs venstre side på skjermen til micro:biten. (Det blå området på bildet.)

![Visualisere-Throttle.jpg](https://i.postimg.cc/mrVT8c5r/Visualisere-Throttle.jpg)


## Steg 7.2

### Visualisere throttle

Variabelen ``||variabel: throttle||`` har en verdi mellom 0 og 100. Problemet med å vise det på skjermen er at koordinatene går fra 4 til 0. vi må derfor finne en måte å regne om dette på. 

Regnestykket vi må lage skal deles i to operasjoner. Svaret skal settes inn en ``||led: tenn (x, y)||``. (Regnestykket settes inn i for y).

- Lag et regnestykke: Hvis du setter inn ``||variabel: throttle||`` fra tabellen under, skal svaret bli verdien i mellomregningen under. (Hvis ``||variabel: throttle||`` er 100, skal du få 4 til svar, hvis ``||variabel: throttle||`` er 50, skal du få 2 til svar, og hvis ``||variabel: throttle||`` er 0, skal du få 0 til svar.)
 
- Utvid regnestykket: Her skal vi finne en måte å få mellomregningene våre til å bli riktig koordinat på skjermen. (Hvis mellomregningen er 0 skal vi få Koordinat 4 til svar, osv.)


| Throttle            ||||||||    0    ||||||||    50   ||||||||   100   |
| :------------------ |||||||| :-----: |||||||| :-----: |||||||| :-----: |
| Mellomregning       ||||||||    0    ||||||||    2    ||||||||    4    |
| Koordinat på skjerm ||||||||    4    ||||||||    2    ||||||||    0    |


```blocks
basic.forever(function () {
    led.plot(0, 4 - throttle / 25)
})
```
![Visualisere-Throttle-500px.jpg](https://i.postimg.cc/kXZJC0Q7/Visualisere-Throttle-500px.jpg)


## Steg 9.1 @unplugged

### Visualisere Roll/Pitch

Vi skal vise ``||variabel: roll||`` og ``||variabel: pitch||`` i det røde området. Når fjernkontrollen holdes vannrett, skal vi ``||led: tenne (x = 2, y = 2)||``.

![Visualisere-Pitch-Roll.jpg](https://i.postimg.cc/nrrrvKVZ/Visualisere-Pitch-Roll.jpg)


## Steg 9.2

### Visualisere Roll/Pitch

Vinkelen til ``||variabel: roll||`` og ``||variabel: pitch||`` ligger mellom -45 grader og 45 grader. For å vise dette på skjermen vår, må vi regne om vinklene til koordinatene på skjermen som er mellom 0 og 4. 

Regnestykket vi må lage kan deles i to operasjoner. Svaret skal settes inn en ``||led: tenn (x, y)||``.

- Lag et regnestykke: Hvis du setter inn helningsvinkelen i tabellen under, skal svaret bli verdien i mellomregningen under. (Hvis ``||input: helningsvinkel||`` er -45 grader, skal svaret bli 0, hvis ``||input: helningsvinkel||`` er 0 grader, skal svaret bli 45, og hvis ``||input: helningsvinkel||`` er 45 grader, skal svaret bli 90.)
 
- Utvid regnestykket: Her skal vi finne en måte å få mellomregningene våre til å bli riktig koordinat på skjermen. (Hvis mellomregningen er 0 skal vi få Koordinat 0 til svar, osv.

NB: Husk at ``||variabel: roll||`` er i x-retningen og ``||variabel: pitch||`` er i y-retningen.

| Helningsvinkel        ||||||||   -45   ||||||||     0   ||||||||   45    |
| :-------------------- |||||||| :-----: |||||||| :-----: |||||||| :-----: |
| Mellomregning         ||||||||    0    ||||||||    45   ||||||||   90    |
| Koordinat på skjerm   ||||||||    0    ||||||||     2   ||||||||    4    |


```blocks
basic.forever(function () {
    led.plot((45 + roll) / 22.5, (45 + pitch) / 22.5)
})
```
![Visualisere-Pitch-Roll-500px.jpg](https://i.postimg.cc/8cX1j3xB/Visualisere-Pitch-Roll-500px.jpg)


## Steg 10.1 @unplugged

### Visualisere Yaw

Vi skal visualisere ``||variabel: yaw||`` på den nederste linjen på skjermen til micro:bit i det gule feltet.

![Visualisere-Yaw.jpg](https://i.postimg.cc/JnnMg1f5/Visualisere-Yaw.jpg)


## Steg 10.2

### Visualisere yaw

Settes inn i ``||logic: hvis-betingelsen||`` som vi lagde for ``||variabel: yaw||``.

- Når ``||variabel: yaw||`` er 0 skal det midterste lyset være på (2, 4). 

- Når vi holder fingeren mellom ``||pins: P0||`` og ``||pins: P1||``, skal lyset til venstre lyse (1, 4).

- Når vi holder fingeren mellom ``||pins: P1||`` og ``||pins: P2||``, skal lyset til høyre lyse (3, 4).

```blocks
basic.forever(function () {
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
})
```
![Visualisere-Yaw-500px.jpg](https://i.postimg.cc/RZHMZgdK/Visualisere-Yaw-500px.jpg)


## Steg 11

### Sette opp radio-kommunikasjon

For å sende ``||variabel: arm||``, ``||variabel: pitch||``, ``||variabel: roll||``, ``||variabel: throttle||`` og ``||variabel: yaw||`` til dronen skal vi bruke radio.

Det første vi skal gjøre er å lage en variabel: ``||variabel: radiogruppe||``.

Under ``||logic: ved start||``:

- Sett ``||variabel: radiogruppe||`` til gruppenummeret du har fått utdelt. (F.eks: 1). 

- Sett ``||radio: radio sett gruppe||`` til å være variabelen ``||variabel: radiogruppe||``.

- ``||basic: Vis tall||`` til å være ``||variabel: radiogruppe||``. (Fint å se hvilken radiogruppe som fjernkontrollen vår bruker.) 

```blocks
let radiogruppe = 1
radio.setGroup(radiogruppe)
basic.showNumber(radiogruppe)
```

## Steg 12

### Sende radio-melding (PARTY) til dronen

Nederst i ``||basic: gjenta for alltid||`` skal vi bruke en ``||radio: radio send verdi||`` for hver av variablene våre:

- Sett "name" til P og sende variabel ``||variabel: pitch||``

- Sett "name" til A og sende variabel ``||variabel: arm||``

- Sett "name" til R og sende variabel ``||variabel: roll||``

- Sett "name" til T og sende variabel ``||variabel: throttle||``

- Sett "name" til Y og sende variabel ``||variabel: yaw||``

```blocks
basic.forever(function () {
    radio.sendValue("P", pitch)
    radio.sendValue("A", arm)
    radio.sendValue("R", roll)
    radio.sendValue("T", throttle)
    radio.sendValue("Y", yaw)
})
```
## Steg 13.1 @unplugged

### Hele koden til fjernkontrollen

Du er nå ferdig med å programmere en micro:bit fjernkontroll for å styre dronen din!

Slik skal hele koden din se ut når du er ferdig!

![Full-kode-Airbit.png](https://i.postimg.cc/Z5c3S1Fn/Full-kode-Airbit.png)


## Steg 13.2

### Hele koden til fjernkontrollen

Du er nå ferdig med å programmere en micro:bit fjernkontroll for å styre dronen din!

Slik skal hele koden din se ut når du er ferdig!

![Full-kode-Airbit.png](https://i.postimg.cc/Z5c3S1Fn/Full-kode-Airbit.png)