import crypto from 'crypto'

function generateSalt() {
    return crypto.randomBytes(16).toString('hex');
}


function hashPassword(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

// Encrypt the password
export function encryptPassword(password) {
    const salt = generateSalt();
    const hashedPassword = hashPassword(password, salt);
    return { salt, hashedPassword };
}

// Decrypt and validate the password
export function decryptPassword(password, salt, hashedPassword) {
    const hashToCheck = hashPassword(password, salt);
    return hashToCheck === hashedPassword;
}

