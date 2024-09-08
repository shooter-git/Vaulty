# 🔐 Vaulty - Secure Password Manager PWA

<div align="center">

![Vaulty Logo](https://via.placeholder.com/150)

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)

A secure, lightweight Progressive Web App for managing and retrieving passwords with ease!

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Security](#-security) • [Contributing](#-contributing)

</div>

## 🌟 Features

- 🔒 **Secure Password Storage**: Store your passwords safely with AES-256-GCM encryption
- 📋 **One-Click Copy**: Retrieve passwords directly to your clipboard
- 🔢 **User Authentication**: Secure app access with username and password
- 🎲 **Password Generator**: Create strong, unique passwords with our built-in generator
- 🚀 **Progressive Web App**: Install and use offline on any device
- ⚡ **Fast and Responsive**: Built with Next.js for optimal performance
- 💾 **Lightweight Database**: Uses SQLite for simple, file-based data storage
- 🌓 **Theme Toggle**: Switch between Kali and Synthwave themes

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/vaulty.git
   cd vaulty
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
   ```bash
   NEXT_PUBLIC_ENCRYPTION_KEY=your_64_character_hex_key_here
   JWT_SECRET=your_jwt_secret_here
   ```
   Generate these values using:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"  # For NEXT_PUBLIC_ENCRYPTION_KEY
   node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"  # For JWT_SECRET
   ```

4. Initialize the database:
   ```bash
   node update-schema.js
   ```

5. Build the application:
   ```bash
   npm run build
   ```

## 💻 Running the Application

1. Start the server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`

3. Sign up for a new account or log in if you already have one

## 📖 Usage

1. **Sign Up/Login**: Create a new account or log in to an existing one.

2. **Add a New Password**: Click the "Add Password" button to add a new password entry.

3. **Generate a Password**: Use the built-in generator for strong, unique passwords.

4. **Copy a Password**: Click on an entry to securely copy the password to your clipboard.

5. **Edit/Delete Passwords**: Manage your stored passwords with easy edit and delete functions.

6. **Theme Toggle**: Switch between Kali and Synthwave themes using the toggle in the navbar.

## 🔒 Security

- All passwords are encrypted using AES-256-GCM before storage in the SQLite database
- The database file is stored locally and not synced to any cloud service by default
- HTTPS is used for all data transmissions when deployed
- Clipboard contents are automatically cleared after 10 seconds
- JWT is used for session management
- Passwords are never stored in plain text
- End-to-end encryption is implemented for all sensitive data

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

[GitHub](https://github.com/shooter-git)
</div>