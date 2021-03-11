//temp until actual server-side validation is done
function subIt() {
    var un, pw;
    un = $("#player").val().trim();
    pw = $("#key").val().trim();
    if (un == "dylan" && pw == "pw") {
        $("#theBlackDoor").toggle();
        $("#loader").attr("hidden", false);
        $("#tester").addClass("theHandPrint");
        $("#isValid").text("welcome home");

        setTimeout(() => {
            location = "admin/index.html";
        }, 2000);

    } else {
        $("#isValid").text("you are not worthy");
    }
}