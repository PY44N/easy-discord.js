const Discord = require('discord.js')
const client = new Discord.Client()

class BotClass {
    constructor(options) {
        this.prefix = options.prefix
        this.token = options.token
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
                    if (primaryCommand == "help") {
                        const HelpEmbed = new Discord.MessageEmbed()
                            .setColor(options.embed_settings.color)
                            .setTitle("Help")
                            .setDescription("Prefix = " + this.prefix)
                            .setAuthor(options.embed_settings.name)
                            .setFooter(options.embed_settings.footer);
                            HelpEmbed.addField("`help`", 'Shows You All The Commmands You Can Use')
                            for (const cmd of this.cmds) {
                                HelpEmbed.addField('`' + cmd + '`', cmd.desc)
                            }

                        msg.channel.send(HelpEmbed)
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

    findUserByID(id) {
        return client.users.cache.get(id)
    }
}

module.exports = {
    Bot: BotClass,
}