// const serverless = require('serverless-http');
const awsServerlessExpress = require('aws-serverless-express');
const cors = require('cors');
const express = require('express');

const errorHandler = require('./middleware/errorHandler');
const getWord = require('./controllers/wordController');
const getWordAndPartOfSpeach = require('./controllers/wordAndSpeachPartController');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/:word', getWord);
app.get('/:word/:partOfSpeech', getWordAndPartOfSpeach);

app.use(errorHandler);

// const PORT = 3001;
// app.listen(PORT, () => console.log(`listening on ${PORT}`));
// module.exports.handler = serverless(app);

const server = awsServerlessExpress.createServer(app);

module.exports.handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};
