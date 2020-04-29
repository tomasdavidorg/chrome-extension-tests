import { By, WebElement } from "selenium-webdriver";
import OnlineEditorPage from "../online-editor/OnlineEditorPage";
import FullscreenPage from "../fullscreen-editor/FullscreenPage";
import EditorPage from "../editor/EditorPage";

export default class GitHubEditorPage extends EditorPage {

    private static readonly SEE_AS_SOURCE_BUTTON_LOCATOR = By.xpath("//button[@data-testid='see-as-source-button']");
    private static readonly ONLINE_EDITOR_BUTTON_LOCATOR = By.xpath("//button[@data-testid='open-ext-editor-button']");
    private static readonly COPY_LINK_BUTTON_LOCATOR = By.xpath("//button[@data-testid='copy-link-button']");
    private static readonly SEE_AS_DIAGRAM_BUTTON_LOCATOR = By.xpath("//button[@data-testid='see-as-diagram-button']");
    private static readonly FULL_SCREEN_BUTTON_LOCATOR = By.xpath("//button[@data-testid='go-fullscreen-button']");
    private static readonly SOURCE_VIEW_LOCATOR = By.xpath("//div[@itemprop='text']");
    private static readonly KOGITO_CONTAINER_LOCATOR = By.className("kogito-iframe-container");
    private static readonly KOGITO_TOOLBAR_LOCATOR = By.className("kogito-toolbar-container");

    public async load(): Promise<void> {
        await this.tools.by(GitHubEditorPage.KOGITO_TOOLBAR_LOCATOR)
            .withTimeout(2000)
            .present();
    }

    async copyLinkToOnlineEditor(): Promise<void> {
        (await this.tools.by(GitHubEditorPage.COPY_LINK_BUTTON_LOCATOR).getWebElement()).click();
    }

    async seeAsSource(): Promise<void> {
        let seeAsSourceButton = await this.tools.by(GitHubEditorPage.SEE_AS_SOURCE_BUTTON_LOCATOR)
            .getWebElement();
        await seeAsSourceButton.click();
    }

    async seeAsDiagram() {
        await (await this.tools.by(GitHubEditorPage.SEE_AS_DIAGRAM_BUTTON_LOCATOR).getWebElement()).click();
    }

    async isSourceVisible(): Promise<boolean> {
        let sourceWebEl: WebElement = await this.tools.by(GitHubEditorPage.SOURCE_VIEW_LOCATOR).getWebElement();
        return this.tools.webElement(sourceWebEl).withTimeout(1000).isVisible();
    }

    async isEditorVisible(): Promise<boolean> {
        let editorContainer: WebElement = await this.tools.by(GitHubEditorPage.KOGITO_CONTAINER_LOCATOR).getWebElement();
        return this.tools.webElement(editorContainer).withTimeout(1000).isVisible();
    }

    async openOnlineEditor(): Promise<OnlineEditorPage> {
        let onlineEditorButton: WebElement = await this.tools.by(GitHubEditorPage.ONLINE_EDITOR_BUTTON_LOCATOR).withTimeout(2000).getWebElement();
        onlineEditorButton.click();

        await this.tools.driver.wait(async () => {
            let windowHandles = await this.tools.driver.getAllWindowHandles();
            return (windowHandles.length > 1);
        }, 5000);

        let windowHandles = await this.tools.driver.getAllWindowHandles();

        await this.tools.driver.switchTo().window(windowHandles[1]);

        return this.tools.createPage(OnlineEditorPage);
    }

    async fullScreen(): Promise<FullscreenPage> {
        let fullScreenButton: WebElement = await this.tools.by(GitHubEditorPage.FULL_SCREEN_BUTTON_LOCATOR).getWebElement();
        await fullScreenButton.click();
        return this.tools.createPage(FullscreenPage);
    }
}