/*
 * Nome del file: RoleListTest.js
 * Percorso: tests/RoleListTest.js
 * Autore: Vault-Tech
 * Data creazione: 27.05.2016
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Test per il componente: public/services/RoleList.js
 *
 * * Diario delle modifiche:
 *  27.05 2016 Test superato - Rudy Berton
 *  27.05.2016 Creazione del test - Rudy Berton
 *
 */

'use strict';

describe('RoleList test', function () {
    var RoleList;
    var mock_roleList;
    var RequestRole;
    var rr1, rr2, rr3, rr4, rr5, rr6;


    beforeEach(function () {
        angular.module('RequestsManager');
    });

    beforeEach(inject(function () {
        var $injector = angular.injector(['RequestsManager']);
        RoleList = $injector.get('RoleList');
        mock_roleList = new RoleList();

        RequestRole= $injector.get('RequestRole');
        rr1=new RequestRole("viki_menarin@gmail.com", "Scuola Guida Lunardon", null);
        rr2=new RequestRole("rudyBerton@gmail.com", "Liceo Scientifico G.Dal Piaz", "Vorrei entrare in questo ente!");
        rr3=new RequestRole("vania_Strada@gmail.com","Liceo Scientifico G.Dal Piaz", "Sono la nuova insegnante incapace della classe 5A");
        rr4=new RequestRole("giacomo@gmail.com", "Scuola Guida Meneguzzi", "Sono il docente che terrà i corsi per la patente");
        rr5=new RequestRole("filippo@hotmail.it", "Scuola Guida Lunardon", null);
        rr6=new RequestRole("michela.De@gmail.com", " Liceo Scientifico Primo Levi", "Docente di Storia e Filosofia");
    }));

    it('test addRoleList() method', function () {
        mock_roleList.addRoleList("viki_menarin@gmail.com", "Scuola Guida Lunardon", null, "Student");
        mock_roleList.addRoleList("rudyBerton@gmail.com", "Liceo Scientifico G.Dal Piaz", "Vorrei entrare in questo ente!", "Student");
        mock_roleList.addRoleList("vania_Strada@gmail.com","Liceo Scientifico G.Dal Piaz", "Sono la nuova insegnante incapace della classe 5A", "Teacher");
        mock_roleList.addRoleList("giacomo@gmail.com", "Scuola Guida Meneguzzi", "Sono il docente che terrà i corsi per la patente", "Teacher");
        mock_roleList.addRoleList("filippo@hotmail.it", "Scuola Guida Lunardon", null, "Student");
        mock_roleList.addRoleList("michela.De@gmail.com", " Liceo Scientifico Primo Levi", "Docente di Storia e Filosofia", "Teacher");

        expect(mock_roleList.students).toEqual([rr1,rr2,rr5]);
        expect(mock_roleList.teacher).toEqual([rr3,rr4,rr6]);
    });

   it('test removeStudent() method', function () {
       mock_roleList.addRoleList("viki_menarin@gmail.com", "Scuola Guida Lunardon", null, "Student");
       mock_roleList.addRoleList("rudyBerton@gmail.com", "Liceo Scientifico G.Dal Piaz", "Vorrei entrare in questo ente!", "Student");
       mock_roleList.addRoleList("filippo@hotmail.it", "Scuola Guida Lunardon", null, "Student");
       expect(mock_roleList.students).toEqual([rr1,rr2,rr5]);

       mock_roleList.removeStudent(2);
       expect(mock_roleList.students).toEqual([rr1,rr2]);
   });

    it('test removeTeacher() method', function(){
        mock_roleList.addRoleList("vania_Strada@gmail.com","Liceo Scientifico G.Dal Piaz", "Sono la nuova insegnante incapace della classe 5A", "Teacher");
        mock_roleList.addRoleList("giacomo@gmail.com", "Scuola Guida Meneguzzi", "Sono il docente che terrà i corsi per la patente", "Teacher");
        mock_roleList.addRoleList("michela.De@gmail.com", " Liceo Scientifico Primo Levi", "Docente di Storia e Filosofia", "Teacher");
        expect(mock_roleList.teacher).toEqual([rr3,rr4,rr6]);

        mock_roleList.removeTeacher(1);
        expect(mock_roleList.teacher).toEqual([rr3,rr6]);
    });

    it('test acceptStudent() method', function () {
        mock_roleList.addRoleList("viki_menarin@gmail.com", "Scuola Guida Lunardon", null, "Student");
        mock_roleList.addRoleList("rudyBerton@gmail.com", "Liceo Scientifico G.Dal Piaz", "Vorrei entrare in questo ente!", "Student");
        mock_roleList.addRoleList("filippo@hotmail.it", "Scuola Guida Lunardon", null, "Student");
        expect(mock_roleList.students).toEqual([rr1,rr2,rr5]);

        mock_roleList.acceptStudent(0);
        expect(mock_roleList.students).toEqual([rr2,rr5]);
    });

    it('test acceptTeacher()', function () {
        mock_roleList.addRoleList("vania_Strada@gmail.com","Liceo Scientifico G.Dal Piaz", "Sono la nuova insegnante incapace della classe 5A", "Teacher");
        mock_roleList.addRoleList("giacomo@gmail.com", "Scuola Guida Meneguzzi", "Sono il docente che terrà i corsi per la patente", "Teacher");
        mock_roleList.addRoleList("michela.De@gmail.com", " Liceo Scientifico Primo Levi", "Docente di Storia e Filosofia", "Teacher");
        expect(mock_roleList.teacher).toEqual([rr3,rr4,rr6]);

        mock_roleList.acceptTeacher(2);
        expect(mock_roleList.teacher).toEqual([rr3,rr4]);
    });
    
});
