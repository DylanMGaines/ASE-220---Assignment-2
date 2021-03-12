function cardLoader() {
    let imgSrc = 'media/download.jpg';
    let timeTrial = 3;
    let nameTag = 'title';
    let bio = 'This is the bit with the grabber/lead';
    let $htmlString = $("#cardTemplate").clone(false).contents();
    $('.card-img-top', $htmlString).attr('src', imgSrc);
    $('.card-title', $htmlString).append(nameTag);
    $('.card-text', $htmlString).append(bio);
    $('.text-muted', $htmlString).append('Last Updated ' + timeTrial + ' minutes ago');
    for (var i = 0; i <= 4; i++) {
        let $cloneString = $($htmlString).clone(true);
        $('#testHolder').before($cloneString);
    }
}