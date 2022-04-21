# scenes-to-json
> Translation Vnjson scenes to json bundle

## Install
__`global`__

```bash
npm install -g scenes-to-json
```
__`local`__

```bash
npm install scenes-to-json
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
let src = './example/src';
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
scenesToJson(src, dist, (err, sceneName, labelName)=>{
  if(err){
     console.log("\x1b[32m"+err.reason);
     console.log("\x1b[31m"+sceneName+'/'+ labelName+"\x1b[0m"+"\x1b[33m");
     console.log('\x1b[36mline', err.mark.line, 'column', err.mark.column);
     console.log("\x1b[33m"+err.mark.snippet);
  }
  else{
    console.log('\x1b[35m [ \x1b[36m scenes build \x1b[35m ]');
  }


}, assetsURL);

```
__`input`__
```text
/src/
├───volume_1
│   ├───assets
│   │   ├───background.png
│   │   └───audio1.mp3
│   ├───chapter_2.yaml
│   └───$init.yaml
├───volume_2
│   ├───assets
│   │   └───char1.png
│   ├───data
│   │   ├───somescritp.py //plane_text to json
│   │   └───somefile.txt
│   ├───label_prefix
│   │   ├───label_1.yaml
│   │   └───label_2.yaml
│   │
│   └───$init.yaml
```

__`output`__
```text

/dist/
├───assets
│   ├───background.png
│   └───audio1.mp3 
└───vn.json  
   
```



## License
> MIT License (MIT)
