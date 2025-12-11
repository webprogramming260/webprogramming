# Progressive web application

> [!IMPORTANT]
>
> The information provided here is meant as extended course content. It will not be covered in class or appear on any test.

📖 **Deeper dive reading**:

- [MDN PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [web.dev PWA](https://web.dev/learn/pwa/)

The idea of creating a single application that works both on desktop and mobile devices is not a new concept. You can trace its origins to Microsoft's introduction of the XMLHttpRequest (XHR) in 1999. XHR allowed web pages to make HTTP requests directly from JavaScript. This evolved into the idea of a web application that could run on any device that supported a web browser. Steve Jobs actually championed the idea of a universal web application when he introduced the iPhone in 2007.

> "you can write amazing Web 2.0 and Ajax apps that look exactly and behave exactly like apps on the iPhone. And these apps can integrate perfectly with iPhone services. And guess what?
> There’s no SDK that you need! You’ve got everything you need if you know how to write apps using the most modern web standards to write amazing apps for the iPhone today.
> So developers, we think we’ve got a very sweet story for you. You can begin building your iPhone apps today"
>
> — Steve Jobs, (**Source**: [2007 MacWorld keynote](https://youtu.be/VQKMoT-6XSg))

Unfortunately for the world, Apple quickly realized the incredibly lucrative market that existed if they created a closed application space that they controlled. And so in the same year that the iPhone was released, the Apple App Store was born, and software companies were forced to pay Apple 30% of all transactions made on the iPhone.

While the tax on app store participation was unfortunate, the focus on device native applications was even worse. Native apps moved the software industry away from the idea of a universal application platform, to one where developers are forced to create completely different design, functionality, and code for each device. One for iPhone, one for Android, one for each game console, one for each TV vendor, one for the desktop, and so forth. While this is great for the employability of software engineers, it is terrible for software companies and users in general.

When companies, such as Microsoft and Google realized the negative impact that native applications were having on the industry, they began to evangelize a return to standard web technologies that would work on any device. They introduced browser APIs, defined standards, and created frameworks that made it easy to build universal web applications. This technology was eventually branded as `Progressive Web Application` or PWA.

## Advantages of PWA

While PWA builds on the standard core of HTML, CSS, and JavaScript, along with the delivery of content and software updates over HTTP, it takes web applications to the next level, by providing the following benefits.

1. **Works offline** - Using the browser's Service Worker API, a PWA can control the caching of files locally on browser and make it so that the application can run when completely disconnected from the internet. This means that your app will still work when networks are spotty, such as while riding the subway, or when your user is rappelling down a back country slot canyon.
1. **Fast mobile installation to home screen** - A user no longer has to navigate an app store to find and download a native application. Instead they click on a single button on their device and the PWA will instantly be placed on their home screen. If the app is designed to function offline, it can incrementally cache the necessary files while the user is actually using the application.
1. **No app store tax** - As companies like [Epic](https://en.wikipedia.org/wiki/Epic_Games_v._Apple) learned through expensive litigation, you must pay if you want to play, in the app store. App stores also use a heavy hand in the submission, approval, and update process. For those companies that are [denied inclusion](https://www.theverge.com/2020/6/16/21293419/hey-apple-rejection-ios-app-store-dhh-gangsters-antitrust) in the app store, there is no recourse. They simply are excluded from that marketplace. PWA technology removes the app store broker from the equation, and allows the software company to deal directly with the consumer.
1. **Instant updates** - When a PWA needs to push out security fixes, or feature updates, it does not need the app store's approval. The user is also relieved from the complicated and annoying process of keeping dozens of app store installed applications updated. Instead they software provider just update by pushing a new version into production. The next time the user accesses the application they will see the changes.
1. **Performance** - Because the PWA completely controls the level of browser caching, it can provide high levels of performance that is not dependent on network connectivity constraints. The application instantly reloads on subsequent visits and all the vital resources are already on the user's device.
1. **Same code base for all devices** - Freed from the overhead of developing and maintaining multiple platforms, software companies can now redeploy their resources to providing functionality that actually benefits the user.
1. **Better SEO score** - Starting in 2018 Google announced that mobile friendly applications, with PWAs specifically recognized, will have a significantly higher placement is Google search results. If your web application is a native app, then its content is completely excluded from search results. This means that if your application is not a PWA, then you will need to spend more on marketing in order to catch up with competitors.

Finally, PWA technology enables small software companies to successfully compete in the mobile market. According to research provided by Statista (2022), mobile devices generate almost 60% of internet traffic. Those numbers are even higher for Africa (75%) and Asia (69%).

![Mobile usage statistics](mobileUsageStatistics.jpg)

> Source: _[statista](https://www.statista.com/statistics/306528/share-of-mobile-internet-traffic-in-global-regions/)_

With a PWA, a small software company can easily reach mobile device customers, and even provide offline web applications where network coverage is spotty or only sometimes available. This is important even for mature markets, such as the United States, where there are still significant portions of the population that do not have reliable broadband access.

![Broadband availability US](broadbandAvailabilityUS.jpg)

> Source _[US Census Bureau](https://www.census.gov/library/visualizations/2018/comm/broadband.html?cid=embedded_infographic)_

## Where PWAs don't make sense

With all of the advantages of PWAs, there are some situations where a native application is necessary.

1. **Apple incompatibility** - While much of PWA technology works fine with iOS and Safari, Apple is slow to give up their strategic economic advantages. Therefore, some technologies do not yet work as well on the iPhone as they do on other devices. For example, iOS does not support standard push notifications. Additionally, you must use Safari in order to install a PWA to the home screen when using an iPhone. Hopefully, in the near future, Apple will give in to increasing community pressure and enable a better experience for their customers by removing these inconvenient incompatibilities.
1. **Advanced device features** - A PWA can access a device's location, storage, haptic feedback, contacts, camera, battery, shortcuts, device orientation, fingerprint sensor, and even Bluetooth through [browser supported APIs](https://developer.mozilla.org/en-US/docs/Web/API). However, if an application requires the use of specific device features such as the flashlight or an atmospheric pressure sensor then you might be forced to build a device native application.

## Example PWAs

There are lots of [examples](https://www.simicart.com/blog/progressive-web-apps-examples/) of companies deploying PWAs. This includes brands such as Uber, Pinterest, Rakuten 24, Debenhams, Spotify, Google, BMW, Starbucks, and Flipboard.

### BMW

The results for moving to PWA are impressive. For example, BMW reported the following results after moving to a PWA:

> - 4X increase in people clicking from BMW.com to a BMW sales site
> - Up to 4X faster site load times
> - 50% growth in mobile users
> - 49% more site visits from search engines
>
> **Source** - [Think With Google](https://www.thinkwithgoogle.com/intl/en-gb/marketing-strategies/app-and-mobile/bmws-journey-fast-smooth-and-reliable-mobile-website/)

![PWA BMW](pwaDemoBmw.jpg)

### Spotify

Spotify decided to move to a PWA in order to avoid Apple's 30% commission. However, they soon discovered additional benefits from their PWA.

> - Free-to-paid conversions increased 26.6% in 2015, 46% in 2019, and 58.4% in 2021
> - 30% increase of monthly active users
> - The number of desktop users rose by 45%
> - 40% increase of average listening hours per month
> - UX research reported a more visually appealing, responsive, and adaptable application

When you visit Spotify on a mobile device you are immediately invited to install the PWA to your home screen.

![Spotify install](pwaSpotifyInstall.jpg)

Once added to the home screen, the PWA acts just like a native device application.

![Spotify app](pwaSpotifyMobileApp.jpg)

Additionally, the PWA makes it so that desktop users can install, and have a native application experience. Here is an example of Spotify installed on a MacBook. Notice the lack of the browser's interface, and the inclusion of Spotify's branding in the operating system's controls.

![Spotify app](pwaSpotifyDesktopApp.jpg)

# Steps to make a PWA

One of the best things about PWA technology is that it doesn't require a significant amount of overhead to make your application a PWA. If you have built your application using responsive design techniques (@media, viewport meta, flex, grid, ...) and you have fallback functionality when disconnected, then you only have to take two additional steps. First, you need to provide a manifest that defines the details for displaying your application. Next, you need to write some JavaScript that implements the service worker API in order to cache files for performance and offline ability.

## Manifest and icons

📖 **Deeper dive reading**: [MDN Web app manifests](https://developer.mozilla.org/en-US/docs/Web/Manifest)

A PWA manifest is a JSON file that by convention is usually named `manifest.json`. You link the manifest to your application by including a reference in your `index.html` file. When the browser sees the manifest link, it recognizes the application as a PWA.

```html
<link rel="manifest" href="manifest.json" />
```

There are a lot of possible settings you can specify in the manifest. This includes properties such as the application's functional categorize (e.g. education, entertainment, travel), how to display the application (e.g. fullscreen, standalone, minimal-ui), scope (where to load the application from), icons, colors, descriptions, and screenshots for installation.

A minimal manifest might look like the following.

```json
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

This manifest specifies some basic branding information that tells the browser how to display the application when creating a home screen icon, and what splash screen to generate as the application starts up.

The icons section contains a variety of icons that the device will select from depending upon the context that the application is used in. In order to get full support for icons on iOS devices you also need to include a `apple-touch-icon` link in your `index.html`.

```html
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
```

## Service workers

📖 **Deeper dive reading**: [MDN Service worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

The final step for converting your application into a progressive web application involves creating a service working by using the [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API). Services workers, while not specific to PWAs, allow a web application to do background processing that is not directly associated with the rendering and interaction of a web application. One of the most common uses for a Service Worker is to enabling the browser caching of files for performance reasons. This also makes it so that the PWA keeps working even when it is disconnected from the internet.

To register a service worker, you call the `navigator.serviceWorker` API with the URL to a JavaScript file containing your service worker code.

```js
navigator.serviceWorker.register('service-worker.js');
```

The browser will then load and execute the service worker JavaScript. This gives the service worker a chance to register for event handling and specify what files the browser should cache for the application.

You can view the state of your application's service worker using the Chrome dev tools and selecting the `Application` tab.

![Spotify service worker](pwaSpotifyServiceWorker.jpg)

The `Application` tab allows you to remove the service worker, install a new version, generate events, and view cached files.

### The service worker lifecycle

When a service worker is first registered, the browser will immediately load it. This causes your application to be cached on the browser so that it can run offline and not have to load over the network on the user's next use. Since the application is served from the browser's cache, a user will not immediately see new application versions as they are deployed. Instead, they are loaded and put in a waiting state. The service worker remains in the waiting state until all of the browser tabs displaying the application are closed. Then, the next time the user opens the application, they will experience the new version.

You can use the Service Worker settings on the `Application` dev tools tab to skip the waiting period and force the new application version to load immediately.

Your application can also detect that a new version is available and then ask the user if they would like to automatically upgrade to the new version. The browser does that by simply refreshing the browser window.

## Experimenting with PWA

If you would like to see a simple PWA in action, you can use `create-react-app` to generate an template PWA application. From your console window run:

```sh
npx create-react-app testpwa --template cra-template-pwa
```

Then open the resulting project found in the `testpwa` directory and modify `index.js` to change `serviceWorkerRegistration.unregister` to `serviceWorkerRegistration.register`. Then build the application with `npm run build` and host the resulting bundled app located in the `build` directory with the VS Code Live Server extension in order to see a minimal working PWA.

## Workbox

📖 **Deeper dive reading**: [Chrome workbox](https://developer.chrome.com/docs/workbox/)

Workbox is an NPM package created by Google for using services workers. The template PWA created `create-react-app`, and the Simon demonstration project, both use workbox to simplify some of the registration, routing, and caching service worker complexities.
