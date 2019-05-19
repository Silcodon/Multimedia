"use strict";


(function () {
  window.addEventListener("load", main);
}());


function main() {
	var audio=document.getElementById("menu_audio");
	var click_audio=document.getElementById("click_audio");
	var click_skin=document.getElementById("click_skin");
	//Volume da musica
	audio.volume=getCookie("vol");
	//Volume dos botoes
    click_audio.volume=getCookie("volsfx");
    click_skin.volume=getCookie("volsfx");
    //Mute dos botoes
    if (getCookie("mutesfx")=="false"){
      click_audio.muted=false;
      click_skin.muted=false;
    }
    else{
      click_audio.muted=true;
      click_skin.muted=true;
    }
    	//Mute da musica
		if (getCookie("mute") == "false") {
			//It is, lets play!
			audio.play();
		}
		//ver qual skin esta selecionado
		if (getCookie("skin")=="normal_walk"){
			document.getElementById("skin1").style.border = "thick solid #0000FF";
		}
		if (getCookie("skin")=="normal_walk_2"){
			document.getElementById("skin2").style.border = "thick solid #0000FF";
		}
		if (getCookie("skin")=="normal_walk_3"){
			document.getElementById("skin3").style.border = "thick solid #0000FF";
		}
		if (getCookie("skin")=="normal_walk_4"){
			document.getElementById("skin4").style.border = "thick solid #0000FF";
		}
		
		//Ao clicar num dos skins alterar qual esta selecionado
	document.getElementById('skin1').addEventListener('click',function(){
		setCookie("skin","normal_walk",1);
		click_skin.play();
		document.getElementById("skin1").style.border = "thick solid #0000FF";
		document.getElementById("skin2").style.border = "medium solid #1B1F1C";
		document.getElementById("skin3").style.border = "medium solid #1B1F1C";
		document.getElementById("skin4").style.border = "medium solid #1B1F1C";

	});
	document.getElementById('skin2').addEventListener('click',function(){
		setCookie("skin","normal_walk_2",1);
		click_skin.play();
		document.getElementById("skin1").style.border = "medium solid #1B1F1C";
		document.getElementById("skin2").style.border = "thick solid #0000FF";
		document.getElementById("skin3").style.border = "medium solid #1B1F1C";
		document.getElementById("skin4").style.border = "medium solid #1B1F1C";

	});
	document.getElementById('skin3').addEventListener('click',function(){
		setCookie("skin","normal_walk_3",1);
		click_skin.play();
		document.getElementById("skin1").style.border = "medium solid #1B1F1C";
		document.getElementById("skin2").style.border = "medium solid #1B1F1C";
		document.getElementById("skin3").style.border = "thick solid #0000FF";
		document.getElementById("skin4").style.border = "medium solid #1B1F1C";

	});
	document.getElementById('skin4').addEventListener('click',function(){
		setCookie("skin","normal_walk_4",1);
		click_skin.play();
		document.getElementById("skin1").style.border = "medium solid #1B1F1C";
		document.getElementById("skin2").style.border = "medium solid #1B1F1C";
		document.getElementById("skin3").style.border = "medium solid #1B1F1C";
		document.getElementById("skin4").style.border = "thick solid #0000FF";

	});

document.getElementById("back").addEventListener("click",play1,false);
//Voltar ao menu
function play1(){
  	click_audio.play();
  	setTimeout(function(){window.location.href='menu.html';},200);
}

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