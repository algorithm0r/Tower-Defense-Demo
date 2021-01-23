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
	//gameEngine.addEntity(new Archer(gameEngine, 200, 100));
	gameEngine.addEntity(new Footman(gameEngine, 1000, 500, [{ x: 600, y: 500 }, { x: 400, y: 400 }, { x: 200, y: 400 }, { x: 0, y: 0 }]));
	//gameEngine.addEntity(new Arrow(gameEngine, 100, 200));

	gameEngine.start();
});
