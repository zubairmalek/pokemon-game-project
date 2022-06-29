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
          damage: 10,
        },
        {
          attack: "flamethrower",
          typeOfAttack: "fire",
          damage: 10,
        },
      ],
    };
  }
  start() {
    this.domElement();
    this.selectPokemonEvent();
  }

  chooseCharacterCharmander() {
    const selectedCharmander = {
      name: "charmander",
      type: "fire",
      level: 15,
      health: 120,
      attacks: [
        {
          attack: "tackle",
          typeOfAttack: "normal",
          damage: 0,
        },
        {
          attack: "ember",
          typeOfAttack: "fire",
          damage: 0,
        },
        {
          attack: "scratch",
          typeOfAttack: "normal",
          damage: 0,
        },
      ],
    };

    return selectedCharmander;
  }

  chooseCharacterSquirtle() {
    const selectedSquirtle = {
      name: "squirtle",
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
      name: "bulbasaur",
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

  domElement() {
    const boardDiv = document.querySelector(".board");
    const allPokemon = document.createElement("div");
    const firstPokemon = document.createElement("div");
    const secondPokemon = document.createElement("div");
    const thirdPokemon = document.createElement("div");

    allPokemon.setAttribute("class", "starter-pokemons");
    firstPokemon.id = "charmander";
    secondPokemon.id = "squirtle";
    thirdPokemon.id = "bulbasaur";

    boardDiv.append(allPokemon);
    allPokemon.append(firstPokemon, secondPokemon, thirdPokemon);
  }

  selectPokemonEvent() {
    const element = document.querySelector(".starter-pokemons");
    element.addEventListener("click", (event) => {
      if (event.target.id === "charmander") {
        this.selectedPokemon = this.chooseCharacterCharmander();
        // console.log(this.selectedPokemon);
      } else if (event.target.id === "squirtle") {
        this.selectedPokemon = this.chooseCharacterSquirtle();
      } else if (event.target.id === "bulbasaur") {
        this.selectedPokemon = this.chooseCharacterBulbasaur();
      }
      this.configureFightScreen();
    });
    // return this.selectedPokemon;
  }

  configureFightScreen() {
    // console.log(this.selectedPokemon);
    const initialPokemon = document.querySelector(".starter-pokemons");
    initialPokemon.remove();

    const boardDiv = document.querySelector(".board");
    const fightScreen = document.createElement("div");

    fightScreen.setAttribute("id", "pokemon-fight");
    boardDiv.append(fightScreen);

    const newFight = new Fight(this.selectedPokemon);
    newFight.createGameDiv();

    newFight.pickAttack();
  }
}

class Fight extends Game {
  constructor(chosenPokemon) {
    super();
    this.chosenPokemon = chosenPokemon;
    this.playerChosenAttack = null;
    this.enemeyChosenAttack = null;
  }

  createGameDiv() {
    const gameDiv = document.querySelector("#pokemon-fight");
    const player = document.createElement("div");
    const opponent = document.createElement("div");
    player.setAttribute("id", "player");
    opponent.setAttribute("id", "enemy-pokemon");
    gameDiv.append(player, opponent);

    this.displayEnemyAttacks();
    this.displayPlayerAttacks();
    // this.updateAndDisplayEnemyHealth();
  }

  displayEnemyAttacks() {
    let newArr = this.enemies.attacks;
    let enemyAttacks = [];
    // console.log(newArr);
    newArr.forEach((element) => {
      enemyAttacks.push(element.attack);
    });

    const enemyDiv = document.querySelector("#enemy-pokemon");
    const attacksDisplay = document.createElement("div");
    attacksDisplay.setAttribute("class", "enemy-attacks");
    enemyDiv.append(attacksDisplay);

    //DISPLAY ENEMY ATTACKS
    for (let index = 0; index < enemyAttacks.length; index++) {
      const attackDisplayDiv = document.createElement("div");
      attackDisplayDiv.setAttribute("class", "enemy-attack");
      let enemyAttackName = enemyAttacks[index];
      attackDisplayDiv.innerHTML = enemyAttackName;
      attacksDisplay.append(attackDisplayDiv);
    }
  }

  displayPlayerAttacks() {
    // console.log(this.player);
    // console.log(this.chosenPokemon);
    let newArray = this.chosenPokemon.attacks;
    let playerAttacks = [];

    newArray.forEach((element) => {
      playerAttacks.push(element.attack);
    });

    const playerDiv = document.querySelector("#player");
    const attacksDisplay = document.createElement("div");
    attacksDisplay.setAttribute("class", "player-attacks");
    playerDiv.append(attacksDisplay);

    for (let index = 0; index < playerAttacks.length; index++) {
      const attackDisplayDiv = document.createElement("div");
      const idName = "player-attack-" + (index + 1);
      attackDisplayDiv.setAttribute("id", idName);
      let playerAttackName = playerAttacks[index];
      attackDisplayDiv.innerHTML = playerAttackName;
      attacksDisplay.append(attackDisplayDiv);
    }
  }

  // displayEnemyHealth(attackDamage) {
  //   let enemyHealth = this.enemies.health;
  //   const enemyDiv = document.querySelector("#pokemon-fight");
  //   const enemyHealthDiv = document.createElement("progress");
  //   enemyHealthDiv.setAttribute("id", "enemy-health");
  //   enemyHealthDiv.setAttribute("max", "120");
  //   enemyHealthDiv.setAttribute("value", "120");
  //   // enemyHealthDiv.innerHTML = enemyHealth + "/120";
  //   enemyDiv.append(enemyHealthDiv);
  // }

  updateAndDisplayEnemyHealth() {
    let enemyHealth = this.enemies.health;
    const enemyDiv = document.querySelector("#pokemon-fight");
    const enemyHealthDiv = document.createElement("progress");
    enemyHealthDiv.setAttribute("id", "enemy-health");
    enemyHealthDiv.setAttribute("max", "120");
    enemyHealthDiv.setAttribute("value", "120");
    // let enemyNewHealth = this.attack();
    enemyDiv.append(enemyHealthDiv);
    return enemyHealthDiv;
  }

  pickAttack() {
    // this.updateAndDisplayEnemyHealth();
    const enemyHealth = this.updateAndDisplayEnemyHealth();
    console.log(enemyHealth);
    const selectAttack = document.querySelector(".player-attacks");

    selectAttack.addEventListener("click", (event) => {
      if (event.target.id === "player-attack-1") {
        this.playerChosenAttack = this.chosenPokemon.attacks[0];
      } else if (event.target.id === "player-attack-2") {
        this.playerChosenAttack = this.chosenPokemon.attacks[1];
      } else if (event.target.id === "player-attack-3") {
        this.playerChosenAttack = this.chosenPokemon.attacks[2];
      }
      // console.log(this.playerChosenAttack);

      if (this.enemies.health >= 1) {
        // this.updateAndDisplayEnemyHealth();
        this.attack();
        enemyHealth.setAttribute("value", this.attack());
        // this.updateAndDisplayEnemyHealth(this.updateEnemyHealth());

        console.log(this.enemies.health);
      } else {
        console.log("enemy defeated");
      }
    });
  }

  attack() {
    if (this.checkTypeOfAttack() === "fire") {
      const damage = this.checkDamageForFireAttack();
      const enemyHealth = this.enemies.health;
      const damageEnemy = enemyHealth - damage;
      this.enemies.health = damageEnemy;
      return this.enemies.health;
    } else if (this.checkTypeOfAttack() === "normal") {
      const damage = this.checkDamageForNormalAttack();
      const enemyHealth = this.enemies.health;
      const damageEnemy = enemyHealth - damage;
      this.enemies.health = damageEnemy;
      return this.enemies.health;
    } else if (this.checkTypeOfAttack() === "water") {
      const damage = this.checkDamageForWaterAttack();
      const enemyHealth = this.enemies.health;
      const damageEnemy = enemyHealth - damage;
      this.enemies.health = damageEnemy;
      return this.enemies.health;
    } else if (this.checkTypeOfAttack() === "grass") {
      const damage = this.checkDamageForGrassAttack();
      const enemyHealth = this.enemies.health;
      const damageEnemy = enemyHealth - damage;
      this.enemies.health = damageEnemy;
      return this.enemies.health;
    }
    //   if (this.player)
    //     this.playerChosenAttack.damage = Math.floor(
    //       Math.random() * (70 - 40 + 1) + 40
    //     );
    // console.log(this.playerChosenAttack.damage);
  }

  checkTypeOfAttack() {
    const typeOfAttackChosen = this.playerChosenAttack.typeOfAttack;
    return typeOfAttackChosen;
  }

  checkEnemyType() {
    const enemyType = this.enemies.type;
    return enemyType;
  }

  checkDamageForFireAttack() {
    if (this.checkEnemyType() === "fire") {
      this.playerChosenAttack.damage = Math.round(
        Math.random() * (30 - 15 + 1) + 15
      );
      return this.playerChosenAttack.damage;
    } else if (this.checkEnemyType() === "water") {
      this.playerChosenAttack.damage = Math.round(
        Math.random() * (15 - 5 + 1) + 5
      );
      return this.playerChosenAttack.damage;
    } else if (this.checkEnemyType() === "grass") {
      this.playerChosenAttack.damage = Math.round(
        Math.random() * (70 - 40 + 1) + 40
      );
      return this.playerChosenAttack.damage;
    }
  }

  checkDamageForNormalAttack() {
    this.playerChosenAttack.damage = Math.round(
      Math.random() * (25 - 10 + 1) + 10
    );
    return this.playerChosenAttack.damage;
  }

  checkDamageForWaterAttack() {
    if (this.checkEnemyType() === "water") {
      this.playerChosenAttack.damage = Math.round(
        Math.random() * (30 - 15 + 1) + 15
      );
      return this.playerChosenAttack.damage;
    } else if (this.checkEnemyType() === "grass") {
      this.playerChosenAttack.damage = Math.round(
        Math.random() * (15 - 5 + 1) + 5
      );
      return this.playerChosenAttack.damage;
    } else if (this.checkEnemyType() === "fire") {
      this.playerChosenAttack.damage = Math.round(
        Math.random() * (70 - 40 + 1) + 40
      );
      return this.playerChosenAttack.damage;
    }
  }

  checkDamageForGrassAttack() {
    if (this.checkEnemyType() === "grass") {
      this.playerChosenAttack.damage = Math.round(
        Math.random() * (30 - 15 + 1) + 15
      );
      return this.playerChosenAttack.damage;
    } else if (this.checkEnemyType() === "fire") {
      this.playerChosenAttack.damage = Math.round(
        Math.random() * (15 - 5 + 1) + 5
      );
      return this.playerChosenAttack.damage;
    } else if (this.checkEnemyType() === "water") {
      this.playerChosenAttack.damage = Math.round(
        Math.random() * (70 - 40 + 1) + 40
      );
      return this.playerChosenAttack.damage;
    }
  }

  checkEnemyHealthZero() {
    if (this.enemies.health === 0) {
      console.log("true");
    } else {
      console.log("false");
    }
  }
}

const game = new Game();
game.start();
