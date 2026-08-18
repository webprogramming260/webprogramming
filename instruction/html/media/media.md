# HTML media elements

The HTML elements that represent media include `img`, `audio`, `video`, `svg`, and `canvas`. The `img`, `audio`, and `video` elements are all simple references to an external file, but `svg` and `canvas` both contain the code to render a visual image that can even be animated.

## External media

The media tags that reference external media all take a URL as an attribute. The path represented by the URL can either be a relative path or full path. A full path includes the protocol, domain name, and path to the file.

```html
https://images.pexels.com/photos/164170/pexels-photo-164170.jpeg
```

A relative path references a file that is served from the same location as the HTML page rendering the element. You want to make the path as relative as possible so that you can move your code around without having to actually adjust all of the external page references. For example, if your HTML page is located in a directory with a subdirectory named `images` that contains a file named `photo.jpg` you would use a relative path as follows.

```html
images/photo.jpg
```

### Image

To include an image in your content you use the `img` element and specify the `src` attribute with the URL to the source image.
In order to support accessibility, you should also include an `alt` attribute that describes the image. A full img element would look like the following.

```html
<img alt="mountain landscape" src="https://images.pexels.com/photos/164170/pexels-photo-164170.jpeg" />
```

![mountain landscape](htmlImage.jpg)

### Audio

To include an audio file in your content you use the `audio` element and specify the `src` attribute with the URL to the source audio file. You can include the `controls` attribute if you want the user to be able to control the audio playback. If you do not display the controls then there is no visual representation of the audio in the rendered page. The `autoplay` attribute starts the audio playing as soon as the audio file is loaded, and the `loop` attribute keeps it playing over and over.

> [!NOTE]
>
> Automatically playing audio is strongly discouraged unless you provide a way for the user to opt-in to that behavior.

```html
<audio controls src="testAudio.mp3"></audio>
```

```masteryls
{"id":"bec015a0-f052-489a-b45d-3d0e1960deb2", "title":"Web page", "type":"web-page", "height":50}
<audio controls src="htmlAudio.mp3"></audio>
```



### Video

To include a video in your content you use the `video` element and specify the `src` attribute with the URL to the source video. Like the audio element you can include the `controls` or `autoplay` attributes.

> [!NOTE]
>
> You may need to include the `crossorigin="anonymous"` attribute if you are requesting files from a different domain than the one serving your content.

```html
<video controls width="300" crossorigin="anonymous">
  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
</video>
```

![HTML video](htmlVideoImg.jpg)

## Internal media

The internal media elements `svg` and `canvas` allow you to actually create images directly within your HTML.

### Scalable Vector Graphics (SVG)

SVG is an extremely powerful and widely supported way to render graphics inline in your HTML. An example SVG graphic that draws a black border and a red circle looks like this:

```html
<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" stroke="red" fill="red" style="border: 1px solid #000000">
  <circle cx="150" cy="100" r="50" />
</svg>
```

![SVG demo](htmlSvg.jpg)

When combined with JavaScript and CSS you can produce some amazing visualizations.


```masteryls
{"id":"531a1f8a-ab7e-4455-9625-8476ed004876", "title":"Web page", "type":"web-page", "height":300, "file":"svgDemo.html"}
```


> _Source: [CodePen](https://codepen.io/leesjensen/pen/mdKjMLY)_

Consult the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/SVG) if you are interested in learning more about SVG.

### Canvas

The `canvas` element was introduced to HTML in order to facilitate 2D drawing and animation. The HTML for the canvas element is fairly simple, but actually drawing on the canvas requires JavaScript support. Here again, is our simple red dot example.

```html
<canvas id="canvasDemo" width="300" height="200" style="border: 1px solid #000000"></canvas>
<script>
  const ctx = document.getElementById('canvasDemo').getContext('2d');
  ctx.beginPath();
  ctx.arc(150, 100, 50, 0, 2 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.strokeStyle = 'red';
  ctx.fill();
  ctx.stroke();
</script>
```


## ☑ Assignment


```masteryls
{"id":"5cdb3b2d-c448-4dfb-a6f3-3bf87946e906", "title":"Web page development", "type":"ai-web-page", "allowAiPrompt":false, "syncGrade":false, "autoGrade":false, "gradingCriteria":"Change the image to something besides htmlImage.jpg. Change the video to something else besides park.mp4. Change the canvas element to display a blue circle.", "height":1000 }
This interaction demonstrates the different media elements.

1. Change the image to something else.
2. Change the video to something else.
3. Change the canvas element to display a blue circle.



~~~html
<body>
  <h2>Image</h2>
  <img alt="Arches" src="htmlImage.jpg" />

  <h2>Audio</h2>
  <audio controls src="htmlAudio.mp3"></audio>

  <h2>Video</h2>
  <video controls width="300"> <source src="park.mp4" />
  </video>

  <h2>Canvas</h2>
  <canvas id="canvasDemo" width="300" height="200" style="border: 1px solid #000000"></canvas>
  <script>
    const ctx = document.getElementById('canvasDemo').getContext('2d');
    ctx.beginPath();
    ctx.arc(150, 100, 50, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'red';
    ctx.fill();
    ctx.stroke();
  </script>
</body>

<style>
body { padding: 1em;}
</style>
~~~
```
