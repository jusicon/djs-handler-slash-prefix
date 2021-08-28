const fs = require('fs')

module.exports = client => {
  //START OF EVENT HANDLER
  fs.readdirSync(`./events/`).forEach(dir => {
    const events = fs.readdirSync(`./events/${dir}`).filter((files) => files.endsWith('.js'));

    for (let files of events) {
      let get = require(`../events/${dir}/${files}`)

      if (get.name) {
        client.events.set(get.name, get)
      } else {
        continue;
      }
    }
  })

  //END OF EVENT HANDLER
}