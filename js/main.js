//AUDIO FILES
const audioFight = new Audio("styles/images/audio/pokemon-fight.mp3");
const audioOpening = new Audio("styles/images/audio/pokemon-opening.mp3");
audioFight.volume = 0.3;
audioOpening.volume = 0.3;

class Game {
  constructor() {
    //HARD CODING AS EXAMPLE
    this.selectedPokemon = null;

    this.enemies = {
      name: "Charizard",
      type: "fire",
      level: 15,
      health: 120,
      attacks: [
        {
          attack: "tackle",
          typeOfAttack: "normal",
          // damage:,
        },
        {
          attack: "flamethrower",
          typeOfAttack: "fire",
          // damage: 10,
        },
      ],
    };
  }

  start() {
    this.selectionProcess();
    // this.selectPokemonEvent();
  }

  selectionProcess() {
    const startScreen = document.querySelector(".pokemon-screen");
    console.log(startScreen);
    startScreen.addEventListener("click", (event) => {
      // console.log(event.target.className);
      if (event.target.className === "pokemon-screen") {
        // const pickPokemon = document.createElement("div");

        audioOpening.play();
        const loadingScreen = document.querySelector("#loading-screen");
        const pokemonLoading = document.querySelector("#pokemon-loading-gif");
        const pickPokemon = document.querySelector(".pick-pokemon");
        loadingScreen.style.display = "block";
        setTimeout(() => loadingScreen.remove(), 2000);
        setTimeout(() => (pokemonLoading.style.display = "block"), 2000);
        setTimeout(() => pokemonLoading.remove(), 6000);
        setTimeout(() => (pickPokemon.style.display = "block"), 6000);
        // loadingScreen.remove();
      }
    });

    const selectAllChoices = document.querySelector(".pokemon-choices");
    selectAllChoices.addEventListener("click", (event) => {
      console.log(event.target.classList);
      if (event.target.classList.contains("charmander")) {
        this.selectedPokemon = this.chooseCharacterCharmander();
        console.log(this.selectedPokemon);
      } else if (event.target.classList.contains("squirtle")) {
        this.selectedPokemon = this.chooseCharacterSquirtle();
      } else if (event.target.classList.contains("bulbasaur")) {
        this.selectedPokemon = this.chooseCharacterBulbasaur();
      }
      this.createFight();
      const audio = new Audio("styles/images/audio/pokemon-fight.mp3");
      audioOpening.pause();
      audioFight.play();
    });
    // console.log(newArray);
  }

  chooseCharacterCharmander() {
    const selectedCharmander = {
      name: "Charmander",
      type: "fire",
      level: 15,
      health: 120,
      attacks: [
        {
          attack: "tackle",
          typeOfAttack: "normal",
        },
        {
          attack: "ember",
          typeOfAttack: "fire",
        },
        {
          attack: "scratch",
          typeOfAttack: "normal",
        },
      ],
    };

    return selectedCharmander;
  }

  chooseCharacterSquirtle() {
    const selectedSquirtle = {
      name: "Squirtle",
      type: "water",
      level: 15,
      health: 120,
      attacks: [
        {
          attack: "tackle",
          typeOfAttack: "normal",
        },
        {
          attack: "watergun",
          typeOfAttack: "water",
        },
        {
          attack: "scratch",
          typeOfAttack: "normal",
        },
      ],
    };

    return selectedSquirtle;
  }

  chooseCharacterBulbasaur() {
    const selectedBulbasaur = {
      name: "Bulbasaur",
      type: "grass",
      level: 15,
      health: 120,
      attacks: [
        {
          attack: "tackle",
          typeOfAttack: "normal",
        },
        {
          attack: "seedbomb",
          typeOfAttack: "grass",
        },
        {
          attack: "scratch",
          typeOfAttack: "normal",
        },
      ],
    };

    return selectedBulbasaur;
  }

