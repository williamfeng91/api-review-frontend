/* global toastr:false */
(function() {
    'use strict';

    angular
        .module('app.services')
        .constant('toastr', toastr)
        .constant('USER_ROLES', {
            all: '*',
            admin: 'admin',
            editor: 'editor',
            reviewer: 'reviewer',
            reader: 'reader'
        })
        .constant('APISERVICE', {
            url: 'http://jsonstub.com',
            reviewUrl: 'http://jsonstub.com/reviews',
            userUrl: 'http://jsonstub.com/users',
            headers: {
                'Content-Type': 'application/json',
                'JsonStub-User-Key': '51ec5e27-c872-4a8e-8070-dec92f5fca8f',
                'JsonStub-Project-Key': 'deeec676-1dad-4086-a1f0-ead970151994'
            }
        });
})();
