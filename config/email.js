/*
 * Nome del file: email.js
 * Percorso: config/email.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  File di utility per la mail del gestore del sistema
 *
 * * Diario delle modifiche:
 *
 */

//change here
var email = "helpservice.quizzipedia@gmail.com"
    ,help = "Quizzipedia Help Service";

//

module.exports = {
    email: email
    ,help: help
    ,compose: "\"" + help + "\" <" + email + ">"
};