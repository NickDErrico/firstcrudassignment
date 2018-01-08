let express = require('express');
let fs = require('fs');
let app = express();
let bodyParser = require('body-parser');
const port = process.env.PORT || 8000;

app.use(bodyParser.json())

app.post('/users', function(req, res) {
  let data = fs.readFileSync('./storage.json', 'utf-8');
  let parsedData = JSON.parse(data);
  parsedData.push(req.body);
  fs.writeFileSync('./storage.json', JSON.stringify(parsedData));
  res.send('user created')
});

app.get('/users', function(req, res) {
  let data = fs.readFileSync('./storage.json', 'utf-8');
  let parsedData = JSON.parse(data);
  res.json(parsedData);
});

app.get('/users/:name', function(req, res) {
  let data = fs.readFileSync('./storage.json', 'utf-8');
  let parsedData = JSON.parse(data);
  let matchedUser = parsedData.filter((item) => {
    return item.name === req.params.name;
  })
  res.json(matchedUser[0])
})

app.patch('/users/:name', function(req, res) {
  let data = fs.readFileSync('./storage.json', 'utf-8');
  let parsedData = JSON.parse(data);
  let updatedData = parsedData.map((item) => {
    if (item.name === req.params.name) {
      return req.body;
    } else {
      return item;
    }
  })
  fs.writeFileSync('./storage.json', JSON.stringify(updatedData));
  res.send('User updated')
})


app.delete('/delete/:name', function(req, res) {
  let data = fs.readFileSync('./storage.json', 'utf-8');
  let parsedData = JSON.parse(data);
  let filteredData = parsedData.filter((item) => {
    return item.name !== req.params.name;
  });
  fs.writeFileSync('./storage.json', JSON.stringify(filteredData));
  res.send('User deleted')
})



app.listen(port, function() {
  console.log('Listening on port', port);
});