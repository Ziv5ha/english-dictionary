const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT;
const errorHandler = require('./middleware/errorHandler');
const getWord = require('./controllers/wordController');
const getWordAndPartOfSpeach = require('./controllers/wordAndSpeachPartController');

app.use(cors());
app.use(express.json());

app.get('/:word', getWord);
app.get('/:word/:partOfSpeech', getWordAndPartOfSpeach);
// app.get('/part-of-speech/:part', (req, res, next) => {});
// app.get('/part-of-speech/:part?letter=X', (req, res, next) => {});

app.use(errorHandler);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
