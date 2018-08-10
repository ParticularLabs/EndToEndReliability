import http from 'axios';

Promise.retry = function (fn) {
    return new Promise(function (resolve) {
        var attempt = function() {
            fn().then(resolve)
                .catch(function() {
                    attempt();
                });
        };
        attempt();
    }); 
};

Promise.retry(() => { return http.post('http://localhost:61666/api/order', 'An order'); }).then(function () { console.log('done') });