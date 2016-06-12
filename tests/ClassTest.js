/*
 * Nome del file: ClassTest.js
 * Percorso: tests/ClassTest.js
 * Autore: Vault-Tech
 * Data creazione: 14.05.2016
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Test per il componente: public/services/Class.js
 *
 * * Diario delle modifiche:
 *  14.05 2016 Test superato - Rudy Berton
 *  14.05.2016 Creazione del test - Rudy Berton
 *
 */

'use strict';

describe('Class test', function(){
    var classInj;
    var mock_class;

    beforeEach(function() {
        angular.module('InstClassManager');
    });

    beforeEach(inject(function() {
        var $injector = angular.injector(['InstClassManager']);
        classInj=$injector.get('Class');
        mock_class = new classInj();
    }));

    it('test if mock_class is defined', function(){
       expect(mock_class).toBeDefined();
        // console.log(mock_class);
    });

    it('test method getDescription()',function(){
        expect(mock_class.getDescription()).toBeNull();
    });

    it('test method getName()', function(){
        expect(mock_class.getName()).toBeNull();
    });

    it('test method getAcademicYear()', function(){
        expect(mock_class.getAcademicYear()).toBeNull();
    });

    it('test method getTeachers()',function(){
        expect(mock_class.getTeachers()).toEqual([]);
    });

    it('test method getStudents()', function() {
        expect(mock_class.getStudents()).toEqual([]);
    });

    it('test methods addTeacher() and removeTeacher() ', function(){
        mock_class.addTeacher("vania.strada@gmail.com");
        mock_class.addTeacher("Salvatore_Passaro@hotmail.it");
        mock_class.addTeacher("AnnaTurra@gmail.com");
        expect(mock_class.getTeachers()).toEqual(["vania.strada@gmail.com","Salvatore_Passaro@hotmail.it","AnnaTurra@gmail.com"]);
        //console.log(mock_class.getTeachers());

        mock_class.removeTeacher("vania.strada@gmail.com");
        expect(mock_class.getTeachers()).toEqual(["Salvatore_Passaro@hotmail.it","AnnaTurra@gmail.com"]);
        //console.log(mock_class.getTeachers());

    });

    it('test methods addStudent() and removeStudent() ', function(){
        mock_class.addStudent("marco.rubin@gmail.com");
        mock_class.addStudent("fabioPavanello@gmail.com");
        mock_class.addStudent("elena.DeSalvador@gmail.com");
        mock_class.addStudent("SilviaTonin@gmail.com");
        expect(mock_class.getStudents()).toEqual(["marco.rubin@gmail.com","fabioPavanello@gmail.com","elena.DeSalvador@gmail.com","SilviaTonin@gmail.com"]);
        //console.log(mock_class.getStudents());

        mock_class.removeStudent("elena.DeSalvador@gmail.com");
        expect(mock_class.getStudents()).toEqual(["marco.rubin@gmail.com","fabioPavanello@gmail.com","SilviaTonin@gmail.com"]);
        //console.log(mock_class.getStudents());
    });

    it('test method edit()', function(){
        mock_class.edit("Classe composta da 21 studenti della scuola statate G.Dal Piaz","5A Scientifico","2015");
        expect(mock_class.getDescription()).toBe("Classe composta da 21 studenti della scuola statate G.Dal Piaz");
        expect(mock_class.getName()).toBe("5A Scientifico");
        expect(mock_class.getAcademicYear()).toBe("2015");
        //console.log(mock_class);
    });




});
