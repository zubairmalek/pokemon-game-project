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
    this.domElement();
    this.selectPokemonEvent();
    // console.log(this.enemies[0]);
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
      // console.log(this.selectedPokemon);
      this.createFight();
    });
  }

  createFight() {
    const newFight = new Fight();
    newFight.selectedPokemon = this.selectedPokemon;
    console.log(this.selectedPokemon);
    const initialPokemon = document.querySelector(".starter-pokemons");
    initialPokemon.remove();

    const boardDiv = document.querySelector(".board");
    const fightScreen = document.createElement("div");

    fightScreen.setAttribute("id", "pokemon-fight");
    boardDiv.append(fightScreen);

    newFight.createGameDiv();
    newFight.attackPick();
    // newFight.giveAndTakeDamage();
    // console.log(newFight.playerChosenAttack);
    // console.log(newFight.giveAndTakeDamage());
  }

  gameOver() {
    if (this.selectedPokemon.health < 0 || this.enemies.health < 0) {
      alert("game over");
      window.location.reload;
    }
  }
}

class Fight extends Game {
  constructor() {
    super();
    this.playerChosenAttack = null;
    this.enemyChosenAttack = null;
  }

  createGameDiv() {
    console.log(this.selectedPokemon);
    const gameDiv = document.querySelector("#pokemon-fight");
    const player = document.createElement("div");
    const opponent = document.createElement("div");
    player.setAttribute("id", "player");
    opponent.setAttribute("id", "enemy-pokemon");
    opponent.innerHTML = this.enemies.name;
    gameDiv.append(player, opponent);
    this.displayPlayerAttacks();
  }

  displayPlayerAttacks() {
    let newArray = this.selectedPokemon.attacks;
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
    let playerHealth = this.selectedPokemon.health;
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
    let enemyHealth = this.enemies.health;
    const enemyDiv = document.querySelector("#pokemon-fight");
    const enemyHealthDiv = document.createElement("progress");
    enemyHealthDiv.setAttribute("id", "enemy-health");
    enemyHealthDiv.setAttribute("max", "120");
    enemyHealthDiv.setAttribute("value", "120");
    enemyDiv.append(enemyHealthDiv);
    return enemyHealthDiv;
  }

  attackPick() {
    const playerHealth = this.updateAndDisplayPlayerHealth();
    const enemyHealth = this.updateAndDisplayEnemyHealth();
    const selectAttack = document.querySelector(".player-attacks");
    selectAttack.addEventListener("click", (event) => {
      if (event.target.id === "player-attack-1") {
        this.playerChosenAttack = this.selectedPokemon.attacks[0];
        this.attack();
        enemyHealth.setAttribute("value", this.enemies.health);
        setTimeout(() => this.defend(), 2000);
        setTimeout(
          () => playerHealth.setAttribute("value", this.selectedPokemon.health),
          2000
        );
      } else if (event.target.id === "player-attack-2") {
        this.playerChosenAttack = this.selectedPokemon.attacks[1];
        this.attack();
        enemyHealth.setAttribute("value", this.enemies.health);
        setTimeout(() => this.defend(), 2000);
        setTimeout(
          () => playerHealth.setAttribute("value", this.selectedPokemon.health),
          2000
        );
      } else if (event.target.id === "player-attack-3") {
        this.playerChosenAttack = this.selectedPokemon.attacks[2];
        this.attack();
        enemyHealth.setAttribute("value", this.enemies.health);
        setTimeout(() => this.defend(), 2000);
        setTimeout(
          () => playerHealth.setAttribute("value", this.selectedPokemon.health),
          2000
        );
        // this.defend();
        // playerHealth.setAttribute("value", this.selectedPokemon.health);
        // return this.playerChosenAttack;
      }
    });
    // console.log(this.playerChosenAttack);
  }

  giveAndTakeDamage() {
    console.log(this.playerChosenAttack);
    const playerHealth = this.updateAndDisplayPlayerHealth();
    const enemyHealth = this.updateAndDisplayEnemyHealth();
    if (this.playerChosenAttack) {
      // console.log(this.playerChosenAttack);
      this.attack();
      this.defend();
    }
  }
  pickAttack() {
    const playerHealth = this.updateAndDisplayPlayerHealth();
    const enemyHealth = this.updateAndDisplayEnemyHealth();
    console.log(playerHealth);
    const selectAttack = document.querySelector(".player-attacks");

    selectAttack.addEventListener("click", (event) => {
      if (event.target.id === "player-attack-1") {
        this.playerChosenAttack = this.selectedPokemon.attacks[0];
      } else if (event.target.id === "player-attack-2") {
        this.playerChosenAttack = this.selectedPokemon.attacks[1];
      } else if (event.target.id === "player-attack-3") {
        this.playerChosenAttack = this.selectedPokemon.attacks[2];
      }

      if (this.enemies.health >= 0 && this.selectedPokemon.health > 0) {
        this.attack();
        enemyHealth.setAttribute("value", this.enemies.health);
        // console.log("enemy health is now " + this.enemies.health);

        setTimeout;
        this.defend();
        playerHealth.setAttribute("value", this.selectedPokemon.health);
        // console.log("player health is now " + this.selectedPokemon.health);
      } else if (this.enemies.health < 0 && this.selectedPokemon.health > 0) {
        alert("you won!");
        window.location.reload();
      } else {
        alert("you lost, try again next time!");
        window.location.reload();
      }
    });
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
    if (this.checkEnemyAttack() === "fire") {
      const damage = this.checkDamageForFireAttack(this.checkPlayerType());
      console.log("damage i take is " + damage);
      const playerHealth = this.selectedPokemon.health;
      const damagePlayer = playerHealth - damage;
      this.selectedPokemon.health = damagePlayer;
    } else if (this.checkEnemyAttack() === "normal") {
      const damage = this.checkDamageForNormalAttack();
      console.log("damage i take is " + damage);
      const playerHealth = this.selectedPokemon.health;
      const damagePlayer = playerHealth - damage;
      this.selectedPokemon.health = damagePlayer;
    } else if (this.checkEnemyAttack() === "water") {
      const damage = this.checkDamageForWaterAttack(this.checkPlayerType());

      const playerHealth = this.selectedPokemon.health;
      const damagePlayer = playerHealth - damage;
      this.selectedPokemon.health = damagePlayer;
      return this.selectedPokemon.health;
    } else if (this.checkEnemyAttack() === "grass") {
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

  nextFight() {
    if (this.enemies.health === 0) {
      console.log("ready for next fight");
      return true;
    }
  }
}

const game = new Game();
game.start();
