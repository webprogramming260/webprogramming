# Demo CSS Tutorial
This tutorial will introduce you to some fun animations you can do with HTML and CSS.

1) Lets start by opening [codepen](https://codepen.io/) and creating a login with your google account.
2) Now add some text to a paragraph tag
```html
<p>
  The Caterpillar and Alice looked at each other for some time in silence: at
  last the Caterpillar took the hookah out of its mouth, and addressed her in a
  languid, sleepy voice.
</p>
```
3) You can change the color of the text by putting in some CSS to change the color for all p tags
```html
p {
  color:red;
}
```
4) But there is a lot more you can do.  Lets get the text to move inside the p styling in the CSS file.  We will define an animation called slidein that scales the margins, width and font-size in our CSS file.
```html
p {
  color:red;
  animation-duration: 3s;
  animation-name: slidein;
  animation-iteration-count: infinite;
}

@keyframes slidein {
  from {
    margin-left: 100%;
    width: 300%;
  }

  75% {
    font-size: 300%;
    margin-left: 25%;
    width: 150%;
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}
```
5) Now lets create a div to hold a box and add it to the bottom of our HTML
```html
<div class="box"></div>
```
6) You wont see anything until you add some CSS to show a box.  It will move up and down depending on how big the text above it is.
```html
.box {
  background-color: rebeccapurple;
  border-radius: 10px;
  width: 100px;
  height: 100px;
}
```
7) Now lets add an animation to the box to rotate it using the anomation defined in rotate.  We can specify the duration of the animation and the state for the animation.  Notice that we are defining a different set of keyframes based on rotation.
```html
.box {
  background-color: rebeccapurple;
  border-radius: 10px;
  width: 100px;
  height: 100px;
  animation-name: rotate;
  animation-duration: 0.7s;
  animation-iteration-count: infinite;
  animation-play-state: running;
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
```
8) This makes me a little dizzy, so lets have the box only spin when we are hovering over it.
```html
.box {
  background-color: rebeccapurple;
  border-radius: 10px;
  width: 100px;
  height: 100px;
  animation-name: rotate;
  animation-duration: 0.7s;
  animation-iteration-count: infinite;
  animation-play-state: paused;
}
.box:hover {
  animation-play-state: running;
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
```   
9) Now add some new tags that we will define the CSS for
```html
<main>
  <article>
    <h1>Hey look, this is only CSS!</h1>
    <h2>
      I didn’t know you could do gradient borders like this. Hover over this element to see the gradient animate!
    </h2>
  </article>
</main>
```
10) Now lets animate the border for the text
```html
/**
 * `@property` is required for the animation to work.
 * Without it, the angle values won’t interpolate properly.
 *
 * @see https://dev.to/afif/we-can-finally-animate-css-gradient-kdk
 */
@property --bg-angle {
  inherits: false;
  initial-value: 0deg;
  syntax: "<angle>";
}

/**
 * To animate the gradient, we set the custom property to 1 full
 * rotation. The animation starts at the default value of `0deg`.
 */
@keyframes spin {
  to {
    --bg-angle: 360deg;
  }
}


article {
  color:white;
  /* add the animation, but pause it by default */
  animation: spin 2.5s infinite linear paused;
  
  /**
   * Using `background-origin` we can create a “border” using two gradients. And to
   * make the gradients better-looking, we use OKLCH.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/background-origin
   * @see https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl
   */
  background:
    /* Background colors don’t work with `background-origin`, so use a gradient. */
    linear-gradient(
        to bottom,
        oklch(0.1 0.2 240 / 0.95),
        oklch(0.1 0.2 240 / 0.95)
      )
      padding-box, /* ends at inner border edges */
    conic-gradient(
        from var(--bg-angle) in oklch,
        oklch(1 0.37 0),
        oklch(1 0.37 60),
        oklch(1 0.37 120),
        oklch(1 0.37 180),
        oklch(1 0.37 240),
        oklch(1 0.37 300),
        oklch(1 0.37 360)
      )
      border-box; /* extends to outer border edges */
  
  /* a clear border lets the background gradient shine through */
  border: 6px solid transparent;

  /* unpause the animation on hover */
  &:hover {
    animation-play-state: running;
  }
}
```
11) Notice that this CSS uses [oklch](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl) to easily select different colors.
