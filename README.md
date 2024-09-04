# 🔐 Secure Clipboard PWA

<div align="center">

![Secure Clipboard PWA Logo](https://via.placeholder.com/150)

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)

A secure, lightweight Progressive Web App for managing and retrieving passwords with ease!

[Features](#-features) • [Getting Started](#-getting-started) • [Usage](#-usage) • [Security](#-security) • [Contributing](#-contributing)

</div>

## 🌟 Features

- 🔒 **Secure Password Storage**: Store your passwords safely with strong encryption
- 📋 **One-Click Copy**: Retrieve passwords directly to your clipboard
- 🔢 **Passcode Protection**: Secure app access with a 6-12 digit passcode
- 🎲 **Password Generator**: Create strong, unique passwords with our built-in generator
- 🚀 **Progressive Web App**: Install and use offline on any device
- ⚡ **Fast and Responsive**: Built with Next.js for optimal performance

## 🚀 Getting Started

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
   Edit `.env.local` with your specific configuration.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action!

## 📖 Usage

1. **Create a New Entry**: Click the "+" button to add a new password entry
2. **Generate a Password**: Use the built-in generator for strong, unique passwords
3. **Copy a Password**: Click on an entry to securely copy the password to your clipboard
4. **Auto-clear**: Clipboard contents are automatically cleared after 10 seconds for added security

## 🔒 Security

- All passwords are encrypted using AES-256 before storage
- HTTPS is used for all data transmissions
- Clipboard contents are automatically cleared
- Rate limiting protects against brute force attacks

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
made with ❤️ by shooter

[GitHub](https://github.com/yourusername) • [Website](https://yourwebsite.com)
</div>
