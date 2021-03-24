const
	dirTree          				= require('directory-tree'),
	yaml             				= require('js-yaml'),
	fs                      = require('fs'),
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


function scenesToJSON(src, dist, callback, _assetsUrl){
const assetsUrl = _assetsUrl||'/scenes/assets/';	
const assetsDir = join(dist, "/assets/");

if(fs.existsSync(dist)){
	fs.rmdirSync(dist, { recursive: true });
}
fs.mkdirSync(dist);
if(fs.existsSync(assetsDir)){
	fs.rmdirSync(assetsDir, { recursive: true });
}
fs.mkdirSync(assetsDir);



/*
 * Root
 */
const $root = dirTree(src).children;

try {

const _scenes = $root.map(scene=>{

	/**
	 * package.yaml
	 */
	if(scene.type==='file'){
				addFilesToVNJSON(src, scene)
	}
	else if(scene.type==='directory'){
	var sceneBody = new Object();
			sceneBody.assets = new Array();		
	scene.children.map(label=>{
		let { type, name, path } = label;
		let labelName = basename(name, '.yaml');
		/**
		 * /assets
		 */
		if(type=='directory'){

				label.children.map(asset=>{
					fs.copyFile(asset.path, join(dist, "/assets/", asset.name), (err)=>{
						if (err) throw err;

					})
					let _asset = { 
								name:  basename(asset.name, asset.extension),
								url: assetsUrl + asset.name
							}
					sceneBody.assets.push(_asset)
									
								
				
				})
		}else{
			/**
			 * label.yaml
			 */
			let yamlBody = fs.readFileSync( normalize(path), 'utf8');

			sceneBody[labelName] = yaml.load(yamlBody, yamlConfig);
		};
	});//sceneItem
	//write SCENE 
	let pathToFile = join(dist, `${scene.name}.json`);
	fs.writeFileSync(pathToFile, JSON.stringify(sceneBody, null, 2));
		
	VNJSON.TREE[scene.name] = sceneBody;

	}
});


console.log(VNJSON)

callback(null);
}
catch (err){
	callback(err);
}



}













module.exports = scenesToJSON;