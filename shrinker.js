$(document).ready(function() {
    $(".nav-item-list").click(function() {
        alert("it work");
    });
    $("#contact").click(function() {
        alert("go away");
    });
});
$(document).on("scroll", function() {
    if ($(document).scrollTop() > 85) {
        $(".primary-nav").addClass("shrink");
        $(".title").addClass("display-5");
        $(".bi-journal-code").addClass("shrunk");
        $(".navbar-toggler-icon").addClass("icon-shrink");
    } else {
        $(".primary-nav").removeClass("shrink");
        $(".title").removeClass("display-5");
        $(".bi-journal-code").removeClass("shrunk");
        $(".navbar-toggler-icon").removeClass("icon-shrink");
    }
});