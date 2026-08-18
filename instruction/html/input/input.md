# HTML input elements

📖 **Deeper dive reading**: [MDN Input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)

From the very early days of HTML it contained elements for accepting the input of user data. These elements include the following:

| Element    | Meaning                          | Example                                        |
| ---------- | -------------------------------- | ---------------------------------------------- |
| `form`     | Input container and submission   | `<form action="form.html" method="post">`      |
| `fieldset` | Labeled input grouping           | `<fieldset> ... </fieldset>`                   |
| `input`    | Multiple types of user input     | `<input type="" />`                            |
| `select`   | Selection dropdown               | `<select><option>1</option></select>`          |
| `optgroup` | Grouped selection dropdown       | `<optgroup><option>1</option></optgroup>`      |
| `option`   | Selection option                 | `<option selected>option2</option>`            |
| `textarea` | Multiline text input             | `<textarea></textarea>`                        |
| `label`    | Individual input label           | `<label for="range">Range: </label>`           |
| `output`   | Output of input                  | `<output for="range">0</output>`               |
| `meter`    | Display value with a known range | `<meter min="0" max="100" value="50"></meter>` |



## Form element

The `<form>` element is a container used to collect user input and send that data to a specified destination, typically a web server. It acts as the foundational structure for interactive components like login screens, search bars, and contact forms.

 Before JavaScript was introduced the `form` container element was essential because it was the only way for the browser to send the input data to a web server as part of a request to process the input and generate a new web page displaying the result of the input. With modern HTML, the form element is still important because it gives meaning to user input, works well with accessibility tools like screen readers, and relies on built-in browser features that handle input and submission reliably.

### Key Attributes

To function correctly, a `form` relies on two primary attributes:

1.  **`action`**: Defines the URL of the server-side resource (e.g., an API endpoint) that will process the submitted data.
2.  **`method`**: Specifies the HTTP method used to send the data.
    *   **`GET`**: Appends form data to the URL in name/value pairs. Used for non-sensitive data like search queries.
    *   **`POST`**: Sends data inside the body of the HTTP request. Used for sensitive information (like passwords) or when sending large amounts of data.


### Essential Child Elements

The `form` element wraps various interactive controls that allow users to enter data:

*   **`<label>`**: Provides a caption for an input. It improves accessibility and increases the clickable area for the associated field.
*   **`<input>`**: The most versatile element, used for text fields, checkboxes, radio buttons, and more, depending on its `type` attribute.
*   **`<textarea>`**: Used for multi-line text input.
*   **`<select>`**: Creates a drop-down list of options.
*   **`<button>`**: Used to submit the form (when `type="submit"`) or reset it (when `type="reset"`).

For data to be sent to the server, every input within the form must have a `name` attribute. The `name` acts as the key, and the user's input acts as the value (e.g., `username=JohnDoe`). Without the `name` attribute, the browser will not include that specific input's data in the submission.

### Example

Here is an example of a simple form that submits the value of a `textarea` element.

```html
<form action="submission.html" method="post">
  <label for="ta">TextArea: </label>
  <textarea id="ta" name="ta-id">
Some text
  </textarea>
  <button type="submit">Submit</button>
</form>
```

Try this out by modifying the text and pressing the submit button to simulate sending data to a web server. The browser generates the data by combining the textarea's `name` attribute with the current value of the textarea.

```masteryls
{"id":"c069b636-4426-4d32-b19f-1ef2379b5a72", "title":"Web page", "type":"web-page", "height":190}
<form id="messageForm">
  <label for="ta">TextArea: </label>
  <textarea id="ta" name="ta-id">Some text</textarea>
  <button type="submit">Submit</button>
</form>
<div id="message">... </div>

<style>
form { border: thin solid #efefef; padding: 1em;}
textarea { display:block; margin: .5em 0;}
#message { margin-top:1em;padding:1em;background:black;color:white;font-family:monospace; border:thin black solid; }
</style>
<script>
  const form = document.getElementById('messageForm');
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // stop page reload

    const text = document.getElementById('ta').value.replace(' ', '+');
    const output = document.getElementById('message');
    output.innerText = `ta-id=${text}`;
  });
</script>
```


 With JavaScript we have much more control over input data and what is done with it. For example, in a single page application the JavaScript will dynamically rebuild the HTML elements to reflect the results of the user interaction. With this ability the data may not even be sent to the server. This greatly reduces the necessity of the `form` element, but it is often still used simply as a container. Just remember that you are not required to have a form element to use input elements.


### Form best practices

*   **Accessibility**: Always associate labels with inputs using the `for` attribute on the `<label>` and a matching `id` on the `<input>`.
*   **Validation**: Use attributes like `required`, `minlength`, and `pattern` to ensure data is formatted correctly before submission.
*   **Security**: Always use the `POST` method for forms that handle sensitive user data.


## Input element

Inside of your form elements you can include input element that represent many different input types. You set the type of input with the `type` attribute. There are several different types to choose from. This includes different flavors of textual, numeric, date, and color inputs.

| Type           | Meaning                           |
| -------------- | --------------------------------- |
| text           | Single line textual value         |
| password       | Obscured password                 |
| email          | Email address                     |
| tel            | Telephone number                  |
| url            | URL address                       |
| number         | Numerical value                   |
| checkbox       | Inclusive selection               |
| radio          | Exclusive selection               |
| range          | Range limited number              |
| date           | Year, month, day                  |
| datetime-local | Date and time                     |
| month          | Year, month                       |
| week           | Week of year                      |
| color          | Color                             |
| file           | Local file                        |
| submit         | button to trigger form submission |

In order to create an input you specify the desired `type` attribute along with any other attribute associated with that specific input. Here is an example of a checked radio button and its associated label.

```html
<label for="checkbox1">Check me</label> <input type="checkbox" name="varCheckbox" value="checkbox1" checked />
```

Most input elements share some common attributes. These include the following.

| Attribute | Meaning                                                                             |
| --------- | ----------------------------------------------------------------------------------- |
| name      | The name of the input. This is submitted as the name of the input if used in a form |
| disabled  | Disables the ability for the user to interact with the input                        |
| value     | The initial value of the input                                                      |
| required  | Signifies that a value is required in order to be valid                             |

## Validating input

Several of the input elements have validation built into them. This means that they will not accept a value that is not for example, a number, a URL, outside of a range, or an email address. You can also specify the `required` attribute on an input element to mark it as requiring a value before it can be submitted. The `pattern` attribute exists on `text`, `search`, `url`, `tel`, `email`, and `password` inputs. When present, the pattern attribute provides a regular expression that must match for the input to be considered as valid.

You should also have validation built into your JavaScript that checks input data to ensure everything is valid before it is submitted. All of the input elements support functions for determining their validation state. Additionally, there are CSS style selectors for visualizing the validity of the input. In order to have a good user experience, it is critical that you provide sufficient user feedback early in the input process. A good design will give feedback as, or before, the user begins to input. A poor design will keep the user guessing as to why the data is not being accepted, or even if it was accepted.

## ☑ Assignment

```masteryls
{"id":"0875ed29-b9fb-4b47-a3bf-05cd622d574b", "title":"Form assignment", "type":"ai-web-page", "allowAiPrompt":false, "syncGrade":false, "autoGrade":false, "gradingCriteria":"Replace the text input's placeholder with 'your name here'. Add an additional optgroup. Add an additional checkbox. Add an additional radio button. Change the color input to default to red.", "height":1000 }
Experiment with the form inputs.

1. Replace the text input's placeholder with "your name here".
2. Add an additional optgroup.
3. Add an additional checkbox.
4. Add an additional radio button.
5. Change the color input to default to red.

~~~html
<body>
  <h1>Example Form</h1>
  <form id="messageForm">
    <ul>
      <li>
        <!-- Includes validation-->
        <label for="text">Text: </label>
        <input type="text" id="text" name="vText" placeholder="text that starts with A" required pattern="[Aa].*" />
      </li>
      <li>
        <label for="password">Password: </label>
        <input type="password" id="password" name="vPassword" />
      </li>
      <li>
        <label for="email">Email: </label>
        <input type="email" id="email" name="vEmail" />
      </li>
      <li>
        <label for="textarea">TextArea: </label>
        <textarea id="textarea" name="vTextarea"></textarea>
      </li>
      <li>
        <label for="select">Select: </label>
        <select id="select" name="vSelect">
          <option>option1</option>
          <option selected>option2</option>
          <option>option3</option>
        </select>
      </li>
      <li>
        <label for="optgroup">OptGroup: </label>
        <select id="optgroup" name="vOptGroup">
          <optgroup label="group1">
            <option>option1</option>
            <option selected>option2</option>
          </optgroup>
          <optgroup label="group2">
            <option>option3</option>
            <option>option4</option>
          </optgroup>
        </select>
      </li>
      <li>
        <fieldset>
          <legend>checkbox</legend>
          <label for="checkbox1">checkbox1</label>
          <input type="checkbox" id="checkbox1" name="vCheckbox" value="checkbox1" checked />
          <label for="checkbox2">checkbox2</label>
          <input type="checkbox" id="checkbox2" name="vCheckbox" value="checkbox2" />
          <label for="checkbox3">checkbox3</label>
          <input type="checkbox" id="checkbox3" name="vCheckbox" value="checkbox3" />
        </fieldset>
      </li>
      <li>
        <fieldset>
          <legend>radio</legend>
          <label for="radio1">radio1</label>
          <input type="radio" id="radio1" name="vRadio" value="radio1" checked />
          <label for="radio2">radio2</label>
          <input type="radio" id="radio2" name="vRadio" value="radio2" />
          <label for="radio3">radio3</label>
          <input type="radio" id="radio3" name="vRadio" value="radio3" />
        </fieldset>
      </li>
      <li>
        <!-- Submit form with POST method and enctype="multipart/form-data" to send file contents. -->
        <label for="file">File: </label>
        <input type="file" id="file" name="vFile" accept="image/*" multiple />
      </li>
      <li>
        <label for="search">Search: </label>
        <input type="search" id="search" name="vSearch" />
      </li>
      <li>
        <label for="tel">Tel: </label>
        <input type="tel" id="tel" name="vTel" placeholder="###-####" pattern="\d{3}-\d{4}" />
      </li>
      <li>
        <label for="url">URL: </label>
        <input type="url" id="url" name="vUrl" />
      </li>
      <li>
        <label for="number">Number: </label>
        <input type="number" name="vNumber" id="number" min="1" max="10" step="1" />
      </li>
      <li>
        <label for="range">Range: </label>
        <input type="range" name="vRange" id="range" min="0" max="100" step="1" value="0" />
        <output id="rangeOutput" for="range">0</output>
        <!-- Range requires some JavaScript in order to make it work. Ignore this for now. -->
        <script>
          const range = document.querySelector('#range');
          const rangeOutput = document.querySelector('#rangeOutput');
          range.addEventListener('input', function() {
            rangeOutput.textContent = range.value;
          });
        </script>
      </li>
      <li>
        <label for="progress">Progress: </label>
        <progress id="progress" max="100" value="75"></progress>
      </li>
      <li>
        <label for="meter">Meter: </label>
        <meter id="meter" min="0" max="100" value="50" low="33" high="66" optimum="50"></meter>
      </li>
      <li>
        <label for="datetime">DateTime: </label>
        <input type="datetime-local" name="vDatetime" id="datetime" />
      </li>
      <li>
        <label for="time">Time: </label>
        <input type="time" name="vTime" id="time" />
      </li>
      <li>
        <label for="month">Month: </label>
        <input type="month" name="vMonth" id="month" />
      </li>
      <li>
        <label for="week">Week: </label>
        <input type="week" name="vWeek" id="week" />
      </li>
      <li>
        <label for="color">Color: </label>
        <input type="color" name="vColor" id="color" />
      </li>
      <!-- This doesn't show up to the user, but allows the form to send associated data. -->
      <input type="hidden" id="secretData" name="vSecretData" value="1989 - the web was born" />
    </ul>

    <button type="submit">Submit</button>
  </form>
<div id="message">... </div>
</body>

<style>
  * {font-family: Arial;}
  body { padding: 0 1em;}
  li {  list-style-type: none;  padding: 0.25em 0;}
  form { border: thin solid #efefef; padding: 1em;}
  textarea { display:block; margin: .5em 0;}
  #message { margin-top:1em;padding:1em;background:black;color:white;font-family:monospace; border:thin black solid; white-space: pre-wrap; word-break: break-all;}
</style>
<script>
  const form = document.getElementById('messageForm');
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // stop page reload

    const formData = new FormData(form);
    const params = new URLSearchParams();

    for (const [key, value] of formData) {
      if (value instanceof File) {
        params.append(key, value.name);
      } else {
        params.append(key, value);
      }
    }

    const output = document.getElementById('message');
    output.innerText = params.toString();
  });
</script>
~~~
```
