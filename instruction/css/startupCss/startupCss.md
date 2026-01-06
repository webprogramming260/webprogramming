# Startup CSS

![Overview](../../technologies.png)

## Prerequisites

Before you start work on this deliverable make sure you have read all of the proceeding instruction topics and have completed all of the dependant exercises (topics marked with a ☑). This includes:

- [CSS introduction](../introduction/introduction.md)
- [Selectors](../selectors/selectors.md)
- [Declarations](../declarations/declarations.md)
- [Fonts](../fonts/fonts.md)
- [Animation](../animation/animation.md)
- ☑ [CSS practice](../practice/practice.md)
- [Responsive design](../responsive/responsive.md)
  - [Grid](../grid/grid.md)
  - ☑ [Flex](../flexbox/flexbox.md)
- [Debugging CSS](../debuggingCss/debuggingCss.md)
- ☑ [CSS frameworks](../frameworks/frameworks.md)
- [Simon CSS](../../simon/simonCss/simonCss.md)
- 🎥 [Simon CSS Video](https://youtu.be/N7DVKsvUJgM)

Failing to do this will likely slow you down as you will not have the required knowledge to complete the deliverable.

## Getting started

Now that you have learned the basics of CSS, is time to style your startup application. The application doesn't have to do anything, but it should appear basically like what you expect your final application to look like. This includes styling of placeholder data that you expect to get from the user logging in, application data, and webSocket data. In the next deliverable you will add JavaScript to make your application functional.

You must use the same startup GitHub repository that you created for the previous deliverable. Update the notes.md file with things that you learn as you work on your startup. As you make changes to your CSS commit those changes and push them to GitHub. Make sure you have enough commits that you can demonstrate your ownership of the code and protect yourself from loss. Usually this will mean at least ten commits, but in reality you may have many more than that. Failing to fully document your work may result in the rejection of your submission.

Remember to use the `Live Server VS Code extension` to see what your code looks like in the browser. Also use the browser's debugger window to debug your CSS.

Once you have developed your application to where you want it, you need to release it to your production environment. Use the `deployFiles.sh` script from the [Simon CSS repository](https://github.com/webprogramming260/simon-css/blob/main/deployFiles.sh) to deploy your application. Make sure you specify `startup` for the service parameter (`-s`)

```sh
./deployFiles.sh -k <yourpemkey> -h <yourdomain> -s startup
```

For example,

```sh
./deployFiles.sh -k ~/keys/production.pem -h yourdomain.click -s startup
```

Doing this will make this deliverable of your startup available from `https://startup.yourdomainname`.

## 🚀 Deliverable

1. Review and deploy Simon CSS
   1. Clone the Simon CSS repository to your development environment.
   1. Open the project in VS Code and examine the application's use of CSS.
   1. Execute in your development environment using the VS Code Live Server extension.
   1. Debug using the browser's dev tools to examine the styling of the CSS in the Elements tab.
   1. Deploy to your production environment using the deployment script so that it is available with your domain's `simon` subdomain.
1. Create the CSS deliverable of your startup application. Make sure your name is displayed in the application and that there is a link to your GitHub repository.
1. Periodically commit and push your code to GitHub.
1. Periodically update your startup repository's notes.md file to reflect what you have learned and want to remember.
1. Push your final version of your project to GitHub.
1. Deploy your startup application to your production environment (your server).
1. Make sure your application is available from your production environment.
1. Upload the URL to your startup application to the Canvas assignment.

## Grading Rubric

- **Prerequisite**: Simon CSS deployed to your production environment
- **Prerequisite**: A link to your GitHub startup repository prominently displayed on your application's home page
- **Prerequisite**: Notes in your startup Git repository README.md file documenting what you modified and added with this deliverable. The TAs will only grade things that have been clearly described as being completed. Review the [voter app](https://github.com/webprogramming260/startup-example) as an example.
- **Prerequisite**: Enough Git commits to fully prove your ownership of your code. This usually means dozens of commits spread across multiple days of the deliverable development period. Failure to do this may result in the rejection of your submission.
- Properly styled CSS
  - 10% Visually appealing colors and layout. No overflowing elements.
  - 20% Use of a CSS framework
  - 20% All visual elements styled using CSS
  - 30% Responsive to window resizing using flexbox and/or grid display
  - 10% Use of a imported font
  - 10% Use of different types of selectors including element, class, ID, and pseudo selectors

## Go celebrate

You did it! This is a significant milestone. Time to grab some friends, show them what you did, and celebrate with cookies 🍪.
