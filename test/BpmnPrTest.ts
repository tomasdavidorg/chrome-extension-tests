import BpmnEditor from "./framework/editor/bpmn/BpmnEditor";
import Explorer from "./framework/editor/Explorer";
import GitHubPrPage from "./framework/github-pr/GitHubPrPage";
import SideBar from "./framework/editor/SideBar";
import Tools from "./utils/Tools";

const TEST_NAME = "BPMN_pull_request";

let tools: Tools;

beforeEach(async () => {
    tools = await Tools.init();
});

test(TEST_NAME, async () => {
    const PR_WEB_PAGE = "https://github.com/tomasdavidorg/chrome-extension-pr-test/pull/2/files";
    const CHANGES_NODES = ["Start", "Task", "End", "Intermediate Timer"];
    const ORIGINAL_NODES = ["Start", "Task", "End"];

    // open PR and check that source is opened
    const gitHubPrPage: GitHubPrPage = await tools.openPage(GitHubPrPage, PR_WEB_PAGE);
    expect(await gitHubPrPage.isSourceOpened()).toBe(true);
    expect(await gitHubPrPage.isDiagramOpened()).toBe(false);

    // open diagram and check
    await gitHubPrPage.seeAsDiagram();
    expect(await gitHubPrPage.isSourceOpened()).toBe(false);
    expect(await gitHubPrPage.isDiagramOpened()).toBe(true);

    // check editor with changes
    const changesEditor: BpmnEditor = await gitHubPrPage.getBpmnEditor();
    await changesEditor.enter();
    const sideBar: SideBar = await changesEditor.getSideBar();
    const exlorer: Explorer = await sideBar.openExplorer();
    expect((await exlorer.getNodeNames()).sort()).toEqual(CHANGES_NODES.sort());
    await sideBar.closeActiveSideBar();
    await changesEditor.leave();

    // check editor with original
    await gitHubPrPage.original();
    const originalEditor: BpmnEditor = await gitHubPrPage.getBpmnEditor();
    await originalEditor.enter();
    const originalSideBar: SideBar = await originalEditor.getSideBar();
    const originalExlorer: Explorer = await originalSideBar.openExplorer();
    expect((await originalExlorer.getNodeNames()).sort()).toEqual(ORIGINAL_NODES.sort());
    await sideBar.closeActiveSideBar();
    await originalEditor.leave();

    // close diagram and check that source is opened 
    await gitHubPrPage.closeDiagram();
    expect(await gitHubPrPage.isSourceOpened()).toBe(true);
    expect(await gitHubPrPage.isDiagramOpened()).toBe(false);
});

afterEach(async () => {
    await tools.finishTest(TEST_NAME);
});
