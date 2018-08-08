# EndToEndReliability


## Iteration 1 - The problem


### Data going from the client to the server can get lost

Getting data from the browser to the web server is exposed to the fallacies of distributed computing. Lots has been written on that topic but in short:

> things can go wrong, horribly wrong

The request might never reach the server, with an HTTP timeout as a result. It might reach the server but something bad might happen before your data is safely stored, with an HTTP 500 Internal Server Error as a result. It doesn't end there. Things might go wrong after data is stored, and the same 500 will greet the client. Are we done? Nope. Something might go wrong on the way back to the client, and HTTP timeout again. As you can see, lots of things can happen. From the client's perspective we can summarize it as:

> any non success status code other than 4XX means that you have no idea what happened to your data, it might be safe or it might not

From the server's perspective we can summarized it as:

> you know if data is stored or not but you won't know if the client is aware of the fact that it was successfully stored or not

In essence you can easily get into situations where the client and server are in disagreement about whether data is persisted or not. If we can choose, not losing the data is probably the better alternative but having the client think its data is lost can also lead to problems. We'll talk about the problems next.



### I get it, my data might be lost, is that a problem?

As always, the correct answer is "it depends". If you are building a new social media site you might, at least initially, be OK with losing user's updates from time to time. Some users might be annoyed by this but it's no big deal.

If, on the other hand, you are processing credit card payments and your site stops responding in the middle of the payment process, users might be a little bit reluctant to just open a new browser tab and try again. Everybody loves a Porsche but having two of them delivered to your driveway might a bit too much for your bank account.


### Ok, I get that this is a problem, how do I find out if I'm affected?

Logs need to be configured and monitored on a regular basis. Certain web servers like IIS come with logging configured out of the box, but when using a console application to host your web API, you need to take care of this yourself.

The server won't be able to catch all the issues though. Problems with the response on the way back to the client will not be visible in the server logs and need to caught by the client instead.

Logs on the client are only useful if they can be viewed, so sending them to a centralized place for analysis is essential. There are plenty of tools available to make this easy, like Raygun, AppInsights, and others.

While we've only talked about browser to web server scenarios so far, all applications using HTTP such as web apps, SPA's, or MVC are vulnerable. It doesn't even have to be a web app. A smart client calling a web API, B2B integrations over HTTP, etc. are vulnerable in a similar way. In those scenarios you might not even be in control over the client, which further complicates things.  

### So what's next? Retrying? Is it safe to retry? Stay tuned for the next episode...

## Iteration 2 - The retry

### Poor lonely client

From the client perspective one can determine if the request was successful or not. The sample code to do that might look as follows:

```js
$http.post('/user/add', user).then(successFunction, response => {
    log(`Error has occured while adding a user, status code: ${response.status}`);
});
```

This piece of code makes a post call to 'user/add' URL passing some user as a parameter, and handle every error by calling a method called log with a information what status code was returned. Different JS frameworks will have different API's but the concept would be the same.

From the client perspective there are two things that we can do knowing that an error has happened: inform a user about it and stop everything or do a retry.

### Concerning retries
Doing a retry on the client end seems simple but it is an acknowledgment of a problem that always existed: duplicate request can happen in most systems. By acknowledging that and preparing your system for handling duplicate requests, retry becomes a viable solution to certain problems.

Let's have a look how a retry might look like.

```js
Promise.retry = function(fn) {
    return new Promise(function(resolve){        
        var attempt = function() {           
          fn().then(resolve)
            .catch(function(){                       
            attempt();
          });            
        };
        attempt();
    });
};
```

Such retry can be used in the following manner:

```js
Promise.retry($http.post('/user/add', user)).then(function(){console.log('done')});
```




