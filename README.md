# Suppliers Frontend

**Suppliers** is a web application designed to streamline the supplier due diligence process. As developers, we have created this platform with the aim of allowing users to input crucial information about suppliers and carry out an automated data screening process against high-risk lists to identify potential risky associations.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your local machine. You can download and install them from [here](https://nodejs.org/).
- Basic understanding of React.js and Next.js framework.

## Environment Variables

1. Create a `.env` file in the root directory of the project.
2. Copy the contents from `.env-sample` and paste them into `.env`.
3. Fill in the values for each variable in the `.env` file.

Here is an example of what your `.env` file should look like:

```plaintext
NEXT_PUBLIC_API_KEY=
NEXT_PUBLIC_AUTH_DOMAIN=
NEXT_PUBLIC_PROJECT_ID=
NEXT_PUBLIC_STORAGE_BUCKET=
NEXT_PUBLIC_MESSAGING_SENDER_ID=
NEXT_PUBLIC_APP_ID=

NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_HIGH_RISK_API_URL=
```
> Make sure to replace the values with your actual API keys and URLs.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/suppliers-ey/suppliers-frontend.git
   ```

2. Navigate into the project directory:
    ```bash
    cd  suppliers-frontend
    ```

3. Install the dependencies using npm:
    ```bash
    npm install
    ```
## Usage
Once you have installed the dependencies, you can start the development server and explore the project.

To start the development server, run the following command:

```
npm run dev
```

This will start the development server on http://localhost:3000. You can now view the Suppliers project in your web browser.

