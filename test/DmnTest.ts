import Tools from './utils/Tools';
import GitHubListPage from "./framework/github-file-list/GitHubListPage";
import GitHubListItem from './framework/github-file-list/GitHubListItem';
import GitHubEditorPage from './framework/editor/EditorPage';
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
        /*
        const WEB_PAGE = "https://github.com/kiegroup/kogito-examples/blob/stable/dmn-quarkus-example/src/main/resources";
        const FILE_NAME = "Traffic Violation.dmn";
        const EXPECTED_LINK = "kiegroup/kogito-examples/stable/dmn-quarkus-example/src/main/resources/Traffic%20Violation.dmn";

        // check online editor link in the list
        const gitHubListPage: GitHubListPage = await tools.openPage(GitHubListPage, WEB_PAGE);
        const gitHubFile: GitHubListItem = await gitHubListPage.getFile(FILE_NAME);
        const linkText = await gitHubFile.getLinkToOnlineEditor();
        expect(linkText).contains(EXPECTED_LINK);

        // open DMN editor
        const editorPage: EditorPage = await gitHubFile.open();
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
        await dmnEditor.clickToCanvas();


       
        
        const explorer = await sideBar.openExplorer();
/*
        expect(await explorer.getNodeNames()).to.have.members(PROCESS_NODES_NAMES.concat("Start"));
        expect(await explorer.getProcessName()).equals("Evaluation");
        await explorer.selectNode("PM Evaluation");

        const nodeProps = await sideBar.openProperties();
        expect(await nodeProps.getNameFromTextArea()).equals("PM Evaluation");

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
        await gitHubEditorPage.copyLinkToOnlineEditor();
        const clipboadText = await tools.clipboard.getContent();
        expect(clipboadText).contains(EXPECTED_LINK);

        const fullScreenPage = await gitHubEditorPage.fullScreen();
        await fullScreenPage.getEditor();
        await fullScreenPage.scrollToTop();
        gitHubEditorPage = await fullScreenPage.exitFullscreen();

        const onlineEditorPage = await gitHubEditorPage.openOnlineEditor();
        await onlineEditorPage.getEditor();*/
    })

    afterEach(async () => {
        tools.finish("DMN_test");
    });
});