# xkcd

Lets have some fun with an API
1) Start by creating a [new codepen](https://codepen.io/)
2) Create the basic outline of a react app with the following in the js pane
```js
import React, { useState, useEffect } from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom/client";

function App() {
  return(
    <div>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```
and the following in the html pane
```
<div id="root"></div>
```
and set the JS Preprocessor to Babel

3) Make sure you dont get any errors in your console.
   
4) Add a state variable at the top of your App component
```js
  const [comic, setComic] = useState("NULL");
```

5) Add a useEffect segment that will be run each time the component is loaded. Make sure you can see the console.log()
```js
  useEffect(() => {
    console.log("In useEffect");
  }, []);
```

6) Now add the fetch code to get the data from the API
```js
 let url = "https://xkcd.vercel.app/?comic=3153";
 fetch(url)
  .then((res) => res.json())
  .then((data) => {
   console.log(data);
   setComic(data);
  });
```

7) At this point you should be able to see the data returned by the API in the console.
Notice that the comic has a title, a num, a day, month, year, img and alt.
We will use these in displaying the comic.

8) Add code to display the title in the return for the component.  Make sure you are displaying the title that you see in the console.
```js
function App() {
  return(
    <div>
      <h1>{comic.title}</h1>
    </div>
}
```

9) Now add the comic number and date.  Make sure they display correctly.
```js
<p>
 Comic #{comic.num} - {comic.day}/{comic.month}/{comic.year}
</p>
```

10) Now add the image and the alt text for the image.  Make sure they display correctly.
```js
<div>
  <img src={comic.img} alt={comic.alt} title={comic.alt} />
</div>
<p>{comic.alt}</p>
```
11) Save away your codepen and Celebrate!
12) If you get stuck, you can [look here](https://codepen.io/mjcleme/pen/JoGrZRq)
