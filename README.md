# 📄 PDF Custom Metadata Demo

This project is a full-stack demonstration of how to upload a PDF, inject custom **XMP metadata** using [ExifTool](https://exiftool.org/), and dynamically display the metadata in the browser — all in a **single-page interface**.

> Built for educational and professional purposes, this app showcases how metadata can be handled automatically on file upload, using modern tooling.

---

## ✨ Features

- 📤 Upload PDF via drag & drop or file selector
- 🏷️ Inject custom **XMP metadata** automatically using `exiftool-vendored`
- 🔍 Read back the metadata and display it without reloading
- 🖼️ Frontend + Backend integrated in one flow
- 🎨 Minimalist UI built with TailwindCSS
- 💡 Configurable ExifTool support for custom namespaces

---

## 🧰 Tech Stack

| Layer    | Technology                         |
| -------- | ---------------------------------- |
| Backend  | Node.js, Express, Multer           |
| Metadata | ExifTool (`exiftool-vendored`)     |
| Frontend | HTML, TailwindCSS, Vanilla JS      |
| Config   | ExifTool Custom Config (XMP-firma) |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/lobsangmercsDR/pdf-custom-metadata-demo.git
cd pdf-custom-metadata-demo
2. Install Dependencies
bash
Copiar
Editar
npm install
3. Run the Server
bash
Copiar
Editar
npm start
The server will run at http://localhost:3000

📂 Project Structure
php
Copiar
Editar
pdf-custom-metadata-demo/
├── public/
│   └── index.html            # Main frontend interface
├── uploads/                  # Temporary storage for uploaded files
├── config/
│   └── ExifTool_config       # Defines custom XMP-firma namespace
├── src/
│   └── app.ts                # Express server with metadata logic
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
🧠 How It Works
User uploads a PDF through the browser.

The server:

Saves the PDF using Multer

Executes exiftool with a custom config

Injects metadata:

XMP-dc:Title

XMP-dc:Creator

XMP-firma:custom_id

XMP-firma:project

The updated metadata is read back and encoded.

The frontend parses and displays the data in a table on the same page.

🧪 Example Metadata Output
xml
Copiar
Editar
<XMP-dc:Creator>The testing Lobster</XMP-dc:Creator>
<XMP-dc:Title>Example Metadata</XMP-dc:Title>
<XMP-firma:Custom_id>DOC-001-TEST</XMP-firma:Custom_id>
<XMP-firma:Project>Demo XMP</XMP-firma:Project>
🔧 Customizing the Metadata
Edit the fields in src/app.ts:

ts
Copiar
Editar
[
  "-XMP-dc:Title=Example Metadata",
  "-XMP-dc:Creator=The testing Lobster",
  "-XMP-firma:custom_id=DOC-001-TEST",
  "-XMP-firma:project=Demo XMP"
]
If you change the namespace (XMP-firma), be sure to update the ExifTool_config file accordingly.

📋 Requirements
Node.js v16+

Git

PDF files as input

exiftool-vendored auto-installs its own ExifTool binary

📘 Useful Commands
Run in Dev Mode with Auto-Restart
bash
Copiar
Editar
npm install -g nodemon
nodemon src/app.ts
📜 License
This project is licensed under the MIT License.

👤 Author
Developed with ❤️ by Lobsang Mercedes

Feel free to fork, extend, or contribute!
```
