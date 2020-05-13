import EditorPage from "../editor/EditorPage";
import { By } from "selenium-webdriver"
import GitHubEditorPage from "../github-editor/GitHubEditorPage";


export default class FullscreenPage extends EditorPage {

    private static readonly EXIT_BUTTON_LOCATOR = By.xpath("//a[@data-testid='exit-fullscreen-button']");

    public async exitFullscreen(): Promise<GitHubEditorPage> {
        // regular click does not work
        await this.tools.by(FullscreenPage.EXIT_BUTTON_LOCATOR).clickJs();
        return this.tools.createPage(GitHubEditorPage);
    }

    public async scrollToTop() {
        await this.tools.driver.executeScript("window.scrollTo(0, 0);");
    }

    public async load():Promise<void> {
        await this.tools.by(FullscreenPage.EXIT_BUTTON_LOCATOR).wait(10000).untilPresent();
    }
}
