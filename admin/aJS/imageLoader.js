function imLoader() {
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