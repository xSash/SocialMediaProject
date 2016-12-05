// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var isMobile = false;
var email = null;
var message = null;
var numclick = 0;
var timerStart = Date.now();
var keys = {
    37: 1,
    38: 1,
    39: 1,
    40: 1
};

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
    var Enabled = false;
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}
$(document).ready(function() {
    var ready = "Document Loaded";
    console.log(ready);
    window.onbeforeunload = function(){ 
    window.scrollTo(0,0); 
    }
})
$(window).load(function() {
    // makes sure the whole site is loadeds
    console.log("Time until everything loaded: ", Date.now() - timerStart);
    var load = Date.now() - timerStart;
    var loadTime = Date.now() - load - 1000;
    disableScroll();
    $('#status').delay(3500).fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(3500).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('#masthead').delay(3500).fadeIn('slow');
    setTimeout(enableScroll(), loadTime);
})

$(document).ready(function() {
    var x = 0;
    setInterval(function() {
        var dots = "";
        x++;
        for (var y = 0; y < x % 4; y++) {
            dots += ".";
        }
        $("#loading-dots").text(dots);
    }, 500);
});

function validate(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateEmail() {
    $("#result").text("");
    email = $("#emailInputField").val();
    if (email.length === 0) {
        document.getElementById("emailInputField").style.borderColor = "#FF0000";
        document.getElementById("emailInputField").value = "";
        return false;
    }

    if (email.length < 6) {
        document.getElementById("emailInputField").style.borderColor = "#FF0000";
        document.getElementById("emailInputField").value = "";
        return false;
    }
    if (email === "Mtlord@outlook.fr") {
        document.getElementById("emailInputField").style.borderColor = "#FF0000";
        document.getElementById("emailInputField").value = "";
        return false;
    }
    if (validate(email)) {
        document.getElementById("emailInputField").style.borderColor = "#40D127";
        return true;
    } else {
        $("#result").fadeIn('slow');
        $("#result").text(email + " is not valid. Please try again");
        $("#result").css("color", "red");
    }
    //return false;
}


function validateMessage() {
    $("#result").text("");
    message = $("#messageInputField").val();
    if (message.length === 0) {
        document.getElementById("messageInputField").style.borderColor = "#FF0000";
        return false;
    }

    if (message.length > 0) {
        document.getElementById("messageInputField").style.borderColor = "#40D127";
        return true;
    } else {
        $("#result2").fadeIn('slow');
        $("#result2").text(message + " is not valid. Please try again");
        $("#result2").css("color", "red");
    }
    //return false;
}

function hideText() {
    document.getElementById("result").text = "";
    document.getElementById("result").text = "";
    $("#result").hide();
    $("#result2").hide();
}

function validateAll() {
    validateMessage();
    validateEmail();
    var isMessage = validateMessage();
    var isEmail = validateEmail();

    console.log("Message result : " + isMessage);
    console.log("Email result : " + isEmail);

    if (isMessage == false && isEmail == false) {
        $("#result").fadeIn('slow');
        $("#result").text("Enter a valid email");
        $("#result").css("color", "#FF0000");
        $("#result").css("font-size", "70%");
        $("#result2").fadeIn('slow');
        $("#result2").text("Enter a mesage");
        $("#result2").css("color", "#FF0000");
        $("#result2").css("font-size", "70%");
    }

    if (isMessage == true && isEmail == false) {
        $("#result").fadeIn('slow');
        $("#result").text("Enter a valid email");
        $("#result").css("color", "#FF0000");
        $("#result").css("font-size", "70%");
        $("#result2").fadeIn('slow');
        $("#result2").text("message is valid");
        $("#result2").css("color", "green");
        $("#result2").css("font-size", "70%");
    }

    if (isMessage == false && isEmail == true) {
        $("#result").fadeIn('slow');
        $("#result").text(email + " is valid");
        $("#result").css("color", "green");
        $("#result").css("font-size", "70%");
        $("#result2").fadeIn('slow');
        $("#result2").text("Enter a mesage");
        $("#result2").css("color", "#FF0000");
        $("#result2").css("font-size", "70%");
    }

    if (isMessage && isEmail == true) {
        $(".validate").hide();
        hideText();
        console.log("sending...");
        sendEmailAnimation();
    } else {
        console.log("fix your form");
    }
}

function sendEmailAnimation() {
    var sent = false;
    $("#submitted").show();
    window.setTimeout(function() {
        $(".moveOnSubmit").hide();
    }, 1);
    //$(".moveOnSubmit").fadeOut(500);  
    $(".center2").show(0).delay(3000).fadeIn(3000);
    $(".spinner2").show(0).delay(2000).fadeOut(1000);
    window.setTimeout(function() {
        $(".sending").html('&nbsp;').fadeOut(1000);
    }, 2000);

    window.setTimeout(function() {
        $(".validate").show();
        $(".sending").html("Sent!").fadeIn(1000).css("left", "75%");
    }, 3000);

    window.setTimeout(function() {
        $("#submitted").hide();
        document.getElementById("messageInputField").value = "";
        document.getElementById("emailInputField").value = "";
        document.getElementById("messageInputField").style.borderColor = "#D0BC97";
        document.getElementById("emailInputField").style.borderColor = "#D0BC97";
        //window.open('mailto:test@example.com?subject=subject&body=body');
        $(".center2").show(0).delay(2000).fadeOut(1000);
        $(".sending").show(0).delay(2000).fadeOut(1000);
    }, 6000);

    window.setTimeout(function() {
        $(".moveOnSubmit").show(0).delay(10000).fadeIn(5000);
    }, 8000);
}

function validateEmail1() {
    $("#result3").text("");
    email = $("#emailInputField1").val();
    if (email.length === 0) {
        document.getElementById("emailInputField1").style.borderColor = "#FF0000";
        document.getElementById("emailInputField1").value = "";
        return false;
    }

    if (email.length < 6) {
        document.getElementById("emailInputField1").style.borderColor = "#FF0000";
        document.getElementById("emailInputField1").value = "";
        return false;
    }
    if (email === "Mtlord@outlook.fr") {
        document.getElementById("emailInputField1").style.borderColor = "#FF0000";
        document.getElementById("emailInputField1").value = "";
        return false;
    }
    if (validate(email)) {
        document.getElementById("emailInputField1").style.borderColor = "#40D127";
        return true;
    } else {
        $("#result3").fadeIn('slow');
        $("#result3").text(email + " is not valid. Please try again");
        $("#result3").css("color", "red");
        $("#result3").css("font-size", "70%");
    }
    //return false;
}


function validateMessage1() {
    $("#result3").text("");
    message = $("#messageInputField1").val();
    if (message.length === 0) {
        document.getElementById("messageInputField1").style.borderColor = "#FF0000";
        return false;
    }

    if (message.length > 0) {
        document.getElementById("messageInputField1").style.borderColor = "#40D127";
        return true;
    } else {
        $("#result4").fadeIn('slow');
        $("#result4").text(message + " is not valid. Please try again");
        $("#result4").css("color", "red");
    }
    //return false;
}

function hideText1() {
    document.getElementById("result").text = "";
    document.getElementById("result").text = "";
    $("#result3").hide();
    $("#result4").hide();
}

function validateAll1() {
    $(".validate").hide();
    validateMessage1();
    validateEmail1();
    var isMessage = validateMessage1();
    var isEmail = validateEmail1();

    console.log("Message result : " + isMessage);
    console.log("Email result : " + isEmail);

    if (isMessage == false && isEmail == false) {
        $("#result3").fadeIn('slow');
        $("#result3").text("Enter a valid email");
        $("#result3").css("color", "#FF0000");
        $("#result3").css("font-size", "70%");
        $("#result4").fadeIn('slow');
        $("#result4").text("Enter a mesage");
        $("#result4").css("color", "#FF0000");
        $("#result4").css("font-size", "70%");
    }

    if (isMessage == true && isEmail == false) {
        $("#result3").fadeIn('slow');
        $("#result3").text("Enter a valid email");
        $("#result3").css("color", "#FF0000");
        $("#result3").css("font-size", "70%");
        $("#result4").fadeIn('slow');
        $("#result4").text("message is valid");
        $("#result4").css("color", "green");
        $("#result4").css("font-size", "70%");
    }

    if (isMessage == false && isEmail == true) {
        $("#result3").fadeIn('slow');
        $("#result3").text(email + " is valid");
        $("#result3").css("color", "green");
        $("#result3").css("font-size", "70%");
        $("#result4").fadeIn('slow');
        $("#result4").text("Enter a mesage");
        $("#result4").css("color", "#FF0000");
        $("#result4").css("font-size", "70%");
    }

    if (isMessage && isEmail == true) {
        hideText1();
        console.log("sending...");
        sendEmailAnimation1();
    } else {
        console.log("fix your form");
    }
}

function sendEmailAnimation1() {
    var sent = false;
    $("#submitted1").show();
    window.setTimeout(function() {
        $(".moveOnSubmit").hide();
    }, 1);
    //$(".moveOnSubmit").fadeOut(500);  
    $(".center2").show(0).delay(3000).fadeIn(3000);
    $(".spinner3").show(0).delay(2000).fadeOut(1000);
    window.setTimeout(function() {
        $(".sending2").html('&nbsp;').fadeOut(1000);
    }, 2000);

    window.setTimeout(function() {
        $(".validate").show();
        $(".sending2").html("Sent!").fadeIn(1000);
    }, 3000);

    window.setTimeout(function() {
        $("#submitted1").hide();
        document.getElementById("messageInputField1").value = "";
        document.getElementById("emailInputField1").value = "";
        document.getElementById("messageInputField1").style.borderColor = "#D0BC97";
        document.getElementById("emailInputField1").style.borderColor = "#D0BC97";
        //window.open('mailto:test@example.com?subject=subject&body=body');
        $(".center2").show(0).delay(2000).fadeOut(1000);
        $(".sending2").show(0).delay(2000).fadeOut(1000);
    }, 6000);

    window.setTimeout(function() {
        $(".moveOnSubmit").show(0).delay(10000).fadeIn(5000);
    }, 8000);
}

    // device detection
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;

    if (isMobile === true) {
        console.log("Mobile : " + isMobile);
    } else {
        isMobile = false;
        console.log("Mobile : " + isMobile);
    }


function emailFormMobile() {

}

/*function showChart() {
    $('#mixtape-popup').fadeOut(1000);
}
$(function() {
    $("#chart").hover(function() {
        $("#mixtape-popup").hide();
    });
});
*/
$(document).on('click', 'a[href^="#"]', function(e) {
    // target element id
    var id = $(this).attr('href');

    // target element
    var $id = $(id);
    if ($id.length === 0) {
        return;
    }

    // prevent standard hash navigation (avoid blinking in IE)
    e.preventDefault();

    // top position relative to the document
    var pos = $(id).offset().top - 120;

    // animated top scrolling
    $('html, body').animate({
        scrollTop: pos
    }, 1500);
});
function moveSTR() {
  var elem = document.getElementById("progress-bar");
  var width = 0;
  var id = setInterval(frame, 600);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
    } else {
      width++;
      elem.style.width = width + '%';
      document.getElementById("progressBarLabel").innerHTML = width * 1  + '%';
      status();
    }
  }

  function status(){
    var status = document.getElementById("download-status");
    if(width == 1){
        $("span#download-status").html("Setting Up");
        $('#loading-dots').show();
    }
    if(width == 25){
        $("span#download-status").html("Retrieving");  
    }
    if(width == 50){
        $("span#download-status").html("Preparing");  
    }
    if(width == 90){
        $('#loading-dots').hide();
        $("span#download-status").html("Compressing");  

    }
    if(width == 100){
        $("span#download-status").html("Done!");
        numclick = 0;
    }
  }
}
$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    if(scroll == 0){
      $('#scrollTop').fadeOut(500);
      console.log("init");
    }
});
$(document).ready(function() {
  $('#downlaod-button').on('click', function() {
    if (numclick === 0) {
        numclick++;
        $('#shww').show();
        $('#shww').text("" + numclick);
        moveSTR();
        $('#chart-status').hide();
        $('#chart-menu-content').fadeIn(500);
        console.log("numclick : " + numclick);
    }
    else{
        
        return false;
    }
  });

});


