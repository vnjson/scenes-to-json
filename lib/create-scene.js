const
  tree                      = require('complete-directory-tree'),
  fs                        = require('fs-extra'),
  yaml                      = require('js-yaml'),
  prettyBytes               = require('pretty-bytes'),
  { 
    join, 
    basename, 

  }                         = require('path');






function addAssets(scene, __src, __dist){
    
      let { name } = scene;

      let __assets = join(__src, name, "assets");
      /*
       * Перебираю папку assets
       */
        scenes[name] = { assets:[] };
       try{
        tree(__assets).files
            .forEach(function(file){
              let { size, extension } = file;
              let __to = join(__dist, '../../assets', file.name);
              /*
               * Asset object
               */
              // console.dir(file)
              let obj = { 
                  id: file.name.split('.')[0], 
                  size: prettyBytes(size), 
                  extension, 
                  path: `/assets/${file.name}`
                };
              /*
               * Add asset object to current string
               */
             
              scenes[name].assets.push(obj);
             // console.log("  > "+obj.path)
              /*
               * Copy from /scenes/sceneName/assets
               * to /scenes/assets
               */
              try{
                fs.copySync( file.path,__to);
              }catch(e){
                throw new Error(e);
              }
            });//forEach    
       }catch(e){
          return scenes;
       }     
};
var scenes = {};
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
       //console.log(scene.name)
        //scenes[scene.name] = new Object();
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