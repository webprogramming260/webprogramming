# PM2

When you run a program from the console the program will automatically terminate when you close the console or if the computer restarts. In order to keep programs running after a shutdown you need to register it as a `daemon`. The term daemon comes from the idea of something that is always there working in the background. Hopefully you only have good daemons running in your background.

We want our web services to continue running as a daemon. We would also like a easy way to start and stop our services. That is what [Process Manager 2](https://pm2.keymetrics.io/docs/usage/quick-start/) (PM2) does.

PM2 is already installed on your production server as part of the AWS AMI that you selected when you launched your server. Additionally, the deployment scripts found with the Simon projects automatically modify PM2 to register and restart your web services. That means you should not need to do anything with PM2. However, if you run into problems such as your services are not running, then here are some commands that you might find useful.

Feel free to SSH into your server and try them out. Just make sure that the `simon` and `startup` services are still registered and running correctly when you are done.

| Command                                                    | Purpose                                                         |
| ---------------------------------------------------------- | --------------------------------------------------------------- |
| **pm2 ls**                                                 | List all of the hosted node processes                           |
| **pm2 monit**                                              | Visual monitor                                                  |
| **pm2 start index.js -n simon**                            | Add a new process with an explicit name                         |
| **pm2 start index.js -n startup -- 4000**                  | Add a new process with an explicit name and port parameter      |
| **pm2 stop simon**                                         | Stop a process                                                  |
| **pm2 restart simon**                                      | Restart a process                                               |
| **pm2 delete simon**                                       | Delete a process from being hosted                              |
| **pm2 delete all**                                         | Delete all processes                                            |
| **pm2 save**                                               | Save the current processes across reboot                        |
| **pm2 restart all**                                        | Reload all of the processes                                     |
| **pm2 update**                                             | Reload pm2                                                      |
| **pm2 start env.js --watch --ignore-watch="node_modules"** | Automatically reload service when index.js changes              |
| **pm2 describe simon**                                     | Describe detailed process information                           |
| **pm2 startup**                                            | Displays the command to run to keep PM2 running after a reboot. |
| **pm2 logs simon**                                         | Display process logs                                            |
