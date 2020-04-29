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
        let gitHubListPage: GitHubListPage = await tools.createPage(GitHubListPage);
        let gitHubFile: GitHubListItem = await gitHubListPage.getFile(FILE_NAME)
        let linkText = await gitHubFile.getLinkToOnlineEditor();
        expect(linkText).contains(EXPECTED_LINK);

        let gitHubEditorPage = await gitHubFile.open();

        let editor: Editor = await gitHubEditorPage.getEditor();

        await editor.enter();
        await editor.dragAndDropStartEventToCanvas();
        let sideBar = await editor.getSideBar();

        let properties = await sideBar.openProperties();
        expect(await properties.getProcessNameFromInput()).equals("Evaluation");
        
        let explorer = await sideBar.openExplorer()

        expect(await explorer.getNodeNames()).to.have.members(PROCESS_NODES_NAMES.concat("Start"));
        expect(await explorer.getProcessName()).equals("Evaluation");
        await explorer.selectNode("PM Evaluation");

        properties = await sideBar.openProperties();
        expect(await properties.getNameFromTextArea()).equals("PM Evaluation");

        await editor.leave();

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
        await fullScreenPage.getEditor();
        await fullScreenPage.scrollToTop();
        gitHubEditorPage = await fullScreenPage.exitFullscreen();

        let onlineEditorPage = await gitHubEditorPage.openOnlineEditor();
        await onlineEditorPage.getEditor();
    })

    afterEach(async () => {
        await tools.driver.switchTo().defaultContent();
        await tools.screenShot.takeHtml("screenshot_after_test");
        await tools.screenShot.takePng("screenshot_after_test");
        await tools.driver.quit();
    });
})
