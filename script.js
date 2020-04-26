$(function () {
    var body = $('body'),
    stage = $('#stage'),
    back = $('a.start');

    // page 1
    $('#page1 .encrypt').on("click", function() {
        body.attr('class', 'encrypt');
        page(2);
    });
    $('#page1 .decrypt').click(function() {
        body.attr('class', 'decrypt');
        page(2);
    });

    // page 2
    $('#page2 .button').click(function() {
        $(this).parent().find('input').click()
    });

    var file = null;

    $('#page2').on('change', '#encrypt-input', function(f) {

        file = f.target.files;

        if(file.length!=1) {
            alert('Please select a file to encrypt!!');
            return false;
        } else {
            page(3);
        }
    });


    // HELPER FUNCTION
    function page(i) {
        if(i == 1) {
            back.fadeOut();
        } else {
            back.fadeIn();
        }
        // move #stage (chaning the top property will trigger a css transition on element)
        // i-1 so the page will start from 1:
        stage.css('top', (-(i-1)*100)+'%');
    }
});