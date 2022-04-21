const
	dirTree          				= require('directory-tree'),
	yaml             				= require('js-yaml'),
	fs                      = require('fs-extra'),
	{ join, normalize, basename } = require('path');

const yamlConfig = {
	schema:  yaml.JSON_SCHEMA
}

const VNJSON = {};

function getFileName(scene){
	return basename(scene.name, scene.extension)
}


function scenesToJSON(src, dist, callback, assetsURL='scenes'){
/**
 * remove prev build
 */
fs.emptyDirSync(dist);
/**
 * walk dir /src
 */
let errSceneName;
let errLabelName;
try {

const _scenes = dirTree(src).children.map(scene=>{

	errSceneName = scene.name;
	if(scene.type==='directory'){
		//create scene body
	const sceneBody = new Object();
	sceneBody.assets = new Array();		
	//walk scene dir
	scene.children.map(label=>{
		/**
		 * { label }.yaml
		 */
		errLabelName = label.name;
		if(/ya?ml|yaml/i.test(label.extension)){

			let yamlBody = fs.readFileSync( normalize(label.path), 'utf8');

			sceneBody[getFileName(label)] = yaml.load(yamlBody, yamlConfig);
		}
		/**
		 * Обработка директорий внутри сцены
		 */
		if(label.type==='directory'){
				/**
				 * walk dir /assets
				 */
				label.children.forEach(asset=>{
						/**
						 * ASSETS
						 */
						if(label.name==="assets"){
									try{
										fs.copySync(asset.path, join(dist, "/assets/", asset.name));
									
										const assetBody = { 
													name:  basename(asset.name, asset.extension),
													url: `${assetsURL}/assets/${asset.name}`
										};
										sceneBody.assets.push(assetBody);
									}
									catch (err){
										console.error('Asset file error', asset.name);
										console.error(err);
									}
						}
						/**
						 * DATA
						 */
						if( label.name==="data"&&label.type==="directory" ){
									try{
										sceneBody.data = sceneBody.data||{};
										const fileBody = fs.readFileSync(asset.path, "utf-8");
										const b64Data = Buffer.from( encodeURI(fileBody) ).toString('base64');
										sceneBody.data[asset.name] = b64Data;
									}
									catch(err){
										console.error('Data file error', asset.name);
										console.error(err);
									}
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
	const pathToFile = join(dist, 'vn.json');
	fs.writeFileSync(pathToFile, JSON.stringify(VNJSON, null, 2));	
	callback();

}
catch (err){
	callback(err, errSceneName, errLabelName);
}



}




module.exports = scenesToJSON;