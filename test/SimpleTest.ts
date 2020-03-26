import { expect } from "chai";
import Tools from './utils/Tools';
import GitHubListPage from "./framework/github-file-list/GitHubListPage";
import GitHubListItem from './framework/github-file-list/GitHubListItem';
import GitHubEditorPage from "./framework/github-editor/GitHubEditorPage";
import Editor from './framework/github-editor/Editor';

describe("Simple test", () => {

    let tools: Tools;

    beforeEach(async () => {
        tools = await Tools.init();
    });

    it("just test", async () => {
        const WEB_PAGE = "https://github.com/kiegroup/kie-wb-playground/blob/master/evaluation/src/main/resources/";
        const EXPECTED_LINK = "/kiegroup/kie-wb-playground/master/evaluation/src/main/resources/evaluation.bpmn";
        const FILE_NAME = "evaluation.bpmn";

        await tools.driver.get(WEB_PAGE);

        // check link to online editor in file list
        let gitHubListPage: GitHubListPage = tools.createPage(GitHubListPage);
        let gitHubFile: GitHubListItem = await gitHubListPage.getFile(FILE_NAME)
        let linkText = await gitHubFile.getLinkToOnlineEditor();
        expect(linkText).contains(EXPECTED_LINK);

        await gitHubFile.open();

        // wait for editor
        let gitHubEditorPage = tools.createPage(GitHubEditorPage);
        let editor: Editor = await gitHubEditorPage.getEditor();
        await editor.enter();
        await editor.wait();
        await editor.leave();

        // check link to online editor from clipboard
        await gitHubEditorPage.copyLinkToOnlineEditor()
        let clipboadText = await tools.clipboard.getContent();
        expect(clipboadText).contains(EXPECTED_LINK);

    })

    afterEach(async () => {
        await tools.driver.switchTo().defaultContent();
        await tools.screenShot.takeHtml("screenshot_after_test");
        await tools.screenShot.takePng("screenshot_after_test");
        await tools.driver.quit();
    });
})
