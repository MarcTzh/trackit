const bcrypt = require("bcryptjs");

async function hash(input) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(input, salt);

    console.log(passwordHash);
}

hash('123123');