import DecisionNavigator from "./framework/editor/dmn/DecisionNavigator";
import DmnEditor from "./framework/editor/dmn/DmnEditor";
import DmnSideBar from "./framework/editor/dmn/DmnSideBar";
import GitHubPrPage from "./framework/github-pr/GitHubPrPage";
import Tools from "./utils/Tools";

const TEST_NAME = "DMN_pull_request_test";

let tools: Tools;

beforeEach(async () => {
    tools = await Tools.init();
});

test(TEST_NAME, async () => {
    const PR_WEB_PAGE = "https://github.com/tomasdavidorg/chrome-extension-pr-test/pull/3/files";
    const CHANGES_NODES = ["Annotation", "Decision", "InputData", "Model", "Function"];
    const ORIGINAL_NODES = ["Decision", "InputData", "Model", "Function"];

    // open PR and check that source is opened
    const gitHubPrPage: GitHubPrPage = await tools.openPage(GitHubPrPage, PR_WEB_PAGE);
    expect(await gitHubPrPage.isSourceOpened()).toBe(true);
    expect(await gitHubPrPage.isDiagramOpened()).toBe(false);

    // open diagram and check
    await gitHubPrPage.seeAsDiagram();
    expect(await gitHubPrPage.isSourceOpened()).toBe(false);
    expect(await gitHubPrPage.isDiagramOpened()).toBe(true);

    // check editor with changes
    const changesEditor: DmnEditor = await gitHubPrPage.getDmnEditor();
    await changesEditor.enter();
    const sideBar: DmnSideBar = await changesEditor.getSideBar();
    const navigator: DecisionNavigator = await sideBar.openDecisionNavigator();
    expect((await navigator.getNodeNames()).sort()).toEqual(CHANGES_NODES.sort());
    await sideBar.closeActiveSideBar();
    await changesEditor.leave();

    // check editor with original
    await gitHubPrPage.original();
    const originalEditor: DmnEditor = await gitHubPrPage.getDmnEditor();
    await originalEditor.enter();
    const originalSideBar: DmnSideBar = await originalEditor.getSideBar();
    const originalNavigator: DecisionNavigator = await originalSideBar.openDecisionNavigator();
    expect((await originalNavigator.getNodeNames()).sort()).toEqual(ORIGINAL_NODES.sort());
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
