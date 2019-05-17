		"use strict";


(function () {
  window.addEventListener("load", main);
}());


function main() {
		var audio=document.getElementById("menu_audio");
		var click_audio=document.getElementById("click_audio");
		//Volume da musica
		audio.volume=getCookie("vol");
		//Volume dos botoes
	    click_audio.volume=getCookie("volsfx");
	    //Se o SFX nao tiver mute
	    if (getCookie("mutesfx")=="false"){
	      click_audio.muted=false;
	    }
	    else{
	      click_audio.muted=true;
	    }
	    //botao back
	    document.getElementById("back").addEventListener("click",play1,false);
	    //Função para o botao dar som e ir para o menu principal
	    function play1(){
	        click_audio.play();
	        setTimeout(function(){window.location.href='menu.html';},200);
	    }
	    //Se não tiver mute
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
			}