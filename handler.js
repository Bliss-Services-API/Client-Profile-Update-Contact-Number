'use strict';

const crypto = require('crypto');
const postgresClient = require('./connections/PostgresConnection')('production');

postgresClient.authenticate()
.then(() => console.log('Database Connected Successfully'));

module.exports.app = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        const Controller = require('./controller')(postgresClient);
        const clientProfileController = Controller.clientProfileController;
    
        const clientEmail = event.body.client_email;
        const clientContactNumber = event.body.contact_number;

        const clientEmailSalted = clientEmail + "" + MagicWord;
        const clientId = crypto.createHash('sha256').update(clientEmailSalted).digest('base64');

        await clientProfileController.updateClientContactNumber(clientId, clientContactNumber);
     
        const response = {
            MESSAGE: 'DONE',
            RESPONSE: 'Client Contact Number Updated Successfully!',
            CODE: 'CLIENT_UPDATED_SUCCESSFULLY'
        };

        return {
            statusCode: 200,
            body: JSON.stringify(response)
        };

    } catch(err) {
        console.error(`ERR: ${JSON.stringify(err.message)}`);

        const response = {
            ERR: err.message,
            RESPONSE: 'Client Contact Number Upload Failed!',
            CODE: 'CLIENT_UPDATION_FAILED'
        };

        return {
            statusCode: 400,
            body: JSON.stringify(response)
        };
    }
}