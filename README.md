# Kogito Google Chrome extension tests

Integration tests for Kogito Chrome extrension. Uses selenium to test the Kogito plugin in Chrome browser.

## Installation

1. Install yarn

```
sudo dnf install yarnpkg -y
```

2. Install project dependencies

###

```
yarn install
```

3. Run tests

Tests need UNZIPPED_CHROME_EXTENSION_PATH environment variable to be set to directory with unzipped Chome Extension.

```
unzip tmp/chrome_extension_kogito_kie_editors_0.8.6.zip
export UNZIPPED_CHROME_EXTENSION_PATH=dist
yarn run tests
```

## Code style

Run code style check

```
yarn run lint
```

## Repository strucure

| File / directory | Description                                |
| ---------------- | ------------------------------------------ |
| `test/samples/`  | Test BPMN and DMN files.                   |
| `test/tests/`    | Test directory contains only test classes. |
| `test/utils/`    | Test utils contains other testing tools.   |
| `README.md`      | This README file                           |

## Basic test structure

```typescript
import Tools from "../utils/Tools";

const TEST_NAME = "Simple_test";

let tools: Tools;

beforeEach(async () => {
  tools = await Tools.init();
});

test(TEST_NAME, async () => {
  // ...

  await tools.open(url);

  // ...
});

afterEach(async () => {
  await tools.finishTest(TEST_NAME);
});
```

## Framework

- `Tools` class shoud be inicialized before every test by `let tools = await Tools.init(TEST_NAME)`. It creates selenium driver and it serves as basic entry point for the test. After every test `finishTest()` method should be called to quit the driver and create screenshots.
- `Element` class represents element on Page. Element can be created by:
  - Find by locator: `await tools.find(locatorBy).getElement()`
  - Waiting for element: `await tools.find(locatorBy).wait(1000).untilPresent()`
  - Using parent element: `const parent: Element = await tools.find(parentLocatorBy).getElement(); await parent.findElement(childLocatorBy)`
