function cardLoader() {
    let imgSrc = 'media/download.jpg';
    let timeTrial = 3;
    let nameTag = 'title';
    let newRL = "edit.html"; //THIS IS BROKEN AND I HAVE ACCEPTED THAT, BUT I WANT TO SCREEEEEEEEEEEEEAM
    let bio = 'This is the bit with the grabber/lead';
    let $htmlString = $("#cardTemplate").clone(false).contents();
    $(".link-dark", $htmlString).attr("href", newRL);
    $('.card-img-top', $htmlString).attr('src', imgSrc);
    $('.card-title', $htmlString).append(nameTag);
    $('.card-text', $htmlString).append(bio);
    $('.text-muted', $htmlString).append('Last Updated ' + timeTrial + ' minutes ago');
    for (var i = 0; i <= 9; i++) {
        let $cloneString = $($htmlString).clone(true);
        $('#testHolder').before($cloneString);
    }
}