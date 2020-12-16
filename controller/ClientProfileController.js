'use strict';

/**
 * 
 * Controller for Handling Operations related to the Transient Token.
 * 
 * @param {Sequelize Object} postgresClient Client to use for Postgres Database Operations
 * 
 */
module.exports = (postgresClient) => {
    
    //Importing Modules
    const model = require('../models');

    //Initializing Variables
    const Models = model(postgresClient);
    const clientProfileModel = Models.clientProfileModel;

    const updateClientContactNumber = async (clientId, clientContactNumber) => {
        await clientProfileModel.update(
            { client_contact_number: clientContactNumber},
            { where: { client_id: clientId }});
    };

    return {
        updateClientContactNumber
    };
}