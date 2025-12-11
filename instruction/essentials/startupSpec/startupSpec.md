# Startup deliverable - specification

![Overview](../../technologies.png)

## Prerequisites

Before you start work on this deliverable make sure you have read all of the proceeding instruction topics and have completed all of the dependant exercises (topics marked with a ☑). This includes:

- ☑ [Course Introduction](../introduction/introduction.md)
- ☑ [AWS account](../awsAccount/awsAccount.md)
- [Startup application](../startup/startup.md)
- ☑ [Demo day submission](../../webFrameworks/demoDay/demoDay.md)
- [Let's play Simon](../simon/simon.md)
- [Git](../git/git.md)
- ☑ [GitHub](../gitHub/gitHub.md)

Failing to do this will likely slow you down as you will not have the required knowledge to complete the deliverable.

## Getting started

Your startup application demonstrates your mastery of the instruction presented by this course. Make sure you put significant effort into coming up with a simple yet interesting idea. Your application needs to demonstrate the use of HTML, CSS, JavaScript, calling web services, providing web services, authentication, storing data persistently, and using web sockets for sending realtime data to and from your server.

Create an elevator pitch for your application. Something that would excite an investment firm if you happen to catch a ride up the elevator with one of their representatives. Or maybe just sound cool to your friends if they are your target audience. This should be no more than a paragraph in length.

Then sketch out what the application looks like. You can use a tool like [NinjaMock.com](https://ninjamock.com/) to quickly produce a rough layout. Google docs, or plain old paper works fine too (just take pictures or screenshots for your submission).

![Ninja Mocks](essentialsNinjaMocks.png)

Here is an [example design](https://github.com/webprogramming260/startup-example/blob/main).

## Represent all technologies

The purpose of having you specify how you are going to use the technologies is so that you don't get halfway through the startup and realized you forgot about calling 3rd party service endpoints or how you are going to use websocket. So **1**: make sure you understand at a general level what the technologies are, and **2**: make sure you have a placeholder, or an actual implementation, in every deliverable for the following required technologies.

- **HTML** - Basic structural and organizational elements
- **CSS** - Styling and animating
- **React** - Frontend code to interact with a user, represent functionality with components, and route what is displayed using JavaScript and the React web framework. React helps you to modularize your code into components that represent things like a login form, a picture card, or a interactive part of a game. The routing that React provides changes what is displayed to the user based upon the actions they take. For example, after logging in, React would change the display from the login component, to the game play component.
- **Service** - Backend server functionality for the following:
  - Multiple endpoints (server function calls) that provide functionality necessary to support your application. For example, storing scores, retrieving user preferences, or generating dynamic content.
  - Login, logout, and register user support.
  - At least one call to a third party (e.g. that you didn't write) service endpoint to do something like suggest a color pallette, get a joke, get the weather, or get images. You can view a list of APIs here: [https://github.com/public-apis/public-apis](https://github.com/public-apis/public-apis). You can make most services work, but the easiest ones to use don't require authentication, support CORS, and require HTTPS.
- **Database**: A rendering of application data that is stored in the database. For Simon, this is the high scores of all players.
- **WebSocket**: A rendering of data that is received from your server. This may be **realtime** data sent from other users (e.g. chat or scoring data), or realtime data that your service is generating (e.g. stock prices or latest high scores). For Simon, this represents every time another user creates or ends a game.

### Example of representing all technologies

Here is an theoretical example of what a voter application might supply in a specification.

- **HTML** - Uses correct HTML structure for application. Two HTML pages. One for login and one for voting. Hyperlinks to choice artifact.
- **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- **React** - Provides login, choice display, applying votes, display other users votes, backend endpoint calls. Single page application with component views and reactive to user's actions.
- **Service** - Backend service with endpoints for:
  - retrieving choices
  - submitting votes
  - retrieving vote status
  - displayed a random dog picture using the https://dog.ceo/api/breeds/image/random service.
  - Register, login, and logout users. Credentials securely stored in database. Can't vote unless authenticated.
- **DB** - Store authentication information, users, choices, and votes in database.
- **WebSocket** - As each user votes, their votes are broadcast to all other users.

## Using Markdown

Take some time to properly learn how to use Markdown in your `README.md` and `notes.md` files. Read the [GitHub documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) for examples on how to use Markdown. Refer to the [example design](https://github.com/webprogramming260/startup-example/blob/main) to see how to embed images. Make sure your images are in a format that browsers natively support such as JPG, GIF, or PNG.

## 🚀 Deliverable

Update the `README.md` file for your startup GitHub repository that you created in the [earlier instruction](../gitHub/gitHub.md) to include your startup specification. This should include an elevator pitch, key features, a description of how you will use each technology, and design images.

You only need to provide the specification for this deliverable. Do not include information about future deliverables.

Make sure you push your changes to the file so that it can be reviewed.

Submit the URL for your GitHub startup repository to the Canvas assignment.

## Grading Rubric

- 10% - Proper use of Markdown in `README.md`
- 20% - A concise and compelling elevator pitch in your `README.md`
- 10% - Description of key features in your `README.md`
- 30% - Description of how you will use each technology
  - **HTML** - Basic structural and organizational elements.
  - **CSS** - Styling and animating.
  - **React** - Componentization, routing, and user reactivity using the React framework and JavaScript.
  - **Web service** - Endpoints provided by your backend service that support authentication and application specific functionality.
  - **Database**: Store authentication and application data.
  - **WebSocket**: Realtime information pushed from your backend to your frontend.
- 30% - One or more rough sketches of your application. Images must be embedded in your `README.md`.
