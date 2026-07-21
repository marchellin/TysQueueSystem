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

## 📱 Mobile Support & Troubleshooting
If you deploy this application (e.g., via Vercel) and open it on a mobile device, you might notice that the voice sounds like a foreigner (English accent) instead of Indonesian. This happens because the Indonesian Voice Data is not set up properly on the phone's OS.

**How to fix on Android:**
1. Open **Settings** on your phone.
2. Search for **Text-to-speech** (or "Keluaran teks-ke-suara").
3. Ensure the **Preferred engine** is set to **Speech Services by Google** (not Samsung TTS or Xiaomi TTS).
4. Click the **Settings (Gear icon)** next to the engine name -> **Install voice data**.
5. Find **Indonesian (Indonesia)** and download the voice pack if it's not installed.
6. Force close your browser (swipe up from recent apps), reopen the web app, and try again!

---
*Built to simplify services and accelerate queue management in public health centers.*
