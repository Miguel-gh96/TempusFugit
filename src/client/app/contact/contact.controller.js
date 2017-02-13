(function() {
'use strict';

    angular
        .module('app.contact')
        .controller('ContactController', ContactController);

    /* @ngInject */
    function ContactController(dataservice, logger) {
        var vm = this;
        
        vm.name = 'miguel';
        vm.email = 'miguel.gh96@gmail.com';
        vm.subject ='info';
        vm.message ='Lorem ipsum...Lorem ipsum...Lorem ipsum...Lorem ipsum...Lorem ipsum...Lorem ipsum...Lorem ipsum...Lorem ipsum...Lorem ipsum...';
        vm.submit = submit;

        function submit() {
            if (checkForm) {
                var data = {
                        name: vm.name,
                        from: vm.email,
                        to: '',
                        subject: vm.subject,
                        text: vm.message,
                        type: 'contact'
                };

                dataservice.sendEmail(data).then(function(response) {
                    if (response){
                        logger.success('Email has sended susccessfully', response, 'SEND');
                    }else{
                        logger.error('Email doesn\'t send', response, 'SEND');
                    }                    
                });
            }
        }

        function checkForm() {
            var isValid = false;
            if (!vm.registerForm.$valid) {
                angular.forEach(vm.registerForm.$error.required, function(field) {
                field.$setDirty();
                });
            } else {
                isValid = true;
            }
            return isValid;
        }

    }
})();