[![Node.js CI](https://github.com/KPMP/orion-web/actions/workflows/node.js.yml/badge.svg)](https://github.com/KPMP/orion-web/actions/workflows/node.js.yml)

# orion-web
Repo for the KPMP upload tool front-end

## Documentation
Visit [kpmp.github.io/dlu](http://kpmp.io.github.io/dlu)

## Enable System Downtime message
Edit src/initialState.json and set "underMaintenance" to true
run 'npm run build'

## Development Environment
*   Create an environment file (.env) in the root of this project. See .env.example for referece.

## Windows
*   Uses <https://github.com/Angelinsky7/Docker-Volume-Watcher> for watching the host filesystem and sending linux container events via sh/bash when a file changes. Docker for Windows natively does not support this.
*   Folders/files may be ignored from watch task for faster compilations within .dvwignore file in root.

## MacOS
*   Natively supported
