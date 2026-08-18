# CSS Animation

📖 **Deeper dive reading**: [MDN Animation](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)

Using CSS to animate your components is an easy way to make your application feel alive and interactive. You create CSS animations using the `animation` properties and defining `keyframes` for what the element should look like at different times in the animation. Let's walk through an example.

We have a paragraph of centered text and we want it to zoom in until its size is 20% of the view height.

```css
p {
  text-align: center;
  font-size: 20vh;
}
```

To make this happen we specify that we are animating the selected elements by adding the `animation-name` property with a value of demo. This name refers to the name of the `keyframes` that we will specify in a minute. The keyframes tell what CSS properites should be applied at different key points in the animation sequence. We also add an `animation-duration` property in order to specify that the animation should last for three seconds.

```css
p {
  text-align: center;
  font-size: 20vh;

  animation-name: demo;
  animation-duration: 3s;
  animation-iteration-count: infinite;
}
```

Now we are ready to create the keyframes. We don't have to define what happens at every millisecond of the animation. Instead we only need to define the key points, and CSS will generate a smooth transition to move from one keyframe to another. In our case we simply want to start with text that is invisible and have it zoom into the full final size. We can do this with two frames that are designated with the keywords `from` and `to`.

```css
@keyframes demo {
  from {
    font-size: 0vh;
  }

  to {
    font-size: 30vh;
  }
}
```

That's everything we need to do. However, let's make one more addition. It would look better if towards the end, the paragraph bounced out a little bigger than its final size. We can accommodate that by adding another key frame that happens 95 percent through the animation.

```css
@keyframes demo {
  from {
    font-size: 0vh;
  }

  95% {
    font-size: 28vh;
  }

  to {
    font-size: 30vh;
  }
}
```


```masteryls
{"id":"37433cdd-9dd1-4009-857a-f36bd4c97ab6", "title":"Animation demo", "type":"ai-web-page", "allowAiPrompt":false, "syncGrade":false, "autoGrade":false, "gradingCriteria":"Animation grows and then shrinks back to the original size",  "height":100 }
Modify the animation so that it grows out and then shrinks back.
~~~html
<p>Animate</p>
<style>
p {
  text-align: center;
  font-size: 20vh;

  animation-name: demo;
  animation-duration: 3s;
  animation-iteration-count: infinite;
}
@keyframes demo {
  from {
    font-size: 0vh;
  }

  95% {
    font-size: 28vh;
  }

  to {
    font-size: 30vh;
  }
}
</style>
~~~
```


```masteryls
{"id":"c7c8584b-11a9-424e-89cb-c8adfb13e2b6", "title":"Animations", "type":"essay", "syncGrade":false, "autoGrade":false }
Explain how animations work in CSS.
```


## Complex example

Animation is not just for pushing buttons or making text float around. Here is an example of animating a watch using only HTML and CSS.


```masteryls
{"id":"a8b4122a-c249-4f5c-a35d-3107fc95715a", "title":"Animated watch", "type":"ai-web-page", "allowAiPrompt":false, "syncGrade":false, "autoGrade":false, "gradingCriteria":"Second hand runs backwards", "height":500, "file":"watch.html" }
See if you can make the second hand run backwards.

```


