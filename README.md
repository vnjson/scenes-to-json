# scenes-to-json
> Translation of pieces of yaml code into a single .json file with scenes.

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
stj ./src ./scenes --url ./scenes
```
> Programmaticly
```js
const scenesToJson = require('scenes-to-json');
//JSON_SCHEMA
let src = './example/scenes';
let dist = './example/dist';
var assetsURL = './dist'; //default = ./scenes
/**
{
  assets: {
    name: '',
    url: `${assetsURL}/assets/background.jpg`
  }
}
 */
scenesToJson(src, dist, (err, data)=>{
  if(err){
     console.dir(err.reason);
     console.log('line', err.mark.line, 'column', err.mark.column)
     console.log(err.mark.snippet);
  }else{
    console.log('scenes build');
  }

}, assetsURL);

```
__`input`__
```text
/src/
├───package.yaml
├───characters.yaml
├───start
│   ├───assets
│   │   ├───background.png
│   │   └───audio1.mp3
│   ├───chapter_2.yaml
│   └───chapter_1.yaml
├───lab
```

__`output`__
```text

/dist/
├───assets
│   ├───background.png
│   └───audio1.mp3 
└───vn.json  
   
```

__`package.yaml`__
```yaml
name: App
version: 0.0.1
entry: start.chapter1
author: bakakasin@gmail.com
debug: true
mode: all #once #Динамически подгружает assets
keywords: 
   - vnjson
   - simple example
   - Vnjson Script
   - text quest
```
__`characters.yaml`__
```yaml
- name: al
  text: Alice
  age: 17
  color: azure

- name: j
  text: John
  age: 21
  color: red
```

__`chapter1.yaml`__
```yaml
- pr: Привет Алиса
  scene: background
- al: Да уж, давненько не виделись.
  jump: scene2.chapter1
```



## License
> MIT License (MIT)
