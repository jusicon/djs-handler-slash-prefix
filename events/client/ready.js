const client = require('../../index.js')

client.on("ready", () => {
    console.log(`Sucessfully logged in as ${client.user.tag}`)
})