const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get("/products/search", (req, res) => {
  const searchTerm = req.query.name;
  const items = router.db.get("products").value();
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.json(filteredItems);
});

server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running");
});
