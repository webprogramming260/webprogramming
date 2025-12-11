# Caddy

![Caddy](caddyLogo.png)

📖 **Recommended reading**: [Getting Started](https://caddyserver.com/docs/getting-started)

![MattHolt](mattHolt.png)

> “Imperfect member of the restored Church of Jesus Christ. Husband. Father. Stepdad.”
>
> — Matt Holt (_Source_: [Twitter](https://twitter.com/mholt6))

Released in 2020, Matt Holt combined the power of building an HTTP server using the [Go programming language](https://go.dev/) with the ease of generating TLS certificates using [LetsEncrypt](https://letsencrypt.org/).

Caddy is a web service that listens for incoming HTTP requests. Caddy then either serves up the requested static files or routes the request to another web service. This ability to route requests is called a `gateway`, or `reverse proxy`, and allows you to expose multiple web services (i.e. your project services) as a single external web service (i.e. Caddy).

For this course, we use Caddy for the following reasons.

- Caddy handles all of the creation and rotation of web certificates. This allows us to easily support HTTPS.
- Caddy serves up all of your static HTML, CSS, and JavaScript files. All of your early application work will be hosted as static files.
- Caddy acts as a gateway for subdomain requests to your Simon and startup application services. For example, when a request is made to `simon.yourdomain` Caddy will proxy the request to the Simon application running with node.js as an internal web service.

![Caddy](webServersCaddy.jpg)

Caddy is preinstalled and configured on your server and so you do not need to do anything specifically with it other than configure your root domain name.

## Important Caddy files

As part of the installation of Caddy we created two links in the Ubuntu user's home directory that point to the key Caddy configuration files. The links were created in the home directory so that you do not have to hunt around your server looking for these files.

- **Configuration file**: `~/Caddyfile`

  Contains the definitions for routing HTTP requests that Caddy receives. This is used to determine the location where static HTML files are loaded from, and also to proxy requests into the services you will create later. Except for when you configure the domain name of your server, you should never have to modify this file manually. However, it is good to know how it works in case things go wrong. You can read about this in the [Caddy Server documentation](https://caddyserver.com/docs/caddyfile).

- **HTML files**: `~/public_html`

  This is the directory of files that Caddy serves up when requests are made to the root or your web server. This is configured in the Caddyfile discussed above. If you actually look at the Caddyfile you will see that the static file server is mapped to `/usr/share/caddy`. That is the location that the file link in the Ubuntu user's home directory, `~/public_html`, is pointing to.

  ```
  :80 {
        root * /usr/share/caddy
        file_server
  }
  ```

  Therefore, according to this configuration, whenever Caddy receives an HTTP request for any domain name on port 80 it will use the path of the request to find a corresponding file in this directory. For example, a request for `http://yourdomainname/index.html` will look for a file named `index.html` in the `public_html` directory.

## Proxy Servers

A **proxy server** acts as an intermediary between a client and a server. It handles requests and responses, often providing benefits like security, anonymity, load balancing, and caching.

There are two main types:

### Forward Proxy

- **Sits in front of the client**
- **Forwards client requests** to external servers
- Used for content filtering, hiding client identity, or bypassing restrictions

### Reverse Proxy

- **Sits in front of the server**
- **Handles incoming client requests** and routes them to internal servers
- Used for load balancing, SSL termination, caching, and hiding backend architecture

### Proxy comparison table

| Feature           | Forward Proxy              | Reverse Proxy              |
| ----------------- | -------------------------- | -------------------------- |
| Placement         | In front of **clients**    | In front of **servers**    |
| Who it hides      | The **client**             | The **server**             |
| Common use        | Anonymity, filtering       | Load balancing, protection |
| Awareness         | Client knows it's using it | Client is unaware          |
| Request direction | Client -> Proxy -> Server  | Client -> Proxy -> Server  |

Both proxies handle **requests and responses**, so the term "reverse" doesn’t refer to data flow but to **reversed roles**.

### Visualizing the Difference

![Proxy servers](proxyServers.png)

These diagrams show that traffic flows the same way, but with the forward proxy the client is proxied. With the reverse proxy the **role of the proxy is reversed** and the server is proxied.
