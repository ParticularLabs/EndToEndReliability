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
  
Monitoring web server logs for failures related to http requests modifying data is a good start. Http 4XX or 5XX errors related to PUT, POST, DELETE indicates that there might that there might be issues. 

Logs need to be configured and looked at regular basis. Certain web servers like IIS have logging configured but using console applications to host your web api might not.

The server won't be able to catch all issue though, problems with the response on the way back to the client will not be visible in the server logs and needs to caught by the client instead.

Having logs on the client side is only useful if they can be viewed so sending them to a centralized place for analysis is essential. There are plenty of tools like Raygun, AppInsights etc available to make this easy.

While we only talked about browser to web server scenarious so far, all applications using http like web apps, SPA's, MVC are exposed. It doesn't even have to be a web app, a smart client calling a web api, B2B integrations over http, etc would be exposed in a similar way. In those scenarios you might not even be in control over the client which further complicates things.  

### So what's next? Retrying? Is it safe to retry? Stay tuned for the next episode...