  createFight() {
    const newFight = new Fight();
    newFight.selectedPokemon = this.selectedPokemon;
    // console.log(this.selectedPokemon);
    const pokemonSelection = document.querySelector(".pick-pokemon");
    console.log(pokemonSelection);
    pokemonSelection.style.display = "none";

    const changeImage = document.querySelector("#player-pokemon-img");
    console.log(this.selectedPokemon.name);
    if (this.selectedPokemon.name === "Charmander") {
      changeImage.setAttribute("src", "./styles/images/charmander.webp");
    } else if (this.selectedPokemon.name === "Squirtle") {
      changeImage.setAttribute("src", "./styles/images/squirtle.gif");
    } else if (this.selectedPokemon.name === "Bulbasaur") {
      changeImage.setAttribute("src", "./styles/images/bulbasaur.webp");
    }

    const changeHTMLNameInBar = document.querySelector(".player-info h1");
    changeHTMLNameInBar.innerHTML = this.selectedPokemon.name;

    const changeHTMLLevelInBar = document.querySelector(".player-info h3");
    changeHTMLLevelInBar.innerHTML = "Lvl" + this.selectedPokemon.level;

    const changeMenuHTMLName = document.querySelector(".left-menu p");
    changeMenuHTMLName.innerHTML =
      "What should " + this.selectedPokemon.name + " do?";
    const fightScreen = document.querySelector(".fight-screen");
    if (this.selectedPokemon.name) fightScreen.style.display = "block";

    // DISPLAY ENEMY

    const changeEnemyName = document.querySelector(".enemy-info h1");
    changeEnemyName.innerHTML = this.enemies.name;

    const changeEnemyLevel = document.querySelector(".enemy-info h3");
    changeEnemyLevel.innerHTML = "Lvl" + this.enemies.level;

    const changeEnemyImage = document.querySelector(".selected-enemy-img img");
    changeEnemyImage.setAttribute("src", "./styles/images/charizard.gif");
    changeEnemyImage.style.width = "90px";
    const changeEnemyImagePosition = document.querySelector(
      ".selected-enemy-img"
    );
    changeEnemyImagePosition.style.left = "304px";
    const displayMenu = document.querySelector(".menu");
    displayMenu.style.display = "flex";

    newFight.pickOption();
  }
}

class Fight extends Game {
  constructor() {
    super();
    this.playerChosenAttack = null;
    this.enemyChosenAttack = null;
  }

  pickOption() {
    const selectionOptions = document.querySelector(".right-menu");
    selectionOptions.addEventListener("click", (event) => {
      if (event.target.classList.contains("fight-button")) {
        this.pickOptionFight();
      } else if (event.target.classList.contains("run")) {
        this.gameLost();
      }
    });
  }

  pickOptionFight() {
    const menu = document.querySelector(".menu");
    menu.style.display = "none";

    const attackMenu = document.querySelector(".attack-menu");
    attackMenu.style.display = "flex";

    this.displayPlayerAttacks();
    this.pickAttack();
  }

  displayPlayerAttacks() {
    const attackOptionDisplay = document.querySelector(".select-attack");
    let newArray = this.selectedPokemon.attacks;
    let playerAttacks = [];

    newArray.forEach((element) => {
      playerAttacks.push(element.attack);
    });

    for (let index = 0; index < playerAttacks.length; index++) {
      if (index === 0) {
        const attackOptionOne = document.querySelector(".attack1 p");
        attackOptionOne.innerHTML = playerAttacks[index].toUpperCase();
      } else if (index === 1) {
        const attackingOptionTwo = document.querySelector(".attack2 p");
        attackingOptionTwo.innerHTML = playerAttacks[index].toUpperCase();
      } else if (index === 2) {
        const attackingOptionThree = document.querySelector(".attack3 p");
        attackingOptionThree.innerHTML = playerAttacks[index].toUpperCase();
      }
    }
  }

