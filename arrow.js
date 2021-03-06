class Arrow {
    constructor(game, x, y, target, towerTeam, heatSeeking) {
        Object.assign(this, { game, x, y, target, towerTeam, heatSeeking });
        this.radius = 12;
        this.smooth = false;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/arrow.png");

        var dist = distance(this, this.target);
        this.maxSpeed = 200; // pixels per second

        this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };

        this.cache = [];

        this.animations = [];
        this.animations.push(new Animator(this.spritesheet, 0, 0, 32, 32, 1, 0.2, 0, false, true));
        this.animations.push(new Animator(this.spritesheet, 40, 0, 32, 32, 1, 0.2, 0, false, true));
        this.animations.push(new Animator(this.spritesheet, 80, 0, 32, 32, 1, 0.2, 0, false, true));
        this.animations.push(new Animator(this.spritesheet, 120, 0, 32, 32, 1, 0.2, 0, false, true));
        this.animations.push(new Animator(this.spritesheet, 160, 0, 32, 32, 1, 0.2, 0, false, true));

        this.facing = 5;
        
        this.elapsedTime = 0;
    };

    drawAngle(ctx, angle) {
        if (angle < 0 || angle > 359) return;


        if (!this.cache[angle]) {
           let radians = angle / 360 * 2 * Math.PI;
           let offscreenCanvas = document.createElement('canvas');

            offscreenCanvas.width = 32;
            offscreenCanvas.height = 32;

            let offscreenCtx = offscreenCanvas.getContext('2d');

            offscreenCtx.save();
            offscreenCtx.translate(16, 16);
            offscreenCtx.rotate(radians);
            offscreenCtx.translate(-16, -16);
            offscreenCtx.drawImage(this.spritesheet, 80, 0, 32, 32, 0, 0, 32, 32);
            offscreenCtx.restore();
            this.cache[angle] = offscreenCanvas;
        }
        var xOffset = 16;
        var yOffset = 16;

        ctx.drawImage(this.cache[angle], this.x - xOffset, this.y - yOffset);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Green';
            ctx.strokeRect(this.x - xOffset, this.y - yOffset, 32, 32);
        }
    };

    update() {
        this.heatSeeking = document.getElementById("heatseeking").checked;
        this.smooth = document.getElementById("smooth").checked;

        if (this.heatSeeking) {
            var dist = distance(this, this.target);
            this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
        }

        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;

        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (this.towerTeam && (ent instanceof Archer || ent instanceof Footman) && collide(this, ent)) {
                var damage = 10 + randomInt(6);
                ent.hitpoints -= damage;
                this.game.addEntity(new Score(this.game, ent.x, ent.y, damage));
                this.removeFromWorld = true;
            }
            if (!this.towerTeam && ent instanceof Tower && collide(this, ent)) {
                var damage = 7 + randomInt(4);
                ent.hitpoints -= damage;
                this.game.addEntity(new Score(this.game, ent.x, ent.y, damage));
                this.removeFromWorld = true;
            }
        }

        this.facing = getFacing(this.velocity);
    };

    draw(ctx) {
        var xOffset = 16;
        var yOffset = 16;
        if (this.smooth) {
            let angle = Math.atan2(this.velocity.y , this.velocity.x);
            if (angle < 0) angle += Math.PI * 2;
            let degrees = Math.floor(angle / Math.PI / 2 * 360);

            this.drawAngle(ctx, degrees);
        } else {
            if (this.facing < 5) {
                this.animations[this.facing].drawFrame(this.game.clockTick, ctx, this.x - xOffset, this.y - yOffset, 1);
            } else {
                ctx.save();
                ctx.scale(-1, 1);
                this.animations[8 - this.facing].drawFrame(this.game.clockTick, ctx, -(this.x) - 32 + xOffset, this.y - yOffset, 1);
                ctx.restore();
            }
        }

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
        }
    };
};
