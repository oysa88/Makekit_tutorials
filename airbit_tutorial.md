# Air:bit - Tutorial

## Steg 1.1

### Throttle

Lag variabelen ``||variabel: Throttle||``.

Bruk ``||input: knapp A||`` og ``||input: knapp B||`` til å endre ``||variabel: Throttle||``.

- For ``||input: når knapp A trykkes||``: Hvis ``||variabel: Throttle||`` er mindre enn 40, minske ``||variabel: Throttle||`` med -5, ellers minske ``||variabel: Throttle||`` med -1.

- For ``||input: når knapp B trykkes||``: Hvis ``||variabel: Throttle||`` er mindre enn 40, øke ``||variabel: Throttle||`` med +5, ellers øke ``||variabel: Throttle||`` med +1.

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
        Throttle += 5
    } else {
        Throttle += 1
    }
})
```

## Steg 1.2 

### Sette øvre og nedre grense på Throttle

Vi ønsker ikke at ``||variabel: Throttle||`` skal være mindre enn 0 eller større enn 100. Derfor må vi legge til en ``||logic: hvis-betingelse||`` som hindrer dette i å skje.

- Under ``||input: knapp A||``: Hvis ``||variabel: Throttle||`` er over (>) 100, skal ``||variabel: Throttle||`` settes lik 100.

- Under ``||input: knapp B||``: Hvis ``||variabel: Throttle||`` er over (<) 0, skal ``||variabel: Throttle||`` settes lik 0.

```blocks
input.onButtonPressed(Button.A, function () {
    if (Throttle < 40) {
        Throttle += -5
    } else {
        Throttle += -1
    }
    if (Throttle < 0) {
        Throttle = 0
    }
})
input.onButtonPressed(Button.B, function () {
    if (Throttle < 40) {
        Throttle += 5
    } else {
        Throttle += 1
    }
    if (Throttle > 100) {
        Throttle = 100
    }
})
```


## Steg 2

### Roll og Pitch

Med fjernkontrollen skal vi få dronen til å bevege seg fremover, bakover, mot høyre eller mot venstre. For å gjøre dette skal vi bruke ``||input: helningsvinkel||`` til micro:bit.

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

## Steg 3.1

### Arm 

Lag variabelen ``||variabel: Arm||``.

Vi skal lage en sikkerhetssperre som gjør at vi kan skru dronen av og på med fjernkontrollen vår. Variabelen ``||variabel: Arm||`` skal veksle mellom 0 og 1 hver gang ``||input: knapp A+B||`` trykkes inn.

Hvis ``||variabel: Arm||``= 0, skal ``||variabel: Arm||`` settes til 1 når ``||input: knapp A+B||`` trykkes inn. Ellers skal den settes til 0.

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

## Steg 3.2

### Arm sikkerhet

Om vi mister kontroll over dronen, glemmer vi fort å trykke ``||input: A+B||`` for å skru av dronen. Da er det enklere om vi kan riste på fjernkontrollen.

Bruk ``||input: når ristes||`` for å sette ``||variabel: Arm||`` og ``||variabel: Throttle||`` til 0. 

(Lag gjerne en lik funksjon til som gjør at du kan skru av dronen hvis fjernkontrollen snus rundt så skjermen på micro:bit er opp ned.)

```blocks
input.onGesture(Gesture.Shake, function () {
    Arm = 0
    Throttle = 0
})
input.onGesture(Gesture.ScreenDown, function () {
    Throttle = 0
    Arm = 0
})
```

## Steg 4

### Snu dronen rundt sin egen akse (Yaw)

Vi ønsker å få dronen til rotere sidelengs, slik at fronten kan peke i en annen retning.

Dette gjør vi å lage en variabel kalt ``||variabel: Yaw||``.

Vi har ikke flere knapper på micro:biten, så vi må finne en måte å løse dette på.

Heldigvis har vi noen gullkantede pins nederst på micro:biten. Ved å sette strøm på ``||pins: P1||``, kan vi ved å legge en finger mellom ``||pins: P0||`` og ``||pins: P1||`` sende strøm til ``||pins: P0||`` (Hint: Huden vår leder strøm). Samme kan vi gjøre med ``||pins: P2||`` også.

- Bruk analog write for å sende strøm ut på pinne ``||pins: P1||`` (verdi = 1023). Plasser den inn under ``||basic: ved start||``.

Oppgave: Lag en ``||logic: hvis-betingelse||`` som:

- Setter ``||variabel: Yaw||`` til -30 dersom man trykker til venstre (lese av ``||pins: analog P0||`` til over 500)

- Setter ``||variabel: Yaw||`` til 30 om vi trykker til høyre (lese av ``||pins: analog P2||`` til over 500)

- Setter ``||variabel: Yaw||`` til 0 om ingen strøm registreres (ikke noe trykk)

```blocks
basic.forever(function () {
    if (pins.analogReadPin(AnalogPin.P0) > 500) {
        Yaw = -30
    } else if (pins.analogReadPin(AnalogPin.P2) > 500) {
        Yaw = 30
    } else {
        Yaw = 0
    }
})
```

## Steg 5

### Visualisering på skjermen

Micro:bitens LED-display kan brukes til å vise styringsinformasjonen vi skal sende videre til dronen (PARTY). På den måten er det lett å se om vi har kodet riktig, og vi får en indikasjon på hvilke verdier vi sender videre.

Legg til en ``||basic: tøm skjerm||`` inn i  ``||basic: gjenta for alltid||``. Den skal gi oss en ren skjerm når vi skal vise ``||variabel: Arm||``, ``||variabel: Throttle||``, ``||variabel: Pitch/Roll||`` og ``||variabel: Yaw||``.

![Visualisere Skjerm](url)

```blocks
basic.forever(function () {
    basic.clearScreen()
})
```

## Steg 6 

### Visualisere Arm

Vi skal visualisere ``||variabel: Arm||`` ved å tenne lyset øverst i venstre hjørne (x=0, y=0) på skjermen til micro:biten.

Inne i  ``||basic: gjenta for alltid||``:

- Lag en ``||logic: hvis-betingelse||`` som sjekker om ``||variabel: Arm||`` = 1. 

- Hvis den er det, skal vi ``||led: tenne||`` (x=0, y=0).

![Visualisere Arm](url)

```blocks
basic.forever (function () {
    if (Arm == 1) {
        led.plot(0, 0)
    }
})
```

## Steg 7

### Visualisere Throttle

Vi skal visualisere ``||variabel: Throttle||`` oppover langs venstre side på skjermen til micro:biten.(Det blå området på bildet.)

``||variabel: Throttle||`` har en verdi mellom 0 og 100. Problemet med å vise det på skjermen er at koordinatene går fra 4 til 0. vi må derfor finne en måte å regne om dette på. 

Regnestykket vi må lage skal deles i to operasjoner. Svaret skal settes inn en ``||led: tenn (x, y)||``. (Regnestykket settes inn i for y).

- Lag et regnestykke: Hvis du setter inn ``||variabel: Throttle||`` fra tabellen under, skal svaret bli verdien i mellomregningen under. (Hvis ``||variabel: Throttle||`` er 100, skal du få 4 til svar, hvis ``||variabel: Throttle||`` er 50, skal du få 2 til svar, og hvis ``||variabel: Throttle||`` er 0, skal du få 0 til svar.)
 
- Utvid regnestykket: Her skal vi finne en måte å få mellomregningene våre til å bli riktig koordinat på skjermen. (Hvis mellomregningen er 0 skal vi få Koordinat 4 til svar, osv.)


| Throttle            ||||||||    0    ||||||||    50   ||||||||   100   |
| :------------------ |||||||| :-----: |||||||| :-----: |||||||| :-----: |
| Mellomregning       ||||||||    0    ||||||||    2    ||||||||    4    |
| Koordinat på skjerm ||||||||    4    ||||||||    2    ||||||||    0    |




![Visualisere Throttle](url)

```blocks
basic.forever(function () {
    led.plot(0, 4 - Throttle / 25)
})
```

## Steg 9

### Visualisere Roll/Pitch

Vinkelen til ``||variabel: Roll||`` og ``||variabel: Pitch||`` ligger mellom -45 grader og 45 grader. For å vise dette på skjermen vår, må vi regne om vinklene til koordinatene på skjermen som er mellom 0 og 4. 

Regnestykket vi må lage skal deles i to operasjoner. Svaret skal settes inn en ``||led: tenn (x, y)||``.

- Lag et regnestykke: Hvis du setter inn helningsvinkelen i tabellen under, skal svaret bli verdien i mellomregningen under. (Hvis ``||input: helningsvinkel||`` er -45 grader, skal svaret bli 0, hvis ``||input: helningsvinkel||`` er 0 grader, skal svaret bli 45, og hvis ``||input: helningsvinkel||`` er 45 grader, skal svaret bli 90.)
 
- Utvid regnestykket: Her skal vi finne en måte å få mellomregningene våre til å bli riktig koordinat på skjermen. (Hvis mellomregningen er 0 skal vi få Koordinat 0 til svar, osv.

NB: Husk at ``||variabel: Roll||`` er i x-retningen og ``||variabel: Pitch||`` er i y-retningen.

| Helningsvinkel        ||||||||   -45   ||||||||     0   ||||||||   45    |
| :-------------------- |||||||| :-----: |||||||| :-----: |||||||| :-----: |
| Mellomregning         ||||||||    0    ||||||||    45   ||||||||   90    |
| Koordinat på skjerm   ||||||||    0    ||||||||     2   ||||||||    4    |


```blocks
basic.forever(function () {
    led.plot((45 + Roll) / 22.5, (45 + Pitch) / 22.5)
})
```

## Steg 10

### Visualisere Yaw

Vi skal visualisere ``||variabel: Yaw||`` på den nesderste linja på skjermen til micro:bit. 

Settes inn i ``||logic: hvis-betingelsen||`` som vi lagde for ``||variabel: Yaw||``.

- Når ``||variabel: Yaw||`` er 0 skal det midterste lyset være på (2, 4). 

- Når vi holder fingeren mellom ``||pins: P0||`` og ``||pins: P1||``, skal lyset til venstre lyse (1, 4).

- Når vi holder fingeren mellom ``||pins: P1||`` og ``||pins: P2||``, skal lyset til høyre lyse (3, 4).

```blocks
basic.forever(function () {
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
})
```

## Steg 11

### Sette opp radio-kommunikasjon

For å sende ``||variabel: Arm||``, ``||variabel: Pitch||``, ``||variabel: Roll||``, ``||variabel: Throttle||`` og ``||variabel: Yaw||`` til dronen skal vi bruke radio.

Det første vi skal gjøre er å lage en variabel: ``||variabel: Radiogruppe||``.

Under ``||logic: ved start||``:

- Sett ``||variabel: Radiogruppe||`` til gruppenummeret du har fått utdelt. (F.eks: 1)

- Sett ``||radio: radio sett gruppe||`` til å være variabelen ``||variabel: Radiogruppe||``.

- ``||basic: Vis tall||`` til å være ``||variabel: Radiogruppe||``. (Fint å se hvilken radiogruppe som fjernkontrollen vår bruker.) 

```blocks
let Radiogruppe = 10
set.radioGroup(Radiogruppe)
basic.showNumber(Radiogruppe)
```

## Steg 12 @fullscreen

### Sende radio-melding (PARTY) til dronen

Nederst i ``||basic: gjenta for alltid||`` skal vi bruke en ``||radio: radio send verdi||`` for hver av variablene våre:

- Sett "name" til P og sende variabel ``||variabel: Pitch||``

- Sett "name" til A og sende variabel ``||variabel: Arm||``

- Sett "name" til R og sende variabel ``||variabel: Roll||``

- Sett "name" til T og sende variabel ``||variabel: Throttle||``

- Sett "name" til Y og sende variabel ``||variabel: Yaw||``

```blocks
basic.forever(function () {
    radio.sendValue("P", Pitch)
    radio.sendValue("A", Arm)
    radio.sendValue("R", Roll)
    radio.sendValue("T", Throttle)
    radio.sendValue("Y", Yaw)
})
```
## Steg 13 @unplugged

### Hele koden til fjernkontrollen

Du er nå ferdig med å programmere en micro:bit fjernkontroll for å styre dronen din!

Slik skal hele koden din se ut når du er ferdig!

```blocks
input.onButtonPressed(Button.A, function () {
    if (Throttle < 40) {
        Throttle += -5
    } else {
        Throttle += -1
    }
    if (Throttle < 0) {
        Throttle = 0
    }
})
input.onGesture(Gesture.Shake, function () {
    Arm = 0
    Throttle = 0
})
input.onButtonPressed(Button.AB, function () {
    if (Arm == 0) {
        Arm = 1
    } else {
        Arm = 0
    }
    Throttle = 0
})
input.onButtonPressed(Button.B, function () {
    if (Throttle < 40) {
        Throttle += 5
    } else {
        Throttle += 1
    }
    if (Throttle > 100) {
        Throttle = 100
    }
})
let Yaw = 0
let Pitch = 0
let Roll = 0
let Arm = 0
let Throttle = 0
let Radiogruppe = 10
pins.analogWritePin(AnalogPin.P1, 1023)
radio.setGroup(Radiogruppe)
basic.showNumber(Radiogruppe)
basic.forever(function () {
    Roll = input.rotation(Rotation.Roll)
    Pitch = input.rotation(Rotation.Pitch)
    basic.clearScreen()
    if (Arm == 1) {
        led.plot(0, 0)
    }
    led.plot(0, Math.map(Throttle, 0, 100, 4, 0))
    led.plot(0, 4 - Throttle / 25)
    led.plot(Math.map(Roll, -45, 45, 0, 4), Math.map(Pitch, -45, 45, 0, 4))
    led.plot((45 + Roll) / 22.5, (45 + Pitch) / 22.5)
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
    radio.sendValue("P", Pitch)
    radio.sendValue("A", Arm)
    radio.sendValue("R", Roll)
    radio.sendValue("T", Throttle)
    radio.sendValue("Y", Yaw)
})

```
