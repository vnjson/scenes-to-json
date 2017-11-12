# scenes-to-json
> Трансляция кусков yaml кода в единый .json  файл сцены.

## Install

```bash
npm install -g scenes-to-json
```
or

```bash
npm install --save scenes-to-json
```

## Usage

Cli version

```bash
scenestojson ./scenes ./dist
```
Program
```js
const scenesToJson = require('scenes-to-json');

/*
 * @param src String
 * @param dist String 
 * @param notify Function 
 */
let local = 'en-US';
let src = './src/scenes';
let dist = `./build/html/game/scenes/${local}/`;

scenesToJson(src, dist, function(err, msg){
  if(err){
    throw new Error(err);
  }
  console.log(msg);
});

```
__`input`__
```text
scenes
├───start
│   ├───assets
│   |   ├───background.png
│   │   └───audio1.mp3
│   ├───entry.yaml
│   ├───chapter1.yaml
│   └───label2.yaml    
├───lab
```

__`output`__
```text

game
├───scenes
│   └───en-US
│       ├───start.json
│       └───lab.json
└───assets
    ├───background.png
    └───audio1.mp3 
   
```

__`chapter1.yaml`__

```yaml
- pr: Привет Алиса
  scene: background
- al: Да уж, давненько не виделись.
  jump: warlock
```
__`start.json`__
```json
{
  "assets": [{},{}],
  "entry": [{"main-menu": {"scene": "background", "audio": "song1"}}],
  "chapter1": [
      {"pr": "Привет Алиса", "scene": "background"},
      {"al": "Да уж, давненько не виделись.", "jump": "warlock"}
  ],
  "label2": []
}
```

## License
> MIT License (MIT)
