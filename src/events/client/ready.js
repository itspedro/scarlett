module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
          setInterval(client.pickPresence, 10000);
        console.log(`${client.user.tag} esta online.`);
    },
};