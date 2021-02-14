const
	dirTree          				= require('directory-tree'),
	yaml             				= require('js-yaml'),
	fs                      = require('fs'),
	{ join, normalize, basename } = require('path');



function scenesToJSON(__src, __dist, callback){

const scenesTree = dirTree(__src).children;

try {

scenesTree.map(scene=>{

	var SCENE = new Object();

	scene.children.map(label=>{
		let { type, name, path } = label;
		let labelName = basename(name, '.yaml');
		if(type=='directory'){

				label.children.map(asset=>{
					var url = asset.path;
					console.log(url)
					console.log(__dist)
					SCENE.assets = [
										{ 
											name:  basename(asset.name, asset.extension),
											url: '/assets/'+ asset.name
										}
									]
					//console.log( )
				})
		}else{	
			let yamlBody = fs.readFileSync( normalize(path), 'utf8');

			SCENE[labelName] = yaml.safeLoad(yamlBody);
		};
	});//sceneItem
	//write SCENE 
	let pathToFile = join(__dist, `${scene.name}.json`);
	fs.writeFileSync(pathToFile, JSON.stringify(SCENE, null, 2));


		

	
});
callback(null, "Scenes is building")
}
catch (err){
	callback(err)
}



}













module.exports = scenesToJSON;