# 🔐 Vaulty - Secure Clipboard PWA

<div align="center">

![Vaulty Logo](https://via.placeholder.com/150)

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

A secure, lightweight Progressive Web App for managing passwords and sensitive information with ease!

[Features](#-features) • [Installation](#-installation-and-setup) • [Usage](#-usage) • [Security](#-security) • [Contributing](#-contributing)

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

## 🚀 Installation and Setup

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Docker (optional, for containerized deployment)

### Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/shooter-git/vaulty.git
   cd vaulty
   ```

2. Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

3. Open `.env.local` in a text editor and update the values:

   - Generate a secure `ENCRYPTION_KEY` (64-character hex string):
     ```bash
     node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
     ```
   - Generate a secure `JWT_SECRET`:
     ```bash
     node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
     ```
   - Generate a `NEXT_PUBLIC_ENCRYPTION_KEY` (32-byte encryption key):
     ```bash
     node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
     ```
   - Set these values in your `.env.local` file, along with any other required environment variables.

### Docker Installation (Recommended)

#### Option 1: Using Docker Compose

1. Ensure Docker and Docker Compose are installed on your system.

2. Create a named volume for persistent data storage:
   ```bash
   docker volume create vaulty-data
   ```

3. Build and start the Docker container:
   ```bash
   docker compose up -d
   ```

4. The application will be available at `http://localhost:3010`

#### Option 2: Using Docker Run

1. Ensure Docker is installed on your system.

2. Create a named volume for persistent data storage:
   ```bash
   docker volume create vaulty-data
   ```

3. Build the Docker image:
   ```bash
   docker build -t vaulty .
   ```

4. Run the Docker container:
   ```bash
   docker run -d -p 3010:3010 \
     --env-file .env.local \
     -v vaulty-data:/app/data \
     -v $(pwd)/.env.local:/app/.env.local:ro \
     --name vaulty \
     vaulty
   ```

5. The application will be available at `http://localhost:3010`

### Standard Installation (Non-Docker)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Initialize and update the database:
   ```bash
   npm run db:init
   npm run db:update
   ```

3. Build the application:
   ```bash
   npm run build
   ```

4. Start the server:
   ```bash
   npm run start:with-db
   ```

5. Open your browser and navigate to `http://localhost:3010`

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

## 📦 Data Persistence

The application uses a Docker named volume `vaulty-data` to store the SQLite database. This ensures that your data persists even if the Docker container is stopped or removed.

To backup the database:

1. Stop the running container:
   ```
   docker compose down
   ```

2. Create a backup of the volume:
   ```
   docker run --rm -v vaulty-data:/dbdata -v $(pwd):/backup alpine tar cvf /backup/vaulty-backup.tar /dbdata
   ```

   This will create a backup file named `vaulty-backup.tar` in your current directory.

To restore from a backup:

1. Ensure the container is not running:
   ```
   docker compose down
   ```

2. Restore the backup:
   ```
   docker run --rm -v vaulty-data:/dbdata -v $(pwd):/backup alpine sh -c "rm -rf /dbdata/* /dbdata/..?* /dbdata/.[!.]* ; tar xvf /backup/vaulty-backup.tar"
   ```

3. Start the container:
   ```
   docker compose up -d
   ```

Always ensure you have recent backups of your data, especially before performing updates or maintenance on the application.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
Made with ❤️ by shooter

[GitHub](https://github.com/shooter-git)
</div>
