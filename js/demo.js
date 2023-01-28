function demo() {
    $('.example1').counter();

    $('.example2').counter({
        type: 'bar'
    });

    $('.example3').counter({
        type: 'both',
        suffix: '%'
    });
}

$(document).ready(function() {
    demo();
});

$(window).on('scroll', function() {
    demo();
});