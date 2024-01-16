module.exports = {
    name: "err",
    execute(err) {
        console.log(`Um erro na conexão com o DB:\n${err}`);
    },
}