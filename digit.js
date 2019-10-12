function Digit(offsetx, offsety) {
    this.digit = -1;
    this.offsetX = offsetx;
    this.offsetY = offsety;
    this.vehicles = [];
}

Digit.prototype.init = function (numPoints) {
    for (var i = 0; i < numPoints; i++) {
        var x = floor(random(width));
        var y = floor(random(height));
        var vehicle = new Vehicle(x, y);

        this.vehicles.push(vehicle);
    }
}

Digit.prototype.update = function () {
    for (var i = 0; i < this.vehicles.length; i++) {
        var v = this.vehicles[i];
        v.behaviors();
        v.update();
    }
}

Digit.prototype.show = function() {
    stroke(255);
    for (var i = 0; i < this.vehicles.length; i++) {
        var v = this.vehicles[i];
        v.show();
    }
}

Digit.prototype.setTargets = function(targets) {
    if (this.digit != targets.d)
    {
        this.digit = targets.d;
        for (var i = 0; i < this.vehicles.length; i++) {
            var v = this.vehicles[i];
            v.target.x = targets.points[i].x + this.offsetX;
            v.target.y = targets.points[i].y + this.offsetY;
            v.color = targets.points[i].color;
        }
    }
    else {
        // TODO shuffle ?
    }
}