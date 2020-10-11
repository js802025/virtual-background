String.prototype.format = function () {
  var i = 0, args = arguments;
  return this.replace(/{}/g, function () {
    return typeof args[i] != 'undefined' ? args[i++] : '';
  });
};

const http = require('http');
const url = require('url');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const page = "<!doctype html><html lang='en'>  <head>    <!-- Required meta tags -->    <meta charset='utf-8'>    <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'>    <!-- Bootstrap CSS -->    <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css' integrity='sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z' crossorigin='anonymous'>    <title>vBG</title>  </head>  <body class='bg-light'>    <nav class='navbar navbar-light bg-dark'>  <a class='navbar-brand text-light' href='#'>vBG</a></nav><div class='jumbotron jumbotron-fluid'>  <div class='container'>    <h1 class='display-4'>virtualBackGround</h1>    <p class='lead'>I'm bored and I haven't done something utterly stupid in awhile, so... I'm letting you choose my zoom background. Submit the direct link below(keep it PG) and we'll see how it goes, and well remember it's not stupid if it works!</p>  <form action='/submit' class='bg-grey'>  <div class='form-group'>    <label for='exampleInputEmail1'>Image Direct Link(ending in extention, I recommend a service such as imgur, <a href='https://webapps.stackexchange.com/questions/95883/how-to-get-direct-link-of-images-on-imgur/95898'>example</a>):</label>    <input type='text' class='form-control' name='link' aria-describedby='subtext'>    <small id='subtext' class='form-text text-muted'>Have fun!</small>  </div>  <button type='submit' class='btn btn-primary'>Submit</button></form><br><hr class='mt-2 mb-3'/><br><h3 class='font-weight-lighter'>Current Image:</h3><img src='{}'></div></div>    <!-- Optional JavaScript -->    <!-- jQuery first, then Popper.js, then Bootstrap JS -->    <script src='https://code.jquery.com/jquery-3.5.1.slim.min.js' integrity='sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj' crossorigin='anonymous'></script>    <script src='https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js' integrity='sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN' crossorigin='anonymous'></script>    <script src='https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js' integrity='sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV' crossorigin='anonymous'></script>  </body></html>"

var img;




const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  var data = url.parse(req.url, true);
  if (data.pathname.includes("/submit")) {
    var q = data.query;
    fs.writeFile('./imgurl.txt', q.link, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
    fs.readFile("./imgurl.txt", function (err, content) {
      if (err) {
        console.log(err)
      } else {
      img = content;
  }});
    res.end(page.format(img))

  } else {
    fs.readFile("./imgurl.txt", function (err, content) {
          if (err) {
            console.log(err)
          } else {
          img = content;
      }});
    res.end(page.format(img));
}});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
