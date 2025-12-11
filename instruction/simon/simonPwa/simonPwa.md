# Simon Progressive Web Application

> [!NOTE]
>
> This deliverable is optional and ungraded. The information provided here is meant as extended course content.

![Simon](../simon.png)

This deliverable demonstrates using Progressive Web Application (PWA) technology to integrate with mobile devices.

To covert the last Simon deliverable to a PWA we need to make three modifications.

1. Update the manifest and icons.
1. Implement and register a service worker. This includes caching the files necessary to run offline.
1. Implement fallback functionality so the application still works when offline.

## Manifest and icons

We want to make sure that Simon has all the necessary icons required by all major devices. To do this we took the original Simon icon and used [Favicon.io](https://favicon.io/favicon-converter/) to create a complete set of icons. We also created a maskable icon using [Maskable.app](https://maskable.app/editor) for devices that manipulate your icon for display with different shapes and sizes. These icons were then added to the `/public` directory, and references were added to both the `index.html` link elements and the `manifest.json` file.

**index.html**

```html
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
```

**manifest.json**

```js
{
  "short_name": "Simon",
  "name": "Simon",
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/maskable_icon.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

## Service worker

In order to get a reasonable service worker implementation we ran `create-react-app` with the `cra-template-pwa` template, and then copied over the `service-worker.js` and `serviceWorkerRegistration.js` files to our Simon project. The registration and service worker code was then stripped down and the necessary Workbox NPM packages installed as follows.

```sh
npm install workbox-core workbox-expiration workbox-precaching workbox-routing workbox-strategies
```

The caching implemented in `service-worker.js` first caches the React generated files, and then explicitly caches the sound and icon files used by Simon. This makes it so that all application files are cached on the browser and available for offline use.

The service worker was then set to register with the browser by calling the register function at the end of the `index.jsx` file.

```js
serviceWorkerRegistration.register();
```

## Offline fallbacks

Previous deliverables of Simon actually implemented fallback functionality for storing the current user and highest scores. However, we needed to make it so that a previously authenticated user could still play when disconnected from the internet. We also needed a default quote to use if we couldn't reach the third party quote endpoint.

### Authentication

To support remembering the previously authenticated user we removed the code found in `app.jsx` that tried to verify authentication on start up. Instead we simply use the presence of a user name in local storage to designate authentication.

When then modified `authenticated.jsx` to remove the user name from local storage when a user logs out.

```jsx
function logout() {
  fetch(`/api/auth/logout`, {
    method: 'delete',
  }).then(() => {
    localStorage.removeItem('userName');
    props.onLogout();
  });
}
```

The server will still check to make sure we have an authenticated user when an attempt to update the latest high score, but these changes make it so you can still play Simon when disconnected if you were previously authenticated.

Finally we disable login and account creation if we are not connected, and display an error instead.

```jsx
async function loginOrCreate(endpoint) {
  try {
    const response = await fetch(endpoint, {
      method: 'post',
      //...
    });
    //...
  } catch {
    setDisplayError(`⚠ It appears that you are currently offline. You can play Simon offline, but you must be initially online to create or login to your account.`);
  }
}
```

![Offline message](serviceWorkerLoginOffline.jpg)

### Default quote

In `about.jsx` we return a default quote if we cannot connect to the third party quote endpoint.

```jsx
fetch('https://api.quotable.io/random')
  .then((response) => response.json())
  .then((data) => {
    this.setState({ quote: data.content, quoteAuthor: data.author });
  })
  .catch(() => {
    // Use offline fallback classic quote
    this.setState({
      quote: `Always bet on JavaScript`,
      quoteAuthor: `Brendan Eich`,
    });
  });
```

These changes, combined with the browser caching of all the Simon files, makes the application work reasonably when offline.

## Deployment and testing

During your examination of `serviceWorkerRegistration.js` you might have noticed that it does not register the service worker unless the application has been built in production mode (e.g. with `npm run build`). That means we need to run a production version of the application in order to see if everything is working correctly. The easiest way to do this is to use `deployReact.sh` to push the application to production.

Once you have the application in production you can use the Chrome debug tools to see that the application is registered and running without error. You can turn off the network for the application by selecting the `Offline` option. You can also see all the files that are cached in the `Cache/Storage/Cached Storage` view. To delete the service worker and all cached files associated with the application use the `Application/Storage/Clear Site Data` option.

![Service Worker Debug](serviceWorkerDebug.gif)

When you are confident about how the PWA is working you can run the `Lighthouse` tool found in the Chrome Dev Tools and see if everything is working up to specification. If it displays all `green` then your application should work well on all devices and should be properly search engine optimized (SEOed)).

**Lighthouse report**

![Lighthouse report](serviceWorkerLighthouseReport.jpg)

### Device testing

As a final test you should manually examine the application using the different responsive views that the Dev Tools provide with the Chrome, Safari, and Firefox browsers. Here is what Simon looks like on the Safari browser emulating an iPhone 6. As you can see it is not rendering properly on a small screen.

![iPhone Safari](deviceTestingSafari.jpg)

## Study this code

Get familiar with what the example code teaches.

- Clone the repository to your development environment.

  ```sh
  git clone https://github.com/webprogramming260/simon-pwa.git
  ```

- Set up your Atlas credentials in a file named `dbConfig.json` that is in the same directory as `database.js`.
- Add `dbConfig.json` to your `.gitignore` file so that it doesn't put your credentials into GitHub accidentally.
- Review the code and get comfortable with everything it represents.
- View the code in your browser by hosting it from a VS Code debug session.
- Make modifications to the code as desired. Experiment and see what happens.
