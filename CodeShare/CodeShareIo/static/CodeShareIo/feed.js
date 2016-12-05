
    var currentLocation = window.location.href; console.log(currentLocation)
    var values = currentLocation.split('/');
    var username = values[5];
    console.log(username);


$('#chat-form').on('submit', function(event){
    event.preventDefault();

    $.ajax({
        url : '/CodeShareIo/PostChat/',
        type : 'POST',
        data : { msgbox : $('#chat-msg').val()},

        success : function(json){
            $('#chat-msg').val('');
            $('#msg-list').append('<li class="">' + json.msg + '</li>');
            var chatlist = document.getElementById('msg-list-div');
            chatlist.scrollTop = chatlist.scrollHeight;
            getMessages();
            getUser();
            var i = $("#post_count").html();
            i++;
            $("#post_count").html(i)

        }
    });
});

        $.ajax({
        url : '/CodeShareIo/FeedChat/',
        type : 'POST',
        data : { user1 : username},

        success : function(){
           console.log("Success : " + username)
        }
    });

function getMessages(){
    if (!scrolling) {
        $.get('/CodeShareIo/FeedChat/', function(messages){
            $('#msg-list').html(messages);
            $('#chat-msg').val(username);
            var chatlist = document.getElementById('msg-list-div');
            chatlist.scrollTop = chatlist.scrollHeight;
        });
    }
    scrolling = false;
}

var scrolling = false;

$(document).ready(function() {
     $('#send').attr('disabled','disabled');
     getMessages();
     $('#chat-msg').keyup(function() {
        if($(this).val() != '') {
           $('#send').removeAttr('disabled');
        }
        else {
        $('#send').attr('disabled','disabled');
        }
     });
 });

// using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});