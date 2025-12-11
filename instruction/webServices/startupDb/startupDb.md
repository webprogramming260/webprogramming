# Startup DB

![Overview](../../technologies.png)

## Prerequisites

Before you start work on this deliverable make sure you have read all of the proceeding instruction topics and have completed all of the dependant exercises (topics marked with a ☑). This includes:

- [Uploading files](../uploadingFiles/uploadingFiles.md)
- [Storage services](../storageServices/storageServices.md)
- ☑ [Data services](../dataServices/dataServices.md)
- [Simon DB](../../simon/simonDb/simonDb.md)
- [🎥 MongoDB Atlas setup](https://youtu.be/f75muk9W-Jc)

Failing to do this will likely slow you down as you will not have the required knowledge to complete the deliverable.

## Getting started

Now that you have learned how to use a database and authenticate users, it is time to add the ability to persist data in a database and login to your startup application. The main things you should focus on in this deliverable include connecting to the database, creating endpoints that accept and return data, storing and retrieving data from the database, creating and accepting credentials for your user, validating and properly storing credentials in your database, and restricting functionality based on the user's authorized rights.

You must use the same startup GitHub repository that you created in the earlier instruction. Update the notes.md file with things that you learn as you work on your startup. As you make changes to your HTML, CSS, and JavaScript, commit those changes and push them to GitHub. Make sure you have enough commits that you can demonstrate your ownership of the code and protect yourself from loss. Usually this will mean at least ten commits, but in reality you may have many more than that. Failing to fully document your work may result in the rejection of your submission.

Remember to use the browser's debugger window to debug your frontend HTML, CSS and JavaScript. You can also debug your backend service JavaScript running on Node.js using the built in VS Code Node.js debugger.

Once you have developed your application to where you want it, you need to release it to your production environment. Use the `deployService.sh` script from the [Simon DB repository](https://github.com/webprogramming260/simon-db/blob/main/deployService.sh) and use `startup` for the service parameter (`-s`).

```sh
./deployService.sh -k <yourpemkey> -h <yourdomain> -s startup
```

For example,

```sh
./deployService.sh -k ~/keys/production.pem -h yourdomain.click -s startup
```

Doing this will make this deliverable of your startup available from `https://startup.yourdomainname`.

## 🚀 Deliverable

1. Review and deploy Simon DB
   1. Clone the Simon DB repository to your development environment.
   1. Run `npm install` in root of the project.
   1. Open the project in VS Code and examine the application's use of JavaScript to support database storage and user authentication.
   1. Create and configure the `dbConfig.json` file with your MongoDB credentials.
   1. Execute in your development environment by debugging the application using VS Code's Node.js debugger (press F5 while viewing index.js). Set breakpoints in VS Code and step through the backend JavaScript related to login interactions.
   1. Open your browser to https://localhost:3000 and use the browser's dev tools to step through the frontend JavaScript using the Source tab.
   1. Deploy to your production environment using the deployment script so that it is available with your domain's `simon` subdomain.
1. Add code for connecting to the database
1. Persist application data in MongoDB instead of temporarily storing it in memory on your backend.
1. Debug your application using VS Code's Node debugger and the browser's dev tools, in your development environment to verify it is working correctly.
1. Periodically commit and push your code to GitHub.
1. Periodically update your startup repository's notes.md file to reflect what you have learned and want to remember.
1. Push your final version of your project to GitHub.
1. Deploy your startup application to your production environment (your server).
1. Make sure your application is available from your production environment.
1. Upload the URL to your startup application to the Canvas assignment.

## Grading Rubric

- **Prerequisite**: Simon DB deployed to your production environment with your dbConfig.json credentials
- **Prerequisite**: A link to your GitHub startup repository prominently displayed on your application's home page
- **Prerequisite**: Notes in your startup Git repository README.md file documenting what you modified and added with this deliverable. The TAs will only grade things that have been clearly described as being completed. Review the [voter app](https://github.com/webprogramming260/startup-example) as an example.
- **Prerequisite**: Enough Git commits to fully prove your ownership of your code. This usually means dozens of commits spread across multiple days of the deliverable development period. Failure to do this may result in the rejection of your submission.
- Application authentication and authorization
  - 50% - Stores application data in MongoDB
  - 50% - Stores and retrieves credentials in MongoDB

## Go celebrate

You did it! This is a significant milestone. Time to grab some friends, show them what you did, and celebrate by making some pancakes 🥞.
