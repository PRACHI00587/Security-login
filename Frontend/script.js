

const loginButton = document.getElementById('loginButton');
const loginForm = document.getElementById('loginForm');
const resultDiv = document.getElementById('result');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const key = parseInt(document.getElementById('key').value);

   
    const clientprivateKey = 37;
    let clientPublicKey = null;

    if (key === clientprivateKey) {
        console.log('Key matched successfully!');
        clientPublicKey = generatePublicKey(clientprivateKey);
        console.log('Client Public Key:', clientPublicKey);

        
    } else {
        console.error('Error: Invalid key entered!');
        resultDiv.textContent = "Invalid key!";
        return; 
    }

   
   

    const response = await fetch("http://localhost:3000/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientPublicKey: clientPublicKey.toString() }),

    });

if (!response.ok) {
    console.error("Error with initiate request:", await response.text());
    resultDiv.textContent = "Error with initiate request!";
    return;
}

 
    

    const { serverPublicKey, sharedSecret } = await response.json();
  
    
    // const clientSharedSecret = (Math.pow(serverPublicKey, clientprivateKey) % 23).toString();
    //         console.log('Client Shared Secret:', clientSharedSecret);

    if (!password) {
        console.error("Password is empty.");
        resultDiv.textContent = "Password is required.";
        return;
    }
            const encryptedPassword = encryptPassword(password, sharedSecret);
            console.log('Encrypted Password:', encryptedPassword);

    const loginResponse = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username,
            encryptedPassword,
            sharedSecret:sharedSecret.toString()
           
        }),
    });
const responseText = await loginResponse.text();  // Get raw response text
try {
    const result = JSON.parse(responseText);  // Try parsing as JSON
    resultDiv.textContent = result.message;
} catch (error) {
    console.error("Error parsing login response JSON:", error);
    console.error("Raw response text:", responseText);
    resultDiv.textContent = "An error occurred while processing your login.";
}

});
function modExponentiation(exp) {
    const base = 5;
    const modulus = 23;
    const result = Math.pow(base, exp) % modulus;
    return result;
}
function generatePublicKey(privateKey) {
  
    return modExponentiation(privateKey);
}

function encryptPassword(password, sharedSecret) {
    let encryptedPassword = '';
    const secret = sharedSecret.toString();  // Convert the number to a string
    for (let i = 0; i < password.length; i++) {
        encryptedPassword += String.fromCharCode(password.charCodeAt(i) ^ secret.charCodeAt(i % secret.length));
    }
    return encryptedPassword;
}


