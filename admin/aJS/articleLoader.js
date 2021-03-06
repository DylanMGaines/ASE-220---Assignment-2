const bitsNPieces = ['#title', '#subtitle', '#likes', '.figure-caption', '#body', '#views', '#desc', '#tags'];
//nameTag, subtitle, likes, imgCap, content, pathToImg, desc, dateMade, lastMod, author, tags, views
let articleObject;

let urlParameters;

function letsRock() {
    urlParameters = new URLSearchParams(window.location.search);
    //if this page is edit.html
    let isEditDotHTML = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) == "edit.html";
    articleObject = {
        nameTag: "",
        subtitle: "",
        likes: 0,
        imgCap: "",
        content: "",
        views: 0,
        desc: "",
        tags: "",
        pathToImg: "",
        dateMade: "",
        lastMod: "",
        author: ""
    };
    console.log(isEditDotHTML);
    $.getJSON("./aAssets/templates.json", function(templates) {
        $.getJSON("https://jsonblob.com/api/5df95c1f-8374-11eb-a0d4-a5d78bdc5d78/", function(data) {
            if (isEditDotHTML) {
                var aNum = urlParameters.get("a");
                for (thing in data.articles[aNum]) {
                    articleObject[thing] = data.articles[aNum][thing];
                }
            }
            letsRoll(templates.article, isEditDotHTML);
            sender(isEditDotHTML);
        });
    });
}

function letsRoll(templateString, isEditDotHTML) {
    document.title = document.title + ' ' + articleObject.nameTag;
    //clone template for manipulation
    let $htmlString = $(templateString).clone(true);
    $('#testHolder').before($htmlString);

    //incrementer variable
    let i = 0;
    //loop through article object for title, subtitle, likeCount, figure caption
    for (x in articleObject) {
        $(bitsNPieces[i], $htmlString).append(articleObject[x]);
        if (i == 7) { break; }
        i++;
    }

    let wasNotImage = true;
    if (articleObject.pathToImg.substring(0, 7) == "./media") {
        $('.figure-img', $htmlString).attr('src', articleObject.pathToImg);
        wasNotImage = false;
    }

    let dates = (isEditDotHTML) ? [new Date(articleObject['dateMade']), new Date(articleObject['lastMod'])] : [new Date(), new Date()];
    $('#dateMade', $htmlString).append((dates[0].getMonth() + 1) + '/' + dates[0].getDate() + '/' + dates[0].getFullYear());
    let timeTrial = Math.round(Math.abs(((new Date().getTime()) - (dates[1]).getTime()) / (24 * 60 * 60 * 1000)));
    $('#datePubd', $htmlString).append('Last Updated ' + timeTrial + ' days ago');

    $("#iPh").hide();

    listenUp();
    if (wasNotImage) {
        //put pathtoimg into url input
        $("input[name='urlFile']").val(articleObject.pathToImg);
        //trigger urlRadio
        $("#urlRadio").click();
    }
    $('#loadSpinner').remove();
}




function listenUp() {
    var $imgHolder = $('#clickBait');
    $(".form-control-sm", $imgHolder).change(function() {
        loadIm(this);
    });

    $("#imgRadio").change(function() {
        $("input[name='urlFile']").removeAttr("id");
        $("input[name='imgFile']").attr("id", "formFile");
        $("input[name='urlFile']").addClass("visually-hidden");
        $("input[name='imgFile']").removeClass("visually-hidden");
        var formFile = $("#formFile");
        if (!!formFile.val()) {
            loadIm(formFile[0]);
        } else {
            loadIm("");
        }
    });

    $("#urlRadio").change(function() {
        $("input[name='imgFile']").removeAttr("id");
        $("input[name='urlFile']").attr("id", "formFile");
        $("input[name='imgFile']").addClass("visually-hidden");
        $("input[name='urlFile']").removeClass("visually-hidden");
        var formFile = $("#formFile");
        if (!!formFile.val()) {
            loadIm(formFile[0]);
        } else {
            loadIm("");
        }
    });

    for (docElement in bitsNPieces) {
        if (docElement == 2 || docElement == 5) {
            continue;
        }
        $(bitsNPieces[docElement]).change(function() {
            articleObject[this.name] = this.value
        });
    }
}

function loadIm(inputMan) {
    let toHide = "#iPh";
    if (inputMan.value == undefined) {
        toHide = hideIt(toHide);
    } else if (inputMan.type == "file") {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#newImg').attr('src', e.target.result);
            $("#newImg").show();
        }
        try {
            reader.readAsDataURL(inputMan.files[0]);
        } catch (typeError) {
            toHide = hideIt(toHide);
        }
    } else if (inputMan.type == "url") {
        $('#newImg').attr('src', inputMan.value);
        $("#newImg").show();
    } else {
        //In future, this will be a function to handle mis-spelled url's and non-image files, which will
        //display an alert/highlight the field requesting the author enter a valid url/filetype
        console.log("error");
    }
    $(toHide).hide();
}

function hideIt(toHide) {
    $(toHide).show();
    return "#newImg";
}

function sender(isEditDotHTML) {
    $("#commitButton").click(function() {
        //nameTag, subtitle, likes, imgCap, content, pathToImg, desc, dateMade
        let dm = new Date();
        let formFile = $('#formFile');
        let imgMan;
        if (formFile.val() == "") {
            imgMan = "";
        } else if (formFile[0].type == "file") {
            imgMan = "./media/" + formFile.val().substring(12)
        } else {
            imgMan = formFile.val();
        }

        articleObject['pathToImg'] = imgMan;
        articleObject['lastMod'] = dm.toJSON();
        if (!isEditDotHTML) {
            articleObject['dateMade'] = dm.toJSON();
        }
        articleObject['author'] = parseInt(urlParameters.get('u'));
        console.log(articleObject.dateMade);

        let sendable = true;
        let unsendable = [];
        for (x in articleObject) {
            if (!articleObject[x]) {
                unsendable.push(x);
            }
        }

        //Views and Likes will always be 0 and pushed into unsendable, hence 2
        if ((unsendable.length > 3 && articleObject.author == 0) || (unsendable.length > 2 && articleObject.author != 0)) {
            sendable = false;
            let outString = "Please fill out the following:\n\n";
            for (x in unsendable) {
                outString += unsendable[x] + "\n";
            }
            alert(outString);
        }

        if (sendable) {
            //get current blob
            $.getJSON("https://jsonblob.com/api/5df95c1f-8374-11eb-a0d4-a5d78bdc5d78/", function(data) {
                //push new item into article array
                if (urlParameters.has("a")) {
                    let art = urlParameters.get("a");
                    data.articles[art] = articleObject;
                } else {
                    data.articles.push(articleObject);
                }
                console.log(data.articles);

                //ajax time.
                $.ajax({
                    type: "PUT",
                    url: "https://jsonblob.com/api/jsonblob/5df95c1f-8374-11eb-a0d4-a5d78bdc5d78",
                    contentType: "application/JSON",
                    data: JSON.stringify(data),
                    success: function(output, status, xhr) {
                        console.log(xhr);
                        console.log(xhr.getResponseHeader("Location "));
                        //modal pop up to notify of success
                        setTimeout(() => {
                            location = "index.html?u=" + parseInt(urlParameters.get('u'));
                        }, 2000);
                    }
                });
            });
        }
    });
}