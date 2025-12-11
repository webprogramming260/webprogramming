# Amazon Web Services - Route 53

Referring to a web server by its IP address is fine for development, but it is not going to work for most users. Additionally, you want to create a secure (HTTPS) connection to your application, and that is not possible with just an IP address. Instead you want to use a domain name to represent your web application. That way you can make it easy to remember _and_ secure. In order for you to do this you need to buy a domain name, and then create DNS records with a DNS (Domain Name System) server.

`Route 53` is the AWS service that handles everything DNS-related. With Route 53 you can buy a domain name, host your domain on their DNS servers, and create DNS records.

> [!IMPORTANT]
>
> You should already have an account with AWS from your work to rent a EC2 server instance. If you haven't done that work, go create your account and server following the previous instruction.

## Purchasing a domain name

AWS provides extensive documentation for all their services. You can find the documentation for [registering a new domain](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/domain-register.html) on their website. You may find the simplified directions below easier to follow, but if you run into trouble, or have additional questions, refer to the official documentation. Remember that you are leasing a domain name for a year, and so make sure it is a name that you would like. Also note that AWS credits do not apply to purchase of domain names.

> [!IMPORTANT]
>
> If you are using new contact information that a registrar has never seen before, it will require you to verify the email address. Usually this means you will receive an email that you must respond to within 15 days. If you fail to do this your domain name will be removed from the registry without warning. Check your spam folder if you do not receive this email.

1. Open the AWS console in your browser and log in.
1. Navigate to the `Route 53` service.
1. Select the `Domains > Registered domains` option from the menu on the left.
1. Push the `Register Domains` option.
1. Select the TLD that you want. AWS currently offers the `.click` TLD for $3 and `.link` for $5.
1. Put your desired root domain into the search box and press the `Check` button to see if it is available. Common one or two word phrases are almost always taken. For example, `260.click` is taken, but `webprogramming260.click` is not. Keep searching until you find one you like.
1. Press `Add to cart`.

   ![AWS Find domain](webServerAWSFindDomain.png)

1. Fill out the contact details. This information is sent to the authorized DNS registrar and is what shows up to the world for your domain name. Once registration is complete you can see this information using the console program `whois`. Make sure you fill in this information correctly. Providing false information may cause the registrar to revoke your registration.
1. Press `Continue`.
1. Review everything and press `Complete Order`

It may take a while before your purchase is completed, but when it is the Route 53 service dashboard will show that you have a `hosted zone` for your domain name.

## Manage your DNS records

Now that you own a domain name you can use it to create DNS records that will map domain names to IP addresses (A records) or other domain names (CNAME records). For the purposes of this class, you want your root domain name, and any subdomain of your root domain, to map to the IP address of the web server you created previously.

You will need the public IP address for your server. You can get the public IP address by opening the AWS browser console and viewing the details of your server on the EC2 service page.

> [!NOTE]
>
> The AWS browser console interface changes all the time; the directions below may not match exactly, but similar functionality should be there in some shape or form.

1. Open the AWS console in your browser and log in.
1. Navigate to the `Route 53` service.
1. Select the `Hosted zones` option from the menu on the left.
1. You should see your domain name listed here. If it doesn't show up, then the registration did not complete, or it is still pending. In that case go review the information found under `Domains > Pending requests`.
1. Click on your domain name to view the details. This should display existing DNS records with types such as `NS`, and `SOA`.
1. First, create the root domain DNS record. This will associate your domain name with your server's IP address and allow you to use your domain name in the browser to navigate to your server.
   1. Press the `Create record` button.
   1. In the Value box enter the public IP address of your server.
   1. Press `Create records`
   1. A new `A` type record should appear in your list of records that represents the root domain name and your server's public IP address.
1. Next we will create a DNS record that will map to your server for any subdomain of your root domain name. This is possible because DNS allows you to specify wildcards for a DNS record.
   1. Press the `Create record` button.
   1. In the `Record name` box enter the text `*`. This wildcard represents that any subdomain will match this record, so long as it is not explicitly defined by another DNS record.
   1. In the `Value` box enter the public IP address of your server.
   1. Press `Create records`
   1. A new `A` type record should appear in your list of records that represents the wildcard subdomain name and your server's public IP address.

Your DNS records should look similar to the following when you are done.

![AWS DNS records](webServerAWSDnsRecords.png)

By defining both a record for your root domain and a wildcard record for any subdomain of your root domain you can now navigate to your server with either your domain name or a subdomain. For example, if you purchased the domain name `myfunkychickens.click` you could reach your server by navigating your browser to `myfunkychickens.click`, `simon.myfunkychickens.click`, or `startup.myfunkychickens.click`.

Open your browser and paste your domain in the location bar along with the prefix `http://`. For example:

```sh
http://myfunkychickens.click
```

This should show your web server's default page just like it did when you used the IP address.

![Browsing to hostname](webServerWithHostname.png)

Note that your browser will warn you that the website is not secure. We will resolve that in future instruction when we configure Caddy to generate a website certificate for you.

## Other record types

The additional `NS` and `SOA` type records that were listed for your domain name are important for working with DNS. These records were created automatically for you when you registered your domain name. The name server (`NS`) record contains the names of the authoritative name servers that authorize you to place DNS records in this DNS server. Those same authoritative name servers are listed with the registrar that you leased your domain name from. That way the authoritative name server can verify that the DNS records and the DNS registration match and are authorized to represent the domain name when defining DNS records. Otherwise a hacker could just add DNS records and take over your domain name.

The start of authority (`SOA`) record provides contact information about the owner of this domain name.

## ☑ Assignment

If you do not already own a domain name that you want to use for this course, then lease one from Route 53 now.

1. Open the AWS browser console and log in.
1. Use Route 53 to purchase a domain name.
1. Set up your DNS records using Route 53. Make sure you have a record representing your root domain name, and a wild card subdomain.
1. Test that you can access your server using your domain name and any subdomain name.

Don't forget to update your GitHub startup repository notes.md with all of the things you learned and want to remember.

## Common problems

| Symptom                                                                     | Reason                                                                                                                                                                                                                                                                                                    |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| I leased my domain name and set up DNS, but I can't hit it with the browser | Give it some time. Perhaps 10 minutes. Use `dig` or `nslookup` to see if the DNS records are publicly available. Check to see if the IP address is correct. Make sure the DNS records are correct.                                                                                                        |
| The browser doesn't display my website                                      | Check that you are not trying to use `https`. Check that the browser hasn't inserted a `www` subdomain prefix. Some browsers will hide this. You must actually click on the domain name in the address bar to see what it is really using                                                                 |
| My root domain works, but not the `simon` or `startup` subdomains           | Check your DNS records. Make sure you created a wildcard `*.yourdomain` record.                                                                                                                                                                                                                           |
| My `simon` or `startup` subdomains work, but not my root domain             | Check your DNS records. Make sure you have a root record.                                                                                                                                                                                                                                                 |
| My domain name was working, but after 15 days it stopped.                   | Make sure you received and responded the the email from the registrar to verify your email address. Check your spam folder if you did not receive an email. If you open the Route 53 browser console and navigate to your Registered Domain information you can see if it thinks you are verified or not. |
