function Clock() {
    this.digits = [];
    this.colon1 = null;
    this.colon2 = null;
    this.prevSec = -1;
    this.targets = [];
}

Clock.prototype.init = function(){
    var offsetx = 20;
    var offsety = 150;
    var increment = 120;

    var maxPoints = 0;
    for (var d = 0; d <= 9; d++)
    {
        var points = font.textToPoints(d + "", 0, 0, 192, { sampleFactor: sampleFactor });
        // console.log("points: " + points.length);
        var dd = { d: d, points: [], maxy: 0, miny: 10000 };
        for (var i = 0; i < points.length; i++) {
            var pt = points[i];
            var point = { x: pt.x, y: pt.y };
            dd.points.push(point);
            if (point.y > dd.maxy) {
                dd.maxy = point.y;
            }
            if (point.y < dd.miny) {
                dd.miny = point.y;
            }
        }    

        this.targets[d] = dd;
        if (dd.points.length > maxPoints)
        {
            maxPoints = dd.points.length;
        }
    }

    for (var d = 0; d <= 9; d++)
    {
        var start = 0;
        var dd = this.targets[d];
        while (dd.points.length < maxPoints)
        {
            var x = dd.points[start].x;
            var y = dd.points[start].y;
            var point = { x: x, y: y };
            dd.points.push(point);
            start++;
        }

        this.shuffle(dd.points);
    }

    for (var d = 0; d <= 9; d++)
    {
        var dd = this.targets[d];
        for (var p = 0; p < dd.points.length; p++)
        {
            var point = dd.points[p];
            if (d === 0) {
                point.color = floor(map(point.y, dd.miny, dd.maxy, 0, 360));
            }
            else {
                point.color = this.targets[0].points[p].color;
            }
        }
    }

    for (var d = 0; d <= 5; d++)
    {
        var digit = new Digit(offsetx, offsety);
        this.digits.push(digit);
        offsetx += increment;
        if (d == 1)
        {
            this.colon1 = new Colon(offsetx, offsety);
            offsetx += increment / 2;
        }
        else if (d == 3)
        {
            this.colon2 = new Colon(offsetx, offsety);
            offsetx += increment / 2;
        }
    }

    for (var i = 0; i < this.digits.length; i++) {
        var digit = this.digits[i];
        digit.init(maxPoints);
    }

    this.colon1.init();
    this.colon2.init();
}

Clock.prototype.update = function() {
    var sec = second();
    var min = minute();
    var hou = hour();

    if (sec != this.prevSec)
    {
        this.colon1.shuffleTargets();
        this.colon2.shuffleTargets();

        this.digits[0].setTargets(this.targets[floor(hou / 10)]);
        this.digits[1].setTargets(this.targets[hou % 10]);

        this.digits[2].setTargets(this.targets[floor(min / 10)]);
        this.digits[3].setTargets(this.targets[min % 10]);
    
        this.digits[4].setTargets(this.targets[floor(sec / 10)]);
        this.digits[5].setTargets(this.targets[sec % 10]);
    
        this.prevSec = sec;
    }

    for (var i = 0; i < this.digits.length; i++) {
        var d = this.digits[i];
        d.update();
    }

    this.colon1.update();
    this.colon2.update();
}

Clock.prototype.show = function() {
    for (var i = 0; i < this.digits.length; i++) {
        var d = this.digits[i];
        d.show();
    }

    this.colon1.show();
    this.colon2.show();
}

Clock.prototype.shuffle = function(arr) {
    for (var i = 0; i < 100; i++)
    {
        var a = floor(random(arr.length));
        var b = floor(random(arr.length));
        var temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
    }
}