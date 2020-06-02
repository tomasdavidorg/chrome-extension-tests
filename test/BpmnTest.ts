import BpmnEditor from "./framework/editor/bpmn/BpmnEditor";
import GitHubEditorPage from "./framework/github-editor/GitHubEditorPage";
import GitHubListItem from "./framework/github-file-list/GitHubListItem";
import GitHubListPage from "./framework/github-file-list/GitHubListPage";
import Tools from "./utils/Tools";

let tools: Tools;

beforeEach(async () => {
    tools = await Tools.init();
});

test("BPMN basic operations test", async () => {
    const WEB_PAGE = "https://github.com/kiegroup/kogito-examples/blob/stable/process-business-rules-quarkus/src/main/resources/org/acme/travels/";
    const EXPECTED_LINK = "kiegroup/kogito-examples/stable/process-business-rules-quarkus/src/main/resources/org/acme/travels/persons.bpmn";
    const FILE_NAME = "persons.bpmn";
    const PROCESS_NODES_NAMES = ["StartProcess", "End Event 1", "End Event 2", "Evaluate Person", "Exclusive Gateway 1", "Special handling for children"];

    // check link to online editor in the list
    const gitHubListPage: GitHubListPage = await tools.openPage(GitHubListPage, WEB_PAGE);
    const gitHubFile: GitHubListItem = await gitHubListPage.getFile(FILE_NAME);
    const linkText = await gitHubFile.getLinkToOnlineEditor();
    expect(linkText).toContain(EXPECTED_LINK);

    // open BPMN editor
    let gitHubEditorPage: GitHubEditorPage = await gitHubFile.open();
    const bpmnEditor: BpmnEditor = await gitHubEditorPage.getBpmnEditor();

    // drag and drop startEvent to canvas
    await bpmnEditor.enter();
    await bpmnEditor.dragAndDropStartEventToCanvas();

    // check process properties
    const sideBar = await bpmnEditor.getSideBar();
    const processProps = await sideBar.openProperties();
    expect(await processProps.getProcessNameFromInput()).toEqual("persons");

    // check process nodes in explorer
    const explorer = await sideBar.openExplorer();
    expect(await (await explorer.getNodeNames()).sort()).toEqual(PROCESS_NODES_NAMES.concat("Start").sort());
    expect(await explorer.getProcessName()).toEqual("persons");

    // check task properties
    await explorer.selectNode("Evaluate Person");
    const nodeProps = await sideBar.openProperties();
    expect(await nodeProps.getNameFromTextArea()).toEqual("Evaluate Person");

    await bpmnEditor.leave();

    // open and check source editor
    expect(await gitHubEditorPage.isSourceVisible()).toBe(false);
    expect(await gitHubEditorPage.isEditorVisible()).toBe(true);
    await gitHubEditorPage.seeAsSource();
    expect(await gitHubEditorPage.isSourceVisible()).toBe(true);
    expect(await gitHubEditorPage.isEditorVisible()).toBe(false);
    await gitHubEditorPage.seeAsDiagram();
    expect(await gitHubEditorPage.isSourceVisible()).toBe(false);
    expect(await gitHubEditorPage.isEditorVisible()).toBe(true);

    // check link to online editor from clipboard
    await gitHubEditorPage.copyLinkToOnlineEditor();
    const clipboadText = await tools.clipboard().getContent();
    expect(clipboadText).toContain(EXPECTED_LINK);

    // open full screen editor
    const fullScreenPage = await gitHubEditorPage.fullScreen();
    await fullScreenPage.getBpmnEditor();
    await fullScreenPage.scrollToTop();
    gitHubEditorPage = await fullScreenPage.exitFullscreen();

    // open online editor
    const onlineEditorPage = await gitHubEditorPage.openOnlineEditor();
    await onlineEditorPage.getBpmnEditor();
});

afterEach(async () => {
    await tools.finishTest("BPMN_basic_opepration_test");
});
