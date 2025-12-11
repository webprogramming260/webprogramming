# Search engine optimization

📖 **Deeper dive reading**: [Google Search Central](https://developers.google.com/search)

Once Google became the de facto search engine for the internet, a new industry was created to help websites get the top search result spots. Modifying your application for search results is called search engine optimization (SEO). While SEO has nothing to do with the functionality of your application, it has everything to do with its success. You can save millions of dollars in marketing if your application appears in the top search ranking for common user searches.

There are several factors that are major contributors to your search rank. These include:

1. Content
1. Authoritative links
1. Structure and organization
1. Metadata
1. Performance and usability

Let's take a closer look at each of these.

## Content

Search engines pay a lot of attention to the value an application provides. One of the ways you can provide significant value is to host interesting, current, easily accessible content. For example, if your application is about the game Simon, then you should include a history of the game, strategies for playing the game, current news about competitions, and biographies of the world's best players. The key is that there is lots of interesting content and that it is kept current.

You want to make sure that you provide both textual and video content. Also make sure that the content is available without authentication or payment.

## Authoritative links

The success of the Google Page Rank algorithm is founded on determining how authoritative an application is. The more websites that point to your application the higher its search ranking will be. If you can get an influencer to link to your content, or get links from other authoritative applications you will see a significant bump in your ranking.

You also want to be an authority to yourself. This includes links from other applications that you own, and internal application links. Making sure that you have multiple paths to key content from within your application will help the Google crawler find the content and value its authority.

## Structure and organization

You need to properly use HTML elements to correctly define and organize your application. The Google search crawler is an automated bot. That means it will not spend a lot of effort trying to guess what you meant with the `div` or `span` element, when they actually represent a `title` or `a` element. Leveraging the semantic meaning of HTML will help the crawler navigate your content.

You want to make sure that your content is not hidden behind JavaScript interactions. When the crawler hits a URL, the important content should be rendered. The crawler should not have to interact with the application before the content is injected.

Key HTML elements include the `title` and `heading` elements. The title and heading elements should contain text that clearly defines the value of your content, and include keywords that you want in the search index.

## Metadata

HTML defines several elements and attributes that search crawlers specifically target. This includes the `description`, `robots`, social media open graph (`og`), and image alt attributes.

If you were creating a description for Simon, you would include something like the following description meta element on the home page of your application.

```html
<meta name="description" content="Game play, news, rankings, tips, and instruction for Simon." />
```

The robots meta element instructs the crawler how to specifically index a given page. The image alt attribute tells the crawler the keywords for a given image.

The open graph (`og`) meta tags are used by social media websites to give a preview of your application. Crawlers consider information like this as a reflection that the application is modern and more interesting to users.

```html
<meta property="og:title" content="Play Simon online" />
<meta property="og:description" content="News, rankings, instruction, and competitive online play for Simon." />
<meta property="og:image" content="https://simon.cs260.click/simon.png" />
```

### Sitemap

A sitemap is a textual file that you distribute with your application. It describes the major content pieces of your application and aids in search crawler navigation. If you have a small application then a sitemap is probably not necessary. If you have hundreds, or thousands, of content pages then you definitely want to build a sitemap and submit it to the Google Search Console.

Here is an example of a simple sitemap file with a single entry.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://simon.cs260.click/news/2022-world-champion.html</loc>
    <lastmod>2023-01-17</lastmod>
  </url>
</urlset>
```

### Robots.txt

The `robots.txt` file tells the crawler what parts of your application is off limits. Here is an example robots.txt file:

```yaml
# cs260.com/robots.txt
# Tell Google not to crawl the game play path,
# because it won't be useful in Google Search results.
User-agent: googlebot
Disallow: /play/
```

To include a robots.txt file for your application you simply create the file with the specific name `robots.txt` and serve it from the root of your domain.

## Performance and usability

In addition to authority, Google wants to rank results by quality. That means it will check how performant your application is and how good the user experience (UX) is. This includes measurements such as the time it takes for the first byte to load, how long it takes to render the page, and how well your application works on mobile devices.

## Tools

### Google search

You want to frequently do a Google search for your application's domain to see how much of it is being indexed. You can do this by querying Google with your domain name prefixed with `site:`. For example, here is the current result for `site:simon.cs260.click`.

![Simon SEO search](seoGoogleSearch.jpg)

This shows that Google is not indexing any pages from the domain. It looks like we have some SEO work to do. Probably some authoritative links will help.

### PageSpeed Insights

PageSpeed Insights is similar to the Chrome browser debugging tool Lighthouse, but it allows you to run it from a webpage. Using a tool like Insights is helpful because performance and usability are key factors in determining your search ranking. The better the rating you get from PageSpeed Insights, the better your search ranking will be.

Here is the result of examining `simon.cs260.click`. This shows that it is performing well, but that it is not optimal for SEO.

![PageSpeed Insights](seoPageSpeedInsights.jpg)

If we dig into the SEO section of the report we see that there is no Robots.txt file and the description meta element is missing.

![PageSpeed Insights SEO](seoPageSpeedInsightsSeo.jpg)

### Google Search Console

The [Google Search Console](https://search.google.com/search-console/about) contains many tools to help you understand how your application is being indexed and why. This includes information about your website's performance, what pages are indexed, your mobile usability, and information about the site's overall user experience.

![Google Search Console](seoGoogleSearchConsole.jpg)

To get started with the Google Search Console, you need to add a DNS `TXT` record to your application's domain DNS information. This is similar to when you added an `A` or `CNAME` record when you first set up your DNS information with the AWS Route 53 service.

![Google Search Console Verify](seoGoogleSearchConsoleVerify.jpg)

Once your ownership of the domain name is verified, the Google Search Console will start tracking statistics for your domain. Check back often to gain insight on how you can improve your search ranking.
