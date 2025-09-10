import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: String,
  specie: String,
  birthDate: Date
});

const Pet = mongoose.model("Pet", petSchema);

export default Pet;
