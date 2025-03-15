# Awesome Markdown FAQ

A lightweight, scalable, and customizable FAQ system built with Eleventy and Tailwind CSS, designed to help teams manage frequently asked questions efficiently.

## Features
- **Markdown-based** FAQ management – Easily add, edit, or remove FAQs in `.md` format.
- **Automated category sorting** – No manual updates; categories and entries auto-adjust dynamically.
- **Search functionality** – Instant, client-side search powered by Alpine.js.
- **Eleventy-powered static site generation** – Fast, lightweight, and easy to deploy.
- **Tailwind CSS for stylin**g – Fully customizable design with minimal effort.
- **Framework-agnostic** – No backend required; deploy as a static site anywhere.

## Installation

Ensure you have Node.js and Yarn installed. Then, run:

```
git clone https://github.com/jiwon-lieb/faq_md.git
cd faq_md
yarn install
```

## Usage

### 1. Run the development server

```
yarn start
```

This will start a local Eleventy server for previewing the FAQ page.

### 2. Build for production

```
yarn build
```

Generates a static site in the `_site/` directory.

### 3. Update FAQ entries

```
yarn update
```

Automatically processes Markdown FAQ files, updates categories, and generates a summary file.

## Project Structure

```
faq_md/
│── faq/                 # Markdown FAQ files
│── assets/              # Static assets (images, icons, etc.)
│── _site/               # Output directory for the generated site
│── search.html          # Search results page
│── index.html           # Main FAQ page
│── generate_faq.js      # Script for processing Markdown files
│── .eleventy.js         # Eleventy configuration
│── package.json         # Project dependencies & scripts
│── README.md            # Project documentation
```

## License

This project is licensed under the MIT License – free to use, modify, and distribute.

## Contributing

Contributions are welcome! Feel free to fork, submit issues, or create pull requests.

## Author

Jiwon Kwak
📧 contact@jiwonkwak.co
🌐 jiwonkwak.co
