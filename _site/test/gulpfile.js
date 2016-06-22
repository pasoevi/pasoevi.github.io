// Get comments data from Poole
var gulp = require('gulp');
var http = require('http');
var fs = require('fs');

gulp.task("comments", function() {
  
  // set up the request to get comments as YAML
  var options = {
    hostname: 'pooleapp.com',
    port: 80,
    path: '/data/2dc5a498-53c2-4ed8-93f8-2c6b309cdd4e.yaml',
    method: 'GET',
  };

  // Go and get data
  http.get(options, function(res){

    var body = '';
    res.on('data', function(chunk) {
        body += chunk;
    });
    res.on('end', function(){

      // Save the comments for jekyll to use as a data source
      fs.writeFile('./_data/comments.yml', body, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("Comments data saved.");
        }
      });

    });
  });
});
