const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });

const getWordAndPartOfSpeach = async (req, res, next) => {
  const { word, partOfSpeech } = req.params;
  if (!word || !partOfSpeech) next('missingParams');
  const params = {
    TableName: 'Dictionary',
    KeyConditionExpression: 'word = :word AND pos = :pos',
    ExpressionAttributeValues: {
      ':word': word.toUpperCase(),
      ':pos': partOfSpeech,
    },
  };
  const ans = await ddb
    .query(params, (err, data) => (err ? err : data))
    .promise();
  if (!ans.items) next('wordNotFound');
  res.send(ans.items);
};

module.exports = getWordAndPartOfSpeach;
