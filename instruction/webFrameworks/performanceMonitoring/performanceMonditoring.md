# Performance monitoring

The performance of your application plays a huge role in determining user satisfaction. The following statistics show the impact that just one second of delay can make.

![Latency impact](performanceLatencyImpact.jpg)

> **Source**: WPEngine

In order to prevent losing users, you want your application to load in about one second. That means you need consistently measure and improve the responsiveness of your application. The main things you want to monitor include:

1. Browser application latency
1. Network latency
1. Service endpoint latency

For the context of this discussion, latency is defined as the delay that your user experiences before a request is satisfied.

Let's look at each of these performance areas, and then we can suggest some tools for measuring and improving the results.

## Browser application latency

Browser application latency is impacted by the speed of the user's device, the amount of data that needs to be processed, and the time complexity of the processing algorithm.

When a user requests your application in a browser, the browser will request your `index.html` page first. This is followed by requests for any files that `index.html` links, such as JavaScript, CSS, video, and image files. Once your JavaScript is loaded, it will start making requests to services. This includes any endpoints that your provide as well as ones provided by third parties. Each of those requests takes time for the browser to load and render. A page with lots of large images and lots of service calls, will take longer than a page that only loads simple text from a single HTML file.

Likewise, if your JavaScript does significant processing while a page is loading, then your user will notice the resulting latency. You want to make application processing as asynchronous as possible so that it is done in the background without impacting the user experience.

You can reduces the impact of file size, and HTTP requests in general, by doing one or more of the following:

1. Use compression when transferring files over HTTP.
1. Reduce the quality of images and video to the lowest acceptable level.
1. Minify JavaScript and CSS. This removes all whitespace and creates smaller variable names.
1. Use HTTP/2 or HTTP/3 so that your HTTP headers are compressed and the communication protocol is more efficient.

You can also reduce the number of requests you make by combining the responses from multiple endpoint requests into a single request. This eliminates duplicated fields, but also decreases the overhead associated with each request.

## Network latency

You pay a latency price for every network request that you make. For this reason, you want to avoid making unnecessary or large requests.

Network latency is impacted by the amount of data that you send, the amount of data a user can receive per second (this is called bandwidth), and the distance the data has to travel.

If the user has a low bandwidth connection that can only receive data at rates lower than 1 megabit per second, then you need to be very careful to reduce the number of bytes that you send to that user. Global latency is also a problem for users. If your application is hosted in a data center located in San Francisco, and used by someone living in Nairobi, then there will be a additional latency of 100 to 400 milliseconds for each request.

You can mitigate the impact of global latency by hosting your application files in data centers that are close to the users you are trying to serve. Applications that are seeking to reach a global audience will often host their application from dozens of places around the world.

## Service endpoint latency

Service endpoint latency is impacted by the number of request that are made and the amount of time that it takes to process each request.

When a web application makes a request to a service endpoint there is usually some functionality in the application that is blocked until the endpoint returns. For example, if a user requests the scores for a game, the application will delay rendering until those scores are returned.

You want to reduce the latency of your endpoints as much as possible. Ideally you want to keep the endpoint latency to less than 10 milliseconds (ms). This may seem like a very short time, but commonly, an application will make dozens of endpoint requests to render a component. If each of those endpoints take 10 ms, then you are looking at 100 to 200 ms. When you add network latency to the time it takes for the application to process the response, and then add the time it takes for the browser to render, you can easily exceed the desired 1 second load time.

## Performance tools

📖 **Deeper dive reading**: [Chrome performance tools](https://developer.chrome.com/docs/devtools/performance/)

### Chrome network tab

You can see the network requests made by your application and the time necessary for each request, by using the browser's debugging tools. This will show you what files and endpoints are requested and how long they are taking. If you sort by `time` or `size`, it will be clearer what areas need your attention. Make sure you clear your cache before running tests so that you can see what the real latency is and not just the time it takes to load from the browser's cache.

![Performance](../../uxdesign/designPerformanceNetwork.jpg)

### Simulating real users

The network tools in the Chrome debugger also allows you to simulate low bandwidth connections by throttling your network. For example, you can simulate a 3G network connection that you would find on a low end mobile phone.

![Throttle network](webFrameworksThrottleNetwork.jpg)

Throttling while testing is really useful since web developers often have high end computers and significant network bandwidth. That means you are not having the same experience as your users, and you will be surprised when they don't use your application because it is so slow.

### Chrome Lighthouse

You can also use the Chrome debugging Lighthouse tool to run an analysis of your application. This will give you an average performance rating based upon the initial load time, longest content paint, and time before the user can interact with the page.

![Performance](../../uxdesign/designPerformance.jpg)

### Chrome performance tab

When you are ready to dig into your application's frontend performance make sure you experiment with the Chrome debugger's performance tab. This breaks down the details of your application based upon discrete intervals of time so that you can isolate where things are running slow.

![Performance tab](webFrameworksChromePerformanceTab.jpg)

You start profiling the performance by pressing the record button and then interacting with your application. Chrome will record memory usage, screenshots, and timing information. You can then press the stop recording button and review the collected data. For example, the performance data represented in the image above, shows that 56% of the execution time was used in the `button.press` function. If you drill in on the source code for the function you will see exactly which lines of the function were consuming the processing time.

### Global speed tests

You also want to test your application from different locations around the world. There are many online providers that will run these test for you. Here are the results for running a test using [Pingdom.com](https://tools.pingdom.com).

![Pingdom](webFrameworksPingdom.jpg)

You can see that it is correctly suggesting that we enable gz compression on our transmitted data in order to increase performance, and to add headers that will enable caching on the browser.

This tool provided by [DotComTools](https://www.dotcom-tools.com) allows you to run tests from multiple locations at once.

![DotCom Tools](webFrameworksDotComTools.jpg)

Here you can see we perform acceptably from the United States and Europe, but are struggling in Asia. That makes sense considering that our server is located in North Virginia. In order to correct this, we need to use a Content Delivery Network (CDN) with an additional location closer to our target users in China.
