# Uploading files

Web applications often need to upload one or more files from the frontend application running in the browser to the backend service. We can accomplish this by using the HTML `input` element of type `file` on the frontend, and the `Multer` NPM package on the backend.

![upload flow](uploadFlow.png)

## Frontend Code

The following frontend code registers an event handler for when the selected file changes and only accepts files of type `.png, .jpeg, or .jpg`. We also create an `img` placeholder element that will display the uploaded image once it has been stored on the server.

```html
<html lang="en">
  <body>
    <h1>Upload an image</h1>
    <input type="file" id="fileInput" name="file" accept=".png, .jpeg, .jpg" onchange="uploadFile(this)" />
    <div>
      <img style="padding: 2em 0" id="upload" />
    </div>
    <script defer src="frontend.js"></script>
  </body>
</html>
```

The frontend JavaScript handles the uploading of the file to the server and then uses the filename returned from the server to set the `src` attribute of the image element in the DOM. If an error happens then an alert is displayed to the user.

```js
async function uploadFile(fileInput) {
  const file = fileInput.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      document.querySelector('#upload').src = `/${data.file}`;
    } else {
      alert(data.message);
    }
  }
}
```

## Backend code

In order to build storage support into our server, we first install the `Multer` NPM package to our project. There are other NPM packages that we can chose from, but Multer is commonly used. From your project directory, run the following console command.

```sh
npm install express multer
```

Multer handles reading the file from the HTTP request, enforcing the size limit of the upload, and storing the file in the `public` directory. Additionally our service code does the following:

- Handles requests for static files so that we can serve up our frontend code.
- Handles errors such as when the 64k file limit is violated.
- Generates a filename that prevents the user from altering the servers file system based upon an uploaded filename.
- Provides access to the uploads using the `express.static` middleware.

```js
const express = require('express');
const multer = require('multer');

const app = express();

app.use(express.static('public'));

const upload = multer({
  storage: multer.diskStorage({
    destination: 'public/',
    filename: (req, file, cb) => {
      const filetype = file.originalname.split('.').pop();
      const id = Math.round(Math.random() * 1e9);
      const filename = `${id}.${filetype}`;
      cb(null, filename);
    },
  }),
  limits: { fileSize: 64000 },
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    res.send({
      message: 'Uploaded succeeded',
      file: req.file.filename,
    });
  } else {
    res.status(400).send({ message: 'Upload failed' });
  }
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(413).send({ message: err.message });
  } else {
    res.status(500).send({ message: err.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

## Where you store your files

You should take serious thought about where you store your files. Putting files on your server is not a very good production level solution for the following reasons.

1. You only have so much available space. Your server only has 8 GB by default. Once you use up all your space then your server will fail to operate correctly and you may need to rebuild your server.
1. In a production system, servers are transient and are often replaced as new versions are released, or capacity requirements change. That means you will lose any state that you store on your server.
1. The server storage is not usually backed up. If the server fails for any reason, you will lose your customer's data.
1. If you have multiple application servers then you can't assume that the server you uploaded the data to is going to be the one you request a download from.

Instead you want to use a dedicated storage service that has durability guarantees, is not tied to your compute capacity, and can be accessed by multiple application servers.
