import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createToken, getCardData } from '../services/cardService';

export async function createCardToken(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    // Verifica si event.body es nulo o indefinido
    if (event.body == null) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Request body is missing' }),
        };
      }
    // Parse and validate request body, headers, and parameters
    const { email, card_number, cvv, expiration_year, expiration_month } = JSON.parse(event.body);

    // Call createToken function to create a token
    const token = await createToken(email, card_number, cvv, expiration_year, expiration_month);

    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
  } catch (error: any) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
}

export async function getCardByToken(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      // Parse and validate the token parameter from the event
      const { token } = event.pathParameters || {};
  
      if (!token) {
        // Manejar el caso en que token sea nulo o undefined
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Token is missing' }),
        };
      }
  
      // Call getCardData function to retrieve card details
      const cardData = await getCardData(token);
  
      return {
        statusCode: 200,
        body: JSON.stringify(cardData),
      };
    } catch (error: any) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error.message }),
      };
    }
  }
