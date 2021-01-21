class Footman {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/footman.png");

        this.velocity = { x: 0, y: 50 };
        this.maxSpeed = 50; // pixels per second

        this.animations = [];
        this.animations.push([]);
        this.animations[0].push(new Animator(this.spritesheet, 12, 9, 48, 53, 5, 0.2, 0, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 88, 9, 48, 53, 5, 0.2, 0, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 160, 9, 48, 53, 5, 0.2, 0, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 236, 9, 48, 53, 5, 0.2, 0, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 308, 9, 48, 53, 5, 0.2, 0, false, true));

        this.state = 0; // 0 walking, 1 attacking, 2 dead

        this.facing = 0; // 0 = up, clockwise

        this.elapsedTime = 0;
    };

    update() {
        this.facing = getFacing(this.velocity);
    };

    draw(ctx) {
        if (this.facing < 5) {
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
        } else {
            ctx.save();
            ctx.scale(-1, 1);
            this.animations[this.state][8 - this.facing].drawFrame(this.game.clockTick, ctx, -(this.x) - 64, this.y, 1);
            ctx.restore();
        }
    };
};