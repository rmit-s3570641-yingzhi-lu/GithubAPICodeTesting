/*global $, window*/
/*jslint maxerr: 50, browser: true, devel: true, multivar: true */
/*jshint maxparams:10, maxdepth:5, maxstatements:40, maxcomplexity:15 */

/*jslint
    this
*/
(function (window) {
    "use strict";

    //onload search function
    function search() {
        $('#get-user-info').on('click', function (e) {
            e.preventDefault();
            $('#response-data').html('<div id="load" align="center" ><img src="content/load.gif" alt="loading..."></div>');

            var username = $('#username').val();
            //get the user
            var username_url = 'https://api.github.com/users/' + username;

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
                    showUserInfo(json);
                    showRepo(username);
                }//the end of else statement
            });//the end of first ajax function
        });//end of click event handler
    }//end of function search()

    //show the basic info of user
    function showUserInfo(json) {

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

            userHtml += '<a href="' + profileurl + '" target="_blank"><img src="' + aviurl + '" width="80" height="80" alt="' + username + '"></a>';
            userHtml += '<h2>' + fullname + ' <span class="linkname">(@<a href="' + profileurl + '" target="_blank">' + username + '</a>)</span></h2>';        
            userHtml += '<p>Followers: ' + followersnum + ' - Following: ' + followingnum + '<br>Repos: ' + reposnum + '</p></div>';
            userHtml += '<div class="repolist"></div>';

            $('#response-data').append(userHtml);
    }// end of showUserInfo() function

    //the function to show the repo of user
    function showRepo(username) {
        //get all repos under this user
        var user_repo_url = 'https://api.github.com/users/' + username + '/repos';

        $.ajax({
            type: "GET",
            url: user_repo_url,
            dataType: 'json'
        }).always(function (repositories) {
            console.log(repositories);
            var reposhtml = "";
            if (repositories.length == 0) { reposhtml += '<p>No repos!</p>'; }
            else {
                reposhtml += '<p><strong>Repos List:</strong></p> <ul>';
                $.each(repositories, function (index) {
                    reposhtml += '<li><a href="' + repositories[index].html_url + '" target="_blank">' + repositories[index].name + '</a></li>';
                });
                reposhtml += '</ul>';
                $('.repolist').append(reposhtml);
            }
        });//the end of second ajax function           
    }// end of showRepo() Function

    window.onload = function () {
        search();
    };

}(window));
