const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });

const getWord = async (req, res, next) => {
  const { word } = req.params;
  if (!word) next('missingParams');
  const params = {
    TableName: 'Dictionary',
    KeyConditionExpression: 'word = :word',
    ExpressionAttributeValues: {
      ':word': word.toUpperCase(),
    },
  };
  const ans = await ddb
    .query(params, (err, data) => (err ? err : data))
    .promise();
  if (!ans.Items) next('wordNotFound');
  console.log(ans);
  res.json(ans.Items);
};

module.exports = getWord;
