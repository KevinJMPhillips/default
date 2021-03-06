
var woofStack = [];

Image.prototype.selfCopy = function () {
    let string = JSON.stringify(this);
    return JSON.parse(string);
};
Image.prototype.project = function (x, y) {
    let copy = this.selfCopy();
    copy.x += x;
    copy.y += y;
    return copy;
};
Image.prototype.moveUpBy = function(amt) {
    this.y += amt;  
};
Image.prototype.moveDownBy = function(amt) {
    this.y -= amt;  
};
Image.prototype.moveLeftBy = function(amt) {
    this.x -= amt;  
};
Image.prototype.moveRightBy = function(amt) {
    this.x += amt;  
};
Image.prototype.moveUpFive = function () {
    this.y += 5;
};
Image.prototype.moveLeftFive = function () {
 
    this.x += 5;
};
Image.prototype.moveDownFive = function () {
    this.y -= 5;
};
Image.prototype.moveRightFive = function () {

    this.x -= 5;
};
Image.prototype.momentumY = 0;
Image.prototype.accelerationDueToGravity = 0.1;
Image.prototype.moveSpeed = 4;


function woof() {
    alert('Woof!');
}
function attachFn(target, fn) {
    target.onMouseDown(fn);
}
function loaded() {
    //woof();
}
function setupSprites(sprites) {
    for (let i = 0; i < sprites.length; i++) {
        sprites[i].script = new scriptBlock(sprites[i], [], 30, true);
    }
}


function collideAny(player, set) {
    for (var i = 0; i < set.length; i++) {
        if (player.touching(set[i])) {
            function allSprites() {

            }
            return true;
        }
    }
    return false;
}
function clickButton(caption, x, y, w, h, onClick)
{
    let button = {
        rectangle: new Rectangle({
            width: w,
            height: h,
            x: x,
            y: y,
            color: 'silver'
        }),
        text: new Text({
            text: caption,
            size: (w / caption.length) + 2,
            color: 'black',
            x: x,
            y: y
        })        
    };

    button.rectangle.onMouseDown(() => onClick());

    woofStack.push(button);

    return button;
}
function scriptInstance(statement, iterationCount) {
    this.code = statement;
    this.duration = iterationCount;
    this.currentIteration = 0;
    this.execute = function (actor) {
        var finished = false;

        this.currentIteration++;

        eval(this.code);

        if (this.duration == this.currentIteration) {
            this.currentIteration = 0;
            finished = true;
        }

        return finished;
    };
}
function scriptBlock(actor, arrayOfStatements, rate, loop) {
    this.target = actor;
    this.targetIndex = 0;
    this.shouldLoop = loop;
    this.statements = arrayOfStatements;
    this.execRate = rate;
    this.currentStatement = function () {
        return this.statements[this.targetIndex];
    };
    this.startExecution = function () {
        this.execute();
    };
    this.execute = function () {
        let me = this;
        if (this.executeCurrent() == true) {
            setTimeout(function () { me.execute(); }, this.execRate);
        }
    }
    this.executeCurrent = function () {
        var hasMore = true;
        if (this.statements.length > this.targetIndex) {
            let current = this.currentStatement();
            let finished = current.execute(this.target);
            if (finished == true)
                this.targetIndex++;
        }
        else if (this.shouldLoop == true) {
            this.targetIndex = 0;
        }
        else {
            hasMore = false;
        }
        return hasMore;
    }
}
scriptBlock.prototype.executeAgainst = function(player) {
    this.target = player;
    this.startExecution();
};
