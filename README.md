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

### Detecting the "oh crap" moments

Clients need to determine if the request was successful or not. This might look as follows:

```js
$http.post('/api/order', order).then(successFunction).catch(response => {
    log(`Error has occured while placing an order, status code: ${response.status}`);
});
```

The code makes a post call to some API and should the call fail `log()` is called with the corresponding http status. Different JavaScript frameworks will have different APIs but the concept would be the same.

Knowing that the call failed leaves the client with two options: let the user know and ask how to proceed or retry the operation.

### Everyone, especially web servers, deserves a second chance

As we already talked about lots can go wrong when travelling the internet, as for all hard things in life not giving up when there is a setback is key. Having the client retry seems simple but surfaces a problem that likely always existed: duplicate request can happen in most systems. By acknowledging this and being prepared for duplicate requests makes retrying a viable solution to transient problems.

Let's have a look what a retry might look like.

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
Promise.retry($http.post('/api/order', order)).then(function(){console.log('done')});
```

Of course we can't retry forever. But then, how long should we try? That's one of these "it depends" kind of questions. When designing the retry mechanism we need to take into account both the technical aspects of the server implementation (what are its availability characteristics) and the business requirements (e.g. how competitive or collaborative is the domain). We need to collaborate closely with the interaction desginers as the number and delay of retries is going to affect how the user interface is designed. 

If the server is highly available and we don't expect frequent connection problems we can have a relatively low limit on the maximum number of retries and keep the delay between consecutive attempts short. In this case we probably don't need a graphical representation of the retry process but we do want to notify the user if all of the retry attempts fail.

On the other hand, if we expect long periods of server unavailability (either because of the server itself or limited network connectivity between the client and the server), we should use a larger maximum number of attempts and also longer delays. In this case it is more likely that there will be several concurrent retry processes happening at any given time (e.g. when the client device lost connection to the network). In this case it might be a good idea to visualise the pending requests to keep the user in the loop.

### There is no free lunch

Retrying is all good but remember those multiple Porches on the driveway? Avoiding retries to cause unintended side effects like ordering that car twice lies in a concept called idempotency, both hard to spell and to get right :)

We'll sort that out next.
