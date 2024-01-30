const {Character} = require('./character');
const {Room} = require('./room'); 



class Enemy extends Character {
  constructor(name, description, currentRoom, cooldown = 3000, attackTarget = null, strength, health) {
    super(name, description, currentRoom, strength, health);
    this.cooldown = cooldown;
    this.attackTarget = attackTarget;


    Enemy.enemyCollect.push(this);
  }

  setPlayer(player) {
    this.player = player;
  }

  static enemyCollect = [];


  randomMove() {
    if (this.cooldown === 0) {
      const connectedRooms = Object.values(this.currentRoom.exits);

      if (connectedRooms.length > 0) {
        const randomConnectedRoom = connectedRooms[Math.floor(Math.random() * connectedRooms.length)];

        this.currentRoom = randomConnectedRoom;

        this.cooldown = 3000;


      }
    }
  }

  takeSandwich() {
    // Fill this in
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = () => {
      this.cooldown = 0;
      this.act;
    };
    setTimeout(resetCooldown(), this.cooldown);
  }

  attack() {
   if (this.cooldown === 0) {
    this.player.applyDamage(this.strength);
    this.cooldown += 3000;
   }
  }

  applyDamage(amount) {
    super.applyDamage(amount)
    this.attackTarget = this.player;
    this.attack();

  }



  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
      this.rest();
    } else if (this.attackTarget !== null && this.attackTarget.currentRoom === this.currentRoom) {
      this.attack();
    } else {
      this.scratchNose();
    }
    this.rest();

    
  }


  scratchNose() {
    this.cooldown += 3000;

    this.alert(`${this.name} scratches its nose`);

  }


}

module.exports = {
  Enemy,
};
