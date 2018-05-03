function Slider(x, y, size, colour) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.colour = colour;
    this.dragging = false;

    this.draw = function(){

        if (this.dragging) {
            this.x = mouseX;
            this.y = mouseY;
        }

        noStroke();
        fill(this.colour);
        ellipse(this.x, this.y, this.size, this.size)
    }

    this.click = function (distance) {
        if (distance < this.size / 2) {
            this.dragging = true;
        }
    }

    this.release = function () {
        this.dragging = false;
    }
}