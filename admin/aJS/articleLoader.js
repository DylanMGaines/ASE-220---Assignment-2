const bitsNPieces = ['#title', '#subtitle', '.counter', '.figure-caption', '#body'];
//nameTag, subtitle, likes, imgCap, content, pathToImg, desc, dateMade
let articleObject = {
    nameTag: "ph",
    subtitle: "ph",
    likes: "0",
    imgCap: "ph",
    content: "ph",
    pathToImg: "ph",
    desc: "ph",
    dateMade: "ph",
    author: "ph",
    tags: "ph"
};

function letsRock() {
    let urlParameters = new URLSearchParams(window.location.search);
    var aNum = urlParameters.get("a");
    console.log(aNum);
    $.getJSON("https://jsonblob.com/api/5df95c1f-8374-11eb-a0d4-a5d78bdc5d78/", function(data) {
        let template;
        for (thing in data.articles[aNum]) {
            articleObject[thing] = data.articles[aNum][thing];
        }
        $.getJSON("./aAssets/templates.json", function(templates) {
            template = templates.article;
            letsRoll(template);
        });
    });
}

function letsRoll(templateString) {
    document.title = document.title + ' ' + articleObject.nameTag;
    //clone template for manipulation
    let $htmlString = $(templateString).clone(true);

    //incrementer variable
    let i = 0;
    //loop through article object for title, subtitle, likeCount, figure caption
    for (x in articleObject) {
        $(bitsNPieces[i], $htmlString).append(articleObject[x]);
        if (i == 4) { break; }
        i++;
    }
    $('#desc', $htmlString).append(articleObject.desc + "\n\n");
    $('#tags', $htmlString).append(articleObject.tags + "\n\n");

    $('.figure-img', $htmlString).attr('src', articleObject.pathToImg);

    let dates = [new Date(articleObject['dateMade']), new Date(articleObject['lastMod'])];
    $('#dateMade', $htmlString).append((dates[0].getMonth() + 1) + '/' + dates[0].getDate() + '/' + dates[0].getFullYear());
    let timeTrial = Math.round(Math.abs(((new Date().getTime()) - (dates[1]).getTime()) / (24 * 60 * 60 * 1000)));
    $('#datePubd', $htmlString).append('Last Updated ' + timeTrial + ' days ago');

    $('#testHolder').before($htmlString);
}