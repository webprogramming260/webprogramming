# Tailwind

📖 **Deeper dive reading**:

- [Tailwind website](https://tailwindcss.com/)
- [Getting started using Vite](https://tailwindcss.com/docs/installation/using-vite)

Tailwind is a CSS framework that takes a different approach from traditional frameworks. Instead of simply importing a bunch of predefined CSS class name selectors for things such as buttons or navbars, Tailwind provides low-level utility classes that you apply directly in your HTML.

## History

- **Created by**: Adam Wathan, Steve Schoger, Jonathan Reinink, and David Hemphill
- **Initial release**: November 2017
- **Motivation**: The team behind Tailwind wanted a way to build UIs faster and more flexibly without constantly switching between HTML and CSS files or overriding styles from traditional frameworks like Bootstrap.
- **Success**: It has grown to become the most popular CSS frameworks due to its developer-first philosophy and modern tooling ecosystem.

## Tailwind philosophy

When you use Tailwind you simply add standard Tailwind class names to your HTML elements. You then run the HTML through a tool chain process, for example with Vite, and it dynamically builds your CSS files from the classes that you explicitly reference.

This has several advantages. It reduces CSS bloat, puts your styling directly in the HTML where it is used, and increases performance because you only include styling that you actually use. It also is closer to CSS and so if you are familiar with CSS you can quickly style your HTML using a simplified style syntax.

Tailwind works really well with web component frameworks because it encourages you to build reusable components in a framework like React so that you avoid creating similar components with slightly different Tailwind class references.

Here is an example of a button that is styled with Tailwind.

```html
<button class="bg-blue-400 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition-colors m-4">Get Started</button>
```

```masteryls
{"id":"c24c897d-c66e-4c42-be1c-7807d2e6cf84", "title":"Web page", "type":"web-page", "height":50}
<!-- Tailwind via CDN -->
<script src="https://cdn.tailwindcss.com"></script>
<button class="bg-blue-400 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition-colors m-1">Get Started</button>
```

## Comparison to Bootstrap

You can get a deeper understanding of Tailwind by comparing it to the popular Bootstrap CSS framework. The following example shows that same HTML that is styled first with Bootstrap and then Tailwind.

### Bootstrap

With Bootstrap you use Bootstrap's card, card-body, card-tile, and card-text component classes. The HTML then references a large static stylesheet in order to apply the CSS rule sets for the classes.

```html
<div class="card" style="width: 18rem;">
  <img class="card-img-top" src="https://picsum.photos/400/200" />
  <div class="card-body">
    <h5 class="card-title">Card Title</h5>
    <p class="card-text">Some quick example text.</p>
  </div>
</div>
```

### Tailwind

With Tailwind there are no component level definitions. You simply work with class names that are similar to primitive CSS directives. You apply the class names directly in the HTML and not through CSS files.

```html
<div class="max-w-sm rounded bg-red-800 overflow-hidden">
  <div class="max-w-sm rounded bg-white overflow-hidden shadow-lg m-2 p-2">
    <img class="w-full" src="https://picsum.photos/400/200" />
    <div class="px-2 py-4">
      <div class="font-bold text-xl mb-1">Card Title</div>
      <p class="text-gray-500">Some quick example text.</p>
    </div>
  </div>
</div>
```

The visual result is similar in either case.


```masteryls
{"id":"b1716236-e043-40fc-8f6e-11e3d029f965", "title":"Web page", "type":"web-page", "height":300}
<!-- Tailwind via CDN -->
<script src="https://cdn.tailwindcss.com"></script>
<div class="max-w-sm rounded bg-red-800 overflow-hidden">
  <div class="max-w-sm rounded bg-white overflow-hidden shadow-lg m-2 p-2">
    <img class="w-full" src="https://picsum.photos/400/200" />
    <div class="px-2 py-4">
      <div class="font-bold text-xl mb-1">Card Title</div>
      <p class="text-gray-500">Some quick example text.</p>
    </div>
  </div>
</div>
```

However, because Bootstrap uses predefined component level classes, you will need to download the entire Bootstrap CSS framework file in order to render the card. With Tailwind, a custom CSS file is created dynamically for you that only contains the styling that you used.

You may be concerned about all of those "css declarations" being put directly on the HTML elements, but in reality you would use a web framework to modularize the entire **card** into a component and so there is no real duplication of the "css declarations". You are just specifying the component's CSS right where it is used rather in a different file that is referenced by a class name selector.

### Feature comparison

| Feature            | Tailwind CSS                                          | Bootstrap                                                    |
| ------------------ | ----------------------------------------------------- | ------------------------------------------------------------ |
| **Philosophy**     | Utility-first (build from primitives)                 | Component-based (prebuilt UI components)                     |
| **Customization**  | Highly customizable via config (`tailwind.config.js`) | Customizable but more rigid without overrides                |
| **Design freedom** | Full control over spacing, color, layout              | Limited to pre-defined component styling                     |
| **File size**      | Smaller                                               | Larger due to bundled components and styles                  |
| **Learning curve** | Steep at first as you learn native CSS                | Easy to get started                                          |
| **JS dependency**  | No JS (except if using plugins)                       | Depends on jQuery (Bootstrap ≤ 4) or native JS (Bootstrap 5) |


```masteryls
{"id":"34a35a7b-6a78-4f40-bf6d-1fef7be61963", "title":"Tailwind VS Bootstrap", "type":"teaching" }
What should I prefer? Tailwind or Bootstrap?
```


## Experimenting with Tailwind

There is no course requirement for you to use Tailwind, only that you use some css framework for some portion of your startup. However, it has become very popular and therefore might be worth experimenting with. We can use a content delivery network (CDN) to load Tailwind into a simple HTML page. Just note that it for production use you will want to use infrastructure that is described below, but that we will not cover until we introduce React.



```masteryls
{"id":"bfc61aa3-7da1-41f5-922b-630c5bcd4db4", "title":"Experiement with Tailwind", "type":"ai-web-page", "allowAiPrompt":true, "gradingCriteria":"There must be a green button", "height":250 }
Take some time and play around with tailwind. Start with the provided example and then perhaps use the **AI assistance** to generate some different code. When you do, make sure you specify that you want to use Tailwind using the `https://cdn.tailwindcss.com` CDN content.

Make sure you have a **green** button before you submit.

~~~html
<head>
  <!-- Tailwind via CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 flex items-center justify-center h-screen">

  <div class="bg-white p-8 rounded-2xl shadow-lg text-center">
    <h1 class="text-2xl font-bold text-blue-600 mb-4">
      Hello Tailwind!
    </h1>
    <p class="text-gray-700">
      This is a standalone HTML page using Tailwind CSS.
    </p>
    <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
      Click me
    </button>
  </div>

</body>
~~~
```


## Using Tailwind in a production application

For production use, Tailwind requires a tool chain processor to convert the class names into a CSS stylesheet. You will include the necessary processor when you move your startup application to React. However, if your curiousity is triggered and you want to play with Tailwind right now, you need to start by creating a [Hello World React](../../webFrameworks/react/introduction/introduction.md#react-hello-world) application and then configuring Vite to support tailwind.

The steps involved include creating the demo application, installing tailwind, configuring Vite to execute tailwind as part of the tool chain, adding a reference to the resulting CSS, and adding Tailwind class names to your HTML elements.

1. Start with the [Hello World React](../../webFrameworks/react/introduction/introduction.md#react-hello-world) application. This will result in an application that looks like this:

   ![Colorized React](../../webFrameworks/react/introduction/colorizedHelloReact.gif)

   When you are done configuring Tailwind the application should look very similar.

1. Install Tailwind CSS

   ```sh
   npm install tailwindcss @tailwindcss/vite
   ```

1. Configure the Vite plugin to use Tailwind to compile the CSS by modifying/creating `vite.config.js`

   ```ts
   import { defineConfig } from 'vite';
   import tailwindcss from '@tailwindcss/vite';
   export default defineConfig({
     plugins: [tailwindcss()],
   });
   ```

1. Create a `index.css` file and import tailwindcss. This will bring in the dynamically generated Tailwind CSS file.

   ```css
   @import 'tailwindcss';
   ```

1. Modify `index.html` head element to reference the placeholder CSS file.

   ```html
   <link href="/src/style.css" rel="stylesheet" />
   ```

1. Modify the `index.jsx` file to use Tailwind classes.

   ```jsx
   import React from 'react';
   import ReactDOM from 'react-dom/client';

   function App() {
     const [bgColor, setBgColor] = React.useState('bg-white');

     const handleClick = () => {
       setBgColor(bgColor === 'bg-white' ? 'bg-yellow-200' : 'bg-white');
     };

     return (
       <div onClick={handleClick} className={`h-screen font-bold text-8xl flex items-center justify-center ${bgColor}`}>
         <div> Hello React </div>
       </div>
     );
   }

   const root = ReactDOM.createRoot(document.getElementById('root'));
   root.render(<App />);
   ```
