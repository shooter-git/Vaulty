# 🔐 Vaulty - Secure Password Manager & Clipboard PWA

<div align="center">

![Vaulty Logo](https://via.placeholder.com/150)

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

A secure, lightweight Progressive Web App for managing passwords and sensitive information with ease!

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Security](#-security) • [Contributing](#-contributing)

</div>

## 🌟 Features

- 🔒 **Secure Information Storage**: Safely store passwords, notes, and other sensitive data with AES-256-GCM encryption
- 📋 **Universal Secure Clipboard**: Use Vaulty as a secure clipboard for any type of sensitive information
- 🔢 **User Authentication**: Secure app access with username and password
- 🎲 **Password Generator**: Create strong, unique passwords with our built-in generator
- 📱 **Cross-Device Syncing**: Access your secure information across all your devices
- 🚀 **Progressive Web App**: Install and use offline on any device
- ⚡ **Fast and Responsive**: Built with Next.js for optimal performance
- 💾 **Lightweight Database**: Uses SQLite for simple, file-based data storage
- 🌓 **Theme Toggle**: Switch between Kali and Synthwave themes
- 🐳 **Docker Support**: Easy deployment with Docker

## 🚀 Installation

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Docker (optional, for containerized deployment)

### Environment Variables

Copy the `.env.example` file to `.env.local` and fill in the required values:

```bash
cp .env.example .env.local
```

Generate secure values for `ENCRYPTION_KEY` and `JWT_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"  # For ENCRYPTION_KEY
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"  # For JWT_SECRET
```

### Standard Installation (Non-Docker)

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/vaulty.git
   cd vaulty
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Initialize the database:
   ```bash
   npm run db:init
   ```

4. Build the application:
   ```bash
   npm run build
   ```

5. Start the server:
   ```bash
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000`

### Docker Compose Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/vaulty.git
   cd vaulty
   ```

2. Build and start the Docker container:
   ```bash
   docker-compose up -d
   ```

3. Open your browser and navigate to `http://localhost:3000`

### Docker Run Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/vaulty.git
   cd vaulty
   ```

2. Build the Docker image:
   ```bash
   docker build -t vaulty .
   ```

3. Run the Docker container:
   ```bash
   docker run -d -p 3000:3000 \
     -e ENCRYPTION_KEY=your_encryption_key \
     -e JWT_SECRET=your_jwt_secret \
     -v $(pwd)/secure_clipboard.sqlite:/app/secure_clipboard.sqlite \
     --name vaulty \
     vaulty
   ```

4. Open your browser and navigate to `http://localhost:3000`

## 💻 Usage

1. **Sign Up/Login**: Create a new account or log in to an existing one.

2. **Add New Entry**: Click the "Add Entry" button to add a new password or any sensitive information.

3. **Generate a Password**: Use the built-in generator for strong, unique passwords when needed.

4. **Copy Information**: Click on an entry to securely copy the stored information to your clipboard.

5. **Edit/Delete Entries**: Manage your stored information with easy edit and delete functions.

6. **Use as Secure Clipboard**: 
   - For temporary storage: Add sensitive information as a new entry.
   - To retrieve: Copy the information to your clipboard and use it where needed.
   - For security: The clipboard is automatically cleared after 10 seconds.

7. **Theme Toggle**: Switch between Kali and Synthwave themes using the toggle in the navbar.

## 🔒 Security

- All sensitive information (not just passwords) is encrypted using AES-256-GCM before storage
- The database file is stored locally and not synced to any cloud service by default
- HTTPS is used for all data transmissions when deployed
- Clipboard contents are automatically cleared after 10 seconds
- JWT is used for session management
- Information is never stored in plain text
- End-to-end encryption is implemented for all sensitive data
- Biometric access is available on supported devices (e.g., Face ID on iOS)

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
Made with ❤️ by shooter

[GitHub](https://github.com/shooter-git)
</div>