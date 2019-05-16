(function () {
	window.addEventListener("load", main);
}());

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

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

function myFunction() {
	var x = document.getElementById("nome").value;
	console.log(x)
	setCookie('nome', x, 10);
	console.log(x)
	console.log(document.cookie);
}

function main() {
	var audio = document.getElementById("menu_audio");
	var click_audio=document.getElementById("click_audio");
	audio.volume=getCookie("vol");
    click_audio.volume=getCookie("volsfx");

    if (getCookie("mutesfx")=="false"){
      click_audio.muted=false;
    }
    else{
      click_audio.muted=true;
    }
    document.getElementById("back").addEventListener("click",play1,false);
    document.getElementById("camp").addEventListener("click",play2,false);
    document.getElementById("endless").addEventListener("click",play3,false);

    function play1(){
        click_audio.play();
        setTimeout(function(){window.location.href='menu.html';},200);
    }
    function play2(){
    	click_audio.play();
        setTimeout(function(){window.location.href='campanha.html';},200);
    }
    function play3(){
    	click_audio.play();
        setTimeout(function(){window.location.href='endlessjogo.html';},200);
    }

	if (getCookie("mute") == "false") {
		//It is, lets play!
		audio.play();

	}
}