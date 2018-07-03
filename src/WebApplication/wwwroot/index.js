$http.post('/user/add', user).then(successFunction, response => {
    log(`Error has occured while adding a user, status code: ${response.status}`);
});