




const p = 23;  // prime number
const g = 5;  // primitive root modulus of p


function generatePublicKey(privateKey) {
    return (g^privateKey) % p;  
}

function generateSharedSecret(clientPublicKey, privateKey) {
    return (clientPublicKey ^ privateKey) % p; 
}





function decryptPassword(encryptedPassword, sharedSecret) {
    let decryptedPassword = '';
    const secret = sharedSecret.toString();  // Convert the number to a string
    for (let i = 0; i < encryptedPassword.length; i++) {
        decryptedPassword += String.fromCharCode(encryptedPassword.charCodeAt(i) ^ secret.charCodeAt(i % secret.length));
    }
    return decryptedPassword;
}

export {
    generatePublicKey,
    generateSharedSecret,
    decryptPassword
};

