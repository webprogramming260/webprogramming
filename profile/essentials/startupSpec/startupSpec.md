# Startup deliverable - specification

![Overview](../../technologies.png)

## Prerequisites

Before you start work on this deliverable make sure you have read all of the proceeding instruction topics and have completed all of the dependant exercises (topics marked with a ☑). This includes:

- ☑ [Course Introduction](/profile/essentials/introduction/introduction.md)
- ☑ [AWS account](/profile/essentials/awsAccount/awsAccount.md)
- [Startup application](/profile/essentials/startup/startup.md)
- ☑ [Demo day submission](/profile/webFrameworks/demoDay/demoDay.md)
- [Let's play Simon](/profile/essentials/simon/simon.md)
- [Git](/profile/essentials/git/git.md)
- ☑ [GitHub](/profile/essentials/gitHub/gitHub.md)

Failing to do this will likely slow you down as you will not have the required knowledge to complete the deliverable.

## Getting started

Your startup application demonstrates your mastery of the instruction presented by this course. Make sure you put significant effort into coming up with a simple yet interesting idea. Your application needs to demonstrate the use of HTML, CSS, JavaScript, calling web services, providing web services, authentication, storing data persistently, and using web sockets for sending realtime data to and from your server.

Create an elevator pitch for your application. Something that would excite an investment firm if you happen to catch a ride up the elevator with one of their representatives. Or maybe just sound cool to your friends if they are your target audience. This should be no more than a paragraph in length.

Then sketch out what the application looks like. You can use a tool like [NinjaMock.com](https://ninjamock.com/) to quickly produce a rough layout. Google docs, or plain old paper works fine too (just take pictures or screenshots for your submission).

![Ninja Mocks](essentialsNinjaMocks.png)

Here is an [example design](https://github.com/webprogramming260/startup-example/blob/main).

## Represent all technologies

The purpose of having you specify how you are going to use the technologies is so that you don't get halfway through the startup and realized you forgot about calling 3rd party service endpoints or how you are going to use websocket. So **1**: make sure you understand at a general level what the technologies are, and **2**: make sure you have a placeholder in every deliverable for the technologies.
Make sure that your specification represents how you will represent all of the class technologies. This includes the following:

- **HTML** - Basic structural and organizational elements
- **CSS** - Styling and animating
- **JavaScript** - Reactivity _(e.g. What happens when a user presses a button)_
- **React** - Reactivity, components, and routing using the React web framework.
- **Web service** - Remote functions that your application calls on your, and someone else's, web server _(e.g. saveScores, getWeather, chatWithFriend)_. You must include **at least one call to a service that you didn't write**. You can view a list of APIs here: [https://github.com/public-apis/public-apis](https://github.com/public-apis/public-apis).

- **Authentication**: An input for your user to create an account and login. You will want to display the user's name after they login.
- **Database data**: A rendering of application data that is stored in the database. For Simon, this is the high scores of all players.
- **WebSocket data**: A rendering of data that is received from your server. This may be realtime data sent from other users (e.g. chat or scoring data), or realtime data that your service is generating (e.g. stock prices or latest high scores). For Simon, this represents every time another user creates or ends a game.

### Example of representing all technologies

Here is an theoretical example of what a voter application might supply in a specification.

- **HTML** - Uses correct HTML structure for application. Two HTML pages. One for login and one for voting. Hyperlinks to choice artifact.
- **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- **JavaScript** - Provides login, choice display, applying votes, display other users votes, backend endpoint calls.
- **React** - Single page application with views componentized and reactive to user's actions.
- **Service** - Backend service with endpoints for:
  - retrieving choices
  - submitting votes
  - retrieving vote status
  - displayed a random dog picture using the https://dog.ceo/api/breeds/image/random service.
- **DB/Login** - Store users, choices, and votes in database. Register and login users. Credentials securely stored in database. Can't vote unless authenticated.
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
- 30% - One or more rough sketches of your application. Images must be embedded in your `README.md`.
