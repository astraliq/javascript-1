"use strict";

let game = {
    settings,
    renderer,
    snake,
    food,
	food2,
    tickInterval: null,
    status,
	score,

    init(userSettings = {}) {
        Object.assign(this.settings, userSettings);

        if( !this.settings.validate()) {
            return;
        }

       	this.score.init(); 
		
		this.renderer.renderMap(this.settings.rowsCount, this.settings.colsCount);

        this.setEventHandlers();

        this.snake.initSnake(this.getStartSnakePoint(), 'up');
        this.food.setFoodCoordinates(this.getRandomCoordinates());
		this.food2.setFoodCoordinates(this.getRandomCoordinates());
		this.food.setFoodType('green');
		this.food2.setFoodType('blue');
        this.reset();
		console.log(this.food.getFoodType());
		console.log(this.food2.getFoodType());
    },

    reset() {
        this.stop();
		this.score.drop();
        this.snake.initSnake(this.getStartSnakePoint(), 'up');
        this.food.setFoodCoordinates(this.getRandomCoordinates());
		this.food2.setFoodCoordinates(this.getRandomCoordinates());
        this.render();
    },

    render() {
        this.renderer.render(this.snake.getBodySnake(), this.food.getFoodCoordinates(), this.food2.getFoodCoordinates());
    },

    play() {
        this.status.setPlaying();
        this.tickInterval = setInterval( () => game.tickHandler(), 1000 / this.settings.speed);
        this.changePlayButton('Стоп');
    },

    tickHandler() {
        if (!this.canSnakeMakeStep()) {
            this.finish();
            return;
        }

        if(this.food.isFoodPoint(this.snake.getNextStepHeadPointSnake())) {
            this.snake.incrementBodySnake();
			this.score.increment(this.food.getFoodType());
            this.food.setFoodCoordinates(this.getRandomCoordinates());
            if(this.isGameWon()) {
                this.finish();
            }
        }

		 if(this.food2.isFoodPoint(this.snake.getNextStepHeadPointSnake())) {
            this.snake.incrementBodySnake();
			this.score.increment(this.food2.getFoodType());
            this.food2.setFoodCoordinates(this.getRandomCoordinates());
            if(this.isGameWon()) {
                this.finish();
            }
        }
		
        this.snake.makeStepSnake();
        this.render();
    },
    
	
    isGameWon() {
        return this.snake.getBodySnake().length > this.settings.winLength;
    },

    finish() {
        //ставим статус в финиш
        this.status.setFinished();
        //останавливаем шаги змейки
        clearInterval(this.tickInterval);
        //меняем кнопку игры, сделаем серой и напишем игра закончена
        this.changePlayButton('Игра закончена', true);
    },

    stop() {
        this.status.setStopped();
        clearInterval(this.tickInterval);
        this.changePlayButton('Старт');
    },

    getStartSnakePoint() {
        return {
            x: Math.floor(this.settings.colsCount / 2),
            y: Math.floor(this.settings.rowsCount / 2)
        }
    },

    changePlayButton(textContent, isDisabled = false) {
        let playButton = document.getElementById('playButton');
        playButton.textContent = textContent;
        isDisabled ? playButton.classList.add('disabled') : playButton.classList.remove('disabled');
    },

    getRandomCoordinates() {
        let exclude = [...this.snake.getBodySnake(), this.food.getFoodCoordinates(), this.food2.getFoodCoordinates()];

        while(true) {
            let rndPoint = {
                x: Math.floor(Math.random() * this.settings.colsCount),
                y: Math.floor(Math.random() * this.settings.rowsCount),
            };

            let excludeContainsRndPoint = exclude.some(function (elem) {
                return rndPoint.x === elem.x && rndPoint.y === elem.y;
            });

            if(!excludeContainsRndPoint) {
                return rndPoint;
            }
        }
    },

    playClickHandler() {
        if (this.status.isPlaying()) {
            this.stop();
        } else if (this.status.isStopped()) {
            this.play();
        }
    },

    setEventHandlers() {
        document.getElementById('playButton').onclick =  function () {
            game.playClickHandler();
        };
        document.addEventListener('keydown', () => this.keyDownHandler(event));
        document.getElementById('newGameButton').addEventListener('click', () => this.newGameClickHandler());
    },

    newGameClickHandler() {
		this.snake.initSnake();

        this.reset();
    },

    keyDownHandler(event) {
        if(!this.status.isPlaying()) {
            return;
        }

        let direction = this.getDirectionByCode(event.code);
        if(this.canSetDirection(direction)) {
            this.snake.setDirectionSnake(direction)
        }
    },

    canSetDirection(direction) {
        return direction === 'up' && this.snake.getLastStepDirectionSnake() !== 'down' ||
            direction === 'right' && this.snake.getLastStepDirectionSnake() !== 'left' ||
            direction === 'down' && this.snake.getLastStepDirectionSnake() !== 'up' ||
            direction === 'left' && this.snake.getLastStepDirectionSnake() !== 'right';
    },

    getDirectionByCode(code) {
        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
                return 'up';
            case 'KeyD':
            case 'ArrowRight':
                return 'right';
            case 'KeyS':
            case 'ArrowDown':
                return 'down';
            case 'KeyA':
            case 'ArrowLeft':
                return 'left';
            default:
                return '';
        }
    },

    canSnakeMakeStep() {
        let nextHeadPoint = this.snake.getNextStepHeadPointSnake();
        return !this.snake.isBodyPointSnake(nextHeadPoint);
    },
};

window.onload = function () {
    game.init({speed: 10, winLength: 20});
};

