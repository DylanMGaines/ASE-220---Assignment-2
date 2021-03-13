//nameTag, subtitle, desc, dateMade, likes, imgCap, content
const bitsNPieces = ['.card-title', '.card-text', '.text-muted']; //title, subtitle, date updated

function cardLoader(data, accessing, templateString) {
    let $htmlString = $(templateString).clone(true);
    let accessed = data[accessing];
    var i = 0;
    for (x in accessed) {
        $(bitsNPieces[i], $htmlString).append(accessed[x]);
        i++;
        if (i >= 2) { break; }
    }
    let dateMade = new Date(accessed.dateMade);
    let timeTrial = Math.round(Math.abs(((new Date().getTime()) - (dateMade).getTime()) / (24 * 60 * 60 * 1000)));;
    $('.card-img-top', $htmlString).attr('src', accessed.pathToImg);
    $('.text-muted', $htmlString).append('Last Updated ' + timeTrial + ' days ago'); //make dynamic time unit (eg days instead of weeks) selector
    $('.card', $htmlString).wrap("<a href='article.html' class='text-decoration-none text-body'></a>")
    $('#testHolder').before($htmlString);
}