const fs = require("fs");
const path = require("path");
const { SitemapStream, streamToPromise } = require("sitemap");

// Define your site's base URL
const BASE_URL = "https://yourwebsite.com"; // Change this to your actual domain

// Define your static routes
const pages = [
    { url: "/", changefreq: "daily", priority: 1.0 },
    { url: "/about", changefreq: "weekly", priority: 0.8 },
    { url: "/contact", changefreq: "monthly", priority: 0.7 },
];

(async () => {
    try {
        const sitemapPath = path.join(__dirname, "public", "sitemap.xml");

        // Ensure the public directory exists
        if (!fs.existsSync(path.join(__dirname, "public"))) {
            fs.mkdirSync(path.join(__dirname, "public"), { recursive: true });
        }

        // Create a writable stream
        const writeStream = fs.createWriteStream(sitemapPath);
        const sitemapStream = new SitemapStream({ hostname: BASE_URL });

        sitemapStream.pipe(writeStream);

        // Write URLs to the sitemap stream
        pages.forEach((page) => sitemapStream.write(page));

        // Close the stream
        sitemapStream.end();

        // Wait for the stream to finish writing
        await new Promise((resolve, reject) => {
            writeStream.on("finish", resolve);
            writeStream.on("error", reject);
        });

        console.log("Sitemap generated successfully:", sitemapPath);
    } catch (error) {
        console.error("Error generating sitemap:", error);
    }
})();
