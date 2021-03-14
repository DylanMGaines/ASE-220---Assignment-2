//nameTag, subtitle, pathToImg, desc, dateMade, likes, imgCap, content
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
    $('.card', $htmlString).wrap("<div onclick='reqTime(" + accessing + ")' class='text-decoration-none text-body' style='cursor: pointer;'></div>");
    $('#testHolder').before($htmlString);
}

function placehold() {
    var currentLoaded;
    $.getJSON("https://jsonblob.com/api/5df95c1f-8374-11eb-a0d4-a5d78bdc5d78/", function(data) {
        //initial load (loads 6)
        let template;
        $.getJSON("./assets/templates.json", function(templates) {
            template = templates.card;
            for (currentLoaded = 0; currentLoaded < data.length && currentLoaded < 6; currentLoaded++) {
                cardLoader(data, (data.length - (currentLoaded + 1)), template);
            }
            //load button clicked (loads 6 more)
            $("#loadButton").click(function() {
                for (; currentLoaded < data.length && currentLoaded < 6; currentLoaded++) {
                    cardLoader(data, currentLoaded);
                    console.log(data[currentLoaded]);
                }
            });
        });
    });
    $.getJSON("./assets/modals.json", function(modals) {
        $(".bg-body").append(modals.signInModal);
    });
}

function reqTime(aNum) {
    console.log(aNum);
    window.location.href = './article.html?a=' + aNum;
}