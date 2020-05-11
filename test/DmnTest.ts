import Tools from './utils/Tools';
import GitHubListPage from "./framework/github-file-list/GitHubListPage";
import GitHubListItem from './framework/github-file-list/GitHubListItem';
import GitHubEditorPage from './framework/github-editor/GitHubEditorPage';
import DmnEditor from "./framework/editor/dmn/DmnEditor";

import { expect } from "chai";
import EditorPage from './framework/editor/EditorPage';
import DmnPallette from './framework/editor/dmn/DmnPallette';

describe("DMN test", () => {

    let tools: Tools;

    beforeEach(async () => {
        tools = await Tools.init();
    });

    it("basic operations", async () => {

        const WEB_PAGE = "https://github.com/kiegroup/kogito-examples/blob/stable/dmn-quarkus-example/src/main/resources";
        const FILE_NAME = "Traffic Violation.dmn";
        const EXPECTED_LINK = "kiegroup/kogito-examples/stable/dmn-quarkus-example/src/main/resources/Traffic%20Violation.dmn";
        const DMN_NODES_NAMES = ["Driver", "Fine", "Decision Table", "Should the driver be suspended?", "Context", "Violation"];

        // check online editor link in the list
        const gitHubListPage: GitHubListPage = await tools.openPage(GitHubListPage, WEB_PAGE);
        const gitHubFile: GitHubListItem = await gitHubListPage.getFile(FILE_NAME);
        const linkText = await gitHubFile.getLinkToOnlineEditor();
        expect(linkText).contains(EXPECTED_LINK);

        // open DMN editor
        let editorPage: GitHubEditorPage = await gitHubFile.open();
        const dmnEditor: DmnEditor = await editorPage.getDmnEditor();

        // check dmn name
        await dmnEditor.enter();
        const sideBar = await dmnEditor.getSideBar();
        const processProps = await sideBar.openProperties();
        expect(await processProps.getDmnNameFromInput()).equals("Traffic Violation");
        await sideBar.closeActiveSideBar()

        // move annotation to canvas
        const dmnPalette: DmnPallette = await dmnEditor.getDmnPalette();
        await dmnPalette.dragAndDropAnnotationToCanvas();

        // check DMN properties
        const decisionNavigator = await sideBar.openDecisionNavigator();
        expect(await decisionNavigator.getNodeNames()).to.have.members(DMN_NODES_NAMES.concat("TextAnnotation-1"));
        expect(await decisionNavigator.getDmnName()).equals("Traffic Violation");
        await decisionNavigator.selectNode("Driver");
        const nodeProps = await sideBar.openProperties();
        expect(await nodeProps.getDmnNameFromInput()).equals("Driver");
        
        await dmnEditor.leave();
        
        // open and check source editor
        expect(await editorPage.isSourceVisible()).false;
        expect(await editorPage.isEditorVisible()).true;
        editorPage.seeAsSource();
        expect(await editorPage.isSourceVisible()).true;
        expect(await editorPage.isEditorVisible()).false;
        editorPage.seeAsDiagram();
        expect(await editorPage.isSourceVisible()).false;
        expect(await editorPage.isEditorVisible()).true;
        
        // check link to online editor from clipboard
        await editorPage.copyLinkToOnlineEditor();
        const clipboadText = await tools.clipboard.getContent();
        expect(clipboadText).contains(EXPECTED_LINK);
        
        const fullScreenPage = await editorPage.fullScreen();
        await fullScreenPage.getDmnEditor();
        await fullScreenPage.scrollToTop();
        editorPage = await fullScreenPage.exitFullscreen();
        
        const onlineEditorPage = await editorPage.openOnlineEditor();
        await onlineEditorPage.getDmnEditor();
    })

    afterEach(async () => {
        await tools.finish("DMN_test");
    });
});