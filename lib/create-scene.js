const
  tree                      = require('complete-directory-tree'),
  fs                        = require('fs-extra'),
  yaml                      = require('js-yaml'),
  prettyBytes               = require('pretty-bytes'),
  normalize                 = require('normalize-path'),
  { join, basename }        = require('path');

var scenes = {};

function addAssets(scene, __src, __dist){
    
      let { name } = scene;

      let __assets = join(__src, name, "assets");
      /*
       * Перебираю папку assets
       */
        tree(__assets).files
            .forEach(function(file){
              let { size, extension } = file;
              let __to = join(__dist, 'assets', file.name);
              /*
               * Объект асета
               */
              let obj = { 
                  name: file.name.split('.')[0], 
                  size: prettyBytes(size), 
                  extension, 
                  path: normalize(__to)
                };
              /*
               * Добавляю объект асета в текущую сцену
               */
              scenes[name].assets.push(obj);
              
              /*
               * Копирую файлы из /scenes/sceneName/assets
               * в /scenes/assets
               */
              try{
                fs.copySync( file.path,__to);
              }catch(e){
                throw new Error(e);
              }
            });//forEach    

};

function addCharacters(scene, __src){
  try{
          let { files, name } = scene;
        files.forEach(function(file){
          let charactersFile = fs.readFileSync(join(__src, name,"characters.yaml"), 'utf8');
             scenes[name] = {
                    labels: {},
                    assets: [],
                    characters: yaml.safeLoad(charactersFile)
             };

        });
    }catch(e){
      throw e;
    }
};

function createSceneObject(__src, __dist){
return new Promise((resolve, reject)=>{

  try{
   tree(__src)
    .children.forEach(function(scene){
      /*
       * Перебираю директорию __src/scenes
       *  +scenes
       *    -start
       *    -lab
       */
       //console.log(scene)
        addCharacters(scene, __src);
        addAssets(scene, __src, __dist);
    });
    resolve(scenes);
  }catch(err){
    reject(err);
  }
  //return scenes;
  });
};
//createSceneObject(__scenes);

module.exports = createSceneObject;