"use strict";


(function () {
  window.addEventListener("load", main);
}());

function main() {
		var audio=document.getElementById("menu_audio");
		var click_audio=document.getElementById("click_audio");
	    document.getElementById("back").addEventListener("click",play1,false);
	    //Volume da musica
	    audio.volume=getCookie("vol");
	    //Volume dos botoes
	    click_audio.volume=getCookie("volsfx");
	    //Mute do som dos botoes
	    if (getCookie("mutesfx")=="false"){
	      click_audio.muted=false;
	    }
	    else{
	      click_audio.muted=true;
	    }
	    //Funcao para voltar ao menu
	    function play1(){
	        click_audio.play();
	        setTimeout(function(){window.location.href='menu.html';},200);
	    }
	    //Mute na musica
		if (getCookie("mute") == "false") {
			      //It is, lets play!
			      audio.play();
			    }

			    //funcao para ir buscar a cookie
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