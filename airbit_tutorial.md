# Air:bit - Tutorial

### diffs true

## Steg 1 @unplugged

### Sette opp radio-kommunikasjon

Fjernkontrollen vi skal programmere skal sende forskjellige radiosignaler til dronen. Nå skal vi sette opp dette.

![Airbit-radiokommunikasjon.gif](https://i.postimg.cc/bwLD0NTb/Airbit-radiokommunikasjon.gif)


## Steg 1.1

### Sette opp radio-kommunikasjon

Under ``||variabel: Variabler||``, velg "Lag en variabel" som du kaller ``||variabel: Radiogruppe||``. 

Inni blokken ``||basic: ved start||``:

- Sett ``||variabel: Radiogruppe||`` til gruppenummeret du har fått utdelt. (F.eks: 1). 

- Sett ``||radio: radio sett gruppe||`` til å være variabelen ``||variabel: Radiogruppe||``.

- Sett ``||basic: vis tall||`` til å være ``||variabel: Radiogruppe||``. (Fint å se hvilken radiogruppe som fjernkontrollen vår bruker.) 

``||math: Last ned||`` koden din til micro:biten på fjernkontrollen. Sjekk at ``||radio: radiogruppe||`` vises på skjermen ved oppstart.

```blocks
let Radiogruppe = 1
radio.setGroup(Radiogruppe)
basic.showNumber(Radiogruppe)
```


## Steg 2 Throttle @unplugged

### Throttle

Vi skal bruke Throttle for å gi mer eller mindre kraft til motorene. Jo mer Throttle, jo mer kraft får motorene.

![Drone-Throttle-bla-500px.jpg](https://i.postimg.cc/yNkWPWDK/Drone-Throttle-bla-500px.jpg)


## Steg 2.1

### Throttle

Lag variabelen ``||variabel: Throttle||``.

Bruk ``||input: knapp A||`` og ``||input: knapp B||`` til å endre ``||variabel: Throttle||``.

- ``||input: Når knapp A trykkes||``: Endre ``||variabel: Throttle||`` med -5.

- ``||input: Når knapp B trykkes||``: Endre ``||variabel: Throttle||`` med +5.

(Ekstraoppgave: Dette vil gjøre kontrolleringen av dronen mye mer nøyaktig! Få ``||variabel: Throttle||`` til å endre seg med +-1 når ``||variabel: Throttle||`` er større enn (>) 40.)

```blocks
let Throttle = 0
input.onButtonPressed(Button.A, function () {
    Throttle += -5
})
input.onButtonPressed(Button.B, function () {
    Throttle += 5
})
```
Ekstraoppgave:
```blocks
let Throttle = 0
input.onButtonPressed(Button.A, function () {
    if (Throttle < 40) {
        Throttle += -1
    } else {
        Throttle += -5
    }
})
input.onButtonPressed(Button.B, function () {
    if (Throttle < 40) {
        Throttle += 1
    } else {
        Throttle += 5
    }
})
```

## Steg 2.2 

### Sette øvre og nedre grense på Throttle

Vi ønsker ikke at ``||variabel: Throttle||`` skal få ha en verdi mindre enn 0 eller større enn 100. Derfor må vi legge til en ``||logic: hvis-betingelse||`` som hindrer dette i å skje.

- Under ``||input: knapp A||``: Hvis ``||variabel: Throttle||`` er mindre enn (<) 0, skal ``||variabel: Throttle||`` settes lik 0.
- Under ``||input: knapp B||``: Hvis ``||variabel: Throttle||`` er større enn (>) 100, skal ``||variabel: Throttle||`` settes lik 100.

```blocks
input.onButtonPressed(Button.A, function () {
    Throttle += -5
    if (Throttle < 0) {
        Throttle = 0
    }
})
input.onButtonPressed(Button.B, function () {
    Throttle += 5
    if (Throttle > 100) {
        Throttle = 100
    }
})
```

## Steg 2.3

### Teste Throttle

Vi skal sjekke at ``||variabel: Throttle||`` endres riktig når du trykker på knappene ``||input: A||`` og ``||input: B||``.

Inne i en ``||basic: gjenta for alltid||``: Sett ``||basic: vis tall||`` til å vise ``||variabel: Throttle||``.

``||math: Last ned||`` koden din til micro:biten på fjernkontrollen. Sjekk at verdien til ``||variabel: Throttle||`` kan endres med knapp ``||input: A||`` og ``||input: B||``.

(Hvis alt funker: Slett ``||basic: vis tall||`` til å vise ``||variabel: Throttle||`` fra ``||basic: gjenta for alltid||``.)


```blocks
basic.forever(function () {
    basic.showNumber(Throttle)
})
```


## Steg 2.4 @unplugged

### Visualisere Throttle

Vi skal nå visualisere ``||variabel: Throttle||`` på skjermen til micro:biten. 

Fordi at vi skal kunne vise flere ting på skjermen vår samtidig, kan vi ikke vise talletverdien til ``||variabel: Throttle||``. Vi skal vise det som en søyle oppover langs venstre side på skjermen vår. (Det blå området på bildet.)

![Visualisere-Throttle-500px.jpg](https://i.postimg.cc/kXZJC0Q7/Visualisere-Throttle-500px.jpg)


## Steg 2.5

### Visualisere Throttle

Variabelen ``||variabel: Throttle||`` har en verdi mellom 0 og 100. Problemet med å vise det på skjermen er at koordinatene går fra 4 til 0. vi må derfor finne en måte å regne om dette på. 

Regnestykket vi må lage kan deles opp i to operasjoner. Svaret skal settes inn en ``||led: tenn (x, y)||``. (Regnestykket settes inn for y).

- Lag et regnestykke: Hvis du setter inn ``||variabel: Throttle||`` fra tabellen under, skal svaret bli verdien i mellomregningen under. (Hvis ``||variabel: Throttle||`` er 100, skal du få 4 til svar, hvis ``||variabel: Throttle||`` er 50, skal du få 2 til svar, og hvis ``||variabel: Throttle||`` er 0, skal du få 0 til svar.)
 
- Utvid regnestykket: Her skal vi finne en måte å få mellomregningene våre til å bli riktig koordinat på skjermen. (Hvis mellomregningen er 0 skal vi få Koordinat 4 til svar, osv.)

- Legg til en ``||basic: tøm skjerm||`` øverst i ``||basic: gjenta for alltid||``.


| Throttle            ||||||||    0    ||||||||    50   ||||||||   100   |
| :------------------ |||||||| :-----: |||||||| :-----: |||||||| :-----: |
| Mellomregning       ||||||||    0    ||||||||    2    ||||||||    4    |
| Koordinat på skjerm ||||||||    4    ||||||||    2    ||||||||    0    |


```blocks
basic.forever(function () {
    basic.clearScreen()
    led.plot(0, 4 - Throttle / 25)
})
```
![Visualisere-Throttle-500px.jpg](https://i.postimg.cc/kXZJC0Q7/Visualisere-Throttle-500px.jpg)


## Steg 2.6 @unplugged

### Teste visualieringen av Throttle 

``||math: Last ned||`` koden din til micro:biten på fjernkontrollen. Se om ``||variabel: Throttle||`` endrer seg på skjermen når du trykker på ``||input: A||`` og ``||input: B||``.

![Throttle-Test-bilde-500px.png](https://i.postimg.cc/8CMKdB1J/Throttle-Test-bilde-500px.png)


## Steg 2.6

### Last ned koden

Test koden din. (Se i hint hvordan koden du har laget så langt skal se ut.)

```blocks
let Radiogruppe = 1
radio.setGroup(Radiogruppe)
basic.showNumber(Radiogruppe)
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
basic.forever(function () {
    basic.clearScreen()
    led.plot(0, 4 - Throttle / 25)
})
```


## Steg 3.1 @unplugged

### Roll/Pitch

Med fjernkontrollen skal vi få dronen til å bevege seg forover eller bakover (pitch), og mot høyre eller mot venstre (roll). For å gjøre dette skal vi bruke ``||input: helningsvinkel||`` til micro:bit.

![Drone-Pitch-Roll-500px.jpg](https://i.postimg.cc/BZc6CM1J/Drone-Pitch-Roll-500px.jpg)


## Steg 3.2

### Roll/Pitch

Lag variablene: ``||variabel: Roll||`` og ``||variabel: Pitch||``.

Settes inn i ``||basic: gjenta for alltid||``:

- Sett ``||variabel: Roll||`` til å lese verdien fra ``||input: helningsvinkel: høyre-venstre||``.

- Sett ``||variabel: Pitch||`` til å lese verdien fra ``||input: helningsvinkel: forover-bakover||``.

```blocks
basic.forever(function () {
    Roll = input.rotation(Rotation.Roll)
    Pitch = input.rotation(Rotation.Pitch)
})
```
![Drone-Pitch-Roll-500px.jpg](https://i.postimg.cc/BZc6CM1J/Drone-Pitch-Roll-500px.jpg)


## Steg 3.3 @unplugged

### Visualisere Roll/Pitch

Vi skal vise ``||variabel: Roll||`` og ``||variabel: Pitch||`` i det røde området. Når fjernkontrollen holdes vannrett, skal vi ``||led: tenne (x = 2, y = 2)||``.

![Visualisere-Pitch-Roll-500px.jpg](https://i.postimg.cc/8cX1j3xB/Visualisere-Pitch-Roll-500px.jpg)


## Steg 3.4

### Visualisere Roll/Pitch

Vinkelen til ``||variabel: Roll||`` og ``||variabel: Pitch||`` ligger mellom -45 grader og 45 grader. For å vise dette på skjermen vår, må vi regne om vinklene til koordinatene på skjermen som er mellom 0 og 4. 

Regnestykket vi må lage kan deles opp i to operasjoner. Svaret skal settes inn i en ``||led: tenn (x, y)||``.

- Lag et regnestykke: Hvis du setter inn helningsvinkelen i tabellen under, skal svaret bli verdien i mellomregningen under. (Hvis ``||input: helningsvinkel||`` er -45 grader, skal svaret bli 0, hvis ``||input: helningsvinkel||`` er 0 grader, skal svaret bli 45, og hvis ``||input: helningsvinkel||`` er 45 grader, skal svaret bli 90.)
 
- Utvid regnestykket: Her skal vi finne en måte å få mellomregningene våre til å gi riktig koordinat på skjermen. (Hvis mellomregningen er 0 skal vi få Koordinat 0 til svar, osv.

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
![Visualisere-Pitch-Roll-500px.jpg](https://i.postimg.cc/8cX1j3xB/Visualisere-Pitch-Roll-500px.jpg)

## Steg 3.5 @unplugged

### Teste Visualiseringen til Roll/Pitch

``||math: Last ned||`` koden din til micro:biten på fjernkontrollen. Se om prikken på skjermen beveger seg rundt når du beveger på fjernkontrollen.


## Steg 3.6

### Last ned koden

Test koden din. (Se i hint hvordan koden du har laget så langt skal se ut.

```blocks
let Radiogruppe = 1
radio.setGroup(Radiogruppe)
basic.showNumber(Radiogruppe)
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
basic.forever(function () {
    Roll = input.rotation(Rotation.Roll)
    Pitch = input.rotation(Rotation.Pitch)
    basic.clearScreen()
    led.plot(0, 4 - Throttle / 25)
    led.plot((45 + Roll) / 22.5, (45 + Pitch) / 22.5)
})
```


## Steg 4.1 @unplugged

### Armere dronen 

Vi skal lage en sikkerhetssperre som gjør at vi kan skru dronen av og på med fjernkontrollen vår. 

| ![Drone-Desarmert-500px.jpg](https://i.postimg.cc/KzNcy4NW/Drone-Desarmert-500px.jpg) | ![Drone-Armert-og-Desarmert-500px.jpg](https://i.postimg.cc/XYGvyjjZ/Drone-Armert-og-Desarmert-500px.jpg) |
| :-----: | :-----: |
| Drone Desarmert |    Drone Armert    |


## Steg 4.2

### Arm

Lag variabelen ``||variabel: Arm||``. Variabelen ``||variabel: Arm||`` skal veksle mellom 0 og 1 hver gang ``||input: knapp A+B trykkes||`` inn.

Hvis ``||variabel: Arm||`` = 0, skal ``||variabel: Arm||`` settes til 1 når ``||input: knapp A+B||`` trykkes inn. Ellers skal den settes til 0.

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

## Steg 4.3

### Arm-sikkerhet

Om vi mister kontroll over dronen, glemmer vi fort å trykke ``||input: A+B||`` for å skru av dronen. Da er det enklere om vi kan riste på fjernkontrollen.

Bruk ``||input: når ristes||`` for å sette ``||variabel: Throttle||`` og ``||variabel: Arm||`` til 0. 

(Lag gjerne en lik funksjon til som gjør at du kan skru av dronen hvis fjernkontrollen snus rundt så skjermen på micro:bit er opp ned.)

```blocks
input.onGesture(Gesture.Shake, function () {
    Throttle = 0
    Arm = 0
})
input.onGesture(Gesture.ScreenDown, function () {
    Throttle = 0
    Arm = 0
})
```

## Steg 4.4 @unplugged

### Visualisere Arm

Vi skal visualisere ``||variabel: Arm||`` ved å tenne lyset øverst i venstre hjørne (x = 0, y = 0) på skjermen til micro:biten. 

Punket skal lyse når er ``||variabel: Arm||`` er på og være slukket når ``||variabel: Arm||`` er av.

![Visualisere-Arm-500px.jpg](https://i.postimg.cc/Wz1NpjY1/Visualisere-Arm-500px.jpg)


## Steg 4.5

### Visualisere Arm 

Settes inne i  ``||basic: gjenta for alltid||``:

- Lag en ``||logic: hvis-betingelse||`` som sjekker om ``||variabel: Arm||`` = 1. 

- Hvis den er det, skal vi ``||led: tenne||`` (x = 0, y = 0). Blokken ``||basic: tøm skjerm||`` sørger for at LED skrus av hvis ``||variabel: Arm||`` = 0.


```blocks
basic.forever (function () {
    if (Arm == 1) {
        led.plot(0, 0)
    }
})
```
![Visualisere-Arm-500px.jpg](https://i.postimg.cc/Wz1NpjY1/Visualisere-Arm-500px.jpg)


## Steg 4.6 @unplugged

### Teste Visualiseringen til Arm

``||math: Last ned||`` koden din til micro:biten på fjernkontrollen. Se om prikken øverst i venstre hjørne på skjermen skrur seg av og på når du trykker inn ``||input: A+B||``.


## Steg 4.7

### Last ned koden

Test koden din. (Se i hint hvordan koden du har laget så langt skal se ut.

```blocks
let Radiogruppe = 1
radio.setGroup(Radiogruppe)
basic.showNumber(Radiogruppe)
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
input.onButtonPressed(Button.AB, function () {
    if (Arm == 0) {
        Arm = 1
    } else {
        Arm = 0
    }
    Throttle = 0
})
input.onGesture(Gesture.Shake, function () {
    Throttle = 0
    Arm = 0
})
input.onGesture(Gesture.ScreenDown, function () {
    Throttle = 0
    Arm = 0
})
basic.forever(function () {
    Roll = input.rotation(Rotation.Roll)
    Pitch = input.rotation(Rotation.Pitch)
    basic.clearScreen()
    if (Arm == 1) {
        led.plot(0, 0)
    }
    led.plot(0, 4 - Throttle / 25)
    led.plot((45 + Roll) / 22.5, (45 + Pitch) / 22.5)
})
```


## Steg 5.1 @unplugged

### Snu dronen rundt sin egen akse (Yaw)

Vi ønsker å få dronen til rotere sidelengs, slik at fronten kan peke i en annen retning.

![Drone-Yaw-500px.jpg](https://i.postimg.cc/tTGq3xq1/Drone-Yaw-500px.jpg)


## Steg 5.2

### Snu dronen rundt sin egen akse (Yaw)

Vi ønsker å få dronen til rotere sidelengs, slik at fronten kan peke i en annen retning. Dette gjør vi å lage en variabel kalt ``||variabel: Yaw||``.

Vi har ikke flere knapper på micro:biten, så vi må finne en måte å løse dette på. Heldigvis har vi noen gullkantede kontaktpunkter nederst på micro:biten. 

Ved å sette strøm på ``||pins: P1||``, kan vi ved å legge en finger mellom ``||pins: P0||`` og ``||pins: P1||``, sende strøm til ``||pins: P0||`` (Hint: Huden vår leder strøm). Samme kan vi gjøre med ``||pins: P2||`` også.

- Bruk ``||pins: skriv analog verdi||`` (som du finner under avansert - tilkobling) for å sende strøm ut på pinne ``||pins: P1||`` (verdi = 1023). Plasser den nederst i ``||basic: ved start||``.

Oppgave: Lag en ``||logic: hvis-betingelse||`` som settes inn i ``||basic: gjenta for alltid||``:

- Sett ``||variabel: Yaw||`` til -30 hvis man trykker til venstre (lese av ``||pins: analog P0||`` til over 500)

- Sett ``||variabel: Yaw||`` til 30 hvis man trykker til høyre (lese av ``||pins: analog P2||`` til over 500)

- Ellers sett ``||variabel: Yaw||`` til 0 hvis ingen strøm registreres (ikke noe trykk)

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
![Drone-Yaw-500px.jpg](https://i.postimg.cc/tTGq3xq1/Drone-Yaw-500px.jpg)


## Steg 5.3 @unplugged

### Visualisere Yaw

Vi skal visualisere ``||variabel: Yaw||`` på den nederste linjen på skjermen til micro:bit i det gule feltet.

![Visualisere-Yaw-500px.jpg](https://i.postimg.cc/RZHMZgdK/Visualisere-Yaw-500px.jpg)


## Steg 5.4

### Visualisere Yaw

Settes inn i ``||logic: hvis-betingelsen||`` som vi lagde for ``||variabel: Yaw||``.

- Når ``||variabel: Yaw||`` er 0 skal det midterste lyset være på (2, 4). 

- Når vi holder fingeren mellom ``||pins: P0||`` og ``||pins: P1||``, skal lyset til venstre lyse (1, 4).

- Når vi holder fingeren mellom ``||pins: P1||`` og ``||pins: P2||``, skal lyset til høyre lyse (3, 4).

```blocks
pins.analogWritePin(AnalogPin.P1, 1023)
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
![Visualisere-Yaw-500px.jpg](https://i.postimg.cc/RZHMZgdK/Visualisere-Yaw-500px.jpg)



## Steg 5.5 @unplugged

### Teste Visualiseringen til Yaw

``||math: Last ned||`` koden din til micro:biten på fjernkontrollen. Se om prikken på nederste rad på skjermen beveger seg til venstre når du holder fingeren mellom ``||pins: P0||`` og ``||pins: P1||`` på kantkontaktene, og til høyre når du holder fingeren mellom ``||pins: P1||`` og ``||pins: P2||``.


## Steg 5.6

### Last ned koden

Test koden din. (Se i hint hvordan koden du har laget så langt skal se ut.

```blocks
let Radiogruppe = 1
radio.setGroup(Radiogruppe)
basic.showNumber(Radiogruppe)
pins.analogWritePin(AnalogPin.P1, 1023)
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
input.onButtonPressed(Button.AB, function () {
    if (Arm == 0) {
        Arm = 1
    } else {
        Arm = 0
    }
    Throttle = 0
})
input.onGesture(Gesture.Shake, function () {
    Throttle = 0
    Arm = 0
})
input.onGesture(Gesture.ScreenDown, function () {
    Throttle = 0
    Arm = 0
})
basic.forever(function () {
    Roll = input.rotation(Rotation.Roll)
    Pitch = input.rotation(Rotation.Pitch)
    basic.clearScreen()
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
    if (Arm == 1) {
        led.plot(0, 0)
    }
    led.plot(0, 4 - Throttle / 25)
    led.plot((45 + Roll) / 22.5, (45 + Pitch) / 22.5)
})
```

## Steg 6

### Sende radio-melding (PARTY) til dronen

Vi skal sende ``||variabel: Arm||``, ``||variabel: Pitch||``, ``||variabel: Roll||``, ``||variabel: Throttle||`` og ``||variabel: Yaw||`` til dronen med radio.

Nederst i ``||basic: gjenta for alltid||`` skal vi sette inn en ``||radio: radio send verdi||`` for hver av variablene våre:

- Sett "name" til P og sende variabel ``||variabel: Pitch||`` som verdi.

- Sett "name" til A og sende variabel ``||variabel: Arm||`` som verdi.

- Sett "name" til R og sende variabel ``||variabel: Roll||`` som verdi.

- Sett "name" til T og sende variabel ``||variabel: Throttle||`` som verdi.

- Sett "name" til Y og sende variabel ``||variabel: Yaw||`` som verdi.

```blocks
basic.forever(function () {
    radio.sendValue("P", Pitch)
    radio.sendValue("A", Arm)
    radio.sendValue("R", Roll)
    radio.sendValue("T", Throttle)
    radio.sendValue("Y", Yaw)
})
```
## Steg 13.1 @unplugged

### Hele koden til fjernkontrollen

Gratulerer! Du er nå ferdig med å programmere fjernkontrollen som skal styre dronen din!

Slik skal hele koden din se ut når du er ferdig!

![Full-kode-Airbit.png](https://i.postimg.cc/L5JLr8L1/Full-kode-Airbit.png)


## Steg 13.2

### Laste ned koden din og fly dronen!

``||math: Last ned||`` koden til micro:biten på fjernkontrollen og test at alt funker!
 

![Full-kode-Airbit.png](https://i.postimg.cc/L5JLr8L1/Full-kode-Airbit.png)

#### Ekstrablokker

```blocks
function Yaw () {
	
} 
for (let index = 0; index < 0 % Math.map(0, 0, 1023, 0, 4); index++) {
	
}
while (true && false) {
	
}
Yaw()
basic.showNumber(pins.map(
0,
0,
1023,
0,
4
))
radio.setTransmitPower(7)
led.toggle(0, 0)
led.unplot(0, 0)
led.plotBrightness(0, 0, 255)
```

<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>