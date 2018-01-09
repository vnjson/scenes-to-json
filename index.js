
const 
  vnjs                        = require('../../vnjs'),
  createScene                 = require('./lib/create-scene'),
  addLabels                   = require('./lib/add-labels');


function scenesToJson(dataParam){
  const { src, dist, notify } = dataParam;

createScene(src, dist)
      .then(function(scenesObj){
            addLabels(scenesObj, src, dist).then((data)=>{
                  notify(null, data);
             }).catch((e)=>{
                  notify(err);
            });/*addLabels*/
      }).catch(function(err){
              notify(err);
      });/*createScene*/
 
};/*sceneToJson*/


vnjs.on('scenesToJson', scenesToJson);