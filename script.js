$(function () {
    var body = $('body'),
        stage = $('#stage'),
        back = $('a.start');

    // ================================== page 1 ================================== //
    $('#page1 .encrypt').on("click", function () {
        body.attr('class', 'encrypt');
        page(2);
    });
    $('#page1 .decrypt').click(function () {
        body.attr('class', 'decrypt');
        page(2);
    });

    // ================================== page 2 ================================== //
    $('#page2 .button').click(function () {
        $(this).parent().find('input').click()
    });

    var file = null;

    $('#page2').on('change', '#encrypt-input', function (in_file) {

        file = in_file.target.files;

        if (file.length != 1) {
            alert('Please select a file to encrypt!!');
            return false;
        } else {
            alert('The file "' + file[0].name + '" has been selected.');
            page(3);
        }
    });

    $('#page2').on('change', '#decrypt-input', function (in_file) {

        file = in_file.target.files;

        if (file.length != 1) {
            alert('Please select an audio file to decrypt!!');
            return false;
        } else {
            alert('The file "' + file[0].name + '" has been selected.');
            page(3);
        }
    })

    // ================================== page 3 ================================== //

    var password = "AQuickBrownFoxJumpsOverTheLazyDog";
    var audioContext = new AudioContext();

    $('a.button.process').click(function () {

        let fr = new FileReader();

        if (body.hasClass('encrypt')) {
            fr.onload = async function () {
                var arrayBuffer = fr.result;
                var wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
                var encr = CryptoJS.AES.encrypt(wordArray, password)
                // console.log(encr)
                // audioContext.decodeAudioData(arrayBuffer, decodedDone);
            };
            fr.readAsArrayBuffer(file[0]);

        } else if (body.hasClass('decrypt')) {
            fr.onload = function () {
                var arrayBuffer = fr.result;
                var decr = CryptoJS.AES.decrypt(arrayBuffer, password)
                // console.log(arrayBuffer);
                var arr = base64DecToArr(decr.toString(CryptoJS.enc.Base64));
                audioContext.decodeAudioData(arr.buffer, (buffer) => {
                    alert('success decoding buffer');
                    // play(buffer);
                }, (err) => { alert('couldn\'t decode buffer');});
            };
            fr.readAsArrayBuffer(file[0]);
        }

    });

    function decodedDone(decoded) {
        // var typedArray = new Float32Array(decoded.length);
        // typedArray = decoded.getChannelData(0);
        // console.log("typedArray: ");
        // console.log(typedArray);
        // console.log(decoded)
    }

    // ================================== OTHER ================================== //
    function page(i) {
        if (i == 1) {
            back.fadeOut();
        } else {
            back.fadeIn();
        }
        // move #stage (chaning the top property will trigger a css transition on element)
        // i-1 so the page will start from 1:
        stage.css('top', (-(i - 1) * 100) + '%');
    }

    function play(decoded) {
        const source = audioContext.createBufferSource();
        source.buffer = decoded;
        source.connect(audioContext.destination);
        source.start();
    }

    function b64ToUint6(nChr) {
        return nChr > 64 && nChr < 91 ?
            nChr - 65 :
            nChr > 96 && nChr < 123 ?
            nChr - 71 :
            nChr > 47 && nChr < 58 ?
            nChr + 4 :
            nChr === 43 ?
            62 :
            nChr === 47 ?
            63 :
            0;
    }

    function base64DecToArr(sBase64, nBlocksSize) {
        var
            sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ""),
            nInLen = sB64Enc.length,
            nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >> 2,
            taBytes = new Uint8Array(nOutLen);

        for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
            nMod4 = nInIdx & 3;
            nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
            if (nMod4 === 3 || nInLen - nInIdx === 1) {
                for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
                    taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
                }
                nUint24 = 0;

            }
        }

        return taBytes;
    }
});