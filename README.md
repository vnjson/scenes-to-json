# scenes-to-json
> Трансляция кусков yaml кода в единый .json  файл сцены.

## Install

```console
npm install --save scenes-to-json
```

## Usage

```js
const scenesToJson = require('scenes-to-json');

/*
 * @param __src String
 * @param __dist String 
 * @notify Function 
 */
let __src = './src/scenes';
let __dist = './build/local/game/scenes/en-US/';

scenesToJson(__src, __dist, function(err, msg){
  if(err){
    throw new Error(err);
  }
  console.log(msg);
});


```


## License
> MIT License (MIT)