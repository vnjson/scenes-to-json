

const { join } = require('path');
const scenesToJson = require('./lib/scenes-to-json')

let __src = join(__dirname, 'example/scenes');
let __dist = join(__dirname, 'example/dist');

scenesToJson(__src, __dist, (err, data)=>{
  if(err) throw new Error(err);
 // console.log(data)
  console.log('Сцены собраны')
});

/*
      INIT.=> boilerplate
 */