/*
 * Nome del file: homePageGeneric.js
 * Percorso: public/home/homePageGeneric.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller per la visualizzazione della homepage di utente senza ruolo
 *
 * * Diario delle modifiche:
 *
 */

angular.module('Quizzipedia').directive('homePageGeneric',function(){
    return {
        restrict: 'E',
        templateUrl: './public/home/homepageGeneric.html'
    };
});