import EditorPage from "../editor/EditorPage";
import { By } from "selenium-webdriver"
import GitHubEditorPage from "../github-editor/GitHubEditorPage";


export default class FullscreenPage extends EditorPage {

    private static readonly EXIT_BUTTON_LOCATOR = By.xpath("//a[@data-testid='exit-fullscreen-button']");

    public async exitFullscreen(): Promise<GitHubEditorPage> {
        const exitFullscreenButton = await this.tools.by(FullscreenPage.EXIT_BUTTON_LOCATOR).getWebElement();

        // regular click does not work
        // await exitFullscreenButton.click();
        await this.tools.driver.executeScript("arguments[0].click();", exitFullscreenButton);
        return this.tools.createPage(GitHubEditorPage);
    }

    public async scrollToTop() {
        await this.tools.driver.executeScript("window.scrollTo(0, 0);");
    }

    public async load():Promise<void> {
        await this.tools.by(FullscreenPage.EXIT_BUTTON_LOCATOR).withTimeout(5000).present();
    }
}
