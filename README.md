# EndToEndReliability


## Iteration 1 - The problem


### Data going from the client to the server can get lost
  
* Explain failure modes/effects
* Call failed but data isn't lost
* Call failed and data is lost
* Ergo, a non-success http response means that you don't know what happened to your data
* Even not losing data might be an issue since the client doesn't know that it was stored?


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
