# WaveMaker Page CLI

A command-line tool to scaffold new pages in your WaveMaker project quickly. This CLI generates a new page folder under `src/pages` with boilerplate files and automatically updates configuration files.

## Features

- **Folder & File Generation:**  
  Creates a new folder for your page (e.g. `src/pages/NewPage`) and generates the following files with default boilerplate code:

  - `NewPage.component.js`
  - `NewPage.script.js`
  - `NewPage.style.js`
  - `NewPage.variables.js`

- **Configuration Updates:**  
  Automatically updates:
  - `src/pages/pages.config.js` to register the new page component.
  - `src/app.variables.js` to add a new navigation action (e.g. `goToPage_NewPage`).

## Installation

Ensure you have Node.js and npm installed. Then install the CLI globally:

```bash
npm install -g wavemaker-page-cli
```

## Usage

Once installed, run the command followed by the desired page name:

```bash
create-page <PageName>
```

For example, to create a page called NewPage:

```bash
create-page NewPage
```

This will:

Create a folder at `src/pages/NewPage`.
Generate boilerplate files inside that folder.
Update the `pages.config.js` and `app.variables.js` files with new entries for the page.

## Development

To test changes locally, clone this repository and then run:

```bash
npm install
npm link
```

This will link your local CLI so you can run create-page <PageName> from anywhere within your system.

## Publishing

To publish your updates to npm:

Update the version in package.json (e.g. using npm version patch).

Log in using:

```bash
npm login
```

Publish the package:

```bash
npm publish
```

## Contributing

Contributions, bug reports, and feature requests are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
