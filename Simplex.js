class Simplex {
	constructor(position,size,numPoints,depth,dotSize,showFinalHalfDots) {
		this.position = position;
		this.size = size;
		this.numPoints = numPoints;
		this.depth = depth;
		this.dotSize = dotSize;
		this.showFinalHalfDots = showFinalHalfDots;
	}

	generate() {
		let points = [];
		let rotateAmount = TWO_PI/this.numPoints;
		let rotated = 0;
		for(let i = 0; i<this.numPoints; i++) {
			points.push(createVector(cos(rotated)*this.size,sin(rotated)*this.size));
			rotated += rotateAmount;
		}
		return points;
	}

	display() {
		let points = this.generate();
		let rotateAmount = TWO_PI/this.numPoints;
		push();
		translate(this.position.x,this.position.y);
		fill(0);
		strokeWeight(.25);
		let rotated = 0;
		for(let j = 0; j<points.length; j++) {
			ellipse(points[j].x,points[j].y,this.dotSize,this.dotSize);
			for(let k = j+1; k<points.length;k++) {
				line(points[j].x,points[j].y,points[k].x,points[k].y);
			}
		}
		this.subDisplay(this.split(points),this.depth);
		pop();
	}

	split(array) {
		let incoming = [...array]
		let points = [];
		for(let j = 0; j+1<incoming.length; j++) {
			for(let k = j+1; k<incoming.length;k++) {
				let vector = p5.Vector.lerp(createVector(incoming[j].x,incoming[j].y),createVector(incoming[k].x,incoming[k].y),.5);
				points.push(vector);
			}
		}
		return points;
	}

	subDisplay(array,depth) {
		let points = [...array];
		if(depth>0) {
			for(let j = 0; j<points.length; j++) {
				ellipse(points[j].x,points[j].y,this.dotSize,this.dotSize);
				for(let k = j+1; k<points.length;k++) {
					line(points[j].x,points[j].y,points[k].x,points[k].y);
				}
			}
			this.subDisplay(this.split(points),depth-1)
		} else {
			for(let j = 0; j<points.length; j++) {
				if(this.showFinalHalfDots) {ellipse(points[j].x,points[j].y,this.dotSize,this.dotSize);}
			}
		}

	}
}