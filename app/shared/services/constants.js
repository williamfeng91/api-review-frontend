/* global toastr:false */
(function() {
    'use strict';

    angular
        .module('app.services')
        .constant('toastr', toastr)
        .constant('APISERVICE', {
          url: 'http://jsonstub.com/reviews',
          headers: {
            'Content-Type': 'application/json',
            'JsonStub-User-Key': '51ec5e27-c872-4a8e-8070-dec92f5fca8f',
            'JsonStub-Project-Key': 'deeec676-1dad-4086-a1f0-ead970151994'
          }
        });
})();
