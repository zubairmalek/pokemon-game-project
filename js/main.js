class Game {
  constructor() {
    //HARD CODING AS EXAMPLE
    this.player = {
      name: "charmander",
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
          attack: "ember",
          typeOfAttack: "fire",
          damage: 30,
        },
        {
          attack: "scratch",
          typeOfAttack: "normal",
          damage: 10,
        },
      ],
    };

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
    // console.log("Starting game...")
    this.player = new Player();
    this.player.domElement();
    this.player.selectPokemonEvent();

    // this.fightScreen();

    // console.log(newPlayer.selectedPokemon)
    // console.log(newPlayer.selectedPokemon.length)
    // this.attachEvents();
  }
}

class Player {
  constructor() {
    this.selectedPokemon = "charmander";
    // this.domElement = this.selectionEvent();
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

    //    return chooseOne
  }

  selectPokemonEvent() {
    let chooseOne = null;

    const element = document.querySelector(".starter-pokemons");
    element.addEventListener("click", (event) => {
      // console.log(event.target.id)
      if (event.target.id === "charmander") {
        // this.selectedPokemon.push(this.charmander())
        //    console.log("picked charmander")
        // chooseOne.push(this.charmander())
        chooseOne = this.chooseCharacterCharmander();
      } else if (event.target.id === "squirtle") {
        chooseOne = this.chooseCharacterSquirtle();
      } else if (event.target.id === "bulbasaur") {
        chooseOne = this.chooseCharacterBulbasaur();
      }

      this.selectedPokemon = chooseOne;

      //   console.log(this.selectedPokemon);

      this.configureFightScreen();
    });
    return this.selectedPokemon;
  }

  configureFightScreen() {
    const initialPokemon = document.querySelector(".starter-pokemons");
    initialPokemon.remove();

    const boardDiv = document.querySelector(".board");
    const fightScreen = document.createElement("div");

    fightScreen.setAttribute("id", "pokemon-fight");
    boardDiv.append(fightScreen);

    const newFight = new Fight();
    newFight.createGameDiv();
    newFight.attack();

    // console.log(newFight.showChosenCharacter());
    // console.log(newFight.showChosenCharacter());
    // const pokemonFight = document.createElement('div');
    // pokemonFight.setAttribute("class", "pokemon-fight");
  }
}

class Fight extends Game {
  constructor() {
    super();
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
  }

  displayEnemyAttacks() {
    let newArr = this.enemies.attacks;
    let enemyAttacks = [];
    console.log(newArr);
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
    let newArray = this.player.attacks;
    let playerAttacks = [];
    // console.log(newArr);
    newArray.forEach((element) => {
      playerAttacks.push(element.attack);
    });

    const playerDiv = document.querySelector("#player");
    const attacksDisplay = document.createElement("div");
    attacksDisplay.setAttribute("class", "player-attacks");
    playerDiv.append(attacksDisplay);

    for (let index = 0; index < playerAttacks.length; index++) {
      const attackDisplayDiv = document.createElement("div");
      attackDisplayDiv.setAttribute("class", "player-attack");
      let playerAttackName = playerAttacks[index];
      attackDisplayDiv.innerHTML = playerAttackName;
      attacksDisplay.append(attackDisplayDiv);
    }
  }

  pickAttack() {}

  attack() {}
}

const game = new Game();
game.start();
