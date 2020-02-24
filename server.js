const app = require('./lib/routes');

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
