const
  tree                      = require('complete-directory-tree'),
  fs                        = require('fs-extra'),
  yaml                      = require('js-yaml'),
  normalize                 = require('normalize-path'),
  { join }                  = require('path');

/*
 * __src = E:\sandbox\gamevn\src\scenes
 * __build = E:\sandbox\gamevn\build\local\game\scenes\ru-RU
 */


function addLabels(scenes, __src, __dist){
return new Promise((resolve, reject)=>{
  try{
    for(let name in scenes){
      let __labels = join(__src, name);
      /*Перебираю папку labels*/
        tree(__labels).files
            .forEach(function(file){
              /*Задаю в пулл сцены {scenes} параметр labels*/

                let labelName = file.name.split('.yaml')[0];

                scenes[name][labelName] = new Array();
                scenes[name][labelName] = yaml.safeLoad(fs.readFileSync(file.path, 'utf8'));

            });//forEach
    /*Получаю каждую отдельную сцену и записываю ее в файл*/        
    let dataScene = scenes[name];  
    let fileName = normalize(join(__dist, `${name}.json`));
    console.log(`  > ${fileName}`)
    fs.outputJson(fileName, dataScene, {spaces: 2}, function(err){
      if(err){
        reject(err);
      }
      resolve("success");
    });
    };//for

  }catch(e){
    reject(e);
  }


})



}


module.exports = addLabels;