// const ABC = () => {
//   const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//   return abc.split('');
// };

const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });
const json = require('./dictionary.json');
console.log(json.length);

const insertData = async () => {
  for (let i = 13802; i < json.length; i++) {
    const params = {
      TableName: 'Dictionary',
      Item: json[i],
    };
    await ddb.put(params, (err, data) => (err ? err : data)).promise();
    console.log(`${i}: ${json[i].word}`);
  }
};
insertData();
