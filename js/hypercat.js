/****************
	HyperCat
	
	A JavaScript library for HTML5 Canvas games and
	animations, inspired by Scratch (http://scratch.mit.edu)

	Copyright © 2013 Nathan Piercy
 ****************/

 function hc(s) {
 	if (s) {
	 	if (window === this) {
	 		return new hc(s);
	 	}

	 	this.sprite = s;
	 	return this;
 	} else {
 		return {
 			Name: "HyperCat",
 			Author: "Nathan Piercy"
 		}
 	}
 }

hc.prototype = {
 	angle: function(deg) {
 		hc.getSprite(this.sprite).angle = deg;
 		return this;
 	},

 	changeSizeBy: function(size) {
 		hc.getSprite(this.sprite).size += size;
 		return this;
 	},

	getX: function() {
		return hc.getSprite(this.sprite).x;
	},

	getY: function() {
		return hc.getSprite(this.sprite).y;
	},

 	hide: function() {
 		hc.getSprite(this.sprite).visible = false;
  		return this;
 	},

 	moveBy: function(x, y) {
 		hc.getSprite(this.sprite).x += x;
 		hc.getSprite(this.sprite).y += y;
 		return this;
 	},

 	position: function(x, y) {
		hc.getSprite(this.sprite).x = x;
		hc.getSprite(this.sprite).y = y;
  		return this;
 	},

 	rotate: function(deg) {
 		hc.getSprite(this.sprite).angle += deg;
 		return this;
 	},

 	show: function() {
 		hc.getSprite(this.sprite).visible = true;
  		return this;
 	},

 	size: function(size) {
 		hc.getSprite(this.sprite).size = size;
 		return this;
 	}
 	playSound: function(url) {
 		new Audio(url).play();
 	}
}

hc.draw = function() {
	this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	for (i = 0; i < this.sprites.array.length; i++) {
		var sprite = this.sprites.array[i];
		if (sprite.visible) {
			this.canvas.context.save();
			this.canvas.context.translate(this.canvas.width/2+sprite.x, this.canvas.height/2+sprite.y);
			this.canvas.context.rotate(sprite.angle*Math.PI/180);
			this.canvas.context.drawImage(sprite.image, -(sprite.image.width*sprite.size/100/2), -(sprite.image.height*sprite.size/100/2), sprite.image.width*sprite.size/100, sprite.image.height*sprite.size/100);
			this.canvas.context.restore();
		}
	}
}

hc.getSprite = function(name) {
	for (i = 0; i < this.sprites.array.length; i++) {
		if (this.sprites.array[i].name == name) {
			return this.sprites.array[i];
		}
	}
}

hc.setCanvas = function(canvas) {
	this.canvas = document.querySelector(canvas);
	this.canvas.context = this.canvas.getContext('2d');
}

hc.sprites = {
	create: function(sprites, callback) {
		if (this.array == undefined) 
			this.array = new Array();

		var loaded = 0;
		for (i = 0; i < sprites.length; i++) {
			this.array.push({
				name: String(sprites[i].name),
				image: new Image(),
				x: 0,
				y: 0,
				size: 100,
				angle: 0,
				visible: false
			});
			this.array[this.array.length-1].image.src = String(sprites[i].image);
			this.array[this.array.length-1].image.onload = function() {
				if (++loaded == sprites.length)
					callback();
			}
		}
	},

	delete: function(sprites) {
		for (a = 0; a < sprites.length; a++) {
			for (b = 0; b < this.array.length; b++) {
				if (this.array[b].name == sprites[a]) {
					this.array.splice(b, 1);
				}
			}
		}
	}
}
