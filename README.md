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
  
* Failures in the server log of http requests that are making updates 
* Not all failures are visible in the server logs => timeout on the way back to the client
* Do you even have logs? are you checking them?
* Catching and logging http related exceptions in the client
* Sending client side exceptions to things like Raygun
* Happens to all types of web apps , SPA's, webform, mvc
* The client might not be owned by you, eg. API gateway for B2B
all the messy support interactions to deal with that

### So what's next? Retrying? Is it safe to retry? Stay tuned for the next episode...
