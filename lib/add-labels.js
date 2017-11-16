const
  tree                      = require('complete-directory-tree'),
  fs                        = require('fs-extra'),
  yaml                      = require('js-yaml'),
  normalize                 = require('normalize-path'),
  //yamlLint                  = require('yaml-lint'),
  { join }                  = require('path');



function errorHandler(err){
    let { reason, mark } = err;
    console.log(`[ reason ]: ${reason}`);
    console.log(`[ error ]: ${mark}`);

}

function addLabels(scenes, __src, __dist){
return new Promise((resolve, reject)=>{
  try{
    for(let name in scenes){
      let ctxScene = join(__src, name);
      /*Перебираю папку labels*/

        tree(ctxScene).files
            .forEach(function(file){
              /*Задаю в пулл сцены {scenes} параметр labels*/
               // console.log(file)
                let labelName = file.name.split('.yaml')[0];
                let yamlBody = fs.readFileSync(file.path, 'utf8');
                try{
                   scenes[name][labelName] = new Array();
                   scenes[name][labelName] = yaml.safeLoad(yamlBody);
                }catch(e){
                  errorHandler(e);
                }
               

            });//forEach
    /*Получаю каждую отдельную сцену и записываю ее в файл*/        
    let dataScene = scenes[name];  
    let fileName = normalize(join(__dist, `${name}.json`));
    //console.log(`  > ${fileName}`)
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