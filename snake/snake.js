"use strict";
function snakeModule() {
    let body = null;
    let direction = null;
    let lastStepDirection = null;
	let settingsSnake = window.settings;

    function init(startPoint, directionNew) {
        body = [startPoint];
        direction = directionNew;
        lastStepDirection = directionNew;

		return {
			body,
			direction,
			lastStepDirection
		}
    };

	function getBody() {
		return body;
	};
	
	function getLastStepDirection() {
		return lastStepDirection;
	};
	
    function getNextStepHeadPoint() {
        let firstPoint = body[0];

        switch (direction) {
            case 'up':
                return {x: firstPoint.x, y: firstPoint.y - 1};
            case 'down':
                return {x: firstPoint.x, y: firstPoint.y + 1};
            case 'right':
                return {x: firstPoint.x + 1, y: firstPoint.y};
            case 'left' :
                return {x: firstPoint.x - 1, y: firstPoint.y};
        }
    };

	function isNextStepIsOutOfMap() {
	 	let nextHeadStep = getNextStepHeadPoint();
		if (nextHeadStep.x > (settings.colsCount - 1) ||
            nextHeadStep.y > (settings.rowsCount - 1) ||
            nextHeadStep.x < 0 ||
            nextHeadStep.y < 0) return true
		else return false;	
	};
	
	function setNewOutHeadPoint() {
		let newOutHeadPoint = {};
		let oldHeadPoint = getNextStepHeadPoint();
		if(!isNextStepIsOutOfMap()) return getNextStepHeadPoint()
		else {
			let paramX = 0;
			let paramY = 0;
			if (oldHeadPoint.x > (settings.colsCount - 1)) paramX = -1;
			else if (oldHeadPoint.x < 0) paramX = 1;
			if (oldHeadPoint.y > (settings.rowsCount - 1)) paramY = -1;
			else if (oldHeadPoint.y < 0) paramY = 1;
			return newOutHeadPoint = {
				x: (oldHeadPoint.x + settings.colsCount - 1) % (settings.colsCount - 1) + paramX,
				y: (oldHeadPoint.y + settings.rowsCount - 1) % (settings.rowsCount - 1) + paramY,
			}
		}
	};
	
    function makeStep() {
        //[{x: 5, y: 5}, {x: 6, y: 5}, {x: 7, y: 5}]

        //[{x: 4, y: 5}, {x: 5, y: 5}, {x: 6, y: 5}, {x: 7, y: 5}]

        //[{x: 4, y: 5}, {x: 5, y: 5}, {x: 6, y: 5}]
        lastStepDirection = direction;
        body.unshift(setNewOutHeadPoint());
        body.pop();
    };

    function incrementBody() {
        let lastBodyIdx = body.length - 1;
        let lastBodyPoint = body[lastBodyIdx];
        let lastBodyPointClone = Object.assign({}, lastBodyPoint);
        body.push(lastBodyPointClone);
    };

    function setDirection(directionNew) {
        direction = directionNew;
    };

    function isBodyPoint(point) {
        return body.some(snakePoint => snakePoint.x === point.x && snakePoint.y === point.y);
    };
	
	return {
		initSnake: init,
    	getNextStepHeadPointSnake: getNextStepHeadPoint,
		isNextStepIsOutOfMapSnake: isNextStepIsOutOfMap,
		setNewOutHeadPointSnake: setNewOutHeadPoint,
		makeStepSnake: makeStep,
		incrementBodySnake: incrementBody,
		setDirectionSnake: setDirection,
		isBodyPointSnake: isBodyPoint,
		getBodySnake: getBody,
		getLastStepDirectionSnake: getLastStepDirection
	}

};

let snake = snakeModule();