function download () {
    var fileURL = "your/url/here/testfile.zip";

var request = new XMLHttpRequest();
var avoidCache = "?avoidcache=" + (new Date()).getTime();;
request.open('GET', fileURL + avoidCache, true);
request.responseType = "application/zip";
var startTime = (new Date()).getTime();
var endTime = startTime;
request.onreadystatechange = function () {
    if (request.readyState == 2)
    {
        //ready state 2 is when the request is sent
        startTime = (new Date().getTime());
    }
    if (request.readyState == 4)
    {
        endTime = (new Date()).getTime();
        var downloadSize = request.responseText.length;
        var time = (endTime - startTime) / 1000;
        var sizeInBits = downloadSize * 8;
        var speed = ((sizeInBits / time) / (1024 * 1024)).toFixed(2);
        console.log(downloadSize, time, speed);
    }
}

request.send();
}
/**
 * Fetch data from the server asynchronously and add files in the zip.
 * @param {String} id the id of the ContentVersion to fetch.
 * @param {JSZip} zip the zip file to fill in.
 * @param {SForce} sforce the Sales Force object.
 * @return {jQuery.Deferred} the deferred containing the result.
 */
 /*
function fetchDataFromSForces(id, zip, sforce) {
    var deferred = jQuery.Deferred();
    var query = "Select Id,Title,Description,ContentUrl,ContentDocumentId,VersionData,PathOnClient,FileType From ContentVersion WHERE Id = '" + id + "'";
    sforce.connection.query(query, {
        onSuccess : function (result) {
            var currentProgress = $(".your-progressbar").progressbar("option", "value") || 0;
            currentProgress++;

            // put the result in the zip
            var records = result.getArray("records");
            var filename = records[0].PathOnClient;
            if(filename === '') {
                filename = 'ContentPack_'+currentProgress;
            }
            zip.file(filename, records[0].VersionData,{base64: true});

            // update the progress bar
            $(".your-progressbar").progressbar("option", "value", currentProgress);

            deferred.resolve(zip);
        },
        onFailure : function (error) {
            deferred.reject(error);
        }
    });
    return deferred;
}

// Create your progress bar first.
$(".your-progressbar").progressbar();

document.getElementById("downloadZip").addEventListener("click", function () {

    // ...
    // Here, the previous code here to init sforce and get fileIdList
    // ...

    var zip = new JSZip();
    var deferreds = [];

    for(var key in fileIdList) {
        if(fileIdList.hasOwnProperty(key)) {
            deferreds.push(fetchDataFromSForces(fileIdList[key], zip, sforce));
        }
    }
    // re-init the progress bar
    $(".your-progressbar").progressbar("option", "value", 0);
    $(".your-progressbar").progressbar("option", "max", fileIdList.length);
    // join all deferreds into one
    $.when.apply($, deferreds).done(function () {
        var content = zip.generate({type: "blob"});
        saveAs(content, "myZip.zip");
        var sentTo = document.getElementById("ChooseSentTo").value;
        updateDocumentation(checkedRecords,sentTo);
    }).fail(function (err) {
        document.getElementById("errorMessage").innerHTML = err.message;
        document.getElementById("errorMessage").style.color = 'red';
    });
});
*/
//sasha.benjamin@hotmail.com

/*  $(function(){
    $("#world123").hover(function(){
      $(this).find("#mixtape-popup").hide();
    });        
}); 



window.addEventListener('load', function(){
 
    var box1 = document.getElementById('box1')
    var statusdiv = document.getElementById('statusdiv')
    var startx = 0
    var dist = 0
 
    box1.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0] // reference first touch point (ie: first finger)
        startx = parseInt(touchobj.clientX) // get x position of touch point relative to left edge of browser
        statusdiv.innerHTML = 'Status: touchstartjcuvhbgkuygb<br> ClientX: ' + startx + 'px'
        e.preventDefault()
    }, false)
 
    box1.addEventListener('touchmove', function(e){
        var touchobj = e.changedTouches[0] // reference first touch point for this event
        var dist = parseInt(touchobj.clientX) - startx
        statusdiv.innerHTML = 'Status: touchmove<br> Horizontal distance traveled: ' + dist + 'px'
        e.preventDefault()
    }, false)
 
    box1.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0] // reference first touch point for this event
        statusdiv.innerHTML = 'Status: touchend<br> Resting x coordinate: ' + touchobj.clientX + 'px'
        e.preventDefault()
    }, false)
 
}, false)*/

function test() {
    
}