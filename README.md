# EndToEndReliability


## Iteration 1 - The problem


### Data going from the client to the server can get lost

Getting data from the browser to the web-server is exposed to the fallacies of distributed computing. Lots have been written on that topic but in short:

>things can go wrong, horribly wrong 

The request might never reach the server with a http timeout as a result, it might reach the server but something bad might happen before your data is safely stored with a http 500 Internal Server error as a result. It doesn't end there, things might go wrong after data is stored, same 500 will greet the client. Are we done? Nope, something might go wrong on the way back to the client, http timeout again. As you can see lots of things can happen but from a client perspective we can summarize as: 

>any non success status code other than 4XX means that you have no idea what happened to your data, it might be safe or it might not 

From a server perspective can be summarized as:

>you know if data is stored or not but you won't know if the client is aware of the fact that it was successfully stored or not

In essence you can easily get into situations where the client and the server is in disagreement weather data is persisted or not. If we can choose not having lost the data is probably the better alternative but having the client think its data is lost can also lead to problems. We'll talk about the problems next.



### I get it, my data might be lost, is that a problem?

As always, the correct answer is "it depends". If you are building a new social media site you might, at least initially, be OK with losing user's updates from time to time. Some users might be annoyed by this but no big deal.

If, on the other hand, you are processing credit card payments and your site stops responding in the middle of the payment process users might be a little bit reluctant to just open a new browser tab and try again. Everybody loves Porsche but having two of them delivered to your driveway might a bit too much for your bank account.

   
### Ok, I get that this is a problem, how do I find out if I'm affected?
  
Monitoring web server logs for failures related to http requests modifying data is a good start. Http 4XX or 5XX errors related to PUT, POST, DELETE indicate that there might be issues. 

Logs need to be configured and monitored at a regular basis. Certain web servers like IIS come with logging configured out-of-the-box but when using a console application to host your web api you need to take care of this yourself.

The server won't be able to catch all the issues, though. Problems with the response on the way back to the client will not be visible in the server logs and need to caught by the client instead.

Having logs on the client side is only useful if they can be viewed so sending them to a centralized place for analysis is essential. There are plenty of tools, like Raygun, AppInsights and others, available to make this easy.

While we only talked about browser to web server scenarious so far, all applications using http like web apps, SPAs, MVC are exposed. It doesn't even have to be a web app, a smart client calling a web api, B2B integrations over http, etc would be exposed in a similar way. In those scenarios you might not even be in control over the client which further complicates things.  

### So what's next? Retrying? Is it safe to retry? Stay tuned for the next episode...
