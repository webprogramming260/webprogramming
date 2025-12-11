# Startup AWS

![Overview](../../technologies.png)

## Prerequisites

> [!IMPORTANT]
>
> Before you start work on this deliverable make sure you have read all of the proceeding instruction topics and have completed all of the dependant exercises (topics marked with a ☑). This includes:

- ☑ [Amazon Web Services - EC2](../amazonWebServicesEc2/amazonWebServicesEc2.md)
- [Domain names](../domainNames/domainNames.md)
- ☑ [Amazon Web Services - Route 53](../amazonWebServicesRoute53/amazonWebServicesRoute53.md)
- [Caddy](../caddy/caddy.md)
- ☑ [HTTPS, TLS, and certificates](../https/https.md)

Failing to do this will likely slow you down as you will not have the required knowledge to complete the deliverable.

## Getting started

This startup just requires you to create your AWS web server and set up a DNS Route53 domain for your server.
You need to follow the instructions with exactness.  
Typing in one wrong character can cause your server to not respond or to crash with an error.

When you are finished, the placeholder for your startup will be available from `https://startup.yourdomainname`.

## 🚀 Deliverable

1. [Set up your AWS account](../../essentials/awsAccount/awsAccount.md) using your byu.edu email address.
1. [Create a new EC2 instance](../amazonWebServicesEc2/amazonWebServicesEc2.md) and access the server using `http://6.5.4.3` (where 6.5.4.3 is your IP address).
1. [Lease a domain](../amazonWebServicesRoute53/amazonWebServicesRoute53.md) in Route53. Make sure you respond to the email that they will send you.
1. Make sure that you can access your server through HTTP through http://startup.yourdomain (where yourdomain is replaced with the domain you leased from Route53)
1. [Edit your Caddyfile](../https/https.md) so that you can access your server through HTTPS.
1. You should see the default web page displayed through HTTPS
1. Upload the URL to your startup application to the Canvas assignment. The URL should have the form https://startup.yourdomain

![Web Browser Secure](../https/webServerBrowserSecure.png)

## Grading Rubric

> [!IMPORTANT]
>
> Submit your Startup URL that includes your domain name for this deliverable (e.g. `https://startup.yourdomain`). **Do not** submit your GitHub repository URL.

- 100% Your web page can be displayed using HTTPS and your domain name.

## Go celebrate

You did it! You now have a web server that can be seen by anyone in the world.
