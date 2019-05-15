(function () {
    window.addEventListener("load", main);
}());


function main() {
    var audio = document.getElementById("menu_audio");

    if (getCookie("mute") == "false") {
        //It is, lets play!
        audio.play();
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
            document.getElementById(str1.concat(str2, str3)).innerHTML = 110 - 10 * i;
        }
        else {
            document.getElementById(str1.concat(str2)).innerHTML = getCookie(str1.concat(str2));
            document.getElementById(str1.concat(str2, str3)).innerHTML = getCookie(str1.concat(str2, str3));
        }
    }
}