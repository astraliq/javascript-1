"use strict";

let score = {
	count: 0,
	countElement: null,
	
	init() {
		this.countElement = document.getElementById('score-count');
	},
	
	increment(typeOfFood) {
		switch(typeOfFood) {
  			case 'green':
				this.count++;
				break;
			case 'blue':
				this.count++;
				this.count++;
				break;
			default:
				break;
		};
		this.render();
	},
	
	incrementDouble() {
		this.count++;
		this.count++;
		this.render();
	},
	
	render() {
		this.countElement.textContent = this.count;
	},
	
	drop() {
		this.count = 0;
		this.render();
	}
}