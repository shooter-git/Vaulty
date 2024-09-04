# 🔐 vaulty - Secure Clipboard PWA

<div align="center">

![Secure Clipboard PWA Logo](https://via.placeholder.com/150)

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)

A secure, lightweight Progressive Web App for managing and retrieving passwords with ease!

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Security](#-security) • [Contributing](#-contributing)

</div>

## 🌟 Features

- 🔒 **Secure Password Storage**: Store your passwords safely with strong encryption
- 📋 **One-Click Copy**: Retrieve passwords directly to your clipboard
- 🔢 **Passcode Protection**: Secure app access with a 6-12 digit passcode
- 🎲 **Password Generator**: Create strong, unique passwords with our built-in generator
- 🚀 **Progressive Web App**: Install and use offline on any device
- ⚡ **Fast and Responsive**: Built with Next.js for optimal performance
- 💾 **Lightweight Database**: Uses SQLite for simple, file-based data storage

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/secure-clipboard-pwa.git
   cd secure-clipboard-pwa
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your specific configuration:
   ```
   ENCRYPTION_KEY=your_32_byte_encryption_key
   JWT_SECRET=your_jwt_secret
   SECURE_PASSCODE=your_secure_passcode
   ```
   Make sure to replace the placeholders with secure, random values.

4. Build the application:
   ```bash
   npm run build
   ```

## 💻 Running the Application

1. Start the server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`

3. Enter the secure passcode you set in the `.env.local` file to access the app

## 📖 Usage

1. **First Run**: On first run, the app will automatically create and initialize the SQLite database.

2. **Create a New Entry**: Click the "+" button to add a new password entry.

3. **Generate a Password**: Use the built-in generator for strong, unique passwords.

4. **Copy a Password**: Click on an entry to securely copy the password to your clipboard.

5. **Auto-clear**: Clipboard contents are automatically cleared after 10 seconds for added security.

## 🔒 Security

- All passwords are encrypted using AES-256 before storage in the SQLite database
- The database file is stored locally and not synced to any cloud service by default
- HTTPS is used for all data transmissions when deployed
- Clipboard contents are automatically cleared
- JWT is used for session management
- Passcode is required to access the app

## 🛠️ Development

To run the application in development mode:

```bash
npm run dev
```

This will start the development server with hot-reloading enabled.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
made with ❤️ by shooter

[GitHub](https://github.com/yourusername) • [Website](https://yourwebsite.com)
</div>