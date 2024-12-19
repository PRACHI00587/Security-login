

import { generatePublicKey, generateSharedSecret,decryptPassword } from '../utils/dh-helper.js';




let serverPrivateKey = 16;


let serverPublicKey = generatePublicKey(serverPrivateKey);

const users = [
    { username: 'prachi', password: 'prachi123' },
    { username: 'priya', password: 'priya@2023' },
    { username: 'sita', password: 'sita@123' },
    { username: 'anil', password: 'anil321' },
    { username: 'isha', password: 'isha@456' },
    { username: 'ravi', password: 'ravi@789' },
    { username: 'neha', password: 'neha@1234' },
    { username: 'vikas', password: 'vikas@5678' },
    { username: 'manu', password: 'manu@910' },
    { username: 'amit', password: 'amit@1234' },
    { username: 'sona', password: 'sona@2024' },
    { username: 'ajay', password: 'ajay@345' },
    { username: 'nisha', password: 'nisha@6789' },
    { username: 'ananya', password: 'ananya@1011' },
    { username: 'deepa', password: 'deepa@2222' }
  ];

export function initiateKeyExchange(clientPublicKey) {
    const sharedSecret = generateSharedSecret(clientPublicKey, serverPrivateKey);
    serverPublicKey = generatePublicKey(serverPrivateKey);
    
    return {
        serverPublicKey: serverPublicKey.toString(), 
        sharedSecret: sharedSecret.toString() 
    };
}


export function authenticateUser(username, encryptedPassword , sharedSecret) {
    const user = users.find(u => u.username === username);
    if (!user) {
        return { message: 'Invalid username', status: 401 };
    }
      
       const decryptedPassword = decryptPassword(encryptedPassword, sharedSecret);

       
       if (decryptedPassword === user.password) {
           return { message: 'Login successful!', status: 200 };
       } else {
           return { message: 'Invalid password', status: 401 };
       }
}
   
   
    
    
  
       
    
    
    

   
   



