
var currentLocation = window.location.href; console.log(currentLocation)
var values = currentLocation.split('/');
var username = values[5];
var requester = getRequester();

console.log(username);
console.log(requester);
 $(document).ready(function(){

});


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
            var i = $("#post_count").html();
            i++;
            $("#post_count").html(i)

        }
    });
});

function getMessages(){
    if (!scrolling) {

        $.ajax({
            url : '/CodeShareIo/FeedChat/',
            type : 'POST',
            data : {
                user1 : username,
                'csrfmiddlewaretoken' : getCookie('csrftoken')
            },

            success : function(messages){
                $('#msg-list').html(messages);
                var chatlist = document.getElementById('msg-list-div');
                chatlist.scrollTop = chatlist.scrollHeight;
                if(username == requester){
                    console.log("viewing your own profile");
                    $('li#del').show();
                    $('li#edit').show();
                    }
                    else{
                        $('li#del').hide();
                        $('li#edit').hide();
                        console.log("error");
                    }
            }
        });
        scrolling = false;
    }
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

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
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