const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const marked = require("marked");

// File paths
const faqJsonPath = path.join(__dirname, "faq.json");
const faqDirectory = path.join(__dirname, "faq");
const faqTxtPath = path.join(__dirname, "faq", "faq-summary.txt");

// Default values
const defaultAuthor = "Jiwon";

// Check if `faq.json` exists
if (!fs.existsSync(faqJsonPath)) {
    console.error("❌ Error: `faq.json` not found!");
    process.exit(1);
}

// Read and parse `faq.json`
let faqCategories;
try {
    faqCategories = JSON.parse(fs.readFileSync(faqJsonPath, "utf8"));
    if (!Array.isArray(faqCategories)) {
        console.warn("⚠️ Warning: `faq.json` format is incorrect.");
        process.exit(1);
    }
} catch (error) {
    console.error("❌ Error parsing `faq.json`:", error);
    process.exit(1);
}

// Debug: Log loaded FAQ categories
console.log("✅ Loaded FAQ Categories:", faqCategories.length, "categories");

// Get today's date
const today = new Date().toISOString().split("T")[0];

// Track if updates are made
let updated = false;

// **STEP 1: Scan for existing Markdown FAQ files**
const faqFiles = fs.readdirSync(faqDirectory).filter(file => file.endsWith(".md"));
const existingTitles = new Set(); // Track existing titles to detect deleted ones

faqFiles.forEach(file => {
    const filePath = path.join(faqDirectory, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const parsed = matter(fileContent); // Extract front matter metadata

    const title = parsed.data.title || file.replace(".md", ""); // Default to filename if no title
    const category = parsed.data.category || "Uncategorized"; // Default category
    const tags = parsed.data.tags || []; // Tags from front matter
    const body = parsed.content.trim(); // Extract markdown body

    const cleanedBody = body.replace(/^#+ /gm, "");
    const htmlBody = marked.parseInline(cleanedBody);

    existingTitles.add(title); // Store title as existing

    // **STEP 1.1: Remove FAQ from any previous category**
    faqCategories.forEach(cat => {
        cat.faqs = cat.faqs.filter(faq => faq.title !== title);
    });

    // **STEP 1.2: Find or create the new category**
    let categoryEntry = faqCategories.find(c => c.category === category);
    if (!categoryEntry) {
        categoryEntry = { category: category, faqs: [] };
        faqCategories.push(categoryEntry);
    }

    // **STEP 1.3: Add or update the FAQ in the correct category**
    let existingFAQ = categoryEntry.faqs.find(faq => faq.title === title);
    if (existingFAQ) {
        // **Update existing FAQ**
        existingFAQ.tags = tags;
        existingFAQ.body = htmlBody;
        existingFAQ.author = defaultAuthor;
        existingFAQ.createdDate = today;
        existingFAQ.fileName = file;
    } else {
        // **Add new FAQ if it doesn't exist**
        categoryEntry.faqs.push({
            title: title,
            slug: title.toLowerCase().replace(/\s+/g, "-"),
            tags: tags,
            body: htmlBody,
            author: defaultAuthor,
            createdDate: today,
            fileName: file
        });
    }

    updated = true;
});

// **STEP 2: Remove FAQs that no longer have corresponding Markdown files**
faqCategories.forEach(category => {
    category.faqs = category.faqs.filter(faq => existingTitles.has(faq.title));
});

// **STEP 3: Remove empty categories before saving `faq.json`**
faqCategories = faqCategories.filter(category => category.faqs.length > 0);

if (updated) {
    try {
        fs.writeFileSync(faqJsonPath, JSON.stringify(faqCategories, null, 2), "utf8");
        console.log("✅ `faq.json` updated with new/modified FAQs and removed deleted ones.");
    } catch (error) {
        console.error("❌ Error writing to `faq.json`:", error);
        process.exit(1);
    }
}

// **STEP 4: Generate FAQ Summary File**
let markdownContent = `# FAQ Summary
## Maintained by: Jiwon
## Last Updated: ${today}

| File Name       | Category     | Title                                    | Author  | Created Date |
|----------------|-------------|-----------------------------------------|---------|--------------|
`;

faqCategories.forEach(category => {
    category.faqs.forEach(faq => {
        markdownContent += `| ${faq.fileName} | ${category.category} | ${faq.title} | ${faq.author} | ${faq.createdDate} |\n`;
    });
});

// **STEP 5: Write to faq-summary.txt**
try {
    fs.writeFileSync(faqTxtPath, markdownContent, "utf8");
    console.log("🎉 성공이에요! FAQ 요약 파일이 업데이트되었습니다!");
} catch (error) {
    console.error("❌ Error writing `faq-summary.txt`:", error);
}

