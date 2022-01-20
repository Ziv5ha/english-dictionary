const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });

const randomWordByPartOfSpeach = async (req, res, next) => {
  const { word, pos } = req.params;
  if (!word || !pos) next('missingParams');
  const params = {
    TableName: 'Dictionary',
    KeyConditionExpression: 'word = :word AND pos = :pos',
    ExpressionAttributeValues: {
      ':word': word.toUpperCase(),
      ':pos': pos,
    },
  };
  const ans = await ddb
    .query(params, (err, data) => (err ? err : data))
    .promise();
  if (!ans.items) next('wordNotFound');
  res.send(ans.items);
};

module.exports = randomWordByPartOfSpeach;
