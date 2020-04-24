import { expect } from "chai";
import Tools from './utils/Tools';
import GitHubListPage from "./framework/github-file-list/GitHubListPage";
import GitHubListItem from './framework/github-file-list/GitHubListItem';
import Editor from "./framework/editor/Editor";

describe("Simple test", () => {

    let tools: Tools;

    beforeEach(async () => {
        tools = await Tools.init();
    });

    it("just test", async () => {
        const WEB_PAGE = "https://github.com/kiegroup/kie-wb-playground/blob/master/evaluation/src/main/resources/";
        const EXPECTED_LINK = "/kiegroup/kie-wb-playground/master/evaluation/src/main/resources/evaluation.bpmn";
        const FILE_NAME = "evaluation.bpmn";
        const PROCESS_NODES_NAMES = ["Start", "Self Evaluation", "PM Evaluation", "HR Evaluation", "Parallel", "Parallel", "End Terminate"];

        await tools.driver.get(WEB_PAGE);

        // check link to online editor in file list
        let gitHubListPage: GitHubListPage = tools.createPage(GitHubListPage);
        let gitHubFile: GitHubListItem = await gitHubListPage.getFile(FILE_NAME)
        let linkText = await gitHubFile.getLinkToOnlineEditor();
        expect(linkText).contains(EXPECTED_LINK);

        let gitHubEditorPage = await gitHubFile.open();

        // wait for editor
        let editor: Editor = await gitHubEditorPage.getEditor();
        await editor.load();

        editor.enter();
        let sideBar = await editor.getSideBar();
        let explorer = await sideBar.openExplorer()

        expect((await explorer.getNodeNames())).to.have.members(PROCESS_NODES_NAMES);
        expect(await explorer.getProcessName()).equals("Evaluation");
        await explorer.selectNode("PM Evaluation");

        editor.leave();

        // open and check source editor
        expect(await gitHubEditorPage.isSourceVisible()).false;
        expect(await gitHubEditorPage.isEditorVisible()).true;
        gitHubEditorPage.seeAsSource();
        expect(await gitHubEditorPage.isSourceVisible()).true;
        expect(await gitHubEditorPage.isEditorVisible()).false;
        gitHubEditorPage.seeAsDiagram();
        expect(await gitHubEditorPage.isSourceVisible()).false;
        expect(await gitHubEditorPage.isEditorVisible()).true;

        // check link to online editor from clipboard
        await gitHubEditorPage.copyLinkToOnlineEditor()
        let clipboadText = await tools.clipboard.getContent();
        expect(clipboadText).contains(EXPECTED_LINK);

        let fullScreenPage = await gitHubEditorPage.fullScreen();
        let fullScreenEditor = await fullScreenPage.getEditor();
        await fullScreenEditor.load();
        gitHubEditorPage = await fullScreenPage.exitFullscreen();

        let onlineEditorPage = await gitHubEditorPage.openOnlineEditor();
        let onlineEditor = await onlineEditorPage.getEditor();
        await onlineEditor.load()

    })

    afterEach(async () => {
        await tools.driver.switchTo().defaultContent();
        await tools.screenShot.takeHtml("screenshot_after_test");
        await tools.screenShot.takePng("screenshot_after_test");
        await tools.driver.quit();
    });
})
