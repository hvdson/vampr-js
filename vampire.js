class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    vampire.creator = this;
    this.offspring.push(vampire);
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let count = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      count++;
    }

    return count;

  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;

  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {

    // TODO: NEED TO REFACTOR THIS!!!

    if (!this) {
      return null;
    }

    if (this.name === name) {
      return this;
    }

    let foundVampire = null;

    for (const offspring of this.offspring) {
      foundVampire = offspring.vampireWithName(name);
      if (foundVampire) {
        return foundVampire;
      }
    }

    return foundVampire;

  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    // initialize count to 0
    let count = 0;

    // base case: no descendants return count
    if (this.numberOfOffspring === 0) {
      return count;

      // if descendents:
    } else {
      // loop through offspring
      for (let child of this.offspring) {
        // found a descendant - add 1 to count
        count++;
        // recursive case: get the amt of descendents from children and add them to count
        count += child.totalDescendents;
      }
    }
    // return count
    return count;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    // initialize millenial array
    let millenials = [];

    // base case: no descendants && this not a millenial
    if (this.yearConverted > 1980) {
      millenials.push(this);
    }
    // DON'T USE else STATEMENT - doesn't let the recursion continue!!! 
    // recursive case: go through offspring and pass each one back in recursively
    for (let child of this.offspring) {
      const childMillenials = child.allMillennialVampires;
      millenials = millenials.concat(childMillenials);
    }
    // return the array of millenials
    return millenials;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let thisOGDistance = this.numberOfVampiresFromOriginal;
    let vampireOGDistance = vampire.numberOfVampiresFromOriginal;

    if (thisOGDistance === 0) {
      return this;
    } else if (vampireOGDistance === 0) {
      return vampire;
    }
  }
}

module.exports = Vampire;