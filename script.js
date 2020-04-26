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
            alert('The file "' + file.name + '" has been selected.');
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
            fr.onload = function () {
                var arrayBuffer = fr.result;
                console.log("arrayBuffer: ");
                console.log(arrayBuffer);
                audioContext.decodeAudioData(arrayBuffer, decodedDone);
            };
            fr.readAsArrayBuffer(file[0]);

            //     fr.onload = function (e) {
            //         // textread = e.target.result;
            //         // enctext = UU.callEncrypt(textread);
            //         var encrypted = CryptoJs.AES.encrypt(e.target.result, password);
            //         a.attr('href', 'data:application/octet-stream,' + encrypted);
            //         a.attr('download', file.name + '.encrypted');
            //     }
            //     fr.readAsDataURL(file);
            // } else if(body.hasClass('decrypt')) {
            //     fr.onload = function(e) {
            //         var decrypted = CryptoJS.AES.decrypt(e.target.result, password).toString(CryptoJS.enc.Latin1);
            //         a.attr('href', decrypted);
            //         a.attr('download', file.name.replace('.encrypted', ''));
            //     }
            //     fr.readAsText(file);
        } else if (body.hasClass('decrypt')) {
            fr.onload = function () {
                var arrayBuffer = fr.result;
                console.log("arrayBuffer: ");
                console.log(arrayBuffer);
                audioContext.decodeAudioData(arrayBuffer, play);
            };
            fr.readAsArrayBuffer(file[0]);
        }

    });

    function play(decoded) {
        const source = audioContext.createBufferSource();
        source.buffer = decoded;
        source.connect(audioContext.destination);
        source.start();
    }

    function decodedDone(decoded) {
        var typedArray = new Float32Array(decoded.length);
        typedArray = decoded.getChannelData(0);
        console.log("typedArray: ");
        console.log(typedArray);
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
});