
const scenesToJson = require('./index')

const util = require('util')

scenesToJson('./example/scenes', 'example/dist', (err, data)=>{
  if(err){
  	 console.dir(err.reason);
  	 console.log('line', err.mark.line, 'column', err.mark.column)
  	 console.log(err.mark.snippet)
  }else{
  	console.log('scenes build', data)
  }


});
