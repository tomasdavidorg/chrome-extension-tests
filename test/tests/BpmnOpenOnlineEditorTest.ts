/*
 * Copyright 2021 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { By } from "selenium-webdriver";
import Tools from "../utils/Tools";

const TEST_NAME = "BpmnOpenOnlineEditorTest";

let tools: Tools;

beforeEach(async () => {
  tools = await Tools.init(TEST_NAME);
});

afterEach(async () => {
  await tools.finishTest();
});

test(TEST_NAME, async () => {
  // open sample bpmn
  await tools.open(
    "https://github.com/kiegroup/kogito-tooling/tree/master/packages/chrome-extension-pack-kogito-kie-editors/it-tests/samples/test.bpmn"
  );

  // click open online editor button
  const openOnlineEditorButton = await tools.find(By.css("[data-testid='open-ext-editor-button']")).getElement();
  await openOnlineEditorButton.click();
  await tools.window().switchToSecondWindow();

  // wait and get kogito iframe
  await tools.command().getEditor();

  // wait util loading dialog disappears
  await tools.command().loadEditor();

  // test basic bpmn editor functions
  await tools.command().testSampleBpmnInEditor();

  // check process name on the top
  await tools.window().leaveFrame();
  const titleName = await tools.find(By.css("[data-testid='toolbar-title'] > input")).getElement();
  expect(await titleName.getAttribute("value")).toEqual("test");
});
