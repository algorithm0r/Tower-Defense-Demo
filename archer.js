class Archer {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/archer.png");

        this.velocity = { x: 0, y: 0 };
        this.maxSpeed = 50; // pixels per second

        this.animations = [];
        this.animations.push([]);
        this.animations[0].push(new Animator(this.spritesheet, 4, 10, 48, 48, 5, 0.2, 26, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 64, 10, 48, 48, 5, 0.2, 26, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 128, 10, 48, 48, 5, 0.2, 26, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 183, 10, 48, 48, 5, 0.2, 26, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 239, 10, 48, 48, 5, 0.2, 26, false, true));

        this.state = 0; // 0 walking, 1 attacking, 2 dead

        this.facing = 0; // 0 = up, clockwise

        this.elapsedTime = 0;
    };

    update() {
        this.elapsedTime += this.game.clockTick;
        this.velocity = { x: Math.cos(this.elapsedTime), y: Math.sin(this.elapsedTime) };

        this.facing = getFacing(this.velocity);
    };

    draw(ctx) {
        if (this.facing < 5) {
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
        } else {
            ctx.save();
            ctx.scale(-1, 1);
            this.animations[this.state][8 - this.facing].drawFrame(this.game.clockTick, ctx, -(this.x) - 48, this.y, 1);
            ctx.restore();
        }
    };
};
