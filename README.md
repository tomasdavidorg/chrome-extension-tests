# Kogito Google Chrome extension tests
Integration tests for Kogito Chrome extrension. Uses selenium to test the kogito plugin in Chrome browser.

## Installation
1. Install npm

```
sudo dnf install npm -y
```
2. Install project dependencies
###
```
npm install
```

3. Add chrome driver to path

Download chromedriver from https://chromedriver.chromium.org/downloads.
```
unzip chromedriver_linux64.zip
export PATH=/path/to/chromedriver:$PATH
```

4. Run tests

Tests need UNZIPPED_CHROME_EXTENSION_PATH env. variable to be set to directory with unzipped Chome Extension.
```
unzip tmp/chrome_extension_kogito_kie_editors_0.4.2.zip
export UNZIPPED_CHROME_EXTENSION_PATH=dist 
npm run tests
```

## Code style
Run code style check
```
npm run lint
```

## Repository strucure

| File / directory     | Description                                     |
| -------------------- | ----------------------------------------------- |
| `.github/workflows/` | Configurations of GitHub automated process      |
| `test/`              | Tests and test framework                        |
| `tmp/`               | Temporary directory for Chrome extension plugin |
| `.eslintrc`          | Code style configuration                        |
| `.gitignore`         | List of files ignored by git                    |
| `README.md`          | This README file                                |
| `package.json`       | Main declaration file                           |
| `tsconfig.json`      | TypeScript configuration file                   |

## Framework

TODO