const
	dirTree          				= require('directory-tree'),
	yaml             				= require('js-yaml'),
	fs                      = require('fs-extra'),
	{ join, normalize, basename } = require('path');

const yamlConfig = {
	schema:  yaml.JSON_SCHEMA
}

var VNJSON = { TREE: {} };

function getFileName(scene){
	return basename(scene.name, scene.extension)
}

function addFilesToVNJSON (src, scene){

	/**
		* package.yaml
		*/
	if(getFileName(scene)==='package'){
		let yamlBody = fs.readFileSync( join(src, scene.name), 'utf8');

  	let packageBody = yaml.load(yamlBody, yamlConfig);

		VNJSON = Object.assign(packageBody, VNJSON)
		
	}
		/**
		* characters.yaml
		*/
	else if(getFileName(scene)==='characters'){
		let yamlBody = fs.readFileSync( join(src, scene.name), 'utf8');

  	let charactersBody = yaml.load(yamlBody, yamlConfig);
		VNJSON.TREE.characters = charactersBody;

	}

}


function scenesToJSON(src, dist, callback, assetsURL='./scenes'){

	fs.emptyDirSync(dist)	

/*
 * get Root
 */
const $root = dirTree(src).children;
/**
 * walk dir /src
 */
try {

const _scenes = $root.map(scene=>{


	if(scene.type==='file'){
			/**
	 			* rootFiles.yaml
	 			*/
				addFilesToVNJSON(src, scene)
	}
	else if(scene.type==='directory'){
		/**
		 * rootDirectories/
		 */
		
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

	VNJSON.TREE[scene.name] = sceneBody;

	}
});

/**
 * write VNJSON to vn.json
 */
let pathToFile = join(dist, 'vn.json');
fs.writeFileSync(pathToFile, JSON.stringify(VNJSON, null, 2));
		
console.log(VNJSON)

callback(null);
}
catch (err){
	callback(err);
}



}



module.exports = scenesToJSON;