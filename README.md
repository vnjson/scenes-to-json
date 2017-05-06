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


__`source directory scenes`__

```plane_text
scenes
├───start
│   ├───assets
│   |   ├───background.png
│   │   └───dialog-box.png
|   ├───labels
│   |   ├───entry.yaml
│   │   ├───chapter1.yaml
│   │   └───warlock.yaml    
|   └───characters.yaml
|
├───lab

```
__`chapter1.yaml`__

```yaml
- pr: Привет Алиса
  scene: background
  audio: maintheme1
- al: Да уж, давненько не виделись.
  jump: warlock.yaml
```
## License
> MIT License (MIT)