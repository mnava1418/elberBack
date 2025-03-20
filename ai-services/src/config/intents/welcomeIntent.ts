import { NLPIntent } from "../../interfaces/nlpInterface";

const welcomeIntent: NLPIntent = {
    name: 'elber.say_hi',
    trainingPhrases: [
        'hola que tal',
        'hola como te va',
        'buenas como estas',
        'hey como te encuentras hoy',
        'hola como ha sido tu dia',
        'saludos como andas',
        'que tal',
        'hola como te sientes hoy'
    ],
    keyWords: ['hola', 'que tal', 'como estas', 'buenos dias', 'buenas tardes', 'buenas noches', 'que onda'],
    responses: [
        '¡Al puro tiro, compadre! Como nopal: verde, espinoso, pero bien parado.',
        'Aquí nomás, como tortilla en comal… ¡dándome la vuelta para no quemarme!',
        'Más feliz que niño con bolillo en la panza.',
        'Como taco sin salsa… medio seco pero sobreviviendo.',
        'Bien, bien… aunque con más pendientes que tamalera en 2 de febrero.',
        'Al cien y pasadito, pero sin feria en la cartera.',
        'Sobreviviendo como chile en nogada… puro relleno y en temporada.',
        'Más tranquilo que vendedor de micheladas en la playa.',
        'Como frijol en olla express… a punto de explotar pero con sabor.',
        'Aquí dándole, como albañil en quincena… con ganas, pero sin dinero.',
    ]
}

export default welcomeIntent
