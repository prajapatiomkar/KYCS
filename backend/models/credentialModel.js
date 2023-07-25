import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const credentialSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timpstamps: true }
);

credentialSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

credentialSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const credentialModel = mongoose.model("Credential", credentialSchema);
export default credentialModel;

// name,
// email,
// password,
// url,
// description,
