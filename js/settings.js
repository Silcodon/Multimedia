 
"use strict";


(function () {
  window.addEventListener("load", main);
}());

function main() {

 if (getCookie("mute") == "false") {
      document.getElementById("mutemusica").src = "../resources/unmute.png";
    } else {
      document.getElementById("mutemusica").src = "../resources/mute.png";
  }

  if (getCookie("mutesfx") == "false") {
      document.getElementById("mutesfx").src = "../resources/unmute.png";
    } else {
      document.getElementById("mutesfx").src = "../resources/mute.png";
  }

  //Get audio element.
  var audio = document.getElementById("background_audio");
  var click_audio=document.getElementById("click_audio");
  audio.volume=getCookie("vol");
  click_audio.volume=getCookie("volsfx");

  //Get current time/date.
  var date = new Date();
  date.setTime(+ date + (1 * 24 * 60 * 60 * 1000)); // _days_ * hours/day *  mins/hour * sec/min * ms/s (Change first number to change how many days cookie is valid for)

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

  }

  //Verifica se mute sfc ja existe
  if (document.cookie.indexOf("mutesfx=") == -1) {
      //It does not, lets create it!

      setCookie('mutesfx', false, 1);
    }else{
      if(getCookie("mutesfx")=='true'){
        click_audio.muted=true;
      }
    }

    //Verifica se mute sfx ja existe
    if (document.cookie.indexOf("volsfx=") == -1) {
        //It does not, lets create it!

        setCookie('volsfx', 1, 1);
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

  //On play/mute button/link click.
  document.getElementById("mutemusica").addEventListener("click", function (e) {
    e = e || window.event;
    console.log(getCookie("mute"));
    if (getCookie("mute") == "false") {
      console.log('entrou');
      //If mute cookie is set to false, mute audio.
      audio.muted = true;
      document.getElementById("mutemusica").src = "../resources/mute.png";
    } else {
      if(getCookie('vol')<=0.1){
        setCookie('vol',0.1,1);
        audio.volume=0.1;
      }
      //If mute cookie is set to true, unmute audio.
      document.getElementById("mutemusica").src = "../resources/unmute.png";
      audio.muted = false;
      //Check if audio has been started before.
      if (audio.paused || audio.currentTime > 0) {
        //It has not, lets play it!
        audio.play();
      }
    }
    console.log(audio.muted);
    //Set/update mute cookie with new audio muted value.
    setCookie('mute', audio.muted, 1);
    e.preventDefault();
  }, false);

  //On play/mute sfx button/link click.
  document.getElementById("mutesfx").addEventListener("click", function (e) {
    e = e || window.event;
    console.log(getCookie("mutesfx"));
    if (getCookie("mutesfx") == "false") {
      click_audio.muted=true
      document.getElementById("mutesfx").src = "../resources/mute.png";
    } else {
      if(getCookie('volsfx')<=0.1){
        setCookie('volsfx',0.1,1);
        click_audio.volume=0.1;
      }
      //If mute cookie is set to true, unmute audio.
      document.getElementById("mutesfx").src = "../resources/unmute.png";
      click_audio.muted = false;
    }
    //Set/update mute cookie with new audio muted value.
    setCookie('mutesfx', click_audio.muted, 1);
    e.preventDefault();
  }, false);


  document.getElementById("back").addEventListener("click",play1,false);

  function play1(){
    click_audio.play();
    setTimeout(function(){window.location.href="menu.html";},200);
  }

  document.getElementById("musicamaisVol").addEventListener("click",function(){
    //Check if audio has been started before.
        if (audio.paused || audio.currentTime > 0 || audio.volume>=0.9) {
          //It has not, lets play it!
          audio.play();
          audio.muted=false;
          setCookie("mute",false,1);
          document.getElementById("mutemusica").src = "../resources/unmute.png";
        }
      audio.volume+=0.1;
      setCookie("vol",audio.volume,1);
      console.log(getCookie("vol"));
      if(getCookie("vol")>=0.1){
        //Check if audio has been started before.
        if (audio.paused || audio.currentTime > 0) {
          //It has not, lets play it!
          audio.play();
        }
        audio.muted=false;
        setCookie("mute",false,1);
        document.getElementById("mutemusica").src = "../resources/unmute.png";
      }
  });
  document.getElementById("musicamenosVol").addEventListener("click",function(){
      audio.volume-=0.1;
      setCookie("vol",audio.volume,1);
      console.log(getCookie("vol"));
      if (getCookie("vol")<=0.1){
        setCookie("mute",true,1);
        document.getElementById("mutemusica").src = "../resources/mute.png";
      }
  });

  document.getElementById("sfxmaisVol").addEventListener("click",function(){
    //Check if audio has been started before.
        if (click_audio.volume>=0.9) {
          //It has not, lets play it!
          click_audio.muted=false;
          setCookie("mutesfx",false,1);
          document.getElementById("mutesfx").src = "../resources/unmute.png";
        }
      click_audio.volume+=0.1;
      setCookie("volsfx",click_audio.volume,1);
      console.log(getCookie("volsfx"));
      if(getCookie("volsfx")>=0.1){
        click_audio.muted=false;
        setCookie("mutesfx",false,1);
        document.getElementById("mutesfx").src = "../resources/unmute.png";
      }
  });
  document.getElementById("sfxmenosVol").addEventListener("click",function(){
      click_audio.volume-=0.1;
      setCookie("volsfx",click_audio.volume,1);
      console.log(getCookie("volsfx"));
      if (getCookie("volsfx")<=0.1){
        setCookie("mutesfx",true,1);
        document.getElementById("mutesfx").src = "../resources/mute.png";
      }
  });


}