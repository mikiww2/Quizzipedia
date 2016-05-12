angular.module('managerInstitution', ['ui.bootstrap']).controller('CtrlInstitution',['Class', 'Institution', '$scope', function (Class, Institution, $scope){
    
    //$scope.class = new Class();
    $scope.class = {};
    $scope.institution = new Institution(); // sarà richiesta al server
    
    $scope.myClass = {
        
        description: null,
        name: null,
        year: null,
        modifyClass: null,
        
        clean: function(){
            this.description = null;
            this.name = null;
            this.year = null;
            this.modifyClass = null;
        },
        
        create: function(myClass){
            $scope.class = new Class();
            $scope.class.edit(myClass.description, myClass.name, myClass.year);
            $scope.institution.addClass($scope.class);
            
            $scope.class = {}; //pulisco la variabile
            myClass.clean();
            
        },
        
        edit: function(myClass){
            $scope.class.edit (myClass.description, myClass.name, myClass.year);
            $scope.institution.addClass($scope.class);
            //pulisco il form
            this.description = null;
            this.name = null;
            this.year = null;
        },
        
        getClassOfInstitution: function(index){
            this.modifyClass = index;
            this.description = $scope.institution.classes[index].getDescription();
            this.name = $scope.institution.classes[index].getName();
            this.year = $scope.institution.classes[index].getAcademicYear();
        },
        
        delete: function(index){
            this.modifyClass = index;
            this.getClassOfInstitution(index);
        },
        
        deleteClass: function(){
           $scope.institution.removeClass(this.modifyClass);
            this.clean();
        },
        
        save: function(){
            $scope.class = $scope.institution.classes[this.modifyClass];
            
            $scope.class.edit(this.description, this.name, this.year);
            $scope.institution.removeClass(this.modifyClass);
            $scope.institution.addClass($scope.class);
            $scope.class = {};
            this.clean();        
        }        
    };   
    
}]);