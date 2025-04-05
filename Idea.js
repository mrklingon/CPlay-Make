function showDecimal (val: number) {
    if (0 > val) {
        img = Colors.Red
    } else {
        img = Colors.Blue
    }
    sign = convertToText(val)
    for (let index = 0; index <= sign.length - 1; index++) {
        c = sign.substr(index, 1)
        light.setAll(0x000000)
        if ("-" == c) {
            img = Colors.Red
        } else {
            if ("." == c) {
                light.setAll(0xffff00)
            } else {
                if ("0" == c) {
                    light.setAll(0xffffff)
                } else {
                    xx = 0
                    while (xx < parseFloat(c)) {
                        light.setPixelColor(xx, img)
                        xx += 1
                    }
                }
            }
        }
        pause(500)
    }
    pause(1000)
    light.setAll(0x000000)
}
function shoNum (value: number, position: number, color2: number, pause2: number) {
    x = value
    p = position
    bits = 0
    light.setPixelColor(position, 0x999999)
    while (0 < x) {
        if (Math.trunc(x / 2) == x / 2) {
            light.setPixelColor(p, 0x999999)
        } else {
            light.setPixelColor(p, color2)
        }
        p += 1
        x = Math.trunc(x / 2)
        bits += 1
    }
    pause(pause2)
    for (let index = 0; index <= bits - 1; index++) {
        light.setPixelColor(position + index, 0x000000)
    }
}
// translate text, display in Morse
function doCode (inputxt: string) {
    encrypt(inputxt)
    for (let index2 = 0; index2 <= code.length - 1; index2++) {
        char = code.substr(index2, 1)
        if (char == ".") {
            dot()
        }
        if (char == "-") {
            dash()
        }
        if (char == " ") {
            space()
        }
    }
}
function encrypt (text: string) {
    code = ""
    for (let index22 = 0; index22 <= text.length - 1; index22++) {
        char = text.substr(index22, 1)
        enc = alphabet.indexOf(char)
        if (-1 < enc) {
            code = "" + code + morse[enc] + " "
        } else {
            code = "" + code + " "
        }
    }
}
function space () {
    light.setAll(0x000000)
    light.showRing(
    `black black black purple purple purple purple black black black`
    )
    pause(100)
    light.setAll(0x000000)
}
function dash () {
    light.setAll(0x000000)
    light.showRing(
    `blue blue blue black black black black blue blue blue`
    )
    music.playTone(262, music.beat(BeatFraction.Half))
    light.setAll(0x000000)
}
function dot () {
    light.setAll(0x000000)
    light.showRing(
    `yellow black black black black black black black black yellow`
    )
    music.playTone(523, music.beat(BeatFraction.Quarter))
    light.setAll(0x000000)
}
input.buttonB.onEvent(ButtonEvent.Click, function () {
    for (let index3 = 0; index3 <= 63; index3++) {
        shoNum(index3, 0, Colors.Green, 50)
    }
})
function initMorse () {
    morse = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--..", ".----", "..---", "...--", "....-", ".....", "-....", "--...", "---..", "----.", "-----", "/"]
    alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", " "]
}
input.touchA1.onEvent(ButtonEvent.Click, function () {
    showDecimal(22 / 7)
})
input.buttonA.onEvent(ButtonEvent.Click, function () {
    doCode("shalom")
})
input.touchA2.onEvent(ButtonEvent.Click, function () {
    showDecimal(3.14)
})
input.touchA3.onEvent(ButtonEvent.Click, function () {
    showDecimal(-42)
})
let morse: string[] = []
let alphabet: string[] = []
let enc = 0
let char = ""
let code = ""
let bits = 0
let p = 0
let x = 0
let xx = 0
let c = ""
let sign = ""
let img = 0
light.showAnimation(light.rainbowAnimation, 500)
initMorse()
doCode("hello")
