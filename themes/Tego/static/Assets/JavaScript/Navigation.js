$(document).on('click', 'a.flyout', function () {
    $('a.flyout').addClass('flyout-open');
    if ($(this).hasClass('lit')) {
        hidenavpanel();
        return false;
    } else {
        $('a.flyout').removeClass('lit');
        $('.dropdown').hide();
        if ($('.dropdown-open').length > 0) {
            $(this).parent().find('.dropdown').show();
        } else {
            $(this).parent().find('.dropdown').addClass('dropdown-open').slideDown(300);
        }
        $(this).addClass('lit');
        $('.nav-overlay').fadeIn(300);
        return false;
    }
});

$(document).on('click', 'li.close a', function () {
    hidenavpanel();
    return false;
});

$(document).on('click', '.nav-overlay', function () {
    hidenavpanel();
    return false;
});

function hidenavpanel() {
    $('a.flyout').removeClass('lit').removeClass('flyout-open');
    $('.dropdown').slideUp(300).removeClass('dropdown-open');
    $('.nav-overlay').fadeOut(300);
}

function setDarkMode($set) {

    $setToDark = (localStorage.getItem("Tego-DarkMode"))
    $url = $('meta[name=assetURL]').attr('content')

    if ($setToDark == null) {
        $("head").append('<link id="darkCSS" rel="stylesheet" href="' + $url + '/CSS/darkOverride.css" type="text/css" />')
        if ($set) {localStorage.setItem("Tego-DarkMode", "true")}
    } else {
        $("head #darkCSS").remove()
        if ($set) {localStorage.removeItem("Tego-DarkMode")}
    }
}

$('#darkMode').on('click', function() {
    setDarkMode(true)
})