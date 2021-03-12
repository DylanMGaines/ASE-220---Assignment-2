var oCount = 0;

function loader(loaded) {
    var dest;
    switch (loaded) {
        case 'c':
            location = "create.html";
            break;
        case 'e':
            location = "edit.html";
            break;
        case 'o':
            location = "../index.html";
            break;
        default:
            alert("what did you even click?");
    }
}