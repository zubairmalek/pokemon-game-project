class Game {
  constructor() {
    this.player = null;
    this.enemies = [];
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
    this.selectedPokemon = null;
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

      console.log(this.selectedPokemon);

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

    // const pokemonFight = document.createElement('div');
    // pokemonFight.setAttribute("class", "pokemon-fight");
  }
}

class Fight extends Player {
  constructor() {
    super();
  }
}

const game = new Game();
game.start();
