
const 
  createScene                 = require('./lib/create-scene'),
  addLabels                   = require('./lib/add-labels');



function sceneToJson(__src, __dist, notify){


createScene(__src)
      .then(function(scenesObj){
            addLabels(scenesObj, __src, __dist).then((data)=>{
                  notify(null, data);
                  process.exit(0);
            }).catch((e)=>{
                  notify(err);
                  process.exit(0);
            });/*addLabels*/
      }).catch(function(err){
              notify(err);
              process.exit(0);
      });/*createScene*/
 
};/*sceneToJson*/


module.exports = sceneToJson;