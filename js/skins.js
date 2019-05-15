"use strict";


(function () {
  window.addEventListener("load", main);
}());


function main() {
	var audio=document.getElementById("menu_audio");

		if (getCookie("mute") == "false") {
			//It is, lets play!
			audio.play();
		}
		if (getCookie("skin")=="normal_walk"){
			document.getElementById("skin1").style.border = "thick solid #0000FF";
		}
		if (getCookie("skin")=="normal_walk2"){
			document.getElementById("skin2").style.border = "thick solid #0000FF";
		}
		if (getCookie("skin")=="normal_walk3"){
			document.getElementById("skin3").style.border = "thick solid #0000FF";
		}
		if (getCookie("skin")=="normal_walk4"){
			document.getElementById("skin4").style.border = "thick solid #0000FF";
		}
	document.getElementById('skin1').addEventListener('click',function(){
		setCookie("skin","normal_walk",1);
		document.getElementById("skin1").style.border = "thick solid #0000FF";
		document.getElementById("skin2").style.border = "medium solid #1B1F1C";
		document.getElementById("skin3").style.border = "medium solid #1B1F1C";
		document.getElementById("skin4").style.border = "medium solid #1B1F1C";

	});
	document.getElementById('skin2').addEventListener('click',function(){
		setCookie("skin","normal_walk2",1);
		document.getElementById("skin1").style.border = "medium solid #1B1F1C";
		document.getElementById("skin2").style.border = "thick solid #0000FF";
		document.getElementById("skin3").style.border = "medium solid #1B1F1C";
		document.getElementById("skin4").style.border = "medium solid #1B1F1C";

	});
	document.getElementById('skin3').addEventListener('click',function(){
		setCookie("skin","normal_walk3",1);
		document.getElementById("skin1").style.border = "medium solid #1B1F1C";
		document.getElementById("skin2").style.border = "medium solid #1B1F1C";
		document.getElementById("skin3").style.border = "thick solid #0000FF";
		document.getElementById("skin4").style.border = "medium solid #1B1F1C";

	});
	document.getElementById('skin4').addEventListener('click',function(){
		setCookie("skin","normal_walk4",1);
		document.getElementById("skin1").style.border = "medium solid #1B1F1C";
		document.getElementById("skin2").style.border = "medium solid #1B1F1C";
		document.getElementById("skin3").style.border = "medium solid #1B1F1C";
		document.getElementById("skin4").style.border = "thick solid #0000FF";

	});




}

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