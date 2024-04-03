[![Node.js CI](https://github.com/Kretzler-Lab/miktmc-uploader-web/blob/develop/.github/workflows/node.js.yml/badge.svg)](https://github.com/Kretzler-Lab/miktmc-uploader-web/blob/develop/.github/workflows/node.js.yml)

# miktmc-uploader-web
Repo for the CureGN upload tool front-end

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