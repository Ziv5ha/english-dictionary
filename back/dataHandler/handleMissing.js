const fs = require('fs');
const AWS = require('aws-sdk');
const json = require('./dictionary.json');
const jsonFromDdb = require('./dataInDB.json');
const ddb = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });

const importDataFromDb = async () => {
  let bigData = [];
  let data = await ddb.scan({ TableName: 'Dictionary' }).promise();
  bigData = bigData.concat(...data.Items);
  while (bigData.length < 107793) {
    const tryAgain = async () => {
      console.log(bigData.length);
      data = await ddb
        .scan({
          TableName: 'Dictionary',
          ExclusiveStartKey: data.LastEvaluatedKey,
        })
        .promise();
      bigData = bigData.concat(...data.Items);
    };
    await tryAgain();
  }
  fs.writeFileSync('dataInDB.json', JSON.stringify(bigData));
  console.log('done');
};
// importDataFromDb();

const compareTable = () => {
  const dif = json.filter(
    (item) =>
      !jsonFromDdb.find(
        (itemInDdb) =>
          item.word === itemInDdb.word &&
          item.pos === itemInDdb.pos &&
          item.definitions[0] === itemInDdb.definitions[0]
      )
  );
  fs.writeFileSync('missingInDdb.json', JSON.stringify(dif));
  console.log(`json: ${json.length}`);
  console.log(`jsonFromDdb: ${jsonFromDdb.length}`);
  console.log(`dif: ${dif.length}`);
};
// compareTable();
console.log(json[json.length - 1]);