  hoverAttack() {
    const showTypeOfAttack = document.querySelector(".type-of-attack p");
    const attackOneSelected = document.querySelector(".attack1");
    const attackTwoSelected = document.querySelector(".attack2");
    const attackThreeSelected = document.querySelector(".attack3");
    const goBackSelected = document.querySelector(".go-back");
    console.log("player attack type is " + this.playerChosenAttack);

    attackOneSelected.addEventListener("mouseenter", (event) => {
      console.log(event.target.children[0].outerText);
      showTypeOfAttack.innerHTML = "Type: <br> Normal";
    });

    attackTwoSelected.addEventListener("mouseenter", (event) => {
      console.log(event.target.children[0].outerText);
      if (event.target.children[0].outerText === "EMBER") {
        showTypeOfAttack.innerHTML = "Type: <br> Fire";
      } else if (event.target.children[0].outerText === "WATERGUN") {
        showTypeOfAttack.innerHTML = "Type: <br> Water";
      } else if (event.target.children[0].outerText === "SEEDBOMB") {
        showTypeOfAttack.innerHTML = "Type: <br> Grass";
      }
    });

    attackThreeSelected.addEventListener("mouseenter", () => {
      showTypeOfAttack.innerHTML = "Type: <br> Normal";
    });

    goBackSelected.addEventListener("mouseenter", () => {
      showTypeOfAttack.innerHTML = "Go back";
    });
  }

  pickAttack() {
    // HOVER EFFECT
    this.hoverAttack();
    const attackSelected = document.querySelector(".select-attack");
    const enemyHealthBar = document.querySelector("#enemy-health-bar progress");
    const playerHealthBar = document.querySelector(
      "#player-health-bar progress"
    );
    const attackCommentary = document.querySelector(".attack-commentary");
    const hideAttackMenu = document.querySelector(".attack-menu");
    console.log(enemyHealthBar);
    // this.gameOver();
    attackSelected.addEventListener("click", (event) => {
      if (event.target.classList.contains("attack-one")) {
        // console.log(this.selectedPokemon.attacks[0]);
        // this.gameOver();
        this.playerChosenAttack = this.selectedPokemon.attacks[0];
        this.attack();
        enemyHealthBar.setAttribute("value", this.enemies.health);
        setTimeout(() => this.defend(), 3000);
        setTimeout(
          () =>
            playerHealthBar.setAttribute("value", this.selectedPokemon.health),
          3000
        );
        setTimeout(() => (attackCommentary.style.display = "none"), 6000);
        setTimeout(() => (hideAttackMenu.style.display = "flex"), 6000);
        // attackCommentary.style.display = "none";
        // hideAttackMenu.style.display = "flex";

        // console.log(this.playerChosenAttack);
      } else if (event.target.classList.contains("attack-two")) {
        this.playerChosenAttack = this.selectedPokemon.attacks[1];
        this.attack();
        enemyHealthBar.setAttribute("value", this.enemies.health);
        setTimeout(() => this.defend(), 3000);
        setTimeout(
          () =>
            playerHealthBar.setAttribute("value", this.selectedPokemon.health),
          3000
        );
        setTimeout(() => (attackCommentary.style.display = "none"), 6000);
        setTimeout(() => (hideAttackMenu.style.display = "flex"), 6000);
      } else if (event.target.classList.contains("attack-three")) {
        this.playerChosenAttack = this.selectedPokemon.attacks[2];
        this.attack();
        enemyHealthBar.setAttribute("value", this.enemies.health);
        setTimeout(() => this.defend(), 3000);
        setTimeout(
          () =>
            playerHealthBar.setAttribute("value", this.selectedPokemon.health),
          3000
        );
        setTimeout(() => (attackCommentary.style.display = "none"), 6000);
        setTimeout(() => (hideAttackMenu.style.display = "flex"), 6000);
      } else if (event.target.classList.contains("back")) {
        this.displayMenu();
      }
    });
  }

  displayMenu() {
    const menu = document.querySelector(".menu");
    console.log(menu);
    menu.style.display = "flex";

    const attackMenu = document.querySelector(".attack-menu");
    attackMenu.style.display = "none";
  }

