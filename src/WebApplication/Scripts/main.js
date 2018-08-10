import http from 'axios';

Promise.retry = function (fn, i) {
    return new Promise(function (resolve, reject) {
        var error;
        var attempt = function () {
            if (i <= 0) {
                reject(error);
            } else {
                fn().then(resolve)
                    .catch(function (e) {
                        i--;
                        error = e;
                        attempt();
                    });
            }
        };
        attempt();
    }); 
};

Promise.retry(http.post.bind(null, 'http://localhost:61666/api/order', 'An order'), 5).then(function () { console.log('done') });