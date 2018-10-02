var request = require('request');
var secret = require('./secret.js');
var fs = require('fs');

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
    var name = body[obj].login;
    var path = './Avatar/' + name +'.jpg';
    downloadImageByURL(body[obj].avatar_url, path);
  }
}

function downloadImageByURL(url,path){
  request(url).pipe(fs.createWriteStream(path));

}

getRepoContributors("jquery", "jquery", callback);