const
	dirTree          				= require('directory-tree'),
	yaml             				= require('js-yaml'),
	fs                      = require('fs'),
	{ join, normalize, basename } = require('path');

const yamlConfig = {
	schema:  yaml.JSON_SCHEMA
}




function scenesToJSON(__src, __dist, callback, _assetsUrl){
const assetsUrl = _assetsUrl||'/scenes/assets/';	
const assetsDir = join(__dist, "/assets/");

if(fs.existsSync(__dist)){
	fs.rmdirSync(__dist, { recursive: true });
}
fs.mkdirSync(__dist);
if(fs.existsSync(assetsDir)){
	fs.rmdirSync(assetsDir, { recursive: true });
}
fs.mkdirSync(assetsDir);

const scenesTree = dirTree(__src).children;

try {

const _scenes = scenesTree.map(scene=>{

	var SCENE = new Object();
			SCENE.assets = new Array();		
	scene.children.map(label=>{
		let { type, name, path } = label;
		let labelName = basename(name, '.yaml');
		if(type=='directory'){

				label.children.map(asset=>{
					fs.copyFile(asset.path, join(__dist, "/assets/", asset.name), (err)=>{
						if (err) throw err;

					})
					let _asset = { 
								name:  basename(asset.name, asset.extension),
								url: assetsUrl + asset.name
							}
					SCENE.assets.push(_asset)
									
								
				
				})
		}else{	
			let yamlBody = fs.readFileSync( normalize(path), 'utf8');

			SCENE[labelName] = yaml.load(yamlBody, yamlConfig);
		};
	});//sceneItem
	//write SCENE 
	let pathToFile = join(__dist, `${scene.name}.json`);
	fs.writeFileSync(pathToFile, JSON.stringify(SCENE, null, 2));


		

	return scene.name;
});
callback(null, _scenes)
}
catch (err){
	callback(err)
}



}













module.exports = scenesToJSON;