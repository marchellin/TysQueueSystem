# 🏥 Puskesmas Queue Management System

A lightweight, automated queue calling system built specifically for Indonesian Public Health Centers (Puskesmas). This web application utilizes the browser's built-in **Text-to-Speech (TTS)** technology to announce patient queue numbers naturally in Indonesian.

## ✨ Key Features

- **🗣️ Natural Voice Announcement**: Reads queue numbers using natural Indonesian pronunciation (e.g., "kosong satu", "kosong lima belas", "seratus dua puluh") via the Web Speech API.
- **💾 Auto-Save (Local Storage)**: The current queue number is automatically saved in the browser's memory. The queue won't reset to 0 even if the computer loses power or the app is closed.
- **🎨 Premium Design (Glassmorphism)**: A modern, clean, and visually pleasing user interface designed for a comfortable user experience.
- **⚡ Zero Server Installation (Frontend Only)**: Runs 100% on the client-side (HTML, CSS, JS). No database, PHP, or Node.js required. Simply double-click to run!
- **🛡️ Secure Reset Confirmation**: Includes a custom pop-up modal to prevent staff from accidentally resetting the queue counter.
- **🚀 Kiosk/App Mode Launcher**: Comes with a `BUKA_APLIKASI.bat` launcher that opens the system as a standalone desktop application (without browser tabs or URL bars), making it extremely user-friendly for non-technical staff.

## 🛠️ Technology Stack

- **HTML5** & **CSS3** (Pure custom styling, responsive and lightweight)
- **Vanilla JavaScript** (ES6+ for logic and DOM manipulation)
- **Web Speech API** (For Text-to-Speech engine)
- **Google Fonts** (Outfit) & **Material Icons**

## 💻 How to Use (Installation)

1. Clone this repository or download the source code (Download ZIP).
   ```bash
   git clone https://github.com/Maoelan/sistem-panggilan-puskesmas.git
   ```
2. **The Easiest Way:**
   Simply double-click the `BUKA_APLIKASI.bat` file. Your computer will automatically launch the application in *Standalone Window* mode using Google Chrome/Edge.
3. **Install to Desktop (PWA via Chrome):**
   - Open `index.html` using Google Chrome.
   - Click the three-dot menu in the top right corner of Chrome -> **Save and Share** -> **Create Shortcut**.
   - Check the **Open as window** option, then click Create. The Puskesmas logo icon will automatically appear on your Desktop and Taskbar, ready to use.

## 📥 System Requirements
- A modern web browser (Latest version of **Google Chrome** is highly recommended).
- An Indonesian *Voice Pack* installed on Windows (usually named *Microsoft Andika*, *Microsoft Gadis*, or *Google Bahasa Indonesia*) to ensure the queue announcements sound natural.

---
*Built to simplify services and accelerate queue management in public health centers.*
