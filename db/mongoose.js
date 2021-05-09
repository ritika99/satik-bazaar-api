const mongoose = require("mongoose");

const uri =
  "mongodb+srv://admin:admin@satik-cluster.wtagw.mongodb.net/satik-bazaar?retryWrites=true&w=majority";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoose connection successful"))
  .catch((err) => console.log("mongoose connection failed", err));

const db = mongoose.connection;