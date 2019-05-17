"use strict";


(function () {
  window.addEventListener("load", main);
}());

function main() {
  var jogar = document.getElementById("play");
  var rank = document.getElementById("rank");
  var skin = document.getElementById("skin");
  var help = document.getElementById("help");
  var creditos = document.getElementById("creditos");
  var settings= document.getElementById("options");
    //Get audio element.
  var audio = document.getElementById("background_audio");
  var click_audio=document.getElementById("click_audio");
 
 //Verifica se a cookie das skins existe
 if (document.cookie.indexOf("skin=") == -1) {
    //It does not, lets create it!

    setCookie('skin', "normal_walk", 1);
  }

//Verifica se a cookie do volume existe
if (document.cookie.indexOf("vol=") == -1) {
    //It does not, lets create it!

    setCookie('vol', 1, 1);
  }

//Verifica se mute sfc ja existe
if (document.cookie.indexOf("mutesfx=") == -1) {
    //It does not, lets create it!

    setCookie('mutesfx', false, 1);
  }

  //Verifica se vol sfc ja existe
  if (document.cookie.indexOf("volsfx=") == -1) {
      //It does not, lets create it!

      setCookie('volsfx', 1, 1);
    }
    //Volume musica
    audio.volume=getCookie("vol");
    //Volume botoes
    click_audio.volume=getCookie("volsfx");
    //mute botoes
    if (getCookie("mutesfx")=="false"){
      click_audio.muted=false;
    }
    else{
      click_audio.muted=true;
    }


//Check if mute cookie exists.
  console.log(getCookie("mute"));
  if (document.cookie.indexOf("mute=") == -1) {
    //It does not, lets create it!

    setCookie('mute', false, 1);
    //Start playing audio!
    audio.play();
  } else {
    //Check if mute cookie is set to false.
    if (getCookie("mute") == "false") {
      //It is, lets play!
      audio.play();
    }
  }
  //Get current time/date.
  var date = new Date();
  date.setTime(+ date + (1 * 24 * 60 * 60 * 1000)); // _days_ * hours/day *  mins/hour * sec/min * ms/s (Change first number to change how many days cookie is valid for)

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

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

  }
jogar.addEventListener("click",play1,false);
rank.addEventListener("click",play2,false);
skin.addEventListener("click", play3,false);
help.addEventListener("click",play4,false);
creditos.addEventListener("click", play5,false);
settings.addEventListener("click",play6,false);

//Funcao para menu jogar
function play1(){
  	click_audio.play();
  	setTimeout(function(){window.location.href='jogar.html';},200);
}
//Funcao para menu ranking
function play2(){
  	click_audio.play();
  	setTimeout(function(){window.location.href='ranking.html';},200);
}
//Funcao para menu skins
function play3(){
  	click_audio.play();
  	setTimeout(function(){window.location.href='skins.html';},200);
}
//Funcao para menu ajuda
function play4(){
  	click_audio.play();
  	setTimeout(function(){window.location.href='ajuda.html';},200);
}
//Funcao para menu creditos
function play5(){
  	click_audio.play();
  	setTimeout(function(){window.location.href='creditos.html';},200);
}
//Funcao para as definiçoes
function play6(){
  click_audio.play();
  setTimeout(function(){window.location.href='settings.html';},200);
}





}
