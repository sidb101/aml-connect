# Aspinity AnalogML™ Connect

## Overview

Aspinity AnalogML Connect is a cutting-edge software platform designed to revolutionize the way IoT applications process
analog signals by leveraging Aspinity's AML100 chip. This platform introduces an innovative approach to allow engineers
to design networks graphically and test them which will ultimately run on Aspinity's AML100 chip to enable event
detection and classification by processing data in the analog domain, significantly reducing power consumption for the
user's application.

## Tech Stack

- **Tauri**
    - **Purpose**
        - Tauri is a framework for building lightweight, cross-platform desktop applications using web
          technologies.
    - **How It's Used**
        - In this project, Tauri is being used to create a desktop application for the end user. It allowed us to use
          web-based UI technologies (React and Typescript) to build the frontend, which is then compiled into a native
          application that is secure, efficient, and lightweight.
    - **Benefits**
        - Tauri applications are typically smaller and more resource-efficient than those built with some other
          frameworks, like Electron (which we initially considered but decided against given the performance benefits
          that Tauri provides). It's also designed with security in mind.

- **Rust**
    - **Purpose**
        - Rust is a systems programming language known for its focus on safety and performance.
    - **How It's Used**
        - Rust is used as the backend language for the project. It can handle the performance-critical parts
          of the application, especially where safe concurrency or interaction with low-level system resources is
          required.
    - **Benefits**
        - Rust offers memory safety without a garbage collector, helping to avoid common bugs that can be present in
          other systems languages. It's also very fast and efficient.
- **React**
    - **Purpose**
        - React is a popular JavaScript library for building user interfaces, particularly single-page applications.
    - **How It's Used**
        - React is used as the frontend language for the project. It is used to build the interactive elements of the
          AnalogML Connect which the user sees.
    - **Benefits**
        - React’s component-based architecture makes it easy to reuse code and manage state across large applications.
          It’s also supported by a large community and has a rich ecosystem of tools and libraries.
- **Typescript**
    - **Purpose**
        - TypeScript is a superset of JavaScript that adds static types to the language.
    - **How It's Used**
        - TypeScript is used in the frontend (with React), providing a more structured and error-resistant coding
          environment than plain JavaScript.
    - **Benefits**
        - It helps catch errors early through its type system and makes the code more readable and maintainable.
- **Vite**
    - **Purpose**
        - Vite is a modern frontend build tool that significantly improves the development experience.
    - **How It's Used**
        - Vite is being used to serve, bundle, and build the React and Typescript that the project is using in the
          frontend.
    - **Benefits**
        - Vite offers a fast development server with Hot Module Replacement (HMR). It's designed to provide a faster and
          leaner development experience compared to older tools like Webpack.

## Backend Setup
### Pre-requisites (in Windows)

- [Microsoft Visual Studio C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
- [Rust](https://www.rust-lang.org/tools/install) (recommended version 1.72.1, using rustup as the installer)
- Cargo (recommended version 1.72.1, would be installed along with Rust if using rustup)
- [Tauri CLI](https://tauri.app/v1/guides/getting-started/setup/html-css-js) (use `cargo install tauri-cli`)

Rust source code is located in the src-tauri directory. The application has been tested with rust version 1.72.1.
The application has been packaged using Tauri, and rust packages are managed using Tauri.

To run the integration tests, use a single thread since integration tests may use the same database (This should be
considered technical debt, and fixed before the project becomes larger).
Integration tests are located in the ```src-tauri/tests``` folder and the external resources required for the test are
in ```src/test_resources```. As per rust conventions unit tests are located with the code, in the same file.
Tarpaulin is used to generate coverage reports with command ```cargo test --test integration_test -- --test-threads 1```

```bash
cargo test --test integration_test project_integration_tests network_integration_test -- --test-threads 1
```

### Database Setup

We are using Sqlite to run the application.

- Ensure that you have rust version > 1.65
- Install sqlite3 for your operating system. Ensure that you have the latest version of sqlite (3.42). You might need to
  download the binary directly from the website. Debian seems to have an outdated version as of 7/31/2023.
- Install Diesel CLI. It is being used as our ORM Default installation will fail if it cannot find sqlite, mysql, and
  postgresql installed. To avoid this ask it explicilty to not check for mysql and postgres

```bash
cargo install diesel_cli --no-default-features --features "sqlite"
```

- The default DB location is based on your operating system as show below. The path can be overwritten by defining the
  DATABASE_PATH variable in .env

| Operating System | Location                                                                   | Example                                                           |   |   |
|------------------|----------------------------------------------------------------------------|-------------------------------------------------------------------|---|---|
| Linux            | `$XDG_DATA_HOME`/`_project_path_` or `$HOME`/.local/share/`_project_path_` | /home/gaurav/.local/share/aml_connect                             |   |   |
| macOS            | `$HOME`/Library/Application Support/`_project_path_`                       | Users/Gaurav/Library/Application Support/com.aspinity.aml_connect |   |   |
| Windows          | `{FOLDERID_LocalAppData}`\\`_project_path_`                         | C:\Users\Gaurav\AppData\Local\com.aml-connect.aspinity          |   |   |

- **All the below commands should be run inside the src-tauri folder**

- To create a new database table run

```bash
diesel migration generate name_of_table
```

- To set up the database during development(only needed when modifying database) run

```bash
diesel migration run --database-url test.db
```

- To interact with the database locally use

```bash
sqlite3 test.db
```

## Frontend Setup

Frontend source code (React with typescript) is located in the `src` directory. The application has been tested with typescript version 5.2.2, npm version 10.2.3 and node.js version 20.8.0. The application uses Vite as the frontend build tool (see Tech Stack discussion above).

### Node Installation

The best way to install a specific version of Node in is through a tool called `nvm`. 

#### Steps:


1. Windows : Install the latest `nvm` installer from [here](https://github.com/coreybutler/nvm-windows).

2. Ubuntu: Install the latest `nvm` using below command:
```bash
  sudo apt install curl 
  curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash 
```

3. Install the required node version using command
```bash
  nvm install v20.8.0
  nvm use v20.8.0
```
4. `npm` would be installed automatically along with node

### Dependencies Installation

1. **Install Dependencies:** Navigate to the root directory of the project and run the following command to install all required npm packages (including TypeScript)

```bash
npm install
```

### Running the Development Server

1. To start the development server, use the following command. This will start the Vite development server with hot module replacement enabled and the required backend:

> Important:  Make sure to have setup backend dev environment before running below command

```bash
cargo tauri dev
```

### Testing

1. To run the frontend test suite, use the following command.

```bash
npm run test
```

### Linting and Formatting

1. To ensure code consistency, use ESLint for linting and Prettier for formatting:

**Linting:** To check for linting errors:

```bash
npm run lint
```

**Linting with Fix:** To automatically fix linting errors:

```bash
npm run lint-fix
```

**Formatting:** To format your code using Prettier:

```bash
npm run format
```
