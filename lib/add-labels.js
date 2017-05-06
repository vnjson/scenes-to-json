const
  tree                      = require('complete-directory-tree'),
  fs                        = require('fs-extra'),
  yaml                      = require('js-yaml'),
  { join }                  = require('path');

/*
 * @scenes = {
 *   start: {labels:{},characters:{}, assets:{}}
 *  }
 * __src = E:\sandbox\gamevn\src\scenes
 * __build = E:\sandbox\gamevn\build\local\game\scenes\ru-RU
 */


function addLabels(scenes, __src, __dist){
return new Promise((resolve, reject)=>{
  try{
    for(let name in scenes){
      let __labels = join(__src, name, "labels");
      /*Перебираю папку labels*/
        tree(__labels).files
            .forEach(function(file){
              /*Задаю в пулл сцены {scenes} параметр labels*/
                let labelName =file.name.split('.yaml')[0];
                scenes[name].labels[labelName] = new Object();
                scenes[name].labels[labelName] = yaml.safeLoad(fs.readFileSync(file.path, 'utf8'));

            });//forEach
    /*Получаю каждую отдельную сцену и записываю ее в файл*/        
    let dataScene = scenes[name];  
    fs.outputJson(join(__dist, `${name}.json`), dataScene, function(err){
      if(err){
        reject(err);
      }
      resolve("success")
    });
    };//for

  }catch(e){
    reject(e);
  }


})



}


module.exports = addLabels;