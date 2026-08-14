# Legal Templates

[![build](https://github.com/remarkablemark/legal-templates/actions/workflows/build.yml/badge.svg)](https://github.com/remarkablemark/legal-templates/actions/workflows/build.yml)
[![test](https://github.com/remarkablemark/legal-templates/actions/workflows/test.yml/badge.svg)](https://github.com/remarkablemark/legal-templates/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/remarkablemark/legal-templates/graph/badge.svg?token=mlUjqBLMkr)](https://codecov.io/gh/remarkablemark/legal-templates)

📜 Generate legal documents (Terms of Service, Privacy Policy, and more) from a simple form.

- [Legal Templates](https://remarkablemark.org/legal-templates/)

## Features

- Generate 7 legal document templates: Terms of Service, Privacy Policy, Cookie Policy, Disclaimer, End-User License Agreement (EULA), Refund Policy, and Acceptable Use Policy.
- Fill out a form and see the generated document update live in a preview pane.
- Copy the generated document as Plain Text, Markdown, or HTML.
- Conditional sections (e.g. GDPR/CCPA disclosures, cookies, user accounts) are shown or hidden based on your answers, with headings renumbered automatically.
- Responsive, mobile-friendly layout with separate Form/Preview tabs on small screens.

## Install

Clone the repository:

```sh
git clone https://github.com/remarkablemark/legal-templates.git
cd legal-templates
```

Install the dependencies:

```sh
npm install
```

Copy the environment variables:

```sh
cp .env.example .env
```

## Run

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.

Open [http://127.0.0.1:5173](http://127.0.0.1:5173) to view it in the browser.

The page will reload if you make edits.

You will also see any errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.

It correctly bundles in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed!

### `npm run lint`

Checks code quality.

### `npm run lint:tsc`

Checks for type errors.

### `npm test`

Runs tests.

### `npm run test:ci`

Runs tests with coverage.

## License

[MIT](LICENSE)