  attack() {
    const attackCommentaryDiv = document.querySelector(".attack-commentary");
    const hideAttackMenu = document.querySelector(".attack-menu");
    const playerAttackCommentary = document.querySelector(
      ".attack-commentary p"
    );

    const playerAttackType = this.checkTypeOfAttack();
    const enemyType = this.checkEnemyType();
    const healthNumber = document.querySelector(".enemy-health-display p");
    if (playerAttackType === "fire") {
      const damage = this.checkDamageForFireAttack(enemyType);
      const enemyHealth = this.enemies.health;
      const damageEnemy = enemyHealth - damage;
      this.enemies.health = damageEnemy;
      if (this.enemies.health > 0) {
        healthNumber.innerHTML = this.enemies.health + "/120";
      } else {
        healthNumber.innerHTML = "0/120";
      }
      // SHOW ATTACK COMMENTARY
      attackCommentaryDiv.style.display = "flex";
      attackCommentaryDiv.style.backgroundColor = "white";
      attackCommentaryDiv.style.color = "black";
      hideAttackMenu.style.display = "none";
      playerAttackCommentary.innerHTML =
        this.selectedPokemon.name +
        " uses " +
        this.playerChosenAttack.attack +
        " makes damage of " +
        damage +
        "hp";

      // CHECK IF GAME IS OVER
      if (this.enemies.health <= 0) {
        // this.gameWon();

        setTimeout(() => this.gameWon(), 2000);
      }
    } else if (playerAttackType === "normal") {
      const damage = this.checkDamageForNormalAttack();
      const enemyHealth = this.enemies.health;
      const damageEnemy = enemyHealth - damage;
      this.enemies.health = damageEnemy;
      if (this.enemies.health > 0) {
        healthNumber.innerHTML = this.enemies.health + "/120";
      } else {
        healthNumber.innerHTML = "0/120";
      }
      attackCommentaryDiv.style.display = "flex";
      attackCommentaryDiv.style.backgroundColor = "white";
      attackCommentaryDiv.style.color = "black";
      hideAttackMenu.style.display = "none";
      playerAttackCommentary.innerHTML =
        this.selectedPokemon.name +
        " uses " +
        this.playerChosenAttack.attack +
        " makes damage of " +
        damage +
        "hp";
      if (this.enemies.health <= 0) {
        setTimeout(() => this.gameWon(), 2000);
      }
      console.log("enemy damage is now " + this.enemies.health);
    } else if (playerAttackType === "water") {
      const damage = this.checkDamageForWaterAttack(enemyType);
      const enemyHealth = this.enemies.health;
      const damageEnemy = enemyHealth - damage;
      this.enemies.health = damageEnemy;
      if (this.enemies.health > 0) {
        healthNumber.innerHTML = this.enemies.health + "/120";
      } else {
        healthNumber.innerHTML = "0/120";
      }
      attackCommentaryDiv.style.display = "flex";
      attackCommentaryDiv.style.backgroundColor = "white";
      attackCommentaryDiv.style.color = "black";
      hideAttackMenu.style.display = "none";
      playerAttackCommentary.innerHTML =
        this.selectedPokemon.name +
        " uses " +
        this.playerChosenAttack.attack +
        " makes damage of " +
        damage +
        "hp";
      if (this.enemies.health <= 0) {
        setTimeout(() => this.gameWon(), 2000);
      }
      console.log("enemy damage is now " + this.enemies.health);
    } else if (playerAttackType === "grass") {
      const damage = this.checkDamageForGrassAttack(enemyType);
      const enemyHealth = this.enemies.health;
      const damageEnemy = enemyHealth - damage;
      this.enemies.health = damageEnemy;
      if (this.enemies.health > 0) {
        healthNumber.innerHTML = this.enemies.health + "/120";
      } else {
        healthNumber.innerHTML = "0/120";
      }
      attackCommentaryDiv.style.display = "flex";
      attackCommentaryDiv.style.backgroundColor = "white";
      attackCommentaryDiv.style.color = "black";
      hideAttackMenu.style.display = "none";
      playerAttackCommentary.innerHTML =
        this.selectedPokemon.name +
        " uses " +
        this.playerChosenAttack.attack +
        " makes damage of " +
        damage +
        "hp";
      if (this.enemies.health <= 0) {
        setTimeout(() => this.gameWon(), 2000);
      }
      console.log("enemy damage is now " + this.enemies.health);
    }
  }
  defend() {
    const attackCommentaryDiv = document.querySelector(".attack-commentary");
    const hideAttackMenu = document.querySelector(".attack-menu");
    const enemyAttackCommentary = document.querySelector(
      ".attack-commentary p"
    );

    // console.log("were inside defend");
    const enemyAttackType = this.checkEnemyAttack();
    const playerType = this.checkPlayerType();
    const healthNumber = document.querySelector(".health-display p");
    // console.log(enemyAttackType);
    // console.log("were inside defend....." + this.enemyChosenAttack);
    if (enemyAttackType === "fire") {
      const damage = this.checkDamageForFireAttack(playerType);
      console.log("damage i take is " + damage);
      const playerHealth = this.selectedPokemon.health;
      const damagePlayer = playerHealth - damage;
      this.selectedPokemon.health = damagePlayer;
      if (this.selectedPokemon.health > 0) {
        healthNumber.innerHTML = this.selectedPokemon.health + "/120";
      } else {
        healthNumber.innerHTML = "0/120";
      }
      attackCommentaryDiv.style.display = "flex";
      attackCommentaryDiv.style.backgroundColor = "black";
      attackCommentaryDiv.style.color = "white";
      hideAttackMenu.style.display = "none";
      enemyAttackCommentary.innerHTML =
        this.enemies.name +
        " uses " +
        this.enemyChosenAttack.attack +
        " makes damage of " +
        damage +
        "hp";

      if (this.selectedPokemon.health <= 0) {
        setTimeout(() => this.gameLost(), 2000);
      }
      console.log("my damage is now " + this.selectedPokemon.health);
    } else if (enemyAttackType === "normal") {
      const damage = this.checkDamageForNormalAttack();
      console.log("damage i take is " + damage);
      const playerHealth = this.selectedPokemon.health;
      const damagePlayer = playerHealth - damage;
      this.selectedPokemon.health = damagePlayer;
      if (this.selectedPokemon.health > 0) {
        healthNumber.innerHTML = this.selectedPokemon.health + "/120";
      } else {
        healthNumber.innerHTML = "0/120";
      }

      attackCommentaryDiv.style.display = "flex";
      attackCommentaryDiv.style.backgroundColor = "black";
      attackCommentaryDiv.style.color = "white";
      hideAttackMenu.style.display = "none";
      enemyAttackCommentary.innerHTML =
        this.enemies.name +
        " uses " +
        this.enemyChosenAttack.attack +
        " makes damage of " +
        damage +
        "hp";

      if (this.selectedPokemon.health <= 0) {
        setTimeout(() => this.gameLost(), 2000);
      }
      console.log("my damage is now " + this.selectedPokemon.health);
    } else if (enemyAttackType === "water") {
      const damage = this.checkDamageForWaterAttack(playerType);
      const playerHealth = this.selectedPokemon.health;
      const damagePlayer = playerHealth - damage;
      this.selectedPokemon.health = damagePlayer;
      healthNumber.innerHTML = this.selectedPokemon.health + "/120";

      attackCommentaryDiv.style.display = "flex";
      attackCommentaryDiv.style.backgroundColor = "black";
      attackCommentaryDiv.style.color = "white";
      hideAttackMenu.style.display = "none";
      enemyAttackCommentary.innerHTML =
        this.enemies.name +
        " uses " +
        this.enemyChosenAttack.attack +
        " makes damage of " +
        damage +
        "hp";

      if (this.selectedPokemon.health <= 0) {
        setTimeout(() => this.gameLost(), 2000);
      }
      console.log("my damage is now " + this.selectedPokemon.health);
    } else if (enemyAttackType === "grass") {
      const damage = this.checkDamageForGrassAttack(playerType);
      const playerHealth = this.selectedPokemon.health;
      const damagePlayer = playerHealth - damage;
      this.selectedPokemon.health = damagePlayer;
      if (this.selectedPokemon.health > 0) {
        healthNumber.innerHTML = this.selectedPokemon.health + "/120";
      } else {
        healthNumber.innerHTML = "0/120";
      }

      attackCommentaryDiv.style.display = "flex";
      attackCommentaryDiv.style.backgroundColor = "black";
      attackCommentaryDiv.style.color = "white";
      hideAttackMenu.style.display = "none";
      enemyAttackCommentary.innerHTML =
        this.enemies.name +
        " uses " +
        this.enemyChosenAttack.attack +
        " makes damage of " +
        damage +
        "hp";

      if (this.selectedPokemon.health <= 0) {
        setTimeout(() => this.gameLost(), 2000);
      }
      console.log("my damage is now " + this.selectedPokemon.health);
    }
  }

