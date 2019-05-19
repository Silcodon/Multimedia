(function () {
    window.addEventListener("load", main);
}());


function main() {
    var audio = document.getElementById("menu_audio");
    var click_audio = document.getElementById("click_audio");
    audio.volume = getCookie("vol");
    click_audio.volume = getCookie("volsfx");

    if (getCookie("mutesfx") == "false") {
        click_audio.muted = false;
    }
    else {
        click_audio.muted = true;
    }
    if (getCookie("mute") == "false") {
        //It is, lets play!
        audio.play();
    }
    var click_audio = document.getElementById("click_audio");
    document.getElementById("back").addEventListener("click", play1, false);

    function play1() {
        click_audio.play();
        setTimeout(function () { window.location.href = 'menu.html'; }, 200);
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    var str1 = "ranking";
    var str3 = "a";

    for (let i = 1; i <= 10; i++) {
        var str2 = i;
        if (document.cookie.indexOf(str1.concat(str2)) == -1) {
            document.getElementById(str1.concat(str2)).innerHTML = "Nome" + i;
            document.getElementById(str1.concat(str2, str3)).innerHTML = 0;
        }
        else {
            document.getElementById(str1.concat(str2)).innerHTML = getCookie(str1.concat(str2));
            document.getElementById(str1.concat(str2, str3)).innerHTML = getCookie(str1.concat(str2, str3));
        }
    }

}