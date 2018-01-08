let express = require('express');
let fs = require('fs');
let app = express();
let port = process.env.PORT || 8000;

app.get('/users', function(req, res) {
  fs.readFile('./storage.json', 'utf-8', function(err, data) {
    res.json(JSON.parse(data));
  })
});

app.get('/users/:name', function(req, res) {
  fs.readFile('./storage.json', 'utf-8', function(err, data) {
    let parsedData = JSON.parse(data);
    let matchedUser = parsedData.filter((item) => {
      return item.name == req.params.name;
    });
    if (matchedUser.length >= 1) {
      res.json(matchedUser)[0];
    } else {
      res.send('user not found')
    }
  })
});

app.put('/modify/:name/:', function(req, res) {
  fs.readFile('./storage.json', 'utf-8', function(err, data) {

  })
})

app.post('/create/:name/:email/:state', function(req, res) {
  let userInfo = {
    name: req.params.name,
    email: req.params.email,
    state: req.params.state
  };

  fs.readFile('./storage.json', 'utf-8', function(err, data) {
    let usersArr = JSON.parse(data);

    usersArr.push(userInfo);
    fs.writeFile('./storage.json', JSON.stringify(usersArr), function(err) {
      res.send('user created')
    });
  })
});

app.listen(port, function() {
  console.log('Listening on port', port);
});