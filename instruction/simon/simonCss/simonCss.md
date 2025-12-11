# Simon CSS

![Simon](../simon.png)

This application deliverable demonstrates the use of basic CSS for styling and a responsive design.

The addition of CSS makes our application visually appealing and adds intuitive user interface elements, but it is still not functional due to the lack of interactivity. We will add that in the next deliverable when we introduce JavaScript.

This deliverable adds a CSS file (`main.css`) that contains CSS for the entire application. Each of the HTML files references the CSS file using the `link` element.

```html
<link rel="stylesheet" href="main.css" />
```

In addition, there are three other CSS files (`about.css`, `scores.css`, `play.css`) that add styling specific to their respective HTML pages. Those HTML pages each reference their particular specific CSS file (in addition to the `main.css` file). For example, `play.html` has this `link` element in its head:

```html
<link rel="stylesheet" href="play.css" />
```

Some things you might want to note include:

- Flex is used to delimit the header, main, and footer elements. This makes them responsive to different screen sizes.
- The use of absolute positioning relative to the parent element for the game controls.
- The selection based on class attributes to style elements.
- The override of Bootstrap in order to keep the menu from changing the flex direction to column on small screens.
- The use of `@media` selectors to hide content when the screen is too small.

As the application gets more complicated we will break up the CSS into individual files that correspond to the component they style.

You can view this application running here: [Example Simon CSS](https://simon-css.cs260.click)

![Simon CSS](simonCss.jpg)

## Study this code

Get familiar with what the example code teaches.

- Clone the repository to your development environment.

  ```sh
  git clone https://github.com/webprogramming260/simon-css.git
  ```

- Review the code and get comfortable with everything it represents.
- View the code in your browser by hosting it using the VS Code Live Server extension.
- Make modifications to the code as desired. Experiment and see what happens.

## Deploy to production

- Deploy to your production environment using the `deployFiles.sh` script found in the [example class application](https://github.com/webprogramming260/simon-css/blob/main/deployFiles.sh). Take some time to understand how it works. This is the same script that you used for the Simon HTML version.

  ```sh
  ./deployFiles.sh -k <yourpemkey> -h <yourdomain> -s simon
  ```

  For example,

  ```sh
  ./deployFiles.sh -k ~/keys/production.pem -h yourdomain.click -s simon
  ```

- Update your `startup` repository notes.md to record what you learned.
- Make sure your project is visible from your production environment (e.g. https://simon.yourdomain.click).
