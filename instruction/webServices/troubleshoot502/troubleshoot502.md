# Troubleshoot a 502 Status Code

Deeper dive reading: [Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

You may encounter a `502` status code when you deploy either Simon or your Startup to your production environment. This error means that Caddy cannot load your HTTP service. This happens when your code is missing files, crashes when it is running, or doesn't start correctly. That causing PM2 to stop running your service.

In order to understand a `502` status code, you will need to ssh into your production environment and preform some troubleshooting. Below are some steps to get you started.

> [!IMPORTANT]
>
> Before you try and debug a 502 problem with your startup, make sure that you can run Simon and your startup in your development environment. Then make sure you can deploy Simon to your production environment. If Simon deploys, but your startup does not, then determine what is different between the two.

## General steps

1. SSH into your production environment in a bash terminal using the command:

   ```sh
   ssh -i <path to your pem file> ubuntu@<your domain name>
   ```

   For example:

   ```sh
   ssh -i ~/Desktop/CS260/production.pem ubuntu@cs260.click
   ```

1. Navigate to the affected service directory ex. `cd services/<startup or simon>`

1. List out the files inside your directory using `ls`. Check to see if all files that need to be there are present.

1. Check to see that your javascript file containing the code to start your node server is named `index.js` (needs to be all lowercase).

1. Check to see that your file structure is correct. For example, that you have a node_modules directory, a public folder with frontend code inside, server files in project root directory, and the proper configuration files.

1. Check to see if the port listed inside of `index.js` is correct for the service. (Port 3000 for Simon, Port 4000 for your Startup)

If you edited anything to fix the problem in your production environment, run `pm2 restart <service>` to restart your service and check your browser. Make sure you replace `<service>` with the service you are trying to fix. For example, `pm2 restart startup`. If your web service appears, you are finished.

## Additional steps

Sometimes the above steps may not be enough to fix the server error. If this is the case follow these additional steps:

1. While still in your production environment and in the affected service directory, run `node index.js`. For example:

   ```sh
   cd ~/services/startup
   node index.js
   ```

1. If an error message appears in the terminal then read it carefully and fix the problem.

   - If a node module is missing, you need to install the module (e.g. `npm install <module>`) in your development environment and redeploy.
   - If a file is missing, or a file path is incorrect, move the file to the proper location / fix the file path in your development environment and redeploy.

1. If no error message appears then you can verify that the service is reachable from your browser. If that works then press `ctrl c` to stop the node server from running. This means that the problem is with how PM2 is configured to run your service. Check to see what PM2 is running with the command `pm2 describe <service>`. For example:

   ```sh
   pm2 describe startup
    Describing process with id 1 - name startup
   ┌───────────────────┬──────────────────────────────────────────┐
   │ status            │ errored                                  │
   │ name              │ startup                                  │
   │ namespace         │ default                                  │
   │ version           │ N/A                                      │
   │ restarts          │ 67                                       │
   │ uptime            │ 7D                                       │
   │ script path       │ /home/ubuntu/services/startup/index.js   │
   │ script args       │ 4000 startup                             │
   │ error log path    │ /home/ubuntu/.pm2/logs/startup-error.log │
   │ out log path      │ /home/ubuntu/.pm2/logs/startup-out.log   │
   │ pid path          │ /home/ubuntu/.pm2/pids/startup-1.pid     │
   │ interpreter       │ node                                     │
   │ interpreter args  │ N/A                                      │
   │ script id         │ 1                                        │
   │ exec cwd          │ /home/ubuntu/services/startup            │
   │ exec mode         │ fork_mode                                │
   │ node.js version   │ 18.16.0                                  │
   │ node env          │ N/A                                      │
   │ watch & reload    │ ✘                                        │
   │ unstable restarts │ 0                                        │
   │ created at        │ 2024-04-15T20:34:56.546Z                 │
   └───────────────────┴──────────────────────────────────────────┘
   ```

   This should give you some indication of why PM2 is not starting your service correctly. For example, the status is `errored` and it is expecting to find the main JavaScript file in `services/startup/index.js` running on port 4000. Check that all of those assumptions are true.

After fixing the problem in your development environment and redeploying, check to see if the service comes up. If it doesn't then repeat the steps and see if there is another error.

While these steps should resolve most issues, it may not resolve every issue. If after preforming these troubleshooting steps you are still seeing a 502 status code, reach out to the TAs or professor for help.

> [!IMPORTANT]
>
> Fixing a problem on your production server is only a temporary solution. You need to fix it in your project so that it deploys correctly the next time. Usually this means that you don't have not configured your backend service correct. For example, you don't have a `package.json` in the your **service** directory of your code, then you need to add that to your project and redeploy with the correct structure.

## Common issues for each deliverable

### Service

- Incorrect file structure
- Incorrect file/folder names
- Missing a `package.json` NPM configuration file in your project `service` directory
- Incorrect port listed in `index.js`
- Missing node modules: express, cookie-parser\\\*

While in your development enviornment, your directory structure should look similar to what Simon has. Your frontend code should be in the root of your project and your backend code should be in a directory named `service`. Your frontend and your backend are two different applications, and so both should have their own `package.json` files that configure their dependencies.

The is the project structure you code should have in your deployment environment.

```sh
.
├── deployService.sh
├── index.html       // Frontend application code
├── index.jsx
├── package.json     // Frontend NPM package configuration
├── public
│   └── *            // Images and other static files your frontend uses
├── src
│   └── *            // Frontend React source code files
├── service          // Backend service code
│   ├── index.js
│   └── package.json // backend NPM package configuration
└── vite.config.js   // Configuration to route api calls to backend during development
```

This is the structure you application will have once it is bundled and deployed to your production environment.

```sh
.
├── index.js       // Backend service code
├── package.json
├── node_modules   // Backend module dependencies
└── public
    ├── index.html // Frontend application
    └── assets     // Frontend bundled code
```

### Login/DB

- Missing `dbConfig.json` file (file not imported correctly or not located with all of the other server files)
- Missing connection to MongoDB due to IP rules not being set to `allow access from anywhere`
- Missing node modules: bcryptjs, uuid, mongodb, express, cookie-parser

### Websocket

- Missing `peerProxy.js` file (if using a separate file for backend websocket)
- Incorrect path to file location of `peerProxy.js`
- Missing node modules: ws, bcryptjs, uuid, mongodb, express, cookie-parser
