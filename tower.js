class Tower {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/buildings.png");

        this.state = 0;
        this.model = randomInt(3);

        this.elapsedTime = 0;
    };

    update() {
        this.elapsedTime += this.game.clockTick;
        if (this.elapsedTime > 1) {
            this.state = 1;
        }
        if (this.elapsedTime > 2) {
            this.state = 2;
        }
    };

    draw(ctx) {
        this.size = 64;
        switch (this.state) {
            case 0:
                ctx.drawImage(this.spritesheet, 410, 538, 64, 64, this.x, this.y, this.size, this.size);
                break;
            case 1:
                ctx.drawImage(this.spritesheet, 476, 538, 64, 64, this.x, this.y, this.size, this.size);
                break;
            case 2:
                switch (this.model) {
                    case 0:
                        ctx.drawImage(this.spritesheet, 476, 538, 64, 64, this.x, this.y, this.size, this.size);
                        ctx.drawImage(this.spritesheet, 410, 603, 64, 64, this.x, this.y, this.size, this.size);
                        break;
                    case 1:
                        ctx.drawImage(this.spritesheet, 476, 603, 64, 64, this.x, this.y, this.size, this.size);
                        break;
                    case 2:
                        ctx.drawImage(this.spritesheet, 541, 603, 64, 64, this.x, this.y, this.size, this.size);
                        break;
                };
                break;
        };
    };
};
