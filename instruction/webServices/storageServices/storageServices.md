# Storage services

Web applications commonly need to store files associated with the application or the users of the application. This includes files such as images, user uploads, documents, and movies. Files usually have an ID, some metadata, and the bytes representing the file itself. These can be stored using a database service, but usually that is overkill and a simpler solution will be cheaper.

It might be tempting to store files directly on your server. This is usually a bad idea for several reasons.

1. Your server has limited drive space. If you server runs out of drive space your entire application will fail.
1. You should consider your server as being ephemeral, or temporary. It can be thrown away and replaced by a copy at any time. If you start storing files on the server, then your server has state that cannot be easily replaced.
1. You need backup copies of your application and user files. If you only have one copy of your files on your server, then they will disappear when your server disappears, and you must always assume that your server will disappear.

Instead you want to use a storage service that is specifically designed to support production storage and delivery of files.

Here is a table of major cloud storage providers that offer programmatic access, including links to their documentation, information about their free tiers, and the amount of storage included:

| Provider                     | Documentation                                                                             | Free Tier | Free Storage Included |
| ---------------------------- | ----------------------------------------------------------------------------------------- | --------- | --------------------- |
| **Amazon S3**                | [Amazon S3 Documentation](https://docs.aws.amazon.com/s3/index.html)                      | Yes       | 5 GB for 12 months    |
| **Google Cloud Storage**     | [Google Cloud Storage Documentation](https://cloud.google.com/storage/docs)               | Yes       | 5 GB                  |
| **Microsoft Azure Storage**  | [Azure Storage Documentation](https://docs.microsoft.com/en-us/azure/storage/)            | Yes       | 5 GB for 12 months    |
| **IBM Cloud Object Storage** | [IBM Cloud Object Storage Documentation](https://cloud.ibm.com/docs/cloud-object-storage) | Yes       | Lite plan with 25 GB  |
| **MinIO**                    | [MinIO Documentation](https://min.io/docs/)                                               | No        | N/A                   |
| **OpenStack Swift**          | [OpenStack Swift Documentation](https://docs.openstack.org/swift/latest/)                 | No        | N/A                   |

## AWS S3

Since we are already using AWS for this course, let's take a closer look at [AWS S3](https://aws.amazon.com/s3/). S3 provides the following advantages:

1. It has unlimited capacity
1. You only pay for the storage that you use
1. It is optimized for global access
1. It keeps multiple redundant copies of every file
1. You can version the files
1. It is performant
1. It supports metadata tags
1. You can make your files publicly available directly from S3
1. You can keep your files private and only accessible to your application

In this course we will not be using any storage services for the Simon project. If, however, you want to use S3 as the storage service for your Startup application, then you need to learn how to use the AWS SDK. You can find detailed information about using AWS S3 with Node.js on the [AWS website](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-nodejs.html). Generally, the steps you need to take include:

1. Creating a S3 bucket to store your data in.
1. Getting credentials so that your application can access the bucket.
1. [Using](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/setting-credentials-node.html) the credentials in your application.
1. Using the [SDK](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_s3_code_examples.html) to write, list, read, and delete files from the bucket.

> [!IMPORTANT]
>
> Make sure that you do not include your credentials in your code. If you check your credentials into your GitHub repository they will immediately be stolen and used by hackers to take over your AWS account. This may result in significant monetary damage to you.

### Example S3 usage

As a simple example that uses S3, you first need to install the AWS packages.

```sh
npm install @aws-sdk/client-s3 @aws-sdk/credential-providers
```

#### Getting credentials

Next you need to obtain your AWS credentials that allow you to access S3. When you are running in your production environment, you can change the role that your S3 server is running under to allow S3 access. When you are running from your development environment, you need to obtain AWS access keys and store them in the `~/.aws/credentials` file. You can write values to the credential file using the AWS CLI with the following command:

```sh
aws configure
```

Whatever method you use to provide your credentials, the AWS SDK will attempt to find the credentials by looking for them in all of the standard places when you call `fromIni()`. You then pass the credentials to the service you want to use. In the case below, we create an `S3Client`.

```js
const s3 = new S3Client({
  credentials: fromIni(),
});
```

#### Writing and reading a file

Once you have authenticated with AWS you are ready to make any request that your AMI role allows. In the example below we will execute the `PutObject` and `GetObject` commands. The parameters for each of these calls specify the bucket and the file that we want to use. When we read the object data from S3, we use the `transformToString` function to convert the object data back into the actual file.

```js
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { fromIni } from '@aws-sdk/credential-providers';

const s3 = new S3Client({
  credentials: fromIni(),
});

const bucketName = 'your-bucket-name-here';

async function uploadFile(fileName, fileContent) {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: fileContent,
  });
  return s3.send(command);
}

async function readFile(fileName) {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: fileName,
  });
  const { Body } = await s3.send(command);
  return Body.transformToString();
}

await uploadFile('test.txt', 'Hello S3!');
const data = await readFile('test.txt');

console.log(data);
```

Now you can run the code and see the result.

```sh
node service.js
Hello S3!
```
