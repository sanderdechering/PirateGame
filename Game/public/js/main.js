"use strict";
var Boss = (function () {
    function Boss(url, difficulty) {
        this.defeated = false;
        this.health = new Health(0, "boss");
        if (difficulty == "Makkelijk") {
            this.health = new Health(12, "boss");
        }
        if (difficulty == "Normaal") {
            this.health = new Health(9, "boss");
        }
        if (difficulty == "Moeilijk") {
            this.health = new Health(6, "boss");
        }
        this.boss = new Sprite(window.innerWidth / 2, 0, 3, 0, 0, 200, 200, url, false, "boss", 0, false);
        this.boss.draw();
        this.bullet = new Bullet(0, 5, "../assets/dolphin.gif", 40, 60);
    }
    Boss.prototype.update = function () {
        this.boss.update();
        this.boss.div.style.transform = "translate(" + this.boss.X + "px, " + this.boss.Y + "px)";
        this.bullet.update();
        this.health.update();
        if (this.defeated == false) {
            this.bullet.shoot(this.boss.X, this.boss.Y);
        }
        if (this.boss.X >= window.innerWidth - this.boss.width || this.boss.X <= 0) {
            this.boss.speedX *= -1;
        }
    };
    Boss.prototype.getRectangle = function () {
        return this.boss.div.getBoundingClientRect();
    };
    return Boss;
}());
var Bullet = (function () {
    function Bullet(speedX, speedY, url, width, height) {
        this.kogels = new Array();
        for (var i = 0; i < 5; i++) {
            this.kogel = new Sprite(0, 0, speedX, speedY, 0, width, height, url, false, "bullet", 0, false);
            this.kogels.push(this.kogel);
        }
        this.kogeltimer = 0;
    }
    Bullet.prototype.update = function () {
        this.kogeltimer++;
        for (var i = 0; i < 5; i++) {
            this.kogels[i].update();
            this.kogels[i].speedY = this.kogel.speedY;
            if (this.kogels[i].Y > window.innerHeight + 5 || this.kogels[i].Y < -50) {
                this.kogels[i].alive = false;
            }
        }
        for (var i = 0; i < 5; i++) {
            if (this.kogels[i].alive) {
                this.kogels[i].draw();
            }
        }
    };
    Bullet.prototype.shoot = function (x, y) {
        for (var i = 0; i < 5; i++) {
            if (!this.kogels[i].alive && this.kogeltimer > 50) {
                this.kogels[i].X = x;
                this.kogels[i].Y = y;
                this.kogels[i].alive = true;
                this.kogeltimer = 0;
                break;
            }
        }
    };
    Bullet.prototype.getRectangle = function (i) {
        return this.kogels[i].div.getBoundingClientRect();
    };
    return Bullet;
}());
var Dialoog = (function () {
    function Dialoog(x, y, width, height, name) {
        this.i = 0;
        this.x = x;
        this.y = y;
        this.name = name;
        this.width = width;
        this.height = height;
        this.spacebar = 32;
        this.text = new Array();
        this.bubble = new Sprite(this.x, this.y, 0, 0, 0, this.width, this.height, "../assets/scroll-small-2.png", 0, this.name, 0, true);
        this.bubble.div.style.paddingLeft = "50px";
        this.bubble.div.style.paddingRight = "20px";
        this.bubble.div.style.paddingTop = "60px";
    }
    Dialoog.prototype.submitDialoog = function (dialoog) {
        this.text = dialoog;
        this.firstText();
    };
    Dialoog.prototype.prevText = function () {
        if (this.i > 0) {
            this.i--;
            this.bubble.div.innerHTML = this.text[this.i];
            console.log(this.i);
        }
    };
    Dialoog.prototype.nextText = function () {
        if (this.i < this.text.length - 1) {
            this.i++;
            this.bubble.div.innerHTML = this.text[this.i];
            console.log(this.i);
        }
        else {
            this.i++;
            this.bubble.div.innerHTML = "";
            console.log(this.i + "else in next text");
        }
    };
    Dialoog.prototype.firstText = function () {
        this.bubble.div.innerHTML = this.text[this.i];
    };
    Dialoog.prototype.draw = function () {
        this.bubble.draw();
    };
    return Dialoog;
}());
var Health = (function () {
    function Health(maxHealth, unit) {
        this.hearts = [];
        this.x = 0;
        this.unit = unit;
        this.maxHealth = maxHealth;
        if (this.unit == "boss") {
            this.x = window.innerWidth;
        }
        for (var i = 0; i < this.maxHealth; i++) {
            this.heart = new Sprite(0, 0, 0, 0, 0, 40, 40, "../assets/heart.png", false, "heart", 0, false);
            this.hearts.push(this.heart);
        }
        for (var _i = 0, _a = this.hearts; _i < _a.length; _i++) {
            var heart = _a[_i];
            if (this.unit == "boss") {
                this.x = this.x - 50;
                heart.X = this.x;
                heart.Y = 50;
                heart.draw();
            }
            if (this.unit == "hero") {
                this.x = this.x + 50;
                heart.X = this.x;
                heart.Y = window.innerHeight - 50;
                heart.draw();
            }
        }
    }
    Health.prototype.update = function () {
    };
    Health.prototype.damage = function () {
        this.hearts[0].div.remove();
        this.hearts.splice(0, 1);
    };
    return Health;
}());
var Hero = (function () {
    function Hero(url, width, difficulty, g) {
        var _this = this;
        this.keyObjects = new Array(255);
        this.game = g;
        this.difficulty = difficulty;
        this.hero = new Sprite(window.innerWidth / 2, window.innerHeight - 100, 0, 0, 0, width, 100, url, false, "hero", 5, false);
        this.health = new Health(0, "hero");
        if (this.difficulty == "Makkelijk") {
            this.health = new Health(9, "hero");
        }
        if (this.difficulty == "Normaal") {
            this.health = new Health(6, "hero");
        }
        if (this.difficulty == "Moeilijk") {
            this.health = new Health(3, "hero");
        }
        this.hero.draw();
        this.bullet = new Bullet(0, -5, "../assets/cannonball.png", 20, 20);
        for (var i = 0; i < this.keyObjects.length; i++) {
            this.keyObjects[i] = false;
        }
        document.addEventListener('keydown', function (event) { return _this.keyDownHandeler(event); });
        document.addEventListener('keyup', function (event) { return _this.keyUpHandeler(event); });
    }
    Hero.prototype.keyDownHandeler = function (event) {
        this.keyObjects[event.keyCode] = true;
    };
    Hero.prototype.keyUpHandeler = function (event) {
        this.keyObjects[event.keyCode] = false;
    };
    Hero.prototype.getRectangle = function () {
        return this.hero.div.getBoundingClientRect();
    };
    Hero.prototype.update = function () {
        this.hero.div.style.transform = "translate(" + this.hero.X + "px, " + this.hero.Y + "px)";
        this.bullet.update();
        if (this.keyObjects[32] == true) {
            this.game.heroShot.play();
            this.bullet.shoot(this.hero.X, this.hero.Y);
        }
        if (this.keyObjects[37] == true) {
            if (this.hero.X > 0) {
                this.hero.update();
                this.hero.speedX = -5;
            }
        }
        if (this.keyObjects[39] == true) {
            if (this.hero.X < window.innerWidth - this.hero.width) {
                this.hero.update();
                this.hero.speedX = 5;
            }
        }
    };
    return Hero;
}());
var Kraken = (function () {
    function Kraken() {
        this.screenWidth = window.innerWidth - 100;
        this.kraken = new Sprite(Math.random() * this.screenWidth, Math.random() * -5000, 0, 5, 0, 100, 100, "../assets/kraken.png", 0, "kraken", 0, false);
        this.kraken.draw();
    }
    Kraken.prototype.getY = function () {
        return this.kraken.Y;
    };
    Kraken.prototype.update = function () {
        this.kraken.update();
        this.kraken.div.style.transform = "translate(" + this.kraken.X + "px, " + this.kraken.Y + "px)";
    };
    Kraken.prototype.deleteKraken = function () {
        this.kraken.div.remove();
    };
    Kraken.prototype.getRectangle = function () {
        return this.kraken.div.getBoundingClientRect();
    };
    return Kraken;
}());
var Rock = (function () {
    function Rock() {
        this.screenWidth = window.innerWidth - 100;
        this.rock = new Sprite(Math.random() * this.screenWidth, Math.random() * -5000, 0, 5, 0, 100, 100, "../assets/rock.png", 0, "rock", 0, false);
        this.rock.draw();
    }
    Rock.prototype.getY = function () {
        return this.rock.Y;
    };
    Rock.prototype.update = function () {
        this.rock.update();
        this.rock.div.style.transform = "translate(" + this.rock.X + "px, " + this.rock.Y + "px)";
    };
    Rock.prototype.deleteRock = function () {
        this.rock.div.remove();
    };
    Rock.prototype.getRectangle = function () {
        return this.rock.div.getBoundingClientRect();
    };
    return Rock;
}());
var Sprite = (function () {
    function Sprite(X, Y, speedX, speedY, rotation, width, height, url, alive, name, health, animation) {
        this.X = X;
        this.Y = Y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.rotation = rotation;
        this.width = width;
        this.height = height;
        this.url = url;
        this.alive = alive;
        this.name = name;
        this.health = health;
        this.div = document.createElement("" + this.name + "");
        this.animation = animation;
    }
    Sprite.prototype.update = function () {
        this.X += this.speedX;
        this.Y += this.speedY;
    };
    Sprite.prototype.draw = function () {
        if (this.animation == true) {
            this.div.style.left = this.X + "px";
            this.div.style.top = this.Y + "px";
        }
        else {
            this.div.style.transform = "translate(" + this.X + "px, " + this.Y + "px)";
        }
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        this.div.style.rotate = this.rotation + "px";
        this.div.style.fontFamily = "font";
        if (this.url.charAt(0) == '.') {
            this.div.style.backgroundImage = "url(../assets/" + this.url + ")";
        }
        if (this.url.charAt(0) == '#') {
            this.div.style.backgroundColor = "" + this.url + "";
        }
        if (this.url == '') {
        }
        document.body.appendChild(this.div);
    };
    return Sprite;
}());
var difficultyMenu = (function () {
    function difficultyMenu(g) {
        var _this = this;
        this.keyObjects = new Array(255);
        this.timer = 0;
        this.animationTimer = 0;
        this.knoppen = 0;
        this.y = 0;
        this.game = g;
        this.background = new Sprite(0, 0, 0, 0, 0, innerWidth, innerHeight, "../assets/background.png", 0, "background", 0, true);
        this.game.started = true;
        this.nextLevel = false;
        this.terug = false;
        this.bigTimer = 0;
        this.scrollEasyButton = new Sprite(innerWidth / 2 - 150, innerHeight / 2 - 125, 0, 0, 0, 300, 100, "../assets/Parchment-Roll.png", 0, "scroll", 0, true);
        this.scrollMediumButton = new Sprite(innerWidth / 2 - 150, innerHeight / 2 - 25, 0, 0, 0, 300, 100, "../assets/Parchment-Roll.png", 0, "scroll", 0, true);
        this.scrollHardButton = new Sprite(innerWidth / 2 - 150, innerHeight / 2 + 75, 0, 0, 0, 300, 100, "../assets/Parchment-Roll.png", 0, "scroll", 0, true);
        this.easyButton = new Sprite(innerWidth / 2 - 40, innerHeight / 2 - 110, 0, 0, 0, 100, 100, "", 0, "h2", 0, true);
        this.mediumButton = new Sprite(innerWidth / 2 - 45, innerHeight / 2 - 10, 0, 0, 0, 100, 100, "", 0, "h2", 0, true);
        this.hardButton = new Sprite(innerWidth / 2 - 40, innerHeight / 2 + 90, 0, 0, 0, 100, 100, "", 0, "h2", 0, true);
        this.backButton = new Sprite(innerWidth / 2 - 40, innerHeight / 2 + 215, 0, 0, 0, 100, 100, "", 0, "h2", 0, true);
        this.scrollBackButton = new Sprite(innerWidth / 2 - 150, innerHeight / 2 + 200, 0, 0, 0, 300, 100, "../assets/Parchment-Roll.png", 0, "scroll", 0, true);
        this.easyButton.div.innerHTML = "Makkelijk";
        this.mediumButton.div.innerHTML = "Normaal";
        this.hardButton.div.innerHTML = "Moeilijk";
        this.backButton.div.innerHTML = "Terug";
        for (var i = 0; i < this.keyObjects.length; i++) {
            this.keyObjects[i] = false;
        }
        this.scrollEasyButton.div.style.webkitAnimationDuration = "2s";
        this.scrollEasyButton.div.style.webkitAnimationDelay = "1s";
        this.easyButton.div.style.webkitAnimationDuration = "2s";
        this.easyButton.div.style.webkitAnimationDelay = "1s";
        this.scrollMediumButton.div.style.webkitAnimationDuration = "2s";
        this.scrollMediumButton.div.style.webkitAnimationDelay = "2s";
        this.mediumButton.div.style.webkitAnimationDuration = "2s";
        this.mediumButton.div.style.webkitAnimationDelay = "2s";
        this.scrollHardButton.div.style.webkitAnimationDuration = "2s";
        this.scrollHardButton.div.style.webkitAnimationDelay = "3s";
        this.hardButton.div.style.webkitAnimationDuration = "2s";
        this.hardButton.div.style.webkitAnimationDelay = "3s";
        this.scrollBackButton.div.style.webkitAnimationDuration = "2s";
        this.scrollBackButton.div.style.webkitAnimationDelay = "4s";
        this.backButton.div.style.webkitAnimationDuration = "2s";
        this.backButton.div.style.webkitAnimationDelay = "4s";
        this.scrollEasyButton.div.classList.add("animated", "fadeInUpBig");
        this.scrollMediumButton.div.classList.add("animated", "fadeInUpBig");
        this.scrollHardButton.div.classList.add("animated", "fadeInUpBig");
        this.scrollBackButton.div.classList.add("animated", "fadeInUpBig");
        this.easyButton.div.classList.add("animated", "fadeInUpBig");
        this.mediumButton.div.classList.add("animated", "fadeInUpBig");
        this.hardButton.div.classList.add("animated", "fadeInUpBig");
        this.backButton.div.classList.add("animated", "fadeInUpBig");
        this.background.draw();
        this.scrollEasyButton.draw();
        this.scrollMediumButton.draw();
        this.scrollHardButton.draw();
        this.scrollBackButton.draw();
        this.easyButton.draw();
        this.mediumButton.draw();
        this.hardButton.draw();
        this.backButton.draw();
        document.addEventListener('keydown', function (event) { return _this.keyDownHandeler(event); });
        document.addEventListener('keyup', function (event) { return _this.keyUpHandeler(event); });
        this.knoppen = document.getElementsByTagName("H2");
        this.knoppen[0].classList.add("selected");
    }
    difficultyMenu.prototype.keyDownHandeler = function (event) {
        this.keyObjects[event.keyCode] = true;
    };
    difficultyMenu.prototype.keyUpHandeler = function (event) {
        this.keyObjects[event.keyCode] = false;
    };
    difficultyMenu.prototype.highlightButtons = function () {
        if (this.keyObjects[38] == true) {
            this.knoppen[this.y].classList.remove("selected");
            this.y--;
            if (this.y < 0) {
                this.y = this.knoppen.length - 1;
            }
            this.knoppen[this.y].classList.add("selected");
            this.timer = 0;
        }
        if (this.keyObjects[40] == true) {
            this.knoppen[this.y].classList.remove("selected");
            this.y++;
            if (this.y == this.knoppen.length) {
                this.y = 0;
            }
            this.knoppen[this.y].classList.add("selected");
            this.timer = 0;
        }
    };
    difficultyMenu.prototype.update = function () {
        this.timer++;
        this.animationTimer++;
        this.bigTimer++;
        if (this.bigTimer > 375) {
            if (this.timer > 10) {
                this.highlightButtons();
                if (this.keyObjects[32] == true) {
                    if (document.getElementsByClassName("selected")[0].innerHTML == "Terug") {
                        this.removeClasses();
                        this.addFadeDownClasses();
                        this.terug = true;
                        this.animationTimer = 0;
                        this.bigTimer = 0;
                    }
                    else {
                        this.game.difficulty = document.getElementsByClassName("selected")[0].innerHTML;
                        this.removeClasses();
                        this.addFadeDownClasses();
                        this.nextLevel = true;
                        this.animationTimer = 0;
                        this.bigTimer = 0;
                    }
                }
            }
        }
        if (this.animationTimer > 250) {
            if (this.terug == true) {
                this.game.startMenu();
            }
            if (this.nextLevel == true) {
                this.game.level_1a();
            }
        }
    };
    difficultyMenu.prototype.removeClasses = function () {
        this.scrollEasyButton.div.classList.remove("animated", "fadeInUpBig");
        this.scrollMediumButton.div.classList.remove("animated", "fadeInUpBig");
        this.scrollHardButton.div.classList.remove("animated", "fadeInUpBig");
        this.scrollBackButton.div.classList.remove("animated", "fadeInUpBig");
        this.easyButton.div.classList.remove("animated", "fadeInUpBig");
        this.mediumButton.div.classList.remove("animated", "fadeInUpBig");
        this.hardButton.div.classList.remove("animated", "fadeInUpBig");
        this.backButton.div.classList.remove("animated", "fadeInUpBig");
    };
    difficultyMenu.prototype.addFadeDownClasses = function () {
        this.scrollEasyButton.div.classList.add("animated", "fadeOutDownBig");
        this.scrollMediumButton.div.classList.add("animated", "fadeOutDownBig");
        this.scrollHardButton.div.classList.add("animated", "fadeOutDownBig");
        this.scrollBackButton.div.classList.add("animated", "fadeOutDownBig");
        this.easyButton.div.classList.add("animated", "fadeOutDownBig");
        this.mediumButton.div.classList.add("animated", "fadeOutDownBig");
        this.hardButton.div.classList.add("animated", "fadeOutDownBig");
        this.backButton.div.classList.add("animated", "fadeOutDownBig");
        this.scrollEasyButton.div.style.webkitAnimationDuration = "2s";
        this.scrollEasyButton.div.style.webkitAnimationDelay = "4s";
        this.easyButton.div.style.webkitAnimationDuration = "2s";
        this.easyButton.div.style.webkitAnimationDelay = "4s";
        this.scrollMediumButton.div.style.webkitAnimationDuration = "2s";
        this.scrollMediumButton.div.style.webkitAnimationDelay = "3s";
        this.mediumButton.div.style.webkitAnimationDuration = "2s";
        this.mediumButton.div.style.webkitAnimationDelay = "3s";
        this.scrollHardButton.div.style.webkitAnimationDuration = "2s";
        this.scrollHardButton.div.style.webkitAnimationDelay = "2s";
        this.hardButton.div.style.webkitAnimationDuration = "2s";
        this.hardButton.div.style.webkitAnimationDelay = "2s";
        this.scrollBackButton.div.style.webkitAnimationDuration = "2s";
        this.scrollBackButton.div.style.webkitAnimationDelay = "1s";
        this.backButton.div.style.webkitAnimationDuration = "2s";
        this.backButton.div.style.webkitAnimationDelay = "1s";
    };
    return difficultyMenu;
}());
var Game = (function () {
    function Game() {
        this.theme = new Audio();
        this.heroShot = new Audio();
        this.heroDamage = new Audio();
        this.bossShot = new Audio();
        this.bossDamage = new Audio();
        this.bossDefeat = new Audio();
        this.won = new Audio();
        this.defeat = new Audio();
        this.theme.src = "../assets/sound/thememusic.mp3";
        this.heroShot.src = "../assets/sound/shootcanon.mp3";
        this.heroDamage.src = "../assets/sound/humanhit.mp3";
        this.bossShot.src = "../assets/sound/theme_sound.mp3";
        this.bossDamage.src = "../assets/sound/god_hit_heavy.mp3";
        this.bossDefeat.src = "../assets/sound/God-Dead-sound.mp3";
        this.won.src = "../assets/sound/levelUp.mp3";
        this.defeat.src = "../assets/sound/Level_Down.mp3";
        this.started = false;
        this.difficulty = "";
        this.currentscreen = new startMenu(this);
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.currentscreen.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.startMenu = function () {
        document.body.innerHTML = "";
        this.currentscreen = new startMenu(this);
    };
    Game.prototype.difficultyMenu = function () {
        document.body.innerHTML = "";
        this.currentscreen = new difficultyMenu(this);
    };
    Game.prototype.instructionMenu = function () {
        document.body.innerHTML = "";
        this.currentscreen = new instructionMenu(this);
    };
    Game.prototype.level_1a = function () {
        document.body.innerHTML = "";
        this.currentscreen = new Level_1a(this);
    };
    Game.prototype.level_1aa = function () {
        document.body.innerHTML = "";
        this.currentscreen = new Level_1aa(this);
    };
    Game.prototype.level_1b = function () {
        document.body.innerHTML = "";
        this.currentscreen = new Level_1b(this);
    };
    Game.prototype.level_1c = function () {
        document.body.innerHTML = "";
        this.currentscreen = new Level_1c(this);
    };
    Game.prototype.level_1d = function () {
        document.body.innerHTML = "";
        this.currentscreen = new Level_1d(this);
    };
    Game.prototype.gameOver = function () {
        document.body.innerHTML = "";
        this.currentscreen = new GameOver(this);
    };
    Game.prototype.victory = function () {
        document.body.innerHTML = "";
        this.currentscreen = new Victory(this);
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var GameOver = (function () {
    function GameOver(g) {
        var _this = this;
        this.keyObjects = new Array(255);
        this.game = g;
        this.background = new Sprite(0, 0, 0, 0, 0, window.innerWidth, window.innerHeight, "../assets/klaar3.png", 0, "background", 0, false);
        this.gameOver = new Sprite(window.innerWidth / 2 - 150, window.innerHeight / 2 - 50, 0, 0, 0, 300, 30, "#fff", 0, "h1", 0, false);
        this.gameOver.div.innerHTML = "Game Over";
        this.gameOver.div.style.textAlign = "center";
        this.background.draw();
        this.gameOver.draw();
        document.addEventListener('keydown', function (event) { return _this.keyDownHandeler(event); });
        document.addEventListener('keyup', function (event) { return _this.keyUpHandeler(event); });
    }
    GameOver.prototype.update = function () {
        if (this.keyObjects[32]) {
            this.game.startMenu();
        }
    };
    GameOver.prototype.keyDownHandeler = function (event) {
        this.keyObjects[event.keyCode] = true;
    };
    GameOver.prototype.keyUpHandeler = function (event) {
        this.keyObjects[event.keyCode] = false;
    };
    return GameOver;
}());
var instructionMenu = (function () {
    function instructionMenu(g) {
        var _this = this;
        this.keyObjects = new Array(255);
        this.timer = 0;
        this.knoppen = 0;
        this.y = 0;
        this.game = g;
        this.background = new Sprite(0, 0, 0, 0, 0, innerWidth, innerHeight, "../assets/background.png", 0, "background", 0, true);
        this.instructionImage = new Sprite(window.innerWidth / 2 - 325, window.innerHeight / 2 - 350, 0, 0, 0, 650, 520, "../assets/instructies.png", 0, "instructions", 0, true);
        this.game.started = true;
        this.bigTimer = 0;
        this.backButtonAnimation = false;
        this.backButton = new Sprite(innerWidth / 2 - 40, innerHeight / 2 + 215, 0, 0, 0, 100, 100, "", 0, "h2", 0, true);
        this.scrollBackButton = new Sprite(innerWidth / 2 - 150, innerHeight / 2 + 200, 0, 0, 0, 300, 100, "../assets/Parchment-Roll.png", 0, "scroll", 0, true);
        this.backButton.div.innerHTML = "Terug";
        for (var i = 0; i < this.keyObjects.length; i++) {
            this.keyObjects[i] = false;
        }
        this.background.draw();
        this.scrollBackButton.draw();
        this.instructionImage.draw();
        this.backButton.draw();
        document.addEventListener('keydown', function (event) { return _this.keyDownHandeler(event); });
        document.addEventListener('keyup', function (event) { return _this.keyUpHandeler(event); });
        this.knoppen = document.getElementsByTagName("H2");
        this.knoppen[0].classList.add("selected");
        this.scrollBackButton.div.classList.add("animated", "fadeInUpBig");
        this.backButton.div.classList.add("animated", "fadeInUpBig");
        this.instructionImage.div.classList.add("animated", "fadeInUpBig");
        this.scrollBackButton.div.style.webkitAnimationDuration = "2s";
        this.scrollBackButton.div.style.webkitAnimationDelay = "2s";
        this.backButton.div.style.webkitAnimationDuration = "2s";
        this.backButton.div.style.webkitAnimationDelay = "2s";
        this.instructionImage.div.style.webkitAnimationDuration = "1s";
        this.instructionImage.div.style.webkitAnimationDelay = "1s";
    }
    instructionMenu.prototype.keyDownHandeler = function (event) {
        this.keyObjects[event.keyCode] = true;
    };
    instructionMenu.prototype.keyUpHandeler = function (event) {
        this.keyObjects[event.keyCode] = false;
    };
    instructionMenu.prototype.highlightButtons = function () {
        if (this.keyObjects[38] == true) {
            this.knoppen[this.y].className = "";
            this.y--;
            if (this.y < 0) {
                this.y = this.knoppen.length - 1;
            }
            this.knoppen[this.y].classList.add("selected");
            this.timer = 0;
        }
        if (this.keyObjects[40] == true) {
            this.knoppen[this.y].className = "";
            this.y++;
            if (this.y == this.knoppen.length) {
                this.y = 0;
            }
            this.knoppen[this.y].classList.add("selected");
            this.timer = 0;
        }
    };
    instructionMenu.prototype.update = function () {
        this.timer++;
        this.bigTimer++;
        if (this.bigTimer > 300) {
            if (this.timer > 10) {
                this.highlightButtons();
                if (this.keyObjects[32] == true) {
                    if (document.getElementsByClassName("selected")[0].innerHTML == "Terug") {
                        this.removeClasses();
                        this.addFadeDownClasses();
                        this.backButtonAnimation = true;
                        this.timer = 0;
                        this.bigTimer = 0;
                    }
                }
            }
        }
        if (this.timer > 150) {
            if (this.backButtonAnimation == true) {
                this.game.startMenu();
            }
        }
    };
    instructionMenu.prototype.removeClasses = function () {
        this.scrollBackButton.div.classList.remove("animated", "fadeInUpBig");
        this.backButton.div.classList.remove("animated", "fadeInUpBig");
        this.instructionImage.div.classList.remove("animated", "fadeInUpBig");
    };
    instructionMenu.prototype.addFadeDownClasses = function () {
        this.scrollBackButton.div.classList.add("animated", "fadeOutDownBig");
        this.backButton.div.classList.add("animated", "fadeOutDownBig");
        this.instructionImage.div.classList.add("animated", "fadeOutDownBig");
        this.scrollBackButton.div.style.webkitAnimationDuration = "2s";
        this.scrollBackButton.div.style.webkitAnimationDelay = "1s";
        this.backButton.div.style.webkitAnimationDuration = "2s";
        this.backButton.div.style.webkitAnimationDelay = "1s";
        this.instructionImage.div.style.webkitAnimationDuration = "2s";
        this.instructionImage.div.style.webkitAnimationDelay = "2s";
    };
    return instructionMenu;
}());
var Level_1a = (function () {
    function Level_1a(g) {
        var _this = this;
        this.timer = 0;
        this.smalltimer = 0;
        this.keyObjects = new Array(255);
        this.animateZeusIn = false;
        this.game = g;
        this.dialoog = new Dialoog(window.innerWidth / 2 - window.innerWidth / 4 * 1.5, window.innerHeight / 2 * 1.35, window.innerWidth / 4 * 2.75, 200, "dialoog");
        this.scrollBig = new Sprite(window.innerWidth / 2 - 325, window.innerHeight / 2 - 350, 0, 0, 0, 650, 520, "../assets/big_scroll.png", 0, "bigScroll", 0, true);
        this.piraat = new Sprite(window.innerWidth / 2 - 40, window.innerHeight / 2 - 100, 0, 0, 0, 80, 100, "../assets/piraat.gif", 0, "piraat", 0, true);
        this.zeus = new Sprite(window.innerWidth / 2 - 100, window.innerHeight / 2, 0, 0, 0, 200, 200, "../assets/zeusthunder.png", 0, "piraat", 0, true);
        this.background = new Sprite(0, 0, 0, 0, 0, window.innerWidth, window.innerHeight, "../assets/map.png", 0, "background", 0, true);
        this.text =
            ['<p>Krijg nou wat, een landrot! Wat moet dat hier? Ik heb je helemaal niet <br>uitgenodigd!</p>',
                '<p>Wat maakt het ook uit, je bent er nu toch. Je komt precies op het goede <br>moment landrot. Ik wilde net op avontuur gaan!</p>',
                '<p>Je gaat toch wel mee schooier? Ja? Mooi! Voordat we gaan zal ik je eerst <br> vertellen wie ik ben en wat ons te wachten staat! </p>',
                '<p>Mijn naam is Piet, piraat Piet. Ik jaag al heel mijn leven op de meest<br> waardevolle schatten! Tot nu toe heeft mij nog niks<br> in de weg gestaan. Ik word ook wel de beste piraat aller tijden genoemd!</p>',
                '<p>Daarom ga ik nu de ultieme uitdagin aan. Ik, Piet piraat, beste piraat<br> allertijden, ga de schat der schatten proberen te stelen.</p>',
                '<p>Van wie vraag je? Dat zal ik je laten zien!</p>',
                '<p>Dit hier is Zeus. Zeus is de griekse god der goden, heersend vanaf <br>de berg olympus. De berg olympus is ons doel landrot. <br>Bovenop staat ons de grootste schat aller tijden te wachten!</p>',
                '<p>Laten we gaan landrot! Recht zo die gaat!</p>',
            ];
        this.background.div.style.webkitAnimationDuration = "2s";
        this.piraat.div.style.webkitAnimationDuration = "2s";
        this.piraat.div.style.webkitAnimationDelay = "4s";
        this.scrollBig.div.style.webkitAnimationDuration = "2s";
        this.scrollBig.div.style.webkitAnimationDelay = "2s";
        this.dialoog.bubble.div.style.webkitAnimationDuration = "2s";
        this.dialoog.bubble.div.style.webkitAnimationDelay = "5s";
        this.zeus.div.style.webkitAnimationDuration = "3s";
        this.background.div.classList.add("animated", "fadeIn");
        this.piraat.div.classList.add("animated", "fadeInUpBig");
        this.zeus.div.classList.add("animated", "fadeInLeftBig");
        this.scrollBig.div.classList.add("animated", "fadeInUpBig");
        this.dialoog.bubble.div.classList.add("animated", "fadeInLeftBig");
        this.dialoog.submitDialoog(this.text);
        this.background.draw();
        this.scrollBig.draw();
        this.piraat.draw();
        this.dialoog.draw();
        document.addEventListener('keyup', function (event) { return _this.keyUpHandeler(event); });
        document.addEventListener('keydown', function (event) { return _this.keyDownHandeler(event); });
    }
    Level_1a.prototype.update = function () {
        this.timer++;
        this.smalltimer++;
        if (this.timer > 250) {
            if (this.smalltimer > 10) {
                if (this.keyObjects[37] == true) {
                    this.smalltimer = 0;
                    this.dialoog.prevText();
                }
                if (this.keyObjects[39] == true) {
                    this.smalltimer = 0;
                    this.dialoog.nextText();
                }
            }
        }
        if (this.dialoog.i == 5 && this.animateZeusIn == false) {
            this.zeus.draw();
        }
        if (this.dialoog.i == 7 && this.animateZeusIn == false) {
            this.game.level_1aa();
        }
    };
    Level_1a.prototype.keyDownHandeler = function (event) {
        this.keyObjects[event.keyCode] = true;
    };
    Level_1a.prototype.keyUpHandeler = function (event) {
        this.keyObjects[event.keyCode] = false;
    };
    return Level_1a;
}());
var Level_1aa = (function () {
    function Level_1aa(g) {
        var _this = this;
        this.timer = 0;
        this.smalltimer = 0;
        this.endAnimationsPirate = false;
        this.endAnimationsZeus = false;
        this.timer_nextlevel = 0;
        this.timer_nextlevelBoolean = false;
        this.keyObjects = new Array(255);
        this.game = g;
        this.boat = new Sprite(200, 335, 0, 0, 0, 225, 225, "../assets/1s.png", false, "boat", 0, true);
        this.zeus = new Sprite(600, 0, 0, 0, 0, 400, 400, "../assets/zeusthunder.png", 0, "zeus", 0, true);
        this.pirate = new Sprite(300, 455, 0, 0, 0, 50, 50, "../assets/piraat.gif", 0, "pirate", 0, true);
        this.dialoog = new Dialoog(window.innerWidth / 2 - window.innerWidth / 4 * 1.5, window.innerHeight / 2 * 1.35, window.innerWidth / 4 * 2.75, 200, "dialoog");
        this.background = new Sprite(0, 0, 0, 0, 0, window.innerWidth, window.innerHeight, "../assets/1.png", 0, "background", 0, true);
        this.backgroundOverlay = new Sprite(0, 0, 0, 0, 0, window.innerWidth, window.innerHeight, "../assets/overlayBackground.png", 0, "background", 0, true);
        this.text =
            ['<p>ZEUS: <br> Wat ben jij aan het doen naar rum ruikende man!</p>',
                '<p> ZEUS: <br> WEET JE WEL NIET WIE IK BEN?',
                '<p> PIRAAT PIET: <br> uhhhh.. *hik*</p>',
                '<p> ZEUS: <br> STERF JIJ AARDLING, IK BEN ZEUS DE GOD VAN ALLE GODEN. </p>',
                '<p> WAT IK KAN DOEN MET MIJN BLIKSEM EN DONDER ZAL JE NOOIT KUNNEN BEGRIJPEN </p>',
                '<p> PIRAAT PIET: <br> Als je de schatten onbewaakt achter laat, kan ik er ook niets aan doen dat<br> ik ze wil stelen. IK WIL JOUW ADELAAR EN DONDERKEIL!!! </p>',
                '<p>ZEUS: <br> Hoe durf jij mijn goddelijke schatten te STELEN SCHAVUIT?! <br>JE WEET NIET EENS HOE KRACHTIG MIJN SCHATTEN ZIJN! DE ADELAAR<br> IS MIJN HEILIGE VOGEL EN DE DONDERKEIL ZAL JOU<br> DE MACHT GEVEN OVER DONDER EN BLIKSEM </p>',
                '<p>PIRAAT PIET: <br> *hik* Wacht maar !! ik ben de aller gevaarlijkste piraat <br>in het universum! ZEUS de oppergod WHAHAHA laat me niet  lachen..</p>',
                '<p>ZEUS: <br> IK ZAL JE EEN LES LEREN RUM DRINKENDE STINK PIRAAT! AAAAAAAAAAAHHHHHH</p>'
            ];
        this.dialoog.submitDialoog(this.text);
        this.background.draw();
        this.zeus.draw();
        this.backgroundOverlay.draw();
        this.boat.draw();
        this.dialoog.draw();
        this.pirate.draw();
        this.background.div.style.webkitAnimationDuration = "2s";
        this.backgroundOverlay.div.style.webkitAnimationDuration = "2s";
        this.boat.div.style.webkitAnimationDuration = "20s";
        this.pirate.div.style.webkitAnimationDuration = "5s";
        this.dialoog.bubble.div.style.webkitAnimationDelay = "6s";
        this.dialoog.bubble.div.style.webkitAnimationDuration = "4s";
        this.zeus.div.style.webkitAnimationDelay = "1s";
        this.zeus.div.style.webkitAnimationDuration = "7s";
        this.boat.div.style.webkitAnimationDuration = "5s";
        this.pirate.div.style.webkitAnimationDuration = "5s";
        this.zeus.div.classList.add("animated", "fadeInUpBig");
        this.background.div.classList.add("animated", "fadeIn");
        this.boat.div.classList.add("animated", "fadeInLeftBig");
        this.pirate.div.classList.add("animated", "fadeInLeftBig");
        this.dialoog.bubble.div.classList.add("animated", "fadeIn");
        this.backgroundOverlay.div.classList.add("animated", "fadeIn");
        document.addEventListener('keyup', function (event) { return _this.keyUpHandeler(event); });
        document.addEventListener('keydown', function (event) { return _this.keyDownHandeler(event); });
    }
    Level_1aa.prototype.update = function () {
        this.timer++;
        this.smalltimer++;
        this.timer_nextlevel++;
        if (this.timer > 500) {
            if (this.smalltimer > 10) {
                if (this.keyObjects[37] == true) {
                    this.smalltimer = 0;
                    this.dialoog.prevText();
                }
                if (this.keyObjects[39] == true) {
                    this.smalltimer = 0;
                    this.dialoog.nextText();
                }
            }
        }
        if (this.dialoog.i > this.text.length - 1 && this.endAnimationsZeus == false) {
            this.endAnimationsPirate = true;
            this.boat.div.classList.add("animated", "fadeOutRightBig");
            this.pirate.div.classList.add("animated", "fadeOutRightBig");
            this.endAnimationsZeus = true;
            this.zeus.div.classList.add("animated", "fadeOutDownBig");
            this.zeus.div.classList.add("animated", "fadeOutDownBig");
            this.timer = 0;
            this.timer_nextlevel = 0;
            this.timer_nextlevelBoolean = true;
        }
        if (this.timer_nextlevel > 300 && this.timer_nextlevelBoolean == true) {
            this.game.level_1b();
        }
    };
    Level_1aa.prototype.keyDownHandeler = function (event) {
        this.keyObjects[event.keyCode] = true;
    };
    Level_1aa.prototype.keyUpHandeler = function (event) {
        this.keyObjects[event.keyCode] = false;
    };
    return Level_1aa;
}());
var Level_1b = (function () {
    function Level_1b(g) {
        this.rocks = [];
        this.krakens = [];
        this.maxKrakens = 15;
        this.maxRocks = 15;
        this.timer = 0;
        this.hit = false;
        this.game = g;
        this.background = new Sprite(0, 0, 0, 0, 0, window.innerWidth, window.innerHeight, "../assets/diving-ocean.svg", 0, "background", 0, false);
        this.background.draw();
        this.hero = new Hero("../assets/ship.png", 60, this.game.difficulty, this.game);
        for (var i = 0; i < this.maxRocks; i++) {
            this.rocks.push(new Rock());
        }
        for (var i = 0; i < this.maxKrakens; i++) {
            this.krakens.push(new Kraken());
        }
        this.hero.hero.div.style.webkitAnimationDuration = "6s";
        this.nextLevelboolean = false;
    }
    Level_1b.prototype.update = function () {
        this.timer++;
        this.hero.update();
        for (var _i = 0, _a = this.rocks; _i < _a.length; _i++) {
            var rock = _a[_i];
            if (rock.getY() > window.innerHeight) {
                rock.deleteRock();
                this.removeRock(rock);
            }
            rock.update();
        }
        for (var _b = 0, _c = this.krakens; _b < _c.length; _b++) {
            var kraken = _c[_b];
            if (kraken.getY() > window.innerHeight) {
                kraken.deleteKraken();
                this.removeKraken(kraken);
            }
            kraken.update();
        }
        if (this.timer > 150) {
            for (var _d = 0, _e = this.rocks; _d < _e.length; _d++) {
                var rock = _e[_d];
                this.hit = this.checkCollision(rock.getRectangle(), this.hero.getRectangle());
                if (this.hit == true) {
                    this.hero.health.damage();
                    this.timer = 0;
                }
            }
            for (var _f = 0, _g = this.krakens; _f < _g.length; _f++) {
                var kraken = _g[_f];
                this.hit = this.checkCollision(kraken.getRectangle(), this.hero.getRectangle());
                if (this.hit == true) {
                    this.hero.health.damage();
                    this.timer = 0;
                }
            }
        }
        else {
            if (this.hero.health.hearts.length == 0) {
                this.game.gameOver();
            }
        }
        if (this.rocks.length < 1 && this.krakens.length < 1 && this.nextLevelboolean == false) {
            this.hero.hero.div.classList.add("animated", "fadeOutUpBig");
            this.nextLevelboolean = true;
            this.timer = 0;
        }
        if (this.nextLevelboolean == true && this.timer > 320) {
            this.game.level_1c();
        }
    };
    Level_1b.prototype.removeRock = function (rock) {
        var i = this.rocks.indexOf(rock);
        this.rocks.splice(i, 1);
    };
    Level_1b.prototype.removeKraken = function (kraken) {
        var i = this.krakens.indexOf(kraken);
        this.krakens.splice(i, 1);
    };
    Level_1b.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return Level_1b;
}());
var Level_1c = (function () {
    function Level_1c(g) {
        var _this = this;
        this.keyObjects = new Array(255);
        this.timer = 0;
        this.smalltimer = 0;
        this.game = g;
        this.background = new Sprite(0, 0, 0, 0, 0, innerWidth, innerHeight, "../assets/Ocean.png", 0, "background", 0, true);
        this.poseidon = new Sprite(400, 382, 0, 0, 0, 300, 300, "../assets/poseidon.png", 0, "poseidon", 0, true);
        this.ship = new Sprite(200, 335, 0, 0, 0, 225, 225, "../assets/1s.png", false, "boat", 0, true);
        this.dialoog = new Dialoog(window.innerWidth / 2 - window.innerWidth / 4 * 1.5, window.innerHeight / 2 * 1.35, window.innerWidth / 4 * 2.75, 200, "dialoog");
        this.pirate = new Sprite(300, 455, 0, 0, 0, 50, 50, "../assets/piraat.gif", 0, "pirate", 0, true);
        this.text =
            ['Je hebt al de rotsen ontweken in mijn oceaan!',
                'Maar langs mij kom je niet!',
                'Ik ben POSEIDON! God van de zee!',
                'Ik ben de beschermer van de visserij en scheepvaart.',
                'Maar jij klein piraatje prik ik aan mijn drietand!!! ',
            ];
        this.dialoog.submitDialoog(this.text);
        this.background.draw();
        this.pirate.draw();
        this.poseidon.draw();
        this.dialoog.draw();
        this.ship.draw();
        this.background.div.classList.add("wow");
        this.background.div.classList.add("fadeIn");
        this.background.div.setAttribute("data-wow-duration", "4s");
        this.ship.div.classList.add("wow");
        this.ship.div.classList.add("fadeInLeftBig");
        this.ship.div.setAttribute("data-wow-duration", "7s");
        this.pirate.div.classList.add("wow");
        this.pirate.div.classList.add("fadeInLeftBig");
        this.pirate.div.setAttribute("data-wow-duration", "7s");
        this.poseidon.div.classList.add("wow");
        this.poseidon.div.classList.add("fadeInUpBig");
        this.poseidon.div.classList.add("bounce");
        this.poseidon.div.setAttribute("data-wow-duration", "7s");
        this.dialoog.bubble.div.classList.add("wow");
        this.dialoog.bubble.div.classList.add("fadeIn");
        this.dialoog.bubble.div.setAttribute("data-wow-duration", "4s");
        this.dialoog.bubble.div.setAttribute("data-wow-delay", "5s");
        document.addEventListener('keydown', function (event) { return _this.keyDownHandeler(event); });
        document.addEventListener('keyup', function (event) { return _this.keyUpHandeler(event); });
    }
    Level_1c.prototype.update = function () {
        this.timer++;
        this.smalltimer++;
        if (this.timer > 500) {
            if (this.smalltimer > 10) {
                if (this.keyObjects[37] == true) {
                    this.smalltimer = 0;
                    this.dialoog.prevText();
                }
                if (this.keyObjects[39] == true) {
                    this.smalltimer = 0;
                    this.dialoog.nextText();
                }
            }
        }
        if (this.dialoog.i > this.text.length - 1) {
            this.game.level_1d();
        }
    };
    Level_1c.prototype.keyDownHandeler = function (event) {
        this.keyObjects[event.keyCode] = true;
    };
    Level_1c.prototype.keyUpHandeler = function (event) {
        this.keyObjects[event.keyCode] = false;
    };
    return Level_1c;
}());
var Level_1d = (function () {
    function Level_1d(g) {
        this.background = new Sprite(0, 0, 0, 0, 0, innerWidth, innerHeight, "../assets/at2.png", 0, "background", 0, false);
        this.background.draw();
        this.game = g;
        this.hero = new Hero("../assets/piraat.gif", 80, this.game.difficulty, this.game);
        this.boss = new Boss("../assets/poseidon.png", this.game.difficulty);
        this.bossTimer = 0;
        this.heroTimer = 0;
        this.boss.boss.div.style.webkitAnimationDuration = "3s";
        this.bigtimer = 0;
        this.game.theme.pause();
    }
    Level_1d.prototype.update = function () {
        this.bigtimer++;
        this.bossTimer++;
        this.heroTimer++;
        if (this.boss.defeated == false) {
            this.hero.update();
            this.boss.update();
        }
        else {
            var element = document.getElementsByTagName("bullet"), index;
            for (index = element.length - 1; index >= 0; index--) {
                element[index].parentNode.removeChild(element[index]);
            }
        }
        if (this.bossTimer > 180) {
            this.boss.boss.div.classList.remove("animated", "flash");
            for (var i = 0; i < this.hero.bullet.kogels.length; i++) {
                if (this.hero.bullet.kogels[i].alive == true) {
                    if (this.checkCollision(this.hero.bullet.getRectangle(i), this.boss.getRectangle())) {
                        this.bossTimer = 0;
                        this.boss.health.damage();
                        this.boss.boss.div.classList.add("animated", "flash");
                        this.game.bossDamage.play();
                    }
                }
            }
        }
        if (this.heroTimer > 180) {
            this.hero.hero.div.classList.remove("animated", "flash");
            for (var i = 0; i < this.boss.bullet.kogels.length; i++) {
                if (this.boss.bullet.kogels[i].alive == true) {
                    if (this.checkCollision(this.boss.bullet.getRectangle(i), this.hero.getRectangle())) {
                        this.heroTimer = 0;
                        this.hero.health.damage();
                        this.hero.hero.div.classList.add("animated", "flash");
                        this.game.heroDamage.play();
                    }
                }
            }
        }
        if (this.hero.health.hearts.length == 0) {
            this.game.gameOver();
        }
        if (this.boss.health.hearts.length == 0 && this.boss.defeated == false) {
            this.hero.hero.div.classList.remove("animated", "flash");
            this.bigtimer = 0;
            this.boss.defeated = true;
            this.game.bossDefeat.play();
        }
        if (this.bigtimer > 720 && this.boss.defeated == true) {
            this.game.victory();
        }
        if (!this.game) {
        }
    };
    Level_1d.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    Level_1d.prototype.removeClass = function () {
        this.boss.boss.div.classList.remove("animated", "flash");
    };
    return Level_1d;
}());
var startMenu = (function () {
    function startMenu(g) {
        var _this = this;
        this.keyObjects = new Array(255);
        this.smallTimer = 0;
        this.bigTimer = 0;
        this.knoppen = 0;
        this.y = 0;
        this.game = g;
        this.game.theme.play();
        this.background = new Sprite(0, 0, 0, 0, 0, innerWidth, innerHeight, "../assets/background.png", 0, "background", 0, true);
        this.timer = 0;
        this.difficultyMenuReady = false;
        this.instructionMenuReady = false;
        this.scrollStartButton = new Sprite(innerWidth / 2 - 150, innerHeight / 2 - 100, 0, 0, 0, 300, 100, "../assets/Parchment-Roll.png", 0, "scroll", 0, true);
        this.scrollInstructionButton = new Sprite(innerWidth / 2 - 150, innerHeight / 2, 0, 0, 0, 300, 100, "../assets/Parchment-Roll.png", 0, "scroll", 0, true);
        this.startGameButton = new Sprite(innerWidth / 2 - 20, innerHeight / 2 - 85, 0, 0, 0, 100, 100, "", 0, "h2", 0, true);
        this.instructionButton = new Sprite(innerWidth / 2 - 45, innerHeight / 2 + 15, 0, 0, 0, 100, 100, "", 0, "h2", 0, true);
        this.startGameButton.div.innerHTML = "Play";
        this.instructionButton.div.innerHTML = "Instructies";
        for (var i = 0; i < this.keyObjects.length; i++) {
            this.keyObjects[i] = false;
        }
        this.background.draw();
        this.scrollStartButton.draw();
        this.scrollInstructionButton.draw();
        this.startGameButton.draw();
        this.instructionButton.draw();
        if (this.game.started == false) {
            this.background.div.classList.add("animated", "fadeIn");
            this.background.div.style.webkitAnimationDuration = "2s";
        }
        this.scrollStartButton.div.classList.add("animated", "fadeInUpBig");
        this.startGameButton.div.classList.add("animated", "fadeInUpBig");
        this.scrollInstructionButton.div.classList.add("animated", "fadeInUpBig");
        this.instructionButton.div.classList.add("animated", "fadeInUpBig");
        this.scrollStartButton.div.style.webkitAnimationDuration = "2s";
        this.scrollStartButton.div.style.webkitAnimationDelay = "1s";
        this.startGameButton.div.style.webkitAnimationDuration = "2s";
        this.startGameButton.div.style.webkitAnimationDelay = "1s";
        this.scrollInstructionButton.div.style.webkitAnimationDuration = "2s";
        this.scrollInstructionButton.div.style.webkitAnimationDelay = "2s";
        this.instructionButton.div.style.webkitAnimationDuration = "2s";
        this.instructionButton.div.style.webkitAnimationDelay = "2s";
        document.addEventListener('keydown', function (event) { return _this.keyDownHandeler(event); });
        document.addEventListener('keyup', function (event) { return _this.keyUpHandeler(event); });
        this.knoppen = document.getElementsByTagName("H2");
        this.knoppen[0].classList.add("selected");
    }
    startMenu.prototype.update = function () {
        this.smallTimer++;
        this.bigTimer++;
        this.timer++;
        if (this.bigTimer > 250) {
            if (this.smallTimer > 10) {
                this.highlightButtons();
                if (this.keyObjects[32] == true) {
                    if (document.getElementsByClassName("selected")[0].innerHTML == "Play") {
                        this.removeClasses();
                        this.addFadeDownClasses();
                        this.difficultyMenuReady = true;
                        this.timer = 0;
                        this.bigTimer = 0;
                    }
                    if (document.getElementsByClassName("selected")[0].innerHTML == "Instructies") {
                        this.removeClasses();
                        this.addFadeDownClasses();
                        this.instructionMenuReady = true;
                        this.timer = 0;
                        this.bigTimer = 0;
                    }
                }
            }
        }
        if (this.timer > 150) {
            if (this.difficultyMenuReady == true) {
                this.game.difficultyMenu();
            }
            if (this.instructionMenuReady == true) {
                this.game.instructionMenu();
            }
        }
    };
    startMenu.prototype.keyDownHandeler = function (event) {
        this.keyObjects[event.keyCode] = true;
    };
    startMenu.prototype.keyUpHandeler = function (event) {
        this.keyObjects[event.keyCode] = false;
    };
    startMenu.prototype.highlightButtons = function () {
        if (this.keyObjects[38] == true) {
            this.knoppen[this.y].className = "";
            this.y--;
            if (this.y < 0) {
                this.y = this.knoppen.length - 1;
            }
            this.knoppen[this.y].classList.add("selected");
            this.smallTimer = 0;
        }
        if (this.keyObjects[40] == true) {
            this.knoppen[this.y].className = "";
            this.y++;
            if (this.y == this.knoppen.length) {
                this.y = 0;
            }
            this.knoppen[this.y].classList.add("selected");
            this.smallTimer = 0;
        }
    };
    startMenu.prototype.removeClasses = function () {
        this.scrollStartButton.div.classList.remove("animated", "fadeInUpBig");
        this.startGameButton.div.classList.remove("animated", "fadeInUpBig");
        this.scrollInstructionButton.div.classList.remove("animated", "fadeInUpBig");
        this.instructionButton.div.classList.remove("animated", "fadeInUpBig");
    };
    startMenu.prototype.addFadeDownClasses = function () {
        this.scrollStartButton.div.classList.add("animated", "fadeOutDownBig");
        this.startGameButton.div.classList.add("animated", "fadeOutDownBig");
        this.scrollInstructionButton.div.classList.add("animated", "fadeOutDownBig");
        this.instructionButton.div.classList.add("animated", "fadeOutDownBig");
        this.scrollStartButton.div.style.webkitAnimationDuration = "2s";
        this.scrollStartButton.div.style.webkitAnimationDelay = "1s";
        this.startGameButton.div.style.webkitAnimationDuration = "2s";
        this.startGameButton.div.style.webkitAnimationDelay = "1s";
        this.scrollInstructionButton.div.style.webkitAnimationDuration = "2s";
        this.instructionButton.div.style.webkitAnimationDuration = "2s";
    };
    return startMenu;
}());
var Victory = (function () {
    function Victory(g) {
        var _this = this;
        this.keyObjects = new Array(255);
        this.game = g;
        this.gameOver = new Sprite(window.innerWidth / 2 - 150, window.innerHeight / 2 - 100, 0, 0, 0, 80, 300, "../assets/cup.png", 0, "h1", 0, false);
        this.gameOver.div.innerHTML = "Game Over";
        this.gameOver.div.style.textAlign = "center";
        this.gameOver.draw();
        this.game.won.play();
        document.addEventListener('keydown', function (event) { return _this.keyDownHandeler(event); });
        document.addEventListener('keyup', function (event) { return _this.keyUpHandeler(event); });
    }
    Victory.prototype.update = function () {
        if (this.keyObjects[32]) {
            this.game.startMenu();
        }
    };
    Victory.prototype.keyDownHandeler = function (event) {
        this.keyObjects[event.keyCode] = true;
    };
    Victory.prototype.keyUpHandeler = function (event) {
        this.keyObjects[event.keyCode] = false;
    };
    return Victory;
}());
//# sourceMappingURL=main.js.map