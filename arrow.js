class Arrow {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/arrow.png");

        this.velocity = {x:0,y:50};

        this.animations = [];
        this.animations.push(new Animator(this.spritesheet, 0, 0, 32, 32, 1, 0.2, 0, false, true));
        this.animations.push(new Animator(this.spritesheet, 40, 0, 32, 32, 1, 0.2, 0, false, true));
        this.animations.push(new Animator(this.spritesheet, 80, 0, 32, 32, 1, 0.2, 0, false, true));
        this.animations.push(new Animator(this.spritesheet, 120, 0, 32, 32, 1, 0.2, 0, false, true));
        this.animations.push(new Animator(this.spritesheet, 160, 0, 32, 32, 1, 0.2, 0, false, true));

        this.facing = 5;
        
        this.elapsedTime = 0;
    };

    update() {
        this.facing = getFacing(this.velocity);
    };

    draw(ctx) {
        if (this.facing < 5) {
            this.animations[this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
        } else {
            ctx.save();
            ctx.scale(-1, 1);
            this.animations[8 - this.facing].drawFrame(this.game.clockTick, ctx, -(this.x) - 32, this.y, 1);
            ctx.restore();
        }
    };
};