  checkPlayerType() {
    const playerType = this.selectedPokemon.type;
    return playerType;
  }
  checkTypeOfAttack() {
    const typeOfAttackChosen = this.playerChosenAttack.typeOfAttack;
    return typeOfAttackChosen;
  }
  checkEnemyType() {
    const enemyType = this.enemies.type;
    return enemyType;
  }

  pickEnemyAttack() {
    const enemyAttackArray = this.enemies.attacks;
    console.log(enemyAttackArray);
    const enemyChosenAttack =
      enemyAttackArray[Math.floor(Math.random() * enemyAttackArray.length)];
    // console.log(enemyChosenAttack);
    this.enemyChosenAttack = enemyChosenAttack;
    console.log("enemy attack picked is " + enemyChosenAttack.attack);
    return this.enemyChosenAttack;
  }

  checkEnemyAttack() {
    const enemyAttackChosen = this.pickEnemyAttack();
    const typeOfAttackChosen = this.enemyChosenAttack.typeOfAttack;
    return typeOfAttackChosen;
  }

  checkDamageForFireAttack(characterType) {
    if (characterType === "fire") {
      const attackDamage = Math.round(Math.random() * (30 - 15 + 1) + 15);
      console.log("attack damage is " + attackDamage);
      return attackDamage;
    } else if (characterType === "water") {
      const attackDamage = Math.round(Math.random() * (15 - 5 + 1) + 5);
      return attackDamage;
    } else if (characterType === "grass") {
      const attackDamage = Math.round(Math.random() * (70 - 40 + 1) + 40);
      return attackDamage;
    }
  }

