'use strict';

//use submit so that you can use click or enter to submit form
$('#login').submit(function() {
  event.preventDefault();
  var data = $('#login').serialize();
  // console.log(data);
  $.post('//localhost:3000/auth', data, function() {
    //savesession/ local storage to save the token

  });
});

$('#logout').click(function() {
  //client deletes session/local storage
});

$('#secure_request').click(function() {
  //check this line:
var jwt = sessionStorage.get();
  //check session storage for jwt
  //get request that you need to send this
  $.ajax('/api/somepage', {
    headers: {
      Authorization: 'Bearer ' + jwt
    }
  });
});
