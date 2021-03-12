function letsRock() {
    let imgSrc = 'media/download.jpg';
    let imgCap = '"Yer Baby" by The Beatles\' Ringo Star';
    //let timeTrial = '1/1/2021';
    let nameTag = 'title';
    let counter = 7;
    let minilad = "this is a cool kid's subtitle";
    let contento = "<p class='card-body'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " +
        "incididunt ut labore et dolore magna aliqua. Et molestie ac feugiat sed. Arcu vitae elementum curabitur vitae" +
        " nunc sed velit. Tempus imperdiet nulla malesuada pellentesque elit eget gravida. Venenatis tellus in metus " +
        "vulputate eu scelerisque felis imperdiet. Enim neque volutpat ac tincidunt. Egestas sed tempus urna et " +
        "pharetra pharetra. Condimentum vitae sapien pellentesque habitant morbi tristique senectus. In mollis nunc " +
        "sed id semper. Fermentum et sollicitudin ac orci phasellus egestas tellus. Ornare quam viverra orci sagittis " +
        "eu volutpat odio. Nam aliquam sem et tortor consequat id porta nibh venenatis. Ac turpis egestas maecenas " +
        "pharetra convallis posuere morbi. Suscipit tellus mauris a diam maecenas sed. Vestibulum morbi blandit " +
        "cursus risus at ultrices. Consequat interdum varius sit amet. Vel pharetra vel turpis nunc eget lorem dolor. " +
        "Et magnis dis parturient montes nascetur. Diam maecenas ultricies mi eget mauris. Eu scelerisque felis " +
        "imperdiet proin. Mauris pharetra et ultrices neque ornare. Morbi leo urna molestie at elementum eu facilisis. " +
        "Eu scelerisque felis imperdiet proin fermentum leo vel. Nunc congue nisi vitae suscipit tellus mauris a diam " +
        "maecenas. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet. Varius vel pharetra vel turpis " +
        "nunc eget lorem. Tristique sollicitudin nibh sit amet commodo nulla. Eget lorem dolor sed viverra. " +
        "Maecenas accumsan lacus vel facilisis volutpat est. Metus dictum at tempor commodo ullamcorper. Feugiat " +
        "nibh sed pulvinar proin gravida hendrerit lectus. Mi quis hendrerit dolor magna eget est lorem ipsum. Eu " +
        "non diam phasellus vestibulum lorem sed risus ultricies. Bibendum est ultricies integer quis. Purus non " +
        "enim praesent elementum. Feugiat nibh sed pulvinar proin gravida hendrerit lectus. At tempor commodo " +
        "ullamcorper a lacus. Donec et odio pellentesque diam volutpat commodo. Aliquet sagittis id consectetur " +
        "purus ut faucibus pulvinar elementum. Ut eu sem integer vitae. Eu lobortis elementum nibh tellus molestie. " +
        "Phasellus faucibus scelerisque eleifend donec. Quis varius quam quisque id diam vel quam.</p>";
    let $htmlString = $("#templart").clone(false).contents();
    $('.figure-img', $htmlString).attr('src', imgSrc);
    $('#title', $htmlString).append(nameTag);
    $('#subtitle', $htmlString).append(minilad);
    $('#qualityContent', $htmlString).append(contento);
    $('.figure-caption', $htmlString).append(imgCap);
    $('#counter', $htmlString).append(counter);
    $('#testHolder').before($htmlString);
}