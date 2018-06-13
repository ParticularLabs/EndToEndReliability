# EndToEndReliability


## Iteration 1 - The problem


### Data going from the client to the server can get lost
  
* Explain failure modes/effects
* Call failed but data isn't lost
* Call failed but data is lost
* Ergo; a non success http response means that you don't know what happened to your data
* Even not losing data might be an issue since the client doesn't know that is was stored?


### I get it, my data might be lost, is that a problem?
   
* What's the repercussion of the failure?
* It Depends on the business case
* Some scenarios like charging credit cards cause customers to be reluctant to "try again" being afraid to be double charged and 
   
### Ok, I get that this is a problem, how to find out that I'm affected?
  
 
Monitoring web server logs for failures related to http requests modifying data. Any 4xx or 5xx errors related to PUT, POST, DELETE requests indicate that probably such issue occurred in the application. 

Not every failure will be visible in the web server logs. Lost responses from web server to the client will not be logged. Lack of errors in the log does not mean that such problems never took place. Due to that exceptions should be also logged on the client side. 

Logs need to be configured and looked at regular basis. Certain web servers like IIS have logging configured but using console applications to host your web api might not.

Having logs on the client side is only useful if they can be viewed. Sending it to some centralized place allowing for analysis is essential.
The issue of web reliability happen in every application that uses http requests like web apps, SPA's, MVC but also when calling web api etc. This issue is also present in integration scenarios when a client is not owned by you, and simply calling http api.  


### So what's next? Retrying? Is it safe to retry? Stay tuned for the next episode...
