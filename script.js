$(function () {
    var body = $('body'),
    stage = $('#stage'),
    back = $('a.start');

    // page 1
    $('#page1 .encrypt').click(function() {
        body.attr('class', 'encrypt');
        page(2);
    });
    $('#page1 .decrypt').click(function() {
        body.attr('class', 'decrypt');
        page(2);
    });

    // page 2
    $('#page2 .button').click(function() {
        
    })
})