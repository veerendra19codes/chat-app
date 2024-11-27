const mongoose = require("mongoose");

const GroupSchema = mongoose.Schema(
    {
    name: {
          type: String,
          required: true,
          unique: true,
    },
    users: Array,
    admin: {
      type:"string"
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Groups", GroupSchema);