const
  tree                      = require('complete-directory-tree'),
  fs                        = require('fs-extra'),
  yaml                      = require('js-yaml'),
  { join, basename }        = require('path');

var scenes = {};

function addAssets(scene, __src){
    
          let { name } = scene;

      let __assets = join(__src, name, "assets");
      /*Перебираю папку labels*/
        tree(__assets).files
            .forEach(function(file){
              let { size, extension } = file;
              let obj = { name: file.name.split('.')[0], size, extension };
             // scenes[name].assets = new Array();
              scenes[name].assets.push(obj);
           // fs.copy(file.path, )
            });//forEach    
    
   // fs.outputJson(join(__dist, `${name}.json`), dataScene, function(err){
  
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

function createSceneObject(__src){
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
        addAssets(scene, __src);
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