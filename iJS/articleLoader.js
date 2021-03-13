/*function letsRock() {
    let imgSrc = 'media/download.jpg';

    //let timeTrial = '1/1/2021';
    let $htmlString = $("#templart").clone(false).contents();
    $('.figure-img', $htmlString).attr('src', imgSrc);
    $('#title', $htmlString).append(nameTag);
    $('#subtitle', $htmlString).append(minilad);
    $('#qualityContent', $htmlString).append(contento);
    $('.figure-caption', $htmlString).append(imgCap);
    $('#underCount', $htmlString).append(counter);
    $('#counter', $htmlString).append(counter);
    $('#testHolder').before($htmlString);
}*/

function smash(whichOne) {
    var theOne = (whichOne == 'B') ? $("#thatLikeButtonB") : $("#thatLikeButtonT");
    var theOther = (whichOne == 'T') ? $("#thatLikeButtonB") : $("#thatLikeButtonT");
    var cVal = parseInt($('#counter').text());
    console.log(cVal);
    if (theOne.hasClass('active') == true) {
        cVal++;
    } else if (theOne.hasClass('active') == false) {
        cVal--;
    }
    console.log(cVal);
    theOther.toggleClass("active");
    $('#counter').text(cVal);
    $('#underCount').text(cVal);
    theOne.blur();
    theOther.blur();
}