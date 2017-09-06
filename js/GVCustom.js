/* Twitch API and Filtering Forked from "JC" */


/*jshint esversion: 6 */
$("#container").hide();

var arr = ["doctoretrill", "acesg", "nivoLcMLoL", "DreadJoker99", "TheRealQF", "cycloneslol", "MikesArsenal" ];
var txt, txt2, txt3;
var gamer = [];

function arrowMoving() {
  $("#arrow").animate({
    left: "-=10"
  }, 1000, 'easeInQuart',
    function () {
      $("#arrow").animate({
        left: "+=10",
      }, 1000, 'easeOutQuart');
    });
}

var myInterval = setInterval(arrowMoving, 2000);

function menuActivate() {
  $('#strap').hover(
    function () {
      $("#arrow").css("visibility", "hidden");
      clearInterval(myInterval);

      $(this).stop().animate(
        {
          left: '0',
          backgroundColor: 'rgb(0,0,0)'
        },
        500,
        'easeInSine'
      );//koniec animate
    },
    function () {
      $(this).stop().animate(
        {
          left: '-100',
          backgroundColor: 'rgb(255,255,255)'
        },
        2000,
        'easeOutBounce'
      );//koniec animate
    }
  );
}

function whosOnline() {
  var gamersOnline = [];
  for (let i = 0; i < gamer.length; i++) {
    if (gamer[i].online) {
      gamersOnline.push(i);
    }
  }
  return gamersOnline;
}

function whosOffline() {
  var gamersOffline = [];
  for (let i = 0; i < gamer.length; i++) {
    if (!gamer[i].online) {
      gamersOffline.push(i);
    }
  }
  return gamersOffline;
}

function setVisibility(which) {
  $("ul li:nth-child(" + which + ")").css("text-decoration", "underline");
  var offlineArr = whosOffline();
  var onlineArr = whosOnline();

  switch (which) {
    case 1:
      $("ul li:nth-child(2)").css("text-decoration", "none");
      $("ul li:nth-child(3)").css("text-decoration", "none");
      for (let i = 0; i < gamer.length; i++) {
        $("#divs" + i).hide();
      } for (var i = 0; i < onlineArr.length; i++) {
        $("#divs" + onlineArr[i]).fadeIn(1500);
      }
      break;
    case 2:
      $("ul li:nth-child(1)").css("text-decoration", "none");
      $("ul li:nth-child(3)").css("text-decoration", "none");
      for (let i = 0; i < gamer.length; i++) {
        $("#divs" + i).hide();
      }
      for (let i = 0; i < offlineArr.length; i++) {
        $("#divs" + offlineArr[i]).fadeIn(1500);
      }
      break;
    case 3:
      $("ul li:nth-child(1)").css("text-decoration", "none");
      $("ul li:nth-child(2)").css("text-decoration", "none");
      for (let i = 0; i < gamer.length; i++) {
        $("#divs" + i).hide();
      }
      $(".divs").fadeIn(1500);
      break;
  }
}

function Streamer(name, logo, online, status, viewers) {
  this.name = name;
  this.logo = logo;
  this.online = online;
  this.status = status;
  this.viewers = viewers;
}

var leng = arr.length;
for (let i = 0; i < leng; i++) {
  // var jqxhr = $.getJSON('https://wind-bow.gomix.me/twitch-api/channels/' + arr[i] + '?callback=?');
  // var jqxhr = $.getJSON('https://api.twitch.tv/kraken/channel/' + arr[i]);

  $.ajax({
    type: 'GET',
    url: 'https://api.twitch.tv/kraken/channels/' + arr[i],
    headers: {
      'Client-ID': 'dxr9emmd17s6vm7uweiztik0k5wsyu'
    },
    success: function(data) {
      everythingOK(data, i);
    },
    fail: function(err)
    {
      somethingWrong(1);
    }
   });




  // jqxhr.done(function (data) {
  //   everythingOK(data, i);
  // });
  // jqxhr.fail(function () {
  //   somethingWrong(1);
  // });
}

function everythingOK(data, i) {
  // alert(JSON.stringify(data));
  gamer[i] = new Streamer(data.display_name, data.logo, false);
  // var jqxhr2 = $.getJSON('https://api.twitch.tv/kraken/channel/streams/' + arr[i] );


  $.ajax({
    type: 'GET',
    url: 'https://api.twitch.tv/kraken/streams/' + arr[i],
    headers: {
      'Client-ID': 'dxr9emmd17s6vm7uweiztik0k5wsyu'
    },
    success: function(data) {
      

      if (data.stream !== null) {
        console.log(data.stream.channel.status);
        gamer[i].online = true;
        gamer[i].status = data.stream.channel.status;
        gamer[i].viewers = data.stream.viewers;
      }

    },
    complete: function (data) {



      var divs = document.createElement("div");
      divs.setAttribute("id", "divs" + i);
      divs.setAttribute("class", "divs");
      if (gamer[i].online === true) {
        $("#container").prepend(divs);
        $("#mainDiv").after($("#divs" + i));
      } else {
        $("#container").append(divs);
      }
   
      var oImg = document.createElement("img");
      if (gamer[i].logo !== null) {
        oImg.setAttribute('src', gamer[i].logo);
        oImg.setAttribute('class', "images");
        $("#divs" + i).append(oImg);
      } else {
        oImg.setAttribute('src', "http://vignette1.wikia.nocookie.net/leagueoflegends/images/1/12/League_of_Legends_Icon.png/revision/latest?cb=20150402234343");
        oImg.setAttribute('class', "defaultImg");
      }
      $("#divs" + i).append(oImg);
   console.log(gamer[i].online)
      if (gamer[i].online == true) {
        txt = gamer[i].status;
        txt2 = '<span id="green">&#x2022;</span>' + '<a href="https://www.twitch.tv/' + gamer[i].name + '" target="_blank">' + gamer[i].name + '</a>';
        txt3 = gamer[i].viewers + " viewers";
      } else {
        txt = " offline";
        txt2 = '<span id="red">&#x2022;</span>' + '<a href="https://www.twitch.tv/' + gamer[i].name + '" target="_blank">' + gamer[i].name + '</a>';
      }
   
      var content = document.createElement('div');
      var gamerName = document.createElement('div');
      var viewers = document.createElement('div');
      content.setAttribute('class', 'content');
      gamerName.setAttribute('class', "gamerName");
      viewers.setAttribute('class', "viewers");
      gamerName.setAttribute('id', "gamerName" + i);
      content.setAttribute('id', 'content' + i);
      viewers.setAttribute('id', "viewers" + i);
   
      $("#divs" + i).append(gamerName);
      $("#divs" + i).append(content);
      $("#content" + i).text(txt);
      $("#gamerName" + i).html(txt2);
      $("#content" + i).append(viewers);
      $("#viewers" + i).text(txt3);
   
      var lastDiv = arr.length - 1;
      if (i == lastDiv) {
        $("#container").show();
        $(".showbox").hide();
        menuActivate();
      }
   
     // jqxhr2.done(function (data) {
     //   if (data.stream !== null) {
     //     gamer[i].online = true;
     //     gamer[i].status = data.stream.channel.status;
     //     gamer[i].viewers = data.stream.viewers;
     //   }
     // });


    }




   });



 
} //end of everythingOk

function somethingWrong(nr) { alert("fail" + nr); }

