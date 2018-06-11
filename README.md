# EndToEndReliability


## Iteration 1 - The problem


### Data going from the client to the server can get lost
  
* Explain failure modes/effects
* Call failed but data isn't lost
* Call failed and data is lost
* Ergo, a non-success http response means that you don't know what happened to your data
* Even not losing data might be an issue since the client doesn't know that it was stored?


### I get it, my data might be lost, is that a problem?
   
* What's the repercussion of the failure?
* It depends on the business case
* Some scenarios like charging credit cards cause customers to be reluctant to "try again" being afraid to be double charged
   
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
