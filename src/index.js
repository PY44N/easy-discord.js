const Discord = require('discord.js')
const client = new Discord.Client()

class BotClass {
    constructor(token, prefix) {
        this.prefix = prefix
        this.token = token
        this.cmds = []
        client.on('ready', () => {
            console.log("Connected as " + client.user.tag)
            client.user.setActivity(this.prefix + "help");
        })

        client.on('message', (msg) => {
            if (msg.author != client.user) {
                if (msg.content.startsWith(this.prefix)) {
                    let fullCommand = msg.content.substr(this.prefix.length)
                    let splitCommand = fullCommand.split(" ")
                    let primaryCommand = splitCommand[0].toLowerCase()
                    let args = splitCommand.splice(1)
                    if (this.cmds[primaryCommand]) {
                        this.cmds[primaryCommand].cmd(msg, args)
                    }
                }
            }
        })

        client.login(this.token)
    }

    command(command, desc, cmd) {
        command = command.toLowerCase()
        this.cmds[command] = []
        this.cmds[command].desc = desc
        this.cmds[command].cmd = cmd
    }
}

module.exports = {
    Bot: BotClass,
}