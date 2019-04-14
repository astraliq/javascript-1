"use strict";

function foodModule() {
    let x = null;
    let y = null;
	let typeOfFood = null;
	
    function setType(type) {
        typeOfFood = type;
    };
	
    function getType() {
        return typeOfFood;
    };
	
    function setCoordinates(point) {
        x = point.x,
        y = point.y
    };

    function getCoordinates() {
        return {x: x, y: y};
    };

    function isPoint(point) {
        return x === point.x && y === point.y;
    };
	
	return {
		setFoodCoordinates: setCoordinates,
		getFoodCoordinates: getCoordinates,
		isFoodPoint: isPoint,
		setFoodType: setType,
		getFoodType: getType,
	}
};

let food = foodModule();
let food2 = foodModule();