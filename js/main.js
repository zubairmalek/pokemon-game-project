class Game {
  constructor() {
    //HARD CODING AS EXAMPLE
    this.selectedPokemon = null;

    this.enemies = [
      {
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
      },
      {
        name: "blastoise",
        type: "water",
        level: 15,
        health: 120,
        attacks: [
          {
            attack: "tackle",
            typeOfAttack: "normal",
            // damage:,
          },
          {
            attack: "hydro pump",
            typeOfAttack: "water",
            // damage: 10,
          },
        ],
      },
    ];
  }
  start() {
    this.domElement();
    this.selectPokemonEvent();
    console.log(this.enemies[0]);
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
      } else if (event.target.id === "squirtle") {
        this.selectedPokemon = this.chooseCharacterSquirtle();
      } else if (event.target.id === "bulbasaur") {
        this.selectedPokemon = this.chooseCharacterBulbasaur();
      }
      this.configureFightScreen();
    });
  }

  configureFightScreen() {
    // console.log(this.selectedPokemon);
    const initialPokemon = document.querySelector(".starter-pokemons");
    initialPokemon.remove();

    const boardDiv = document.querySelector(".board");
    const fightScreen = document.createElement("div");

    fightScreen.setAttribute("id", "pokemon-fight");
    boardDiv.append(fightScreen);

    const newFight = new Fight(this.selectedPokemon, this.enemies[0]);
    newFight.createGameDiv();
    newFight.pickAttack();
  }
}

class Fight extends Game {
  constructor(chosenPokemon, selectedEnemy) {
    super();
    this.chosenPokemon = chosenPokemon;
    this.selectedEnemy = selectedEnemy;
    this.playerChosenAttack = null;
    this.enemyChosenAttack = null;
  }

  createGameDiv() {
    const gameDiv = document.querySelector("#pokemon-fight");
    const player = document.createElement("div");
    const opponent = document.createElement("div");
    player.setAttribute("id", "player");
    opponent.setAttribute("id", "enemy-pokemon");
    opponent.innerHTML = this.selectedEnemy.name;
    gameDiv.append(player, opponent);

    this.displayPlayerAttacks();
  }

  displayPlayerAttacks() {
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

  updateAndDisplayPlayerHealth() {
    let playerHealth = this.chosenPokemon.health;
    const playerDiv = document.querySelector("#pokemon-fight");
    const playerHealthDiv = document.createElement("progress");
    playerHealthDiv.setAttribute("id", "player-health");
    playerHealthDiv.setAttribute("max", "120");
    playerHealthDiv.setAttribute("value", "120");
    // let playerNewHealth = this.attack();
    playerDiv.append(playerHealthDiv);
    return playerHealthDiv;
  }

  updateAndDisplayEnemyHealth() {
    let enemyHealth = this.selectedEnemy.health;
    const enemyDiv = document.querySelector("#pokemon-fight");
    const enemyHealthDiv = document.createElement("progress");
    enemyHealthDiv.setAttribute("id", "enemy-health");
    enemyHealthDiv.setAttribute("max", "120");
    enemyHealthDiv.setAttribute("value", "120");
    enemyDiv.append(enemyHealthDiv);
    return enemyHealthDiv;
  }

  pickAttack() {
    const playerHealth = this.updateAndDisplayPlayerHealth();
    const enemyHealth = this.updateAndDisplayEnemyHealth();
    console.log(playerHealth);
    const selectAttack = document.querySelector(".player-attacks");

    selectAttack.addEventListener("click", (event) => {
      if (event.target.id === "player-attack-1") {
        this.playerChosenAttack = this.chosenPokemon.attacks[0];
      } else if (event.target.id === "player-attack-2") {
        this.playerChosenAttack = this.chosenPokemon.attacks[1];
      } else if (event.target.id === "player-attack-3") {
        this.playerChosenAttack = this.chosenPokemon.attacks[2];
      }

      if (this.selectedEnemy.health >= 0 && this.chosenPokemon.health > 0) {
        this.attack();
        enemyHealth.setAttribute("value", this.selectedEnemy.health);
        // console.log("enemy health is now " + this.selectedEnemy.health);
        this.defend();
        playerHealth.setAttribute("value", this.chosenPokemon.health);
        // console.log("player health is now " + this.chosenPokemon.health);
      } else if (
        this.selectedEnemy.health < 0 &&
        this.chosenPokemon.health > 0
      ) {
        console.log("you win");
      } else {
        console.log("you lose");
      }
    });
  }

  attack() {
    if (this.checkTypeOfAttack() === "fire") {
      const damage = this.checkDamageForFireAttack(this.checkEnemyType());
      console.log("damage is " + damage);
      const enemyHealth = this.selectedEnemy.health;
      const damageEnemy = enemyHealth - damage;
      this.selectedEnemy.health = damageEnemy;
    } else if (this.checkTypeOfAttack() === "normal") {
      const damage = this.checkDamageForNormalAttack();
      const enemyHealth = this.selectedEnemy.health;
      const damageEnemy = enemyHealth - damage;
      this.selectedEnemy.health = damageEnemy;
    } else if (this.checkTypeOfAttack() === "water") {
      const damage = this.checkDamageForWaterAttack(this.checkEnemyType());

      const enemyHealth = this.selectedEnemy.health;
      const damageEnemy = enemyHealth - damage;
      this.selectedEnemy.health = damageEnemy;
      return this.selectedEnemy.health;
    } else if (this.checkTypeOfAttack() === "grass") {
      const damage = this.checkDamageForGrassAttack(this.checkEnemyType());

      const enemyHealth = this.selectedEnemy.health;
      const damageEnemy = enemyHealth - damage;
      this.selectedEnemy.health = damageEnemy;
      return this.selectedEnemy.health;
    }
  }

  defend() {
    if (this.checkEnemyAttack() === "fire") {
      const damage = this.checkDamageForFireAttack(this.checkPlayerType());
      console.log("enemy attack damage is " + damage);
      const playerHealth = this.chosenPokemon.health;
      const damagePlayer = playerHealth - damage;
      this.chosenPokemon.health = damagePlayer;
    } else if (this.checkEnemyAttack() === "normal") {
      const damage = this.checkDamageForNormalAttack();
      console.log("enemy attack damage is " + damage);
      const playerHealth = this.chosenPokemon.health;
      const damagePlayer = playerHealth - damage;
      this.chosenPokemon.health = damagePlayer;
    } else if (this.checkEnemyAttack() === "water") {
      const damage = this.checkDamageForWaterAttack(this.checkPlayerType());

      const playerHealth = this.chosenPokemon.health;
      const damagePlayer = playerHealth - damage;
      this.chosenPokemon.health = damagePlayer;
      return this.chosenPokemon.health;
    } else if (this.checkEnemyAttack() === "grass") {
      const damage = this.checkDamageForGrassAttack(this.checkPlayerType());

      const playerHealth = this.chosenPokemon.health;
      const damagePlayer = playerHealth - damage;
      this.chosenPokemon.health = damagePlayer;
      return this.chosenPokemon.health;
    }
  }

  checkPlayerType() {
    const playerType = this.chosenPokemon.type;
    return playerType;
  }
  checkTypeOfAttack() {
    const typeOfAttackChosen = this.playerChosenAttack.typeOfAttack;
    return typeOfAttackChosen;
  }

  checkEnemyType() {
    const enemyType = this.selectedEnemy.type;
    return enemyType;
  }

  pickEnemyAttack() {
    const enemyAttackArray = this.selectedEnemy.attacks;
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

  nextFight() {
    if (this.selectedEnemy.health === 0) {
      console.log("ready for next fight");
      return true;
    }
  }
}

const game = new Game();
game.start();