  checkDamageForNormalAttack() {
    const attackDamage = Math.round(Math.random() * (25 - 10 + 1) + 10);
    console.log("attack damage is " + attackDamage);
    return attackDamage;
  }

  checkDamageForWaterAttack(characterType) {
    if (characterType === "water") {
      const attackDamage = Math.round(Math.random() * (30 - 15 + 1) + 15);
      return attackDamage;
    } else if (characterType === "grass") {
      const attackDamage = Math.round(Math.random() * (15 - 5 + 1) + 5);
      return attackDamage;
    } else if (characterType === "fire") {
      const attackDamage = Math.round(Math.random() * (70 - 40 + 1) + 40);
      return attackDamage;
    }
  }

  checkDamageForGrassAttack(characterType) {
    if (characterType === "grass") {
      const attackDamage = Math.round(Math.random() * (30 - 15 + 1) + 15);
      return attackDamage;
    } else if (characterType === "fire") {
      const attackDamage = Math.round(Math.random() * (15 - 5 + 1) + 5);
      return attackDamage;
    } else if (characterType === "water") {
      const attackDamage = Math.round(Math.random() * (70 - 40 + 1) + 40);
      return attackDamage;
    }
  }

  gameWon() {
    location.href = "game-won.html";
  }

  gameLost() {
    location.href = "game-lost.html";
  }
}

const game = new Game();
game.start();
