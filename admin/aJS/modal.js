$(document).ready(function() {
    letsRock();
    modalLoader();
});

function modalLoader() {
    $.getJSON("./aAssets/modals.json", function(modals) {
        let $modalStringI = $(modals.modal).clone(true);
        let $modalStringE = $(modals.modal).clone(true);
        $($modalStringI).attr('id', 'imageModal');
        $('h5', $modalStringI).attr('id', 'imgM');
        $($modalStringI).attr('aria-labelledby', 'imgM');
        $('.mb-3', $modalStringI).addClass("d-flex");

        $($modalStringE).attr('id', 'textModal');
        $('h5', $modalStringE).attr('id', 'txtM');
        $($modalStringE).attr('aria-labelledby', 'txtM');

        $('.drop-zone', $modalStringI).append(modals.image);
        $('.drop-zone', $modalStringE).append(modals.text);

        $(".bg-body").append($modalStringI);
        $(".bg-body").append($modalStringE);
    });

    //without a pause, the modaler method's event handler binding will not work
    setTimeout(() => {
        modaler();
    }, 50);
}

function modaler() {
    var $eModal = $('#textModal');
    $eModal.bind('show.bs.modal', function(event) {
        //Button that triggered the modal
        var $eTrigger = event.relatedTarget;
        //Extract info
        var $titled = $eTrigger.getAttribute('Title');
        var $contenta = $eTrigger.innerHTML;
        //real AJAX request here
        //do the updating in a callback.
        //
        //Update the modal's content.
        var $theThing = $('.form-label', $eModal);
        var $theStuff = $('#changee', $eModal);

        $theThing.text($titled);
        $theStuff.text($contenta).wrap('<pre class="pre-scrollable"></pre>');
    });
    var $iModal = $('#imageModal');
    $iModal.bind('show.bs.modal', function(event) {
        //image that triggered the modal
        var $iTrigger = event.relatedTarget;
        //Extract info from og src img
        var $ogSrc = $iTrigger.getAttribute('src');
        //Real AJAX request here
        //do the updating in a callback.
        //
        //Update the modal's content.
        var $theThing = $('#imgLbl', $iModal);
        var $theStuff = $('#prevImg', $iModal);

        $theThing.text($ogSrc.toString());
        $theStuff.attr('src', $ogSrc);
    });

    $("#formFile", $iModal).change(function() {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#newImg').attr('src', e.target.result);
        }
        reader.readAsDataURL(this.files[0]);

    });
}