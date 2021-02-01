class Archer {
    constructor(game, x, y, path) {
        Object.assign(this, { game, x, y, path });

        this.initialPoint = { x, y };

        this.radius = 20;
        this.visualRadius = 200;

        this.hitpoints = 80;
        this.maxhitpoints = 80;

        this.healthbar = new HealthBar(this);

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/archer.png");

        this.targetID = 0;
        if (this.path && this.path[this.targetID]) this.target = this.path[this.targetID];

        var dist = distance(this, this.target);
        this.maxSpeed = 80; // pixels per second

        this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };

        this.animations = [];
        this.animations.push([]);
        this.animations[0].push(new Animator(this.spritesheet, 4, 10, 48, 48, 5, 0.25, 26, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 64, 10, 48, 48, 5, 0.25, 26, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 128, 10, 48, 48, 5, 0.25, 26, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 183, 10, 48, 48, 5, 0.25, 26, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 239, 10, 48, 48, 5, 0.25, 26, false, true));

        this.animations.push([]);
        this.animations[1].push(new Animator(this.spritesheet, 4, 372, 48, 64, 2, 0.5, 10, false, true));
        this.animations[1].push(new Animator(this.spritesheet, 64, 372, 48, 64, 2, 0.5, 10, false, true));
        this.animations[1].push(new Animator(this.spritesheet, 128, 372, 48, 64, 2, 0.5, 10, false, true));
        this.animations[1].push(new Animator(this.spritesheet, 183, 372, 48, 64, 2, 0.5, 10, false, true));
        this.animations[1].push(new Animator(this.spritesheet, 239, 372, 48, 64, 2, 0.5, 10, false, true));

        this.state = 0; // 0 walking, 1 attacking, 2 dead

        this.facing = 0; // 0 = up, clockwise

        this.elapsedTime = 0;
    };

    update() {
        this.elapsedTime += this.game.clockTick;
        var dist = distance(this, this.target);

        if (this.hitpoints <= 0) {
            this.removeFromWorld = true;
            this.game.addEntity(new Archer(gameEngine, 1000, 800, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]));
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
                if (this.state === 0) {
                    this.state = 1;
                    this.target = ent;
                    this.elapsedTime = 0;
                } else if (this.elapsedTime > 0.8) {
                    this.game.addEntity(new Arrow(this.game, this.x, this.y, ent, false));
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
        if (this.state === 0) {
            switch (this.facing) {
                case 0:
                    xOffset = 22;
                    yOffset = 30;
                    break;
                case 1:
                    xOffset = 20;
                    yOffset = 28;
                    break;
                case 2:
                    xOffset = 18;
                    yOffset = 28;
                    break;
                case 3:
                    xOffset = 20;
                    yOffset = 25;
                    break;
                case 4:
                    xOffset = 22;
                    yOffset = 25;
                    break;
                case 5:
                    xOffset = 25;
                    yOffset = 25;
                    break;
                case 6:
                    xOffset = 30;
                    yOffset = 25;
                    break;
                case 7:
                    xOffset = 25;
                    yOffset = 25;
                    break;
            }
        }
        if (this.facing < 5) {
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - xOffset, this.y - yOffset, 1);
        } else {
            ctx.save();
            ctx.scale(-1, 1);
            this.animations[this.state][8 - this.facing].drawFrame(this.game.clockTick, ctx, -(this.x) - 48 + xOffset, this.y - yOffset, 1);
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
        this.healthbar.draw(ctx);
    };
};
