//nameTag, subtitle, likes, imgCap, content pathToImg, desc, dateMade,  
const bitsNPieces = ['#title', '#subtitle', '.counter', '.figure-caption', '#qualityContent'];

function letsRock() {
    var aNum = window.location.search.substring(3);
    $.getJSON("https://jsonblob.com/api/5df95c1f-8374-11eb-a0d4-a5d78bdc5d78/", function(data) {
        //initial load (loads 6)
        let template;
        $.getJSON("./assets/templates.json", function(templates) {
            template = templates.article;
            letsRoll(data[aNum], template);
        });
    });
    $.getJSON("./assets/modals.json", function(modals) {
        $(".bg-body").append(modals.signInModal);
    });
}

function letsRoll(arItem, templateString) {
    let $htmlString = $(templateString).clone(true);

    let i = 0;
    for (x in arItem) {
        $(bitsNPieces[i], $htmlString).append(arItem[x]);
        if (i == 4) { break; }
        i++;
    }

    $('.figure-img', $htmlString).attr('src', arItem.pathToImg);
    let dateMade = new Date(arItem['dateMade']);
    $('#dateMade', $htmlString).append((dateMade.getMonth() + 1) + '/' + dateMade.getDate() + '/' + dateMade.getFullYear());
    let timeTrial = Math.round(Math.abs(((new Date().getTime()) - (dateMade).getTime()) / (24 * 60 * 60 * 1000)));
    $('#datePubd', $htmlString).append('Last Updated ' + timeTrial + ' days ago');
    $('#testHolder').before($htmlString);
}

function smash(whichOne) {
    var theOne = (whichOne == 'B') ? $("#thatLikeButtonB") : $("#thatLikeButtonT");
    var theOther = (whichOne == 'T') ? $("#thatLikeButtonB") : $("#thatLikeButtonT");
    var cVal = parseInt($('#countPrime').text());
    console.log(cVal);
    if (theOne.hasClass('active') == true) {
        cVal++;
    } else if (theOne.hasClass('active') == false) {
        cVal--;
    }
    console.log(cVal);
    theOther.toggleClass("active");
    $('.counter').text(cVal);
    theOne.blur();
    theOther.blur();
}