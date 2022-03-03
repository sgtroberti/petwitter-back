import app from "./config/server.js";

app.listen(5000, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`
  🚀 Server ready at: http://localhost:5000
  ⭐️ See sample requests: http://pris.ly/e/ts/rest-fastify#3-using-the-rest-api`);
});
