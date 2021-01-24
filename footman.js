class Footman {
    constructor(game, x, y, path) {
        Object.assign(this, { game, x, y, path });

        this.initialPoint = { x, y };

        this.radius = 20;
        this.visualRadius = 200;

        this.hitpoints = 100;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/footman.png");

        this.targetID = 0;
        if (this.path && this.path[this.targetID]) this.target = this.path[this.targetID];

        var dist = distance(this, this.target);
        this.maxSpeed = 100; // pixels per second
     
        this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };

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
        var dist = distance(this, this.target);

        if (this.hitpoints <= 0) {
            this.removeFromWorld = true;
            this.game.addEntity(new Footman(gameEngine, 1000, 800, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]));
        }

        if (this.target.removeFromWorld) this.state = 0;

        if (dist < 5) {
            if (this.targetID < this.path.length - 1 && this.target === this.path[this.targetID]) {
                this.targetID++;
            }
            this.target = this.path[this.targetID];
        }

        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (ent instanceof Tower && canSee(this, ent)) {
                this.target = ent;
            }
            if (ent instanceof Tower && collide(this, ent)) {
                if (this.state === 0) {
                    this.state = 1;
                    this.elapsedTime = 0;
                } else if (this.elapsedTime > 0.8) {
                    ent.hitpoints -= 8;
                    this.elapsedTime = 0;
                }
            }
        }

        if (this.state !== 1) {
            dist = distance(this, this.target);
            this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
            this.x += this.velocity.x * this.game.clockTick;
            this.y += this.velocity.y * this.game.clockTick;
        }


        this.facing = getFacing(this.velocity);
    };

    draw(ctx) {
        var xOffset = 25;
        var yOffset = 30;
        if (this.state === 1) {
            switch (this.facing) {
                case 0:
                    xOffset = 38;
                    yOffset = 30;
                    break;
                case 1:
                    xOffset = 35;
                    yOffset = 30;
                    break;
                case 2:
                    xOffset = 35;
                    yOffset = 30;
                    break;
                case 3:
                    xOffset = 25;
                    yOffset = 30;
                    break;
                case 4:
                    xOffset = 20;
                    yOffset = 30;
                    break;
                case 5:
                    xOffset = 40;
                    yOffset = 30;
                    break;
                case 6:
                    xOffset = 25;
                    yOffset = 30;
                    break;
                case 7:
                    xOffset = 30;
                    yOffset = 30;
                    break;
            }
        }
        var width = this.state ? 64 : 48;
        if (this.facing < 5) {
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - xOffset, this.y - yOffset, 1);
        } else {
            ctx.save();
            ctx.scale(-1, 1);
            this.animations[this.state][8 - this.facing].drawFrame(this.game.clockTick, ctx, -(this.x) - width + xOffset, this.y - yOffset, 1);
            ctx.restore();
        }
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Black";
            ctx.beginPath();
            ctx.moveTo(this.initialPoint.x, this.initialPoint.y);
            for (var i = 0; i < this.path.length; i++) {
                ctx.lineTo(this.path[i].x, this.path[i].y);
            };
            ctx.stroke();

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
