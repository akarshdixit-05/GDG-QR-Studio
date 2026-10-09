# GDG QR Studio

A QR Code Generator and Designer built for the GDG on Campus SRM Technical Recruitment 2026–27 task.

**Live Demo:** https://gdg-qr-studio.vercel.app

## Features

- Generate QR codes for URLs, plain text, email, phone numbers, and Wi-Fi.
- Customize QR size, foreground and background colours, error correction, and margin.
- View QR codes in a live preview.
- Download QR codes as PNG images.
- Save recent QR configurations and reuse or delete them.
- Validate user inputs and display basic contrast warnings.
- Store recent QR configurations in browser localStorage.

## Screenshots

### Live Preview

![Live QR Preview](screenshots/live-preview.png)

### QR Customization

![QR Customization](screenshots/customization.png)

### Supported QR Types

![QR Types](screenshots/qr-types.png)

### Recent QR Codes

![Recent QR Codes](screenshots/recent-qr.png)

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- qrcode library
- Browser localStorage

## Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/akarshdixit-05/GDG-QR-Studio.git
   ```

2. Enter the project directory:

   ```bash
   cd GDG-QR-Studio
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in the terminal.

## Deployment

The application is deployed using Vercel:

https://gdg-qr-studio.vercel.app

## Storage Note

Recent QR configurations are stored in the browser's localStorage. They persist across page refreshes in the same browser unless the stored data is cleared.
