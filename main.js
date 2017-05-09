var Discordie =  require("discordie");
var config = require("./config.js");

const Events = Discordie.Events;
const client = new Discordie();

client.connect({
  token: config.token
});

client.Dispatcher.on(Events.GATEWAY_READY, e => {
  console.log("Connected as:" + client.User.Username);
});

client.Dispatcher.on(Events.MESSAGE_CREATE, e =>{
  if (e.message.content == "Ping") {
    e.message.channel.sendMessage("Pong");
  };
  if (e.message.content == "--info") {
    e.message.channel.sendMessage("This is HugMun, a versatile Discord bot for your everyday need.");
  };
});

client.Dispatcher.on(Events.VOICE_CHANNEL_JOIN, e => {
  if(config.voiceJoinAnnounce){
    guild = client.Guilds.get(e.guildId);
    channel = guild.textChannels[0];

    channel.sendMessage("User " + e.user.username + " joined the " + e.channel.name + " voice channel.", true);
  }
});
