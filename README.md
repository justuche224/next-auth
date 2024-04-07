# Secure Backend Application with User Authentication (Next.js)

## Project Description

This project provides a secure and robust foundation for building backend applications with user authentication. It leverages the power of Next.js for server-side rendering and API routes, along with NextAuth.js for streamlined user authentication functionalities.

## Features

- User registration with email and password (including account activation via email link)
- OAuth login providers (Google, Github, and more )
- Secure password hashing with MongoDB storage for enhanced security
- Forgot password functionality with recovery link sent via email for user convenience

## Getting Started

**Prerequisites:**

- Node.js and npm (or yarn) installed on your system.

**Installation:**

1. Clone this repository:

   ```bash
   git clone https://github.com/justuche224/next-auth.git

   ```

2. Install dependencies:

   ```bash
   npm install

   ```

3. Configure environment variables:

   1. Create a `.env` file in the project root directory.
   2. Add the following environment variables with your specific details:

| Variable Name           | Description                                                            |
| ----------------------- | ---------------------------------------------------------------------- |
| `MONGO_URL`             | Your MongoDB connection string                                         |
| `NEXTAUTH_URL`          | Your application URL                                                   |
| `NEXTAUTH_URL_INTERNAL` | Your internal application URL (optional)                               |
| `NEXTAUTH_SECRET`       | A secret key used for authentication                                   |
| `GITHUB_ID`             | Your GitHub client ID (if you want sign in with github)                |
| `GITHUB_SECRET`         | Your GitHub client secret (if you want sign in with github)            |
| `EMAIL_USERNAME`        | Username for the email account used for sending emails (if applicable) |
| `EMAIL_PASSWORD`        | Password for the email account used for sending emails (if applicable) |
| `CLIENT_URL`            | Your client application URL                                            |
| `MAILGUN_API_KEY`       | Your Mailgun API key (if using Mailgun for emails)                     |
| `MAILGUN_DOMAIN`        | Your Mailgun domain (if using Mailgun for emails)                      |

**Note:** Securely store these environment variables. Consider using a tool like dotenv for managing them.

4. Run the development server:
   ```bash
   npm run dev
   ```

## Usage

This project provides well-defined API routes for user authentication functionalities. Refer to the NextAuth.js documentation (https://next-auth.js.org/) for detailed usage instructions on these routes.

## Contributing

We welcome contributions to this project! Please see the CONTRIBUTING.md file for details on how to get involved and contribute code.
