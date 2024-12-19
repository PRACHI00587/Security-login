import express from 'express';
import bodyParser from 'body-parser';
import { initiateKeyExchange, authenticateUser } from './controllers/login.js';
import cors from 'cors';

const app = express();
app.use(express.json()); 

const port = 3000;

app.use(cors()); 
app.use(bodyParser.json());


app.post('/initiate', (req, res) => {
    const { clientPublicKey } = req.body;

    if (!clientPublicKey) {
        return res.status(400).json({ message: 'Client public key is required.' });
    }

   
    const { serverPublicKey, sharedSecret } = initiateKeyExchange(clientPublicKey);

    res.json({
        serverPublicKey,
        sharedSecret: sharedSecret.toString() 
    });
});


app.post('/login', (req, res) => {
    const { username,encryptedPassword , sharedSecret} = req.body;

    if (!username || !encryptedPassword || !sharedSecret ) {
        console.log("Request body:", req.body); // Debugging log
        return res.status(400).json({ message: 'details are required.' });
    }

    const result = authenticateUser(username, encryptedPassword , sharedSecret);
    if (result.message === 'Login successful!') {
        res.json(result);
    } else {
        res.status(401).json(result); 
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
