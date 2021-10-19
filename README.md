# scenes-to-json
> Translation Vnjson scenes to json bundle

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
