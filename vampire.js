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
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numOfVamps = 0;
    let currentVamp = this;

    while (currentVamp.creator) {
      currentVamp = currentVamp.creator;
      numOfVamps++;
    }
    return numOfVamps;

  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.

  closestCommonAncestor(vampire) {
    // console.log("VAMPIRE   :  ", this.isMoreSeniorThan(vampire), this.name);

    // if (this.isMoreSeniorThan(vampire)) {
    //   console.log("VAMPIRE   :  ", this.isMoreSeniorThan(vampire), this.name);
    //   return this;
    // } else {
    //   console.log("VAMPIRE   :  ", this.isMoreSeniorThan(vampire), vampire.name);
    //   return vampire;
    // }

    if (this.creator === vampire.creator) { //base case
      return this.creator;
    } else if (!vampire.creator) { //this works
      return vampire;
    } else if (!this.creator) {
      return this;
    } else {
      if (this.isMoreSeniorThan(vampire)) {
        return this.closestCommonAncestor(vampire.creator); //rec case
      } else {
        return vampire.closestCommonAncestor(this.creator); //rec case
      }
    }


  }

}





module.exports = Vampire;

