//nameTag, subtitle, likes, imgCap, content, pathToImg, desc, dateMade

function cardLoader(data, accessing, templateString) {
    let $htmlString = $(templateString).clone(true);
    let accessed = data[accessing];
    $('.card-title', $htmlString).append(accessed["nameTag"]);
    $('.card-text', $htmlString).append(accessed["desc"]);
    let dateMade = new Date(accessed.dateMade);
    let timeTrial = Math.round(Math.abs(((new Date().getTime()) - (dateMade).getTime()) / (24 * 60 * 60 * 1000)));;
    $('.card-img-top', $htmlString).attr('src', accessed.pathToImg);
    $('.text-muted', $htmlString).append('Last Updated ' + timeTrial + ' days ago'); //make dynamic time unit (eg days instead of weeks) selector
    $('.card', $htmlString).wrap("<div onclick='reqTime(" + accessing + ")' class='text-decoration-none text-body' style='cursor: pointer;'></div>");
    $('#testHolder').before($htmlString);
}

function placehold() {
    var currentLoaded = 0;
    $.getJSON("https://jsonblob.com/api/5df95c1f-8374-11eb-a0d4-a5d78bdc5d78/", function(data) {
        //initial load (loads 6)
        let template;
        $.getJSON("./aAssets/templates.json", function(templates) {
            template = templates.card;
            for (; currentLoaded < data.length && currentLoaded < 6; currentLoaded++) {
                cardLoader(data, (data.length - (currentLoaded + 1)), template);
            }
            //load button clicked (loads 6 more)
            $("#loadButton").click(function() {
                for (; currentLoaded < data.length && currentLoaded < 6; currentLoaded++) {
                    cardLoader(data, (data.length - (currentLoaded + 1)), template);
                    console.log(data[currentLoaded]);
                }
            });
        });
    });
}

function reqTime(aNum) {
    console.log(aNum);
    window.location.href = './edit.html?a=' + aNum;
}