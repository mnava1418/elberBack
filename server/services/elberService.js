const dialogFlow = require('@google-cloud/dialogflow')
const uuid = require('uuid');
const sessionId = uuid.v4();
const intents = require('./intents')

const callIntent = async (email, message) => {
  const sessionClient = new dialogFlow.SessionsClient();
  const sessionPath = sessionClient.projectAgentSessionPath("elber-fiymle", sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'es-MX',
      },
    },
  };

  const responses = await sessionClient.detectIntent(request)
  console.log('Respuesta recibida de elber. Procesando...')
  const result = responses[0].queryResult
  const intent = result.intent.displayName.toLowerCase()
  const parameters = result.parameters.fields
  const fulfillmentText = result.fulfillmentText
  const query = result.queryText
  const response = await intents.getResponse(email, intent, parameters, fulfillmentText, query)

  console.log(`Intent: ${intent}`);
  console.log(` Query: ${query}`);
  console.log(` Response: ${response.elberResponse}`);
  console.log(` Next Action: ${response.nextAction}`);
  console.log(` Local Function: ${response.localFunction}`);

  return response;
}

module.exports = () => {
  return {
    callIntent
  }
}
