/*global $, window*/
/*jslint maxerr: 50, browser: true, devel: true, multivar: true */
/*jshint maxparams:10, maxdepth:5, maxstatements:40, maxcomplexity:15 */

/*jslint
    this
*/
(function (window) {
    "use strict";

    function search() {
        $('#get-user-info').on('click', function (e) {
            e.preventDefault();
            $('#response-data').html('<div id="load" align="center" ><img src="content/load.gif" alt="loading..."></div>');

            var username = $('#username').val();
            //get the user
            var username_url = 'https://api.github.com/users/' + username;
            //get all repos under this user
            var user_repo_url = 'https://api.github.com/users/' + username + '/repos';

            $.ajax({
                type: "GET",
                url: username_url,
                dataType: 'json'
            }).always(function (json) {
                console.log(json);    
                if (json.statusText == "Not Found" || username == "") {
                    $('#response-data').html('<div class="alert alert-danger" role="alert">NO USER INFO FOUND!</div >');
                } else {
                    // show the data
                    show(json);
                }
            });

        });//end of click event handler
    }//end of function search()

    function show(json) {

            // else we have a user and we display their info
            var fullname = json.name;
            var username = json.login;
            var aviurl = json.avatar_url;
            var profileurl = json.html_url;
            var location = json.location;
            var followersnum = json.followers;
            var followingnum = json.following;
            var reposnum = json.public_repos;

            //if (fullname == undefined) { fullname = username; }

            $('#response-data').empty();
            var userHtml = "";

            userHtml += '<h2>' + fullname + ' <span class="smallname">(@<a href="' + profileurl + '" target="_blank">' + username + '</a>)</span></h2>';
            userHtml += '<div class="ghcontent"><div class="avi"><a href="' + profileurl + '" target="_blank"><img src="' + aviurl + '" width="80" height="80" alt="' + username + '"></a></div>';
            userHtml += '<p>Followers: ' + followersnum + ' - Following: ' + followingnum + '<br>Repos: ' + reposnum + '</p></div>';
            userHtml += '<div class="repolist">';

            $('#response-data').html(userHtml);
    }// end of show() function

    window.onload = function () {
        search();
    };

}(window));
