var request = require('request');
var secret = require('./secret.js');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, callback){
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': secret.GITHUB_TOKEN
    }
  };

  request(options, function(error, respond, body) {
    if(!error && respond.statusCode == 200){
      var obj = JSON.parse(body);
      //console.log(obj);
      callback(obj);
    }else{
      console.log(error);
    }

  });
}



function callback(body){
  for(var obj in body){
    //console.log(obj);
    console.log(body[obj].avatar_url);
  }
}



getRepoContributors("jquery", "jquery", callback);