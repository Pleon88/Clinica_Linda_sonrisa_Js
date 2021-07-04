//require('./src/config/database');

const express = require('express');
const app = express();
const indexRouter = require('./src/router');
const expressLayouts = require('express-ejs-layouts')

app.set('views','./src/views');
app.use(expressLayouts);
app.set('layout', './Shared/layout')
app.set('layout', './Shared/layout_login')
app.set('view engine', 'ejs');
app.use('/',indexRouter);

const portApp = process.env.APP_PORT || 3000;

app.listen(portApp, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${portApp}`);
});
