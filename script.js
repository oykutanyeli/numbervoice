let array = [];
const voicesPath = "assets/voices/";
let audios = [];
let audio;

function read(number) {
    if (!!audio)
        audio.pause();
    array = [];
    audios = [];

    // sayıyı string e çevirme
    let value = number.toString();

    if (value === "0") {
        audio = new Audio(voicesPath.concat("sifir.ogg"));
        audio.preload = "metadata";
        audio.onloadedmetadata = () => {
            audio.play();
        }
        return;
    }
    else {
        while (value.length !== 1 && value[0] === "0") {
            value = value.substring(1);
        }
    }

    // sayının karakter sayısı
    let length = value.length;

    // sayı 3'e bölündüğünde çıkan sonuç
    let devisionThree = Math.ceil(length / 3);

    // sayı 3'e bölündüğünde kalan
    let remainderOfDevision = length % 3;
    if (remainderOfDevision === 0)
        remainderOfDevision = 3;

    for (let i = devisionThree; i > 0; --i) {
        let splitedNum = ""
        if ((devisionThree > 1 && devisionThree === i) || devisionThree === 1) {
            for (let j = 0; j < remainderOfDevision; j++) {
                splitedNum += value[j];
                length -= 1;
            }
            value = value.substring(remainderOfDevision);
        }
        else {
            for (let i = 0; i < 3; i++) {
                splitedNum += value[i];
                length -= 1;
            }
            value = value.substring(3);
        }
        array.push(splitedNum);
    }

    readNumber();

    playAudio(audios)
}

function readNumber() {
    array.forEach((item, i) => {
        if (item.length % 3 === 0) {
            readHoundres(item[0])
            readTens(item[1])
            readFigures(item[2])
            if (array.length > 1 && i + 1 !== array.length) {
                readZeros(array.length - i - 1)
            }
        }
        else if (item.length % 3 === 2) {
            readTens(item[0]);
            readFigures(item[1])
            if (array.length > 1 && i + 1 !== array.length) {
                readZeros(array.length - i - 1)
            }
        }
        else {
            if (array.length > 1 && i + 1 !== array.length) {
                if (!(array.length - i - 1 === 1 && item[0] === "1")) {
                    readFigures(item[0])
                }
                readZeros(array.length - i - 1)
            }
            else {
                readFigures(item[0])
            }
        }
    });
}

function readHoundres(item) {
    switch (Number(item)) {
        case 2:
            audios.push("iki.ogg")
            break;
        case 3:
            audios.push("uc.ogg")
            break;
        case 4:
            audios.push("dort.ogg")
            break;
        case 5:
            audios.push("bes.ogg")
            break;
        case 6:
            audios.push("alti.ogg")
            break;
        case 7:
            audios.push("yedi.ogg")
            break;
        case 8:
            audios.push("sekiz.ogg")
            break;
        case 9:
            audios.push("dokuz.ogg")
            break;

        default:
            break;
    }
    if (Number(item) != 0)
        audios.push("yuz.ogg")
}

function readTens(item) {
    switch (Number(item)) {
        case 1:
            audios.push("on.ogg")
            break;
        case 2:
            audios.push("yirmi.ogg")
            break;
        case 3:
            audios.push("otuz.ogg")
            break;
        case 4:
            audios.push("kirk.ogg")
            break;
        case 5:
            audios.push("elli.ogg")
            break;
        case 6:
            audios.push("altmis.ogg")
            break;
        case 7:
            audios.push("yetmis.ogg")
            break;
        case 8:
            audios.push("seksen.ogg")
            break;
        case 9:
            audios.push("doksan.ogg")
            break;

        default:
            break;
    }
}

function readFigures(item) {
    switch (Number(item)) {
        case 1:
            audios.push("bir.ogg")
            break;
        case 2:
            audios.push("iki.ogg")
            break;
        case 3:
            audios.push("uc.ogg")
            break;
        case 4:
            audios.push("dort.ogg")
            break;
        case 5:
            audios.push("bes.ogg")
            break;
        case 6:
            audios.push("alti.ogg")
            break;
        case 7:
            audios.push("yedi.ogg")
            break;
        case 8:
            audios.push("sekiz.ogg")
            break;
        case 9:
            audios.push("dokuz.ogg")
            break;

        default:
            break;
    }
}

function readZeros(index) {
    audios.push(index.toString().concat(".ogg"));
}

function playAudio() {
    callAudio(0);
}

async function callAudio(i) {
    let index = i;
    const element = audios[index];
    audio = new Audio(voicesPath.concat(element));
    audio.preload = "metadata";
    audio.onloadedmetadata = async function () {
        audio.play();
        index += 1;
        await delay(audio.duration).then(async () => {
            if (index < audios.length)
                await callAudio(index);
        })
    };
}

async function delay(duration) {
    return await new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve("anything");
        }, duration * 1000);
    });
}

function onAudioEnded() {
    alert("It's over!!");
};
