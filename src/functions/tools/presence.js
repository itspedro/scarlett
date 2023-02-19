const { ActivityType } = require("discord.js");

module.exports = (client) => {
    client.pickPresence = async() => {

        let servers = client.guilds.cache.size;
        let serverMembers = client.guilds.cache.reduce((a,b) => a + b.memberCount, 0 );

        const actives = [
            {type: ActivityType.Competing, text:`${servers} servidores.`, status:`online`},
            {type: ActivityType.Watching, text:`${serverMembers} membros.`, status:`dnd`},
            {type: ActivityType.Listening, text:`você`, status:`idle`}
        ];

        const index = Math.floor(Math.random() * actives.length)
        const text = actives[index].text;
        const type = actives[index].type;
        const status = actives[index].status;

        client.user.setPresence({
            activities: [{name: `${text}`,
            type: type}],
            status: status
        });
    };
};