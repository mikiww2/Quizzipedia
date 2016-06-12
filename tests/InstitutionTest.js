/*
 * Nome del file: InstitutionTest.js
 * Percorso: tests/InstitutionTest.js
 * Autore: Vault-Tech
 * Data creazione: 25.05.2016
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Test per il componente: public/services/Institution.js
 *
 * * Diario delle modifiche:
 *  26.05.2016 Test superato - Rudy Berton
 *  25.05.2016 Creazione del test - Rudy Berton
 *
 */

'use strict';

describe('Institution test', function () {
    var Class;
    var class1, class2, class3;
    var Director;
    var mock_director;
    var ClassList;
    var mock_classList;
    var RoleList;
    var mock_roleList;
    var Topic;
    var mock_topic;

    var Institution;
    var mock_institution;

    beforeEach(function() {
        angular.module('InstitutionManager');
    });

    beforeEach(inject(function() {
        var $injector = angular.injector(['InstitutionManager', 'InstClassManager','RequestsManager', 'TopicsManager']);
        Class=$injector.get('Class');
        class1=new Class();
            class1.name="5A Scientifico";
            class1.description="Classe composta da 21 studenti";
            class1.academicYear="2015";
            class1.teachers=["vania.strada@gmail.com","Salvatore_Passaro@hotmail.it","AnnaTurra@gmail.com"];
            class1.students=["marco.rubin@gmail.com","fabioPavanello@gmail.com","elena.DeSalvador@gmail.com","SilviaTonin@gmail.com"];
        class2=new Class();
            class2.name="3B Classico";
            class2.description="Classe composta da 18 studenti";
            class2.academicYear="2016";
            class2.teachers=["Salvatore_Passaro@hotmail.it","AnnaTurra@gmail.com"];
            class2.students=["viki@gmail.com","rudy@gmail.com","giacomo@gmail.com","simone@gmail.com"];
        class3=new Class();
            class3.name="4C Classico";
            class3.description="Classe composta da 15 studenti";
            class3.academicYear="2016";
            class3.teachers=["AnnaTurra@gmail.com", "FrancescoRusso@gmail.com"];
            class3.students=["alex@gmail.com","marco@gmail.com","tony@gmail.com","perla@gmail.com"];

        Director=$injector.get('Director');
        mock_director=new Director("Filippo","Monti", "pippoM@gmail.com", "filippoMont");

        ClassList=$injector.get('ClassList');
        mock_classList=new ClassList();
        mock_classList.classRequests=["CR1", "CR2", "CR3"];

        RoleList=$injector.get('RoleList');
        mock_roleList=new RoleList();
        mock_roleList.students=["RS1", "RS2", "RS3"];
        mock_roleList.teacher=["RT1","RT2","RT3"];

        Topic=$injector.get('Topics');
        mock_topic=new Topic();
        mock_topic.topics=["Matematica", "Storia", "Filosofia"];


        Institution= $injector.get('Institution');
        mock_institution=new Institution();
    }));

    it('test setName() and getName() methods', function () {
        mock_institution.setName('Liceo G.Dal Piaz');
        expect(mock_institution.getName()).toBe('Liceo G.Dal Piaz');
    });

    it('test setDirector() and getDirector() methods', function () {
       mock_institution.setDirector(mock_director);
        expect(mock_institution.getDirector()).toEqual(mock_director);
    });

    it('test addClass(), removeClass() and getClass() methods', function () {
        mock_institution.addClass(class1);
        mock_institution.addClass(class2);
        mock_institution.addClass(class3);
        expect(mock_institution.getClasses()).toEqual([class1,class2, class3]);

        mock_institution.removeClass(1);
        expect(mock_institution.getClasses()).toEqual([class1,class3]);
    });

    it('test getStudents() and removeStudent() methods', function () {
        mock_institution.students=["marco.rubin@gmail.com","fabioPavanello@gmail.com","elena.DeSalvador@gmail.com","SilviaTonin@gmail.com","viki@gmail.com","rudy@gmail.com","giacomo@gmail.com","simone@gmail.com","alex@gmail.com","marco@gmail.com","tony@gmail.com","perla@gmail.com"];
        expect(mock_institution.getStudents()).toEqual(["marco.rubin@gmail.com","fabioPavanello@gmail.com","elena.DeSalvador@gmail.com","SilviaTonin@gmail.com","viki@gmail.com","rudy@gmail.com","giacomo@gmail.com","simone@gmail.com","alex@gmail.com","marco@gmail.com","tony@gmail.com","perla@gmail.com"]);

        mock_institution.removeStudent("fabioPavanello@gmail.com");
        mock_institution.removeStudent("SilviaTonin@gmail.com");
        mock_institution.removeStudent("marco@gmail.com");
        expect(mock_institution.getStudents()).toEqual(["marco.rubin@gmail.com","elena.DeSalvador@gmail.com","viki@gmail.com","rudy@gmail.com","giacomo@gmail.com","simone@gmail.com","alex@gmail.com","tony@gmail.com","perla@gmail.com"]);
    });

    it('test getTeachers() and removeTeacher() methods', function () {
        mock_institution.teachers=["vania.strada@gmail.com","Salvatore_Passaro@hotmail.it","AnnaTurra@gmail.com", "FrancescoRusso@gmail.com"];
        expect(mock_institution.getTeachers()).toEqual(["vania.strada@gmail.com","Salvatore_Passaro@hotmail.it","AnnaTurra@gmail.com", "FrancescoRusso@gmail.com"]);

        mock_institution.removeTeacher("vania.strada@gmail.com");
        mock_institution.removeTeacher("AnnaTurra@gmail.com");
        expect(mock_institution.getTeachers()).toEqual(["Salvatore_Passaro@hotmail.it", "FrancescoRusso@gmail.com"]);
    });

    it('test getClassList() method', function () {
        mock_institution.classList=mock_classList;
        expect(mock_institution.getClassList()).toEqual(mock_classList);
    });

    it('test removeClassRequest() method', function () {
        mock_institution.classList=mock_classList;
        expect(mock_institution.removeClassRequest(0)).toEqual(mock_classList.removeClassRequest(0));
    });

    it('test acceptClassRequest() method', function(){
        mock_institution.classList=mock_classList;
        expect(mock_institution.acceptClassRequest(1)).toEqual(mock_classList.acceptClassRequest(1));
    });

    it('test getRoleList() method', function () {
        mock_institution.roleList=mock_roleList;
        expect(mock_institution.getRoleList()).toEqual(mock_roleList);
    });

    it('test acceptRequestRole() method', function () {
        mock_institution.roleList=mock_roleList;
        mock_institution.acceptRequestRole("RS2","Student");
        mock_institution.acceptRequestRole("RT1","Teacher");
        mock_institution.acceptRequestRole("RS1","Student");

        mock_roleList.acceptStudent(1);
        mock_roleList.acceptTeacher(0);
        mock_roleList.acceptStudent(0);

        expect(mock_institution.getRoleList()).toEqual(mock_roleList);
    });

    it('test getTopics() method', function () {
        mock_institution.topics=mock_topic;
        expect(mock_institution.getTopics()).toEqual(mock_topic);
    });

});
