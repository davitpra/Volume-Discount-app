# ShipReady: Production-Ready Shopify Remix App Template

ShipReady is a comprehensive, production-ready template for building Shopify apps using the Remix framework. It's designed to accelerate your Shopify app development process, providing a robust foundation with pre-built features and best practices.

## Features

- **Shopify Integration**: Seamless integration with Shopify's API, including authentication, webhooks, and App Bridge.
- **Remix Framework**: Leverages the power of Remix for server-side rendering and optimal performance.
- **Pre-built Components**: Utilizes Shopify Polaris for a consistent, user-friendly interface.
- **Database Setup**: Includes Prisma ORM setup with SQLite (easily adaptable to other databases).
- **Billing Integration**: Ready-to-use subscription and one-time purchase billing models.
- **Webhook Handling**: Pre-configured webhook listeners for key Shopify events.
- **Analytics**: Basic analytics setup to track app usage and performance.
- **Comprehensive Documentation**: Extensive in-app documentation and video tutorials.

## Quick Start

### Prerequisites

1. **Node.js**: [Download and install](https://nodejs.org/en/download/) (v14 or later recommended)
2. **Shopify Partner Account**: [Create an account](https://partners.shopify.com/signup)
3. **Shopify CLI**: Install via npm `npm install -g @shopify/cli @shopify/app`

### Setup

1. Clone the repository:

    ```bash
      git clone https://github.com/your-repo/shipready.git
      cd shipready
    ```

2. Install dependencies:
  
      ```bash
        npm install
      ```

3. Create `.env` file from `.env.example` in the root folder with your app's credentials.

4. You can skip this step, only if it's your first time setup. If your `.toml` file is different form `shopify.app.toml` update [access_scopes] and [app_proxy] from `shopify.app.toml`, then run:

      ```bash
        npm run deploy
      ```

5. Start the development server:
  
      ```bash
        npm run dev
      ```

6. Open the provided URL to install and test your app in a development store.

7. For seeding your db run : (optional)
      ```bash
      npm run prisma db seed
      ```
## Documentation

Comprehensive documentation is available within the app. After installation, navigate to the "Docs" section in the app dashboard.

## Video Tutorials

Access our extensive library of video tutorials covering everything from basic setup to advanced app development techniques. Find these in the "Video Tutorials" section of the app.

## Deployment

ShipReady is designed to be easily deployable to various cloud platforms. For detailed deployment instructions, refer to our [Deployment Guide](link-to-deployment-guide).



ShipReady - Empowering Shopify developers to build and launch apps faster than ever before.
