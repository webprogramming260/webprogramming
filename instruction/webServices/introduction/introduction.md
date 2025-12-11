# Web services introduction

Up to this point, your entire application is loaded from your web server and runs on the user's browser. It starts when the browser requests the `index.html` file from the web server. The `index.html`, in turn, references other HTML, CSS, JavaScript, or image files. All of these files, that are running on the browser, comprise the `frontend` of your application.

Notice that when the frontend requests the application files from the web server it is using the HTTPS protocol. All web programming requests between devices use HTTPS to exchange data.

![Frontend](frontEnd.png)

From our frontend JavaScript we can make requests to external services running anywhere in the world. This allows us to get external data, such as an inspirational quote, that we then inject into the DOM for the user to read. To make a web service request, we supply the URL of the web service to the `fetch` function that is built into the browser.

![Frontend Fetch](frontEndFetch.png)

The next step in building a full stack web application, is to create our own web service. Our web service will provide the static frontend files along with functions to handle `fetch` requests for things like storing data persistently, providing security, running tasks, executing application logic that you don't want your user to be able to see, and communicating with other users. The functionality provided by your web service represents the `backend` of your application.

Generally the functions provided by a web service are called `endpoints`, or sometimes APIs. You access the web service endpoints from your frontend JavaScript with the fetch function. In the picture below, the backend web service is not only providing the static files that make up the frontend, but also providing the web service endpoints that the frontend calls to do things like get a user, create a user, or get high scores.

![Backend](backEnd.png)

The backend web service can also use `fetch` to make requests to other web services. For example, in the image below the frontend uses `fetch` to request the user's data from the backend web service. The backend then uses `fetch` to call two other web services, one to get the user's data from the database, and another one to request subway routes that are near the user's home. That data is then combined together by the backend web service and returned to the frontend for display in the browser.

![Backend](backEndFetch.png)

In following instruction we will discuss how to use fetch, HTTP, and URLs, and build a web service using the Node.js application. With all of this in place your application will be a full stack application comprised of both a frontend and a backend.
