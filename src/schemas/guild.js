const { Schema, model } = require('mongoose');
const guildSchema = new Schema({
    _id: Schema.Types.ObjectId,
    guildId: String,
    guildName: String,
    guildIcon: { type: String, required: false },
    guildLog: String
});

module.exports = model("Guild", guildSchema, "guilds");