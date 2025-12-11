# Juice Shop

This provides a walk through of how to get started with Juice Shop.

## Install

```sh
git clone https://github.com/juice-shop/juice-shop.git --depth 1

cd juice-shop

npm install

npm start

http://localhost:3000
```

## Create an incognito tab

We do this so we can mess around and then throw away our state.

Notice that there is some help that tells you to look for a scoreboard as your first challenge. There is a hint to look in the clientside js.

## The startup tutorial

At the beginning the tutorial tells you to look for a score board. If you grab `main.js` and look at the code there are all sorts of goodies in there. All the tutorial text is there. There is also a section that tells you about all the view paths for that application.

```json
{
    path: "score-board",
    component: tp
},
{
    path: "score-board-legacy",
    component: Er
}
```

These are super valuable since you can't always get to every menu from the UI.

http://localhost:3000/#/score-board

1/168 challenges solved.
After you successfully get the score-board to show up, it is displayed in the hamburger menu from then on.

## Application config

This endpoint found in `main.js` show all of the configuration for the app.

http://localhost:3000/rest/admin/application-configuration

Lots of interesting things in there, like a reference to an easter egg, all of the Google SSO whitelist URLs, all the products, details for the chatbot. If I could change this document i would have a lot of power.

## DOM XSS

Basically you just need to put `<iframe src="javascript:alert(`xss`)">` in the search box. This really isn't much of a hack since it only changes your own browser, but if it is persisted and displayed searches from other users then it would be a persisted XSS and you can steal from other users.

## Bonus payload

very much like DOM XSS, just embedded content in the dom that plays a song.

```
<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/771984076&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
```

## Reflected XSS

Try to get <iframe src="javascript:alert(`xss`)"> to render. The order track result page allows you to supply an `id` param on the url. This gets injected into the DOM.

http://localhost:3000/#/track-result/new?id=%3Ciframe%20src%3D%22javascript:alert(%60xss%60)%22%3E

You might need to reload the page to get it to trigger.

## View basket

Go to local storage and change the basket ID. Refresh the page. You will see someone else's basket.

## Privacy Policy

This is strange. You just read the privacy policy. Hummm.

## Password Strength

Admin email is in the Apple Juice review. `admin@juice-sh.op`. Try to login with a brute force attack. I discovered `admin123`. I changed it to `admin1234`.

## Login Admin

Alternatively you can do a SQL injection to login.

It looks like the login middleware has a possible SQL injection vulnerability.

```js
models.sequelize.query(
  `SELECT * FROM Users WHERE email = '${req.body.email || ''}' AND password = '${security.hash(
    req.body.password || ''
  )}' AND deletedAt IS NULL`,
  { model: UserModel, plain: true }
);
```

Yes it does. Register a new user with `' or 1=1--` as the email address and password `abcde`. Remove the Client side check on the email validation. This will log you in as `admin@juice-sh.op` because the query returns the first user in the database.

## Admin Section

Now that I can auth as an admin I can access `/administration` view. This endpoint was exposed in the `main.js` file. This shows me all the registered users along with their feedback.

## Five-Star Feedback

After logging in as admin and going to the `/administration` view. Delete all the five star feedback.

## Post some feedback in another user's name

In the feedback from, remove the disable flag from the author and change it to something else.

## Register a user as an admin

You can see the API request `/api/Users` being called when you register a new user. Since everything is validated on the frontend you can create users all day long with curl.

What if you add `"role":"admin"` to the request?

```sh
curl -X POST http://localhost:3000/api/Users -d '{"email":"j@j.com","password":"admin","role":"admin"}' -H "Content-Type: application/json"
```

Tada! Oh yeah admin.

## Persistent XSS

Use the add user hack to create a user with a XSS injection that will trigger on the administration page.

```sh
curl -X POST http://localhost:3000/api/Users -d '{"email":"<iframe src=\"javascript:alert(`xss`)\">","password":"admin","role":"admin"}' -H "Content-Type: application/json"
```

## Error Handling

I went to `http://localhost:3000/rest/xxx/` and that generated a 500 response. The error also has the stack in it.

```json
{
  "error": {
    "message": "Unexpected path: /rest/",
    "stack": "Error: Unexpected path: /rest/\n    at /Users/lee/Desktop/demo/juice-shop/build/routes/angular.js:38:18\n    at Layer.handle [as handle_request]..."
  }
}
```

## Zero stars

Go to the customer feedback. Don't give a rating, but fill in everything else. Remove the disabled attribute from the submit button.

Go to `About us` page and see the zero star (null) result.

## 403 endpoint?

The endpoint `http://localhost:3000/#/403` does something very strange. It displays a big red box that says 403. Not sure what this is for.

## Confidential document

If you create an order and look at the order confirmation PDF you will see it is in a directory called `http://localhost:3000/ftp`. That is completely open for public listing.

Check out the `http://localhost:3000/ftp/acquisitions.md`.

There is a reference to this endpoint in the `main.js`.

There are other endpoints that are also interesting.

http://localhost:3000/encryptionkeys

http://localhost:3000/support/logs

http://localhost:3000/api-docs

## Password strength

This is a really good one as the fix does good instruction.
Admin email is found on Apple Juice product review. `admin@juice-sh.op`

## Exposed metrics

It uses Prometheus for monitoring. In the [Prometheus guide](https://prometheus.io/docs/introduction/first_steps/) it describes the `http://localhost:9090/metrics` endpoint. This exposes all of the server metrics (CPU, GC, network, memory)as well as metrics about the challenges. This also partially solves `Access Log`.

## Access log

http://localhost:3000/support/logs as found in `main.js`.

## Bully chatbot

This one is strange. Just put `can i have a coupon` in the chat box until it gives you one.

`o*IVjg+yBo` 10% off.

## Missing encoding

This is just fixing the encoding of the `#` character to be `%23`.

http://localhost:3000/assets/public/images/uploads/%F0%9F%98%BC-%23zatschi-%23whoneedsfourlegs-1572600969477.jpg

## Repetitive registration

create a new user. Put in a password `abcdefg` put in the password a second time until it matches. Go back and change the original one. No error is generated. Which password did it use? Put your password in twice is a bad design. Better to have the reveal password button.

## Crash the server

Go to checkout
change localstorage to make the total -1000
This allows you to checkout with wallet when you have no wallet money
purchase ... crash

## Explore

1. Explore the app
   1. make a map of the website and understand every feature
   1. Know features that require login and ones that don't
   1. Note features that take input
   1. Note features that display user input data
   1. Note features that deal with money
1. Open dev tools
   1. Open Application/localstorage. Nothing here yet
   1. Open Applicaiton/cookies. Nothing here yet
   1. Open Network
      1. api/Quantitys
      1. rest/products/search?q
      1. api/Challenges/?name=Score%20Board
      1. rest/languages
      1. rest/admin/application-configuration
      1. Socket.io used for WebSocket. Pushing simple `2` and `3` back and forth. It also looks like there is some sort of polling going on.
   1. Sources
      1. main.js reveals a lot of views and endpoints we can call.

## Solutions

https://help.owasp-juice.shop/appendix/solutions.html
