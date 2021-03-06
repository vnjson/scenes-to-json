const
	dirTree          				= require('directory-tree'),
	yaml             				= require('js-yaml'),
	fs                      = require('fs-extra'),
	{ join, normalize, basename } = require('path');

const yamlConfig = {
	schema:  yaml.JSON_SCHEMA
}

var VNJSON = {};

function getFileName(scene){
	return basename(scene.name, scene.extension)
}


function scenesToJSON(src, dist, callback, assetsURL='./scenes'){
	
fs.emptyDirSync(dist)	
/**
 * walk dir /src
 */
try {

const _scenes = dirTree(src).children.map(scene=>{


	if(scene.type==='directory'){
		//create scene body
	var sceneBody = new Object();
			sceneBody.assets = new Array();		
		//walk scene dir
	scene.children.map(label=>{
		/**
		 * label.yaml
		 */
		if(label.type==='file'){

			let yamlBody = fs.readFileSync( normalize(label.path), 'utf8');

			sceneBody[getFileName(label)] = yaml.load(yamlBody, yamlConfig);
		}
		/**
		 * Assets
		 */
		else if(label.type==='directory'){
				/**
				 * walk dir /assets
				 */
				label.children.map(asset=>{
					try{
						fs.copySync(asset.path, join(dist, "/assets/", asset.name))
					
						let assetBody = { 
									name:  basename(asset.name, asset.extension),
									url: `${assetsURL}/assets/${asset.name}`
								}
						sceneBody.assets.push(assetBody)				
					}
					catch (err){
						throw err;
					}
				})
		}
	});//sceneItem

	/**
	 * add current scene to TREE
	 */

	VNJSON[scene.name] = sceneBody;

	}
});

/**
 * write VNJSON to vn.json
 */
let pathToFile = join(dist, 'vn.json');
fs.writeFileSync(pathToFile, JSON.stringify(VNJSON, null, 2));
		
callback(null);
}
catch (err){
	callback(err);
}



}



module.exports = scenesToJSON;