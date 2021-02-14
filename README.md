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

> Console

```bash
stj ./scenes ./dist
stj ./src ./scenes --url ./scenes/assets/
```
> Programmaticly
```js
const scenesToJson = require('scenes-to-json');
//JSON_SCHEMA
let src = './example/scenes';
let dist = './example/dist';
var url = '/scenes/assets/';//path into scene.assets[{url:"/assets/"}] default /scenes/assets/

scenesToJson(src, dist, (err, data)=>{
  if(err){
     console.dir(err.reason);
     console.log('line', err.mark.line, 'column', err.mark.column)
     console.log(err.mark.snippet);
  }else{
    console.log('scenes build', data);
  }

}, url);

```
__`input`__
```text
example/scenes
├───start
│   ├───assets
│   |   ├───background.png
│   │   └───audio1.mp3
│   ├───some-label.yaml
│   ├───chapter1.yaml
│   └───characters.yaml    
├───lab
```

__`output`__
```text

example/dist
├───scenes
│   ├───start.json
│   └───lab.json
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
__`scene.json`__
```json
{
  "assets": [
    { "name": "imgName", "url": "/assets/imgName.png" }
  ],
  "label1": [
    {
      "main-menu": {
        "scene": "background", 
        "audio": "song1"
      }
    }
  ],
  "chapter1": [
      {"pr": "Привет Алиса", "scene": "background"},
      {"al": "Да уж, давненько не виделись.", "jump": "warlock"}
  ],
  "label2": []
}
```

## License
> MIT License (MIT)
