const express = require('express');
const bodyParser = require('body-parser');
const convertAndSendRoute = require('./routes/convertAndSendRoute');

const  cors = require("cors")

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:3000"
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', convertAndSendRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
