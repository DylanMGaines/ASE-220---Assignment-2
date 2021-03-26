const bitsNPieces = ['#title', '#subtitle', '.counter', '.figure-caption', '#qualityContent'];
//nameTag, subtitle, likes, imgCap, content, pathToImg, desc, dateMade
let testingAThing = {
    nameTag: "ph",
    subtitle: "ph",
    likes: "0",
    imgCap: "ph",
    content: "ph",
    pathToImg: "ph",
    desc: "ph",
    dateMade: "ph"
};

function letsRock() {
    var aNum = window.location.search.substring(3);
    $.getJSON("https://jsonblob.com/api/5df95c1f-8374-11eb-a0d4-a5d78bdc5d78/", function(data) {
        let template;
        for (thing in data[aNum]) {
            testingAThing[thing] = data[aNum][thing];
        }
        $.getJSON("./aAssets/templates.json", function(templates) {
            template = templates.article;
            letsRoll(template);
        });
    });
    console.log(testingAThing);
}

function letsRoll(templateString) {
    console.log(testingAThing);
    let $htmlString = $(templateString).clone(true);

    let i = 0;
    for (x in testingAThing) {
        $(bitsNPieces[i], $htmlString).append(testingAThing[x]);
        if (i == 4) { break; }
        i++;
    }
    $('#deception', $htmlString).append(testingAThing.desc);

    $('.figure-img', $htmlString).attr('src', testingAThing.pathToImg);
    let dateMade = new Date(testingAThing['dateMade']);
    $('#dateMade', $htmlString).append((dateMade.getMonth() + 1) + '/' + dateMade.getDate() + '/' + dateMade.getFullYear());
    let timeTrial = Math.round(Math.abs(((new Date().getTime()) - (dateMade).getTime()) / (24 * 60 * 60 * 1000)));
    $('#datePubd', $htmlString).append('Last Updated ' + timeTrial + ' days ago');
    $('#testHolder').before($htmlString);
    document.title = document.title + ' ' + testingAThing.nameTag;
}