import { By } from "selenium-webdriver";
import EditorPage from "../editor/EditorPage";
import Element from "../Element";
import GitHubEditorPage from "../github-editor/GitHubEditorPage";

export default class FullscreenPage extends EditorPage {

    private static readonly EXIT_BUTTON_LOCATOR = By.xpath("//a[@data-testid='exit-fullscreen-button']");

    public async exitFullscreen(): Promise<GitHubEditorPage> {
        const exitButton: Element = await this.tools.by(FullscreenPage.EXIT_BUTTON_LOCATOR).getElement();
        await exitButton.click();
        return this.tools.createPage(GitHubEditorPage);
    }

    public async waitUntilLoaded():Promise<void> {
        await this.tools.by(FullscreenPage.EXIT_BUTTON_LOCATOR).wait(10000).untilPresent();
    }
}
