const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const stats = require('./dist/stats.json').assetsByChunkName;

const app = express();

const { PORT } = process.env;
app.use('/dist', express.static('dist'));

app.get('/dist/vendor*', function(req, res) {
  res.sendFile(path.join(__dirname, `dist/${stats.vendor[0]}`));
});

app.get('/dist/app*', function(req, res) {
  res.sendFile(path.join(__dirname, `dist/${stats.app[0]}`));
});

app.get('/sw.js', function(req, res) {
  res.sendFile(path.join(__dirname, 'sw.js'));
});

app.get('/serviceworker-cache-polyfill.js', function(req, res) {
  res.sendFile(path.join(__dirname, 'serviceworker-cache-polyfill.js'));
});

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('*', function(req, res) {
  res.render('index', {app: stats.app[0], vendor: stats.vendor[0]});
});

app.listen(PORT, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${PORT}`);
});
