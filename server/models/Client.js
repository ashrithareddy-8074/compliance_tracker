import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
  },
  entity_type: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.model("Client", clientSchema);