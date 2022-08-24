const { app, port } = require('./api.js');

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

