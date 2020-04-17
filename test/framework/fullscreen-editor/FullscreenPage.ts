import EditorPage from "../editor/EditorPage";
import { By } from "selenium-webdriver"
import GitHubEditorPage from "../github-editor/GitHubEditorPage";


export default class FullscreenPage extends EditorPage {

    private readonly EXIT_FULLSCREEN_BUTTON_LOCATOR = By.xpath("//a[@data-testid='exit-fullscreen-button']");

    public async exitFullscreen(): Promise<GitHubEditorPage> {
        let exitFullscreenButton = await this.tools.by(this.EXIT_FULLSCREEN_BUTTON_LOCATOR).withTimeout(2000).present();

        // regular click does not work
        // await exitFullscreenButton.click();
        await this.tools.driver.executeScript("arguments[0].click();", exitFullscreenButton);
        return this.tools.createPage(GitHubEditorPage);
    }
}
