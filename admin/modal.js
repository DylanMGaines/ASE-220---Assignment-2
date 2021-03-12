$(document).ready(function() {
    letsRock();
    var $eModal = $('#editModal');
    $eModal.bind('show.bs.modal', function(event) {
        //Button that triggered the modal
        var $trog = event.relatedTarget;
        //Extract info
        var $titled = $trog.getAttribute('title');
        var $contenta = $trog.innerHTML;
        //initiate an AJAX request here
        //do the updating in a callback.
        //
        //Update the modal's content.
        var $theThing = $('.form-label', $eModal);
        var $theStuff = $('#changee', $eModal);

        $theThing.text($titled);
        $theStuff.text($contenta).wrap('<code></code>');
    });
    var $iModal = $('#imageModal');
    $iModal.bind('show.bs.modal', function(event) {
        //image that triggered the modal
        var $trig = event.relatedTarget;
        //Extract info from og src img
        var $ogSrc = $trig.getAttribute('src');
        //AJAX request here
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
});

function gtfo() {
    oCount++;
    if (oCount >= 3) {
        oCount = 0;
        loader('o');
    }
}