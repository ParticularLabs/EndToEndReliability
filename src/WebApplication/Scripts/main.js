import http from 'axios';

Promise.retry = function (fn) {
    return new Promise(function (resolve) {
        var count = 0;
        var attempt = function() {
            fn().then(resolve)
                .catch(function () {
                    count++;
                    document.getElementById("placeOrderStatus").innerHTML = 'Failed to place an order retrying the operation...';
                    document.getElementById("placeOrderCount").innerHTML = count;
                    attempt();
                });
        };
        attempt();
    }); 
};

function placeAnOrder() {
    document.getElementById("placeOrderStatus").innerHTML = document.getElementById("placeOrderCount").innerHTML = '';
    Promise.retry(() => { return http.post('http://localhost:61666/api/order', 'An order'); }).then(function () {
        document.getElementById("placeOrderStatus").innerHTML  = 'Order has been placed.';
    });    
}

document.getElementById('placeOrder').onclick = placeAnOrder;