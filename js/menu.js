"use strict";


(function () {
  window.addEventListener("load", main);
}());

function main() {

  var camp = document.getElementById("camp");
  var end = document.getElementById("end");
  var rank = document.getElementById("rank");
  var skin = document.getElementById("skin");
  var help = document.getElementById("help");
  var options = document.getElementById("options");
  if (getCookie("mute") == "false") {
      document.getElementById("mute").src = "../resources/unmute.png";
    } else {
      document.getElementById("mute").src = "../resources/mute.png";
  }

  //Get audio element.
  var audio = document.getElementById("background_audio");

  //Get current time/date.
  var date = new Date();
  date.setTime(+ date + (1 * 24 * 60 * 60 * 1000)); // _days_ * hours/day *  mins/hour * sec/min * ms/s (Change first number to change how many days cookie is valid for)

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

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
  document.getElementById("mute").addEventListener("click", function (e) {
    e = e || window.event;
    console.log(getCookie("mute"));
    if (getCookie("mute") == "false") {
      console.log('entrou');
      //If mute cookie is set to false, mute audio.
      audio.muted = true;
      document.getElementById("mute").src = "../resources/mute.png";
    } else {
      //If mute cookie is set to true, unmute audio.
      document.getElementById("mute").src = "../resources/unmute.png";
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






  /*
	camp.addEventListener("click", campClickHandler);

*/
  /*
    end.addEventListener("click", endClickHandler);
  
    rank.addEventListener("click", rankClickHandler);
    skin.addEventListener("click", skinClickHandler);
    help.addEventListener("click", helpClickHandler);
    options.addEventListener("click", optionsClickHandler);*/


}
