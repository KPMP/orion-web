[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b7c3c2e2642c4f6780de82e1ee6aef50)](https://www.codacy.com/manual/rlreamy/orion-web?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=KPMP/orion-web&amp;utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/KPMP/orion-web.svg?branch=develop)](https://travis-ci.org/KPMP/orion-web)

# orion-web
Repo for the KPMP upload tool front-end

## Development Environment
* Create an environment file (.env) in the root of this project. See .env.example for referece.

## Windows
* Uses <https://github.com/Angelinsky7/Docker-Volume-Watcher> for watching the host filesystem and sending linux container events via sh/bash when a file changes. Docker for Windows natively does not support this.
* Folders/files may be ignored from watch task for faster compilations within .dvwignore file in root.

## MacOS
* Natively supported
