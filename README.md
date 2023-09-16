# Aspinity AnalogML™ Connect

- Description: blah
- Tech Stack: Tauri, Rust, React, Typescript, Vite

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## Database

We are using Sqlite to run the application.

- Ensure that you have rust version > 1.65
- Install sqlite3 for your operating system.
- Install Diesel CLI. It is being used as our ORM Default installation will fail if it cannot find sqlite, mysql, and postgresql installed. To avoid this ask it explicilty to not check for mysql and postgres

```bash
cargo install diesel_cli --no-default-features --features "sqlite"
```

- The default DB location is based on your operating system as show below. The path can be overwritten by defining the DATABASE_PATH variable in .env

| Operating System | Location                                                                   | Example                                                           |   |   |
|------------------|----------------------------------------------------------------------------|-------------------------------------------------------------------|---|---|
| Linux            | `$XDG_DATA_HOME`/`_project_path_` or `$HOME`/.local/share/`_project_path_` | /home/gaurav/.local/share/aml_connect                             |   |   |
| macOS            | `$HOME`/Library/Application Support/`_project_path_`                       | Users/Gaurav/Library/Application Support/com.aspinity.aml_connect |   |   |
| Windows          | `{FOLDERID_LocalAppData}`\\`_project_path_`\\data                          | C:\Users\Gaurav\AppData\Local\Aspinity\Aml_Connect\data           |   |   |

- **All the below commands should be run inside the src-tauri folder**

- To create a new database table run

```bash
diesel migration generate name_of_table
```

- To setup the database during development(only needed when modifying database) run

```bash
diesel migration run --database-url test.db
```

- To interact with the database locally use

```bash
sqlite3 test.db
```
