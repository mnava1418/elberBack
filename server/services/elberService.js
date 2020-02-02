const dialogFlow = require('dialogflow')
const uuid = require('uuid');
const sessionId = uuid.v4();
 

const callIntent = async (message) => {
  const sessionClient = new dialogFlow.SessionsClient();
  const sessionPath = sessionClient.sessionPath("elber-fiymle", sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: message,
        // The language used by the client (en-US)
        languageCode: 'es-MX',
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);

  return result.fulfillmentText;
}

module.exports = () => {
  return {
    callIntent
  }
}
