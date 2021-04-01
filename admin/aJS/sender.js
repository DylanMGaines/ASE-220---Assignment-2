let sending;

function sender() {
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
        sending = {
            nameTag: $('#title').val(),
            subtitle: $('#subtitle').val(),
            likes: 0,
            imgCap: $('#caption').val(),
            content: $('#body').val(),
            pathToImg: imgMan,
            desc: $('#desc').val(),
            dateMade: dm.toJSON(),
            tags: $('#tags').val(),
            author: parseInt(window.location.search.substring(3)),
            veiws: 0
        };

        let sendable = true;
        let unsendable = [];
        for (x in sending) {
            if (!sending[x]) {
                unsendable.push(x + "=" + sending[x]);
            }
        }

        //Views and Likes will always be 0 and pushed into unsendable, hence 2
        if (unsendable.length > 2) {
            sendable = false;
            console.log("gotcha");
        }

        console.log(unsendable);

        if (sendable) {
            //get current blob
            $.getJSON("https://jsonblob.com/api/5df95c1f-8374-11eb-a0d4-a5d78bdc5d78/", function(data) {
                //push new item into article array
                data.articles.push(sending);

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
                            location = "index.html?u=" + parseInt(window.location.search.substring(3));
                        }, 2000);
                    }
                });
            });
        }
    });
}