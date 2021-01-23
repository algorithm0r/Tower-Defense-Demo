class Tower {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/buildings.png");
        this.radius = 30;
        this.visualRadius = 300;
        this.state = 0;
        this.model = randomInt(3);

        this.hitpoints = 100;

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
        if (this.hitpoints < 0) this.removeFromWorld = true;
    };

    draw(ctx) {
        var x = this.x - 32;
        var y = this.y - 32;
        this.size = 64;
        switch (this.state) {
            case 0:
                ctx.drawImage(this.spritesheet, 410, 538, 64, 64, x, y, this.size, this.size);
                break;
            case 1:
                ctx.drawImage(this.spritesheet, 476, 538, 64, 64, x, y, this.size, this.size);
                break;
            case 2:
                switch (this.model) {
                    case 0:
                        ctx.drawImage(this.spritesheet, 476, 538, 64, 64, x, y, this.size, this.size);
                        ctx.drawImage(this.spritesheet, 410, 603, 64, 64, x, y, this.size, this.size);
                        break;
                    case 1:
                        ctx.drawImage(this.spritesheet, 476, 603, 64, 64, x, y, this.size, this.size);
                        break;
                    case 2:
                        ctx.drawImage(this.spritesheet, 541, 603, 64, 64, x, y, this.size, this.size);
                        break;
                };
                break;
        };

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Green";
            ctx.strokeRect(x, y, 64, 64);
            
            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();

            ctx.setLineDash([5, 15]);
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.visualRadius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
            ctx.setLineDash([]);
        }
    };
};
