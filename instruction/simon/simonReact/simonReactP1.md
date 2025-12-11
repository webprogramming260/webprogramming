# Simon React Phase 1: Routing

![Simon](../simon.png)

[🎥 Video tutorial](https://youtu.be/-Gv27DPUPbQ)

This deliverable demonstrates using [React](https://reactjs.org/) as a web framework, and Vite as your frontend tooling. This helps with tasks such as building modular components, providing reactive UI elements, supporting sessions, lazy loading, and reducing (minifying) the size of your application.

As part of the move to React, we convert Simon from a **multi-page application** (MPA) to a **single-page application** (SPA). In a single-page application, the browser only loads a single HTML file (index.html), and then we use JavaScript to interactively change the rendered content and components. This is a significant architectural shift to the application and will require you to reorganize your code to fit the single-page, component driven, model.

We are going to move to React in two phases.

1. **Phase 1**: The first phase will covert the Simon HTML/CSS code into a modern web application using Vite and React. This will introduce routing, modularize the code, and remove redundancy.
1. **Phase 2**: The second phase will introduce the JavaScript necessary to make Simon interactive and functionally complete.

Unlike the work you do with other technologies for Simon, there is not a repository for this phase. Instead you use the [Simon CSS repository](https://github.com/webprogramming260/simon-css) as your starting place. You then complete all of the steps given below and deploy the result to your simon production environment (simon.yourdomain).

## Porting process steps

This section discusses the general steps taken to convert the Simon application from a simple HTML/CSS application to a React application. You will need to take similar steps for your startup project, and so it is important to understand what is happening at each step of the conversion process.

The process of converting code from one way of doing things to different way is called **porting**. Porting is a very common software engineering task. Completing this phase will make you more competent with the porting process.

Porting your application to React will require significant modifications to your frontend code. Make sure you reserve enough time to successfully complete this work.

You are required to follow the process defined below with the Simon demonstration application so that you will be successful with porting your startup application to React. Start by cloning the Simon CSS repo to your development environment.

```sh
git clone https://github.com/webprogramming260/simon-css.git simon-react-p1

cd simon-react-p1
```

We then introduce `vite`, our frontend tooling. After that, the HTML and CSS is reworked into React components. The React components are then reworked to take advantage of functionality that React provides. This includes function style components, modularization, reactive interactions, and a React representation of Bootstrap.

Here is a complete list of all the steps involved to convert Simon to a React application. When you port your startup to React you will want to commit your changes as you complete each step in the process.

1. Install and configure Vite
1. Reorganize the code
1. Convert to React Bootstrap
1. Enable React
1. Create app component
1. Create view components
1. Create the router
1. Convert HTML to React components
1. Replace deployment script

In the next phase of your startup development, we will talk about how to add JavaScript to the application.

## Install and configure Vite

While in the project root directory, setup NPM and install Vite as a development dependency by running:

```sh
npm init -y
npm install vite@latest -D
```

Then open the `package.json` file, found in the root of the project, that was created by the `npm init` command. Within the `package.json` file, locate the `scripts` section. Replace what is found there with commands for running Vite.

```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
```

| Command | Purpose                                                                                                                                                            |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| dev     | Bundles a debugging version of the React application and starts Vite's hot reloading HTTP server that hosts the newly bundled application for development purposes. |
| build   | Bundles a production version of the React application and copies it to the `dist` directory.                                                                       |
| preview | Bundles a production version of the React application and starts Vite's hot reloading HTTP server. This is used to test a production version before deployment.    |

> [!IMPORTANT]
>
> Make sure you add `node_modules` to your `.gitignore` file so that you don't commit the imported NPM code.

## Reorganize the code

The simon-css repository starts with code that is structured like this:

```sh
├─ LICENSE
├─ README.md
├─ about.css
├─ about.html
├─ deployFiles.sh
├─ favicon.ico
├─ index.html
├─ main.css
├─ placeholder.jpg
├─ play.css
├─ play.html
└─ scores.html
```

We want to modify it to match the directory structure that Vite expects.

Create a `public` directory that is going to hold all the application image and sound assets. After we create the folder we move the `placeholder.jpg` and `favicon.ico` files into it.

Next we create a `src` directory where we will put all of the React code. Under the `src` directory we create a folder for each of the view components that represent the major functionality of the Simon application.

Finally rename `main.css` to `app.css` and move it to the `src` directory. This will contain all the styles that are shared across the application.

When we are done it will look like this.

```sh
├─ public                      # Static assets used in the app
│   ├─ favicon.ico
│   └─ placeholder.jpg
└─ src                         # Frontend React code
    ├─ app.css                 # Top level styles
    ├─ about                   # About component
    ├─ login                   # Login component
    ├─ play                    # Game play component
    └─ scores                  # Scores component

```

## Convert to React Bootstrap

There is an NPM package called [React Bootstrap](https://react-bootstrap.github.io/) that wraps the Bootstrap CSS framework in React components. This allows you to treat the Bootstrap widgets, such as Button and Modal, as a React component instead of just imported CSS and JavaScript.

To use the React version of Bootstrap, import the NPM package.

```sh
npm install bootstrap react-bootstrap
```

Now, in the components where you want to refer to the Bootstrap styles, you can import the Bootstrap style sheet from the imported NPM package just like you would other CSS files.

```jsx
import 'bootstrap/dist/css/bootstrap.min.css';
```

To use a React Bootstrap component, you would import and reference the specific component you want to use. Here is an example of using the `Button` component.

```jsx
import Button from 'react-bootstrap/Button';

export function NavButton({ text, url }) {
  const navigate = useNavigate();
  return (
    <Button variant="primary" onClick={() => navigate({ url })}>
      {text}
    </Button>
  );
}
```

For Simon we converted the modal dialog and button implementations to use the React Bootstrap components.

## Enabling React

We now have everything necessary to start using React for the application. To make this happen, we need to install the React components for the basic functionality, DOM manipulation, and request routing to display individual components. React is installed by running the following console command:

```sh
npm install react react-dom react-router-dom
```

### index.html and index.jsx

With React we have a single HTML file that dynamically loads all of the other application components into its DOM using JavaScript. We rename the existing `index.html` to `login.html`, since that is what it really is anyway, and create a new `index.html` that represents the React SPA entry point.

**`index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />

    <title>Simon React</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script type="module" src="/index.jsx"></script>
  </body>
</html>
```

Notice that the div with an ID of `root` is where all the content will be injected. The script reference for `index.jsx` causes the injection of the top level component named `App`. To hook the `index.html` to our top level `App` component, we create the following `index.jsx` file.

**`index.jsx`**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/app';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

Note that both the `index.html` and the `index.jsx` are located in the root of your project.

## Create App component

To begin the transformation to using React components in our application, we create a top-level component, stored in `src/app.jsx`, and add some simple placeholder content that will get replaced later. In order for the styling to show up, we import Bootstrap, and the top level CSS found in `src/app.css`.

**app.jsx**

```jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return <div className="body bg-dark text-light">App will display here</div>;
}
```

Because we don't have a `body` element in our `App` component, we modify the `app.css` so that the selector for the `body` element is changed to a class selector `.body`. This change should look like the following.

**app.css**

```css
.body {
  display: flex;
  flex-direction: column;
  min-width: 375px;
}
```

You should be able to view the results of these changes by running `npm run dev` from the console and pressing the `o` key to open it in the browser. The result won't be very exciting, but this successfully demonstrates the first visible step towards moving to React. When you reach this point with your startup, make sure that you commit your changes.

![First React component](firstReactComponent.png)

To make `app.jsx` represent the actual Simon content, we enhance the `app.jsx` file to contain the header and footer HTML found in each of our previous HTML files, including it in the return value for the `App()` component function. Next, we rename the `class` attribute to be `className` so that it doesn't conflict with the JavaScript `class` keyword. The `className` keyword will get transpiled to valid HTML by our toolchain. When completed, the `App` component should look like this:

**app.jsx**

```jsx
export default function App() {
  return (
    <div className="body bg-dark text-light">
      <header className="container-fluid">
        <nav className="navbar fixed-top navbar-dark">
          <div className="navbar-brand">
            Simon<sup>&reg;</sup>
          </div>
          <menu className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="index.html">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="play.html">
                Play
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="scores.html">
                Scores
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="about.html">
                About
              </a>
            </li>
          </menu>
        </nav>
      </header>

      <main>App components go here</main>

      <footer className="bg-dark text-white-50">
        <div className="container-fluid">
          <span className="text-reset">Author Name(s)</span>
          <a className="text-reset" href="https://github.com/webprogramming260/simon-react">
            Source
          </a>
        </div>
      </footer>
    </div>
  );
}
```

This will display the header, navigation elements, placeholder content, and the footer. When you reach this point with your startup, make sure that you commit your changes.

![App React component](appReactComponent.png)

Our directory structure should look like the following at this point.

```sh
├─ public          # Static assets used in the app
├─ src             # Frontend React code
│    ├─ app.jsx    # React app component
│    └─ app.css    # React app CSS
│    └─ about    
│    └─ login
│    └─ play    
│    └─ scores    
├─ index.html      # App entry HTML
└─ index.jsx       # React entry point

```

## Create view components

We now create React component files `login.jsx`, `play.jsx`, `scores.jsx`, and `about.jsx` to represent each of the application views. To begin with, these are just stubs that we will soon begin populating as we port code from the requisite `.html` files and which we will further develop with javascript functionality in part 2. We place each of the stubbed components in a separate directory (e.g. `src/login/login.jsx`) so that we can keep all of the component files together.

Here is the `login.jsx` stub before any code is converted over. The other components are similar, but simply replace **login** with the appropriate component name.

```jsx
import React from 'react';

export function Login() {
  return (
    <main className="container-fluid bg-secondary text-center">
      <div>login displayed here</div>
    </main>
  );
}
```

The `src` directory structure should look like this once all the view component stubs are created.

```sh
└─ src
    ├─ app.jsx                 # Top level component
    ├─ app.css                 # Top level styles
    ├─ about                   # About component
    │   └─ about.jsx
    ├─ login                   # Login component
    │   └─ login.jsx
    ├─ play                    # Game play component
    │   └─ play.jsx
    └─ scores                  # Scores component
        └─ scores.jsx
```

## Create the router

With `app.jsx` containing the header and footer, and all the application view component stubs created, we can now create the router that will display each component as the navigation UI requests it. The router controls the whole application by determining what component to display based upon what navigation the user chooses.

To implement the router, we import the router component into the `App` component along with all of our view components.

```jsx
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';
import { About } from './about/about';
```

Next we wrap all of the `App` component's previous elements with the `BrowserRouter` component so that the browser router can control links and rendered components for all of its child elements.

```jsx
export default function App() {
  return (
    <BrowserRouter>
      <!-- The previous component elements go here -->
    </BrowserRouter>
  );
}
```

### Navigating routes

We then we replace the `a` elements with the router's `NavLink` component. The anchor element's `href` attribute is replaced with the router's `to` attribute. The `.html` file reference is replaced with a route name. Here is what the conversion for the Play component looks like.

```jsx
<a className="nav-link" href="play.html">Play</a>

// to

<NavLink className='nav-link' to='play'>Play</NavLink>
```

The `NavLink` component prevents the browser's default navigation functionality and instead handles it by replacing the currently displayed component. Once we have converted all the links, the `nav` element's code now looks like the following.

```jsx
<nav className="navbar fixed-top navbar-dark">
  <div className="navbar-brand">
    Simon<sup>&reg;</sup>
  </div>
  <menu className="navbar-nav">
    <li className="nav-item">
      <NavLink className="nav-link" to="">
        Login
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="play">
        Play
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="scores">
        Scores
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="about">
        About
      </NavLink>
    </li>
  </menu>
</nav>
```

### Injecting the routed component

The router definitions are then inserted so that the router knows what component to display for a given path. The router changes the rendered component; it appears in the place of the `Routes` element. The `Routes` element replaces the `main` element in the component HTML.

```jsx
 <main>App components go here</main>

 // to

<Routes>
  <Route path='/' element={<Login />} exact />
  <Route path='/play' element={<Play />} />
  <Route path='/scores' element={<Scores />} />
  <Route path='/about' element={<About />} />
  <Route path='*' element={<NotFound />} />
</Routes>
```

Notice that the `*` (default matcher) was added to handle the case where an unknown path is requested. We handle this by creating a component for a path that is not found. We place this component at the bottom of our `src/app.jsx` file.

```js
function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}
```

At this point the application should support navigating to the different components.

![Routing](routingComponents.gif)

This is a big milestone. If you are following along then congratulations on getting this far. When you are porting your application make sure you commit your changes to Git.

## Converting to React components

The code for each of the HTML pages needs to now be converted to the different React components. Each of the components is a bit different, and so you want to review them to determine what they look like as a React component.

The basic steps for converting the component include the following.

- Copy the `main` element HTML over and put it in the return value of the component. Don't copy the header and footer HTML since they are now represented in `app.jsx`.
- Rename the `class` to `className` so that it doesn't conflict with the JavaScript keyword `class`.
- Move the CSS over to the component directory and use an `import` statement to bring it into the component's `jsx` file.

In order for you to have a feel for how this is done we will demonstrate how this is done with the `Scores` component.

### Convert `Scores` component

Open the `scores.html` file and copy out the **main** element from the HTML. Paste it over the **main** element in the `scores.jsx` file. Rename the `class` attribute to `className`. Move the `scores.css` file to the `src/scores` component directory and import the css into the `scores.jsx` component file.

```jsx
import './scores.css';
```

Then delete the `scores.html` file. When this is all done the scores component should now render the same thing the old CSS deliverable rendered.

![Scores CSS version](scoresCssVersion.png)

### Convert the other components

Using the scores component as an example we convert the login, about, and play components. You can review the resulting code in the simon-react repository to see how that was done.

## Deployment script

Now that we are using Vite to bundle our code we need a different deployment script. Delete the `deployFiles.sh` script and create a new file named `deployReact.sh` with the following contents.

```sh
while getopts k:h:s: flag
do
    case "${flag}" in
        k) key=${OPTARG};;
        h) hostname=${OPTARG};;
        s) service=${OPTARG};;
    esac
done

if [[ -z "$key" || -z "$hostname" || -z "$service" ]]; then
    printf "\nMissing required parameter.\n"
    printf "  syntax: deployReact.sh -k <pem key file> -h <hostname> -s <service>\n\n"
    exit 1
fi

printf "\n----> Deploying React bundle $service to $hostname with $key\n"

# Step 1
printf "\n----> Build the distribution package\n"
rm -rf build
mkdir build
npm install # make sure vite is installed so that we can bundle
npm run build # build the React front end
cp -rf dist/* build # move the React front end to the target distribution

# Step 2
printf "\n----> Clearing out previous distribution on the target\n"
ssh -i "$key" ubuntu@$hostname << ENDSSH
rm -rf services/${service}/public
mkdir -p services/${service}/public
ENDSSH

# Step 3
printf "\n----> Copy the distribution package to the target\n"
scp -r -i "$key" build/* ubuntu@$hostname:services/$service/public

# Step 5
printf "\n----> Removing local copy of the distribution package\n"
rm -rf build
rm -rf dist
```

## Port complete

At this point we are done porting the CSS deliverable to React. The final Simon project structure looks like the following.

```sh
├─ LICENSE
├─ README.md
├─ deployReact.sh              # React specific deployment
├─ index.html                  # Single HTML file for the App
├─ index.jsx                   # Loads the top level component
├─ package.json                # Defines dependent modules
├─ public                      # Static assets used in the app
│   ├─ favicon.ico
│   └─ placeholder.jpg
└─ src                         # Frontend React code
    ├─ app.jsx                 # Top level component
    ├─ app.css
    ├─ about                   # About component
    │   ├─ about.css
    │   └─ about.jsx
    ├─ login                   # Login component
    │   └─ login.jsx
    ├─ play                    # Game play component
    │   ├─ play.jsx
    │   └─ play.css
    └─ scores                  # Scores component
        ├─ scores.css
        └─ scores.jsx
```

Notice how much better structured the code is and how we have leveraged Vite and React, not only to build a reactive SPA, but also to modularize the code.

If you run the code in the debugger by running `npm run dev`, or deploy the code to your production environment using the `deployReact.sh` script, you should see the following.

![CSS Port](cssPort.gif)

## Simon React Phase 1 deliverable

Do the following as part of your mastery demonstration for this phase. This is a prerequisite for your work on the React version of your startup.

1. Clone the [Simon CSS repository](https://github.com/webprogramming260/simon-css) to your development environment.
   ```sh
   git clone https://github.com/webprogramming260/simon-css.git simon-react-p1
   ```
1. Complete all of the steps given above to convert the CSS version over to a basic React version where your HTML and CSS are represented by **React components** and you have enabled **React routing**.
1. Deploy the result to your simon production environment (simon.yourdomain) using the `deployReact.sh` deployment script from the [Simon React repository](https://github.com/webprogramming260/simon-react/blob/main/deployReact.sh).

> [! IMPORTANT]
>
> Do not attempt to port your startup to React until you have completed and deployed your port of Simon to React.
