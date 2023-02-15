const chalk = require('chalk');

module.exports = {
    name: "err",
    execute(err) {
        console.log(
            chalk.red(`Um erro na conexão com o DB:\n${err}`)
        );
    },
}