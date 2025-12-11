# Debugging Node.js

🔑 **Required reading**: [Debugging a Node.js application](https://youtu.be/B0le_Z_2TQY)

📖 **Deeper dive reading**: [Node.js debugging in VS Code](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)

Previously your JavaScript debugging was done by running the `Live Server` VS Code extension and using the browser's debugging tools as it executed in the browser. Now that you are writing JavaScript that runs using Node.js, you need a way to launch and debug your code that runs outside of the browser. One great way to do that is to use the debugging tools built into VS Code. To debug JavaScript in VS Code you first need some JavaScript to debug. Open up VS Code and create a new file named `main.js` and paste the following code into the file.

```js
let x = 1 + 1;

console.log(x);

function double(x) {
  return x * 2;
}

x = double(x);

console.log(x);
```

You can now debug `main.js` in VS Code by executing the `Start Debugging` command by pressing `F5`. The first time you run this, VS Code will ask you what debugger you want to use. Select `Node.js`.

![Debug start](webServicesDebugStart.png)

The code will execute and the debug console window will automatically open to show you the debugger output where you can see the results of the two `console.log` statements found in the code.

![Debug output](webServicesDebugOutput.png)

You can pause execution of the code by setting a breakpoint. Move your cursor over to the far left side of the editor window. As you hover on the left side of the line numbers you will see a red dot appear. Click on the dot to set the breakpoint.

![Debug output](webServicesDebugBreakpoint.png)

Now start the debugger again by pressing `F5`. The code will start running, but pause on the line with the breakpoint. You can then see the values of variables by looking at the variable window on the left, or by hovering your mouse over the variable you would like to inspect.

![Debug pause](webServicesDebugPaused.png)

You can continue execution of the code by pressing `F10` to step to the next line, `F11` to step into a function call, or `F5` to continue running from the current line. When the last line of code executes the debugger will automatically exit and you will need to press `F5` to start it running again. You can stop debugging at any time by pressing `SHIFT-F5`.

Experiment with this simple file until you are comfortable running the debugger, setting breakpoints, and inspecting variables.

## Node --watch

Once you start writing complex web applications you will find yourself making changes in the middle of debugging sessions and you would like to have `node` restart automatically and update the browser as the changes are saved. This seems like a simple thing, but over the course of hundreds of changes, every second you can save really starts to add up.

To accomplish this you can start Node with the `watch` option. This causes Node to watch all your source code files and automatically reload itself if anything changes.

You can experiment with this by starting node with the `--watch` parameter

```sh
node --watch main.js
```

With VS Code you can create a launch configuration that specifies the watch parameter when every you debug with VS Code. In VS Code press `CTRL-SHIFT-P` (on Windows) or `⌘-SHIFT-P` (on Mac) and type the command `Debug: Add configuration`. Select the `Node.js` option. This will create a launch configuration named `.vscode/launch.json`. Modify the configuration so that it includes the `--watch` parameter. This should look something like the following.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "runtimeArgs": ["--watch"],
      "program": "${workspaceFolder}/main.js"
    }
  ]
}
```

Now when you press `F5` to start debugging VS Code will start up `main.js` and automatically restart node each time you modify your code.
