const fs = require("fs");
const path = require("path");
const { SitemapStream, streamToPromise } = require("sitemap");

// Define your site's base URL
const BASE_URL = "https://yourwebsite.com"; // Change this to your domain

// Define your static routes (add more as needed)
const pages = [
    { url: "/", changefreq: "daily", priority: 1.0 },
    { url: "/about", changefreq: "weekly", priority: 0.8 },
    { url: "/contact", changefreq: "monthly", priority: 0.7 },
];

(async () => {
    try {
        // Create a writable stream
        const sitemapPath = path.join(__dirname, "public", "sitemap.xml");
        const writeStream = fs.createWriteStream(sitemapPath);

        // Create the sitemap stream
        const sitemapStream = new SitemapStream({ hostname: BASE_URL });

        // Pipe the sitemap stream to the file
        sitemapStream.pipe(writeStream);

        // Write pages to the sitemap
        pages.forEach((page) => sitemapStream.write(page));

        // End the stream
        sitemapStream.end();

        // Wait for the file to be written
        await streamToPromise(sitemapStream);

        console.log("Sitemap generated successfully!");
    } catch (error) {
        console.error("Error generating sitemap:", error);
    }
})();
