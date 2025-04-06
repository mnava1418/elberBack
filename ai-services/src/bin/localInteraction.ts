import * as readlineSync from 'readline-sync';
import generateResponse from '../services/nlpService';

const local_interaction = async() => {
    while (true) {
        let pregunta = readlineSync.question('Martin: ')
        const response = await generateResponse(pregunta)
        console.log('Elber:', response)
    }
}

local_interaction()