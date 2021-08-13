const client = require('../index.js')

client.on("ready", () => {
    console.log(`Sucessfully logged in as ${client.user.tag}`)
    function randomStatus() {
      let status = ["+ | Jusicon on YT!", "+ | plenty of commands!"]
      let rstatus = Math.floor(Math.random() *status.length);
      //client.user.setActivity(status[rstatus], {type: "HELPING"});
      client.user.setActivity(status[rstatus], {type: "PLAYING"});
    }; setInterval(randomStatus, 20000)
})