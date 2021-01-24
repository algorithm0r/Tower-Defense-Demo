var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/buildings.png");
ASSET_MANAGER.queueDownload("./sprites/footman.png");
ASSET_MANAGER.queueDownload("./sprites/archer.png");
ASSET_MANAGER.queueDownload("./sprites/arrow.png");

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	gameEngine.init(ctx);

	gameEngine.addEntity(new Tower(gameEngine, 100, 100));
	gameEngine.addEntity(new Footman(gameEngine, 1000, 800, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]));
	gameEngine.addEntity(new Archer(gameEngine, 1000, 800, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]));

	gameEngine.start();
});
