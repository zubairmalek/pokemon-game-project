class Game {
  constructor() {
    //HARD CODING AS EXAMPLE
    this.selectedPokemon = null;

    this.enemies = {
      name: "charizard",
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
        const loadingScreen = document.querySelector("#loading-screen");
        const pickPokemon = document.querySelector(".pick-pokemon");
        loadingScreen.style.display = "block";
        setTimeout(() => loadingScreen.remove(), 2000);
        setTimeout(() => (pickPokemon.style.display = "block"), 2000);
        // loadingScreen.remove();
      }
    });

    const selectAllChoices = document.querySelector(".pokemon-choices");
    selectAllChoices.addEventListener("click", (event) => {
      if (event.target.classList.contains("charmander")) {
        this.selectedPokemon = this.chooseCharacterCharmander();
        console.log(this.selectedPokemon);
      } else if (event.target.classList.contains("squirtle")) {
        this.selectedPokemon = this.chooseCharacterSquirtle();
      } else if (event.target.classList.contains("bulbasaur")) {
        this.selectedPokemon = this.chooseCharacterBulbasaur();
      }
      this.createFight();
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
          attack: "waterball",
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
    console.log(changeImage);
    if (this.selectedPokemon.name === "charmander") {
      changeImage.setAttribute("src", "./styles/images/charmander.webp");
    } else if (this.selectedPokemon.name === "squirtle") {
      changeImage.setAttribute("src", "./styles/images/squirtle.gif");
    } else if (this.selectedPokemon.name === "bulbasaur") {
      changeImage.setAttribute("src", "./styles/images/bulbasaur.webp");
    }

    const changeHTMLNameInBar = document.querySelector(".player-info h1");
    changeHTMLNameInBar.innerHTML = this.selectedPokemon.name;

    const changeHTMLLevelInBar = document.querySelector(".player-info h3");
    changeHTMLLevelInBar.innerHTML = "Lvl " + this.selectedPokemon.level;

    const changeMenuHTMLName = document.querySelector(".left-menu p");
    changeMenuHTMLName.innerHTML =
      "What should " + this.selectedPokemon.name + " do?";
    const fightScreen = document.querySelector(".fight-screen");
    if (this.selectedPokemon.name) fightScreen.style.display = "block";

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

  pickAttack() {
    // HOVER EFFECT

    const attackSelected = document.querySelector(".select-attack");
    const enemyHealthBar = document.querySelector("#enemy-health-bar progress");
    const playerHealthBar = document.querySelector(
      "#player-health-bar progress"
    );
    console.log(enemyHealthBar);
    attackSelected.addEventListener("click", (event) => {
      if (event.target.classList.contains("attack-one")) {
        // console.log(this.selectedPokemon.attacks[0]);
        this.playerChosenAttack = this.selectedPokemon.attacks[0];
        this.attack();
        enemyHealthBar.setAttribute("value", this.enemies.health);
        setTimeout(() => this.defend(), 2000);
        setTimeout(
          () =>
            playerHealthBar.setAttribute("value", this.selectedPokemon.health),
          2000
        );
        // console.log(this.playerChosenAttack);
      } else if (event.target.classList.contains("attack-two")) {
        this.playerChosenAttack = this.selectedPokemon.attacks[1];
        this.attack();
        enemyHealthBar.setAttribute("value", this.enemies.health);
        setTimeout(() => this.defend(), 2000);
        setTimeout(
          () =>
            playerHealthBar.setAttribute("value", this.selectedPokemon.health),
          2000
        );
      } else if (event.target.classList.contains("attack-three")) {
        this.playerChosenAttack = this.selectedPokemon.attacks[2];
        this.attack();
        enemyHealthBar.setAttribute("value", this.enemies.health);
        setTimeout(() => this.defend(), 2000);
        setTimeout(
          () =>
            playerHealthBar.setAttribute("value", this.selectedPokemon.health),
          2000
        );
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
    if (this.checkTypeOfAttack() === "fire") {
      const damage = this.checkDamageForFireAttack(this.checkEnemyType());
      console.log("damage given to enemy is " + damage);
      const enemyHealth = this.enemies.health;
      const damageEnemy = enemyHealth - damage;
      this.enemies.health = damageEnemy;
    } else if (this.checkTypeOfAttack() === "normal") {
      const damage = this.checkDamageForNormalAttack();
      const enemyHealth = this.enemies.health;
      const damageEnemy = enemyHealth - damage;
      this.enemies.health = damageEnemy;
    } else if (this.checkTypeOfAttack() === "water") {
      const damage = this.checkDamageForWaterAttack(this.checkEnemyType());

      const enemyHealth = this.enemies.health;
      const damageEnemy = enemyHealth - damage;
      this.enemies.health = damageEnemy;
      return this.enemies.health;
    } else if (this.checkTypeOfAttack() === "grass") {
      const damage = this.checkDamageForGrassAttack(this.checkEnemyType());

      const enemyHealth = this.enemies.health;
      const damageEnemy = enemyHealth - damage;
      this.enemies.health = damageEnemy;
      return this.enemies.health;
    }
  }
  defend() {
    this.enemyChosenAttack = this.pickEnemyAttack();
    console.log("were inside defend....." + this.enemyChosenAttack);
    if (this.enemyChosenAttack === "fire") {
      const damage = this.checkDamageForFireAttack(this.checkPlayerType());
      console.log("damage i take is " + damage);
      const playerHealth = this.selectedPokemon.health;
      const damagePlayer = playerHealth - damage;
      this.selectedPokemon.health = damagePlayer;
    } else if (this.enemyChosenAttack === "normal") {
      const damage = this.checkDamageForNormalAttack();
      console.log("damage i take is " + damage);
      const playerHealth = this.selectedPokemon.health;
      const damagePlayer = playerHealth - damage;
      this.selectedPokemon.health = damagePlayer;
    } else if (this.enemyChosenAttack === "water") {
      const damage = this.checkDamageForWaterAttack(this.checkPlayerType());

      const playerHealth = this.selectedPokemon.health;
      const damagePlayer = playerHealth - damage;
      this.selectedPokemon.health = damagePlayer;
      return this.selectedPokemon.health;
    } else if (this.enemyChosenAttack === "grass") {
      const damage = this.checkDamageForGrassAttack(this.checkPlayerType());

      const playerHealth = this.selectedPokemon.health;
      const damagePlayer = playerHealth - damage;
      this.selectedPokemon.health = damagePlayer;
      return this.selectedPokemon.health;
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
}

const game = new Game();
game.start();
