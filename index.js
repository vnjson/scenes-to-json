
const 
  createScene                 = require('./lib/create-scene'),
  addLabels                   = require('./lib/add-labels');



function scenesToJson(__src, __dist, notify){


createScene(__src, __dist)
      .then(function(scenesObj){
            addLabels(scenesObj, __src, __dist).then((data)=>{
                  notify(null, data);
             }).catch((e)=>{
                  notify(err);
            });/*addLabels*/
      }).catch(function(err){
              notify(err);
      });/*createScene*/
 
};/*sceneToJson*/


module.exports = scenesToJson;