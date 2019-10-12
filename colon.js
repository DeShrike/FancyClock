function Colon(offsetx, offsety) {
    this.offsetx = offsetx;
    this.offsety = offsety;
    this.vehicles = [];
}

Colon.prototype.init = function () {
    var points = font.textToPoints(":", 0, 0, 192, {
        sampleFactor: sampleFactor
    });
    
    var maxy = 0;
    var miny = 100000;
    for (var i = 0; i < points.length; i++) {
        var pt = points[i];
        var vehicle = new Vehicle(pt.x + this.offsetx, pt.y + this.offsety);
        if (vehicle.target.y > maxy) {
            maxy = vehicle.target.y;
        }
        if (vehicle.target.y < miny) {
            miny = vehicle.target.y;
        }

        this.vehicles.push(vehicle);
    }

    for (var i = 0; i < this.vehicles.length; i++) {
        var v = this.vehicles[i];
        v.color = floor(map(v.target.y, miny, maxy, 0, 255));
    }
    
    // console.log(this.digit + " = " + this.vehicles.length + " vehicles" );
}

Colon.prototype.update = function () {
    for (var i = 0; i < this.vehicles.length; i++) {
        var v = this.vehicles[i];
        v.behaviors();
        v.update();
    }
}

Colon.prototype.show = function() {
    stroke(255);
    for (var i = 0; i < this.vehicles.length; i++) {
        var v = this.vehicles[i];
        v.show();
    }
}

Colon.prototype.shuffleTargets = function () {
    for (var i = 0; i < 50; i++) {
        var a = floor(random(this.vehicles.length));
        var b = floor(random(this.vehicles.length));
        this.swapTargets(a, b);
    }
}

Colon.prototype.swapTargets = function (a, b) {
    var temp = this.vehicles[a].target;
    this.vehicles[a].target = this.vehicles[b].target;
    this.vehicles[b].target = temp;
}
