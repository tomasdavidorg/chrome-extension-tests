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

    const WEB_PAGE = "https://github.com/kiegroup/kie-wb-playground/blob/master/evaluation/src/main/resources/";
    const EXPECTED_LINK = "/kiegroup/kie-wb-playground/master/evaluation/src/main/resources/evaluation.bpmn";
    const FILE_NAME = "evaluation.bpmn";
    const PROCESS_NODES_NAMES = ["Start", "Self Evaluation", "PM Evaluation", "HR Evaluation", "Parallel", "Parallel", "End Terminate"];

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
    expect(await processProps.getProcessNameFromInput()).toEqual("Evaluation");

    // check process nodes in explorer
    const explorer = await sideBar.openExplorer();
    expect(await (await explorer.getNodeNames()).sort()).toEqual(PROCESS_NODES_NAMES.concat("Start").sort());
    expect(await explorer.getProcessName()).toEqual("Evaluation");

    // check task properties
    await explorer.selectNode("PM Evaluation");
    const nodeProps = await sideBar.openProperties();
    expect(await nodeProps.getNameFromTextArea()).toEqual("PM Evaluation");

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

