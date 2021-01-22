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

        this.animations.push([]);
        this.animations[1].push(new Animator(this.spritesheet, 0, 277, 64, 64, 4, 0.2, 0, false, true));
        this.animations[1].push(new Animator(this.spritesheet, 77, 277, 64, 64, 4, 0.2, 0, false, true));
        this.animations[1].push(new Animator(this.spritesheet, 150, 277, 64, 64, 4, 0.2, 0, false, true));
        this.animations[1].push(new Animator(this.spritesheet, 233, 277, 64, 64, 4, 0.2, 0, false, true));
        this.animations[1].push(new Animator(this.spritesheet, 312, 277, 64, 64, 4, 0.2, 0, false, true));

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
        var offset = 64;
        this.animations[1][0].drawFrame(this.game.clockTick, ctx, this.x, this.y + offset, 1);
        this.animations[1][1].drawFrame(this.game.clockTick, ctx, this.x + offset, this.y + offset, 1);
        this.animations[1][2].drawFrame(this.game.clockTick, ctx, this.x + offset * 2, this.y + offset, 1);
        this.animations[1][3].drawFrame(this.game.clockTick, ctx, this.x + offset * 3, this.y + offset, 1);
        this.animations[1][4].drawFrame(this.game.clockTick, ctx, this.x + offset * 4, this.y + offset, 1);
    };
};
