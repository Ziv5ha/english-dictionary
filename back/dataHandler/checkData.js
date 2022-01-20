const json = require('./dictionary.json');
const rawPos = json.map((item) => item.pos);
// const pos = rawPos.filter(item => pos.includes(item))
const uniquePos = [new Set(rawPos)];
console.log(uniquePos);
