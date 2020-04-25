const dialogFlow = require('dialogflow')
const uuid = require('uuid');
const sessionId = uuid.v4();
const intents = require('./intents')

const callIntent = async (message) => {
  const sessionClient = new dialogFlow.SessionsClient();
  const sessionPath = sessionClient.sessionPath("elber-fiymle", sessionId);

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
  const result = responses[0].queryResult
  const intent = result.intent.displayName.toUpperCase()
  const parameters = result.parameters.fields
  const fulfillmentText = result.fulfillmentText
  const response = await intents.getResponse(intent, parameters, fulfillmentText)

  console.log(` Query: ${result.queryText}`);
  console.log(` Response: ${response}`);

  return response;
}

module.exports = () => {
  return {
    callIntent
  }
}
