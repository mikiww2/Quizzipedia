/*
 * Nome del file: homePageStudent.js
 * Percorso: public/home/homePageStudent.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller per la visualizzazione della homepage studente
 *
 * * Diario delle modifiche:
 *
 */

angular.module('Quizzipedia').directive('homePageStudent',function(){
    
    return {
      restrict: 'E',
      templateUrl: './public/home/homepageStudent.html'
    };
    
});