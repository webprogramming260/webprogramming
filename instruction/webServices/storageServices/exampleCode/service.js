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
  const streamToString = (stream) => {
    return new Promise((resolve, reject) => {
      const chunks = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks).toString()));
      stream.on('error', reject);
    });
  };
  return streamToString(Body);
}

await uploadFile('test.txt', 'Hello, World!');
const data = await readFile('test.txt');

console.log(data);
