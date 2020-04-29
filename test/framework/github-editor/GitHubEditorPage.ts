import { By, WebElement } from "selenium-webdriver";
import OnlineEditorPage from "../online-editor/OnlineEditorPage";
import FullscreenPage from "../fullscreen-editor/FullscreenPage";
import EditorPage from "../editor/EditorPage";

export default class GitHubEditorPage extends EditorPage {

    private static readonly SEE_AS_SOURCE_BUTTON_LOCATOR = By.xpath("//button[@data-testid='see-as-source-button']");
    private static readonly ONLINE_EDITOR_BUTTON_LOCATOR = By.xpath("//button[@data-testid='open-ext-editor-button']");
    private static readonly COPY_LINK_BUTTON_LOCATOR = By.xpath("//button[@data-testid='copy-link-button']");
    private static readonly COPY_LINK_ALERT_LOCATOR = By.xpath("//div[@data-testid='link-copied-alert']");
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

    public async copyLinkToOnlineEditor(): Promise<void> {
        const copyLinkButton: WebElement = await this.tools.by(GitHubEditorPage.COPY_LINK_BUTTON_LOCATOR).getWebElement();
        await copyLinkButton.click();
        await this.tools.by(GitHubEditorPage.COPY_LINK_ALERT_LOCATOR).withTimeout(1000).present();
        await this.tools.by(GitHubEditorPage.COPY_LINK_ALERT_LOCATOR).withTimeout(5000).absent();        
    }

    public async seeAsSource(): Promise<void> {
        const seeAsSourceButton = await this.tools.by(GitHubEditorPage.SEE_AS_SOURCE_BUTTON_LOCATOR)
            .getWebElement();
        await seeAsSourceButton.click();
    }

    public async seeAsDiagram() {
        await (await this.tools.by(GitHubEditorPage.SEE_AS_DIAGRAM_BUTTON_LOCATOR).getWebElement()).click();
    }

    public async isSourceVisible(): Promise<boolean> {
        const sourceWebEl: WebElement = await this.tools.by(GitHubEditorPage.SOURCE_VIEW_LOCATOR).getWebElement();
        return this.tools.webElement(sourceWebEl).withTimeout(1000).isVisible();
    }

    public async isEditorVisible(): Promise<boolean> {
        const editorContainer: WebElement = await this.tools.by(GitHubEditorPage.KOGITO_CONTAINER_LOCATOR).getWebElement();
        return this.tools.webElement(editorContainer).withTimeout(1000).isVisible();
    }

    public async openOnlineEditor(): Promise<OnlineEditorPage> {
        const onlineEditorButton: WebElement = await this.tools.by(GitHubEditorPage.ONLINE_EDITOR_BUTTON_LOCATOR).withTimeout(2000).getWebElement();
        onlineEditorButton.click();

        await this.tools.driver.wait(async () => {
            const windowHandles = await this.tools.driver.getAllWindowHandles();
            return (windowHandles.length > 1);
        }, 5000);

        const windowHandles = await this.tools.driver.getAllWindowHandles();

        await this.tools.driver.switchTo().window(windowHandles[1]);

        return this.tools.createPage(OnlineEditorPage);
    }

    public async fullScreen(): Promise<FullscreenPage> {
        const fullScreenButton: WebElement = await this.tools.by(GitHubEditorPage.FULL_SCREEN_BUTTON_LOCATOR).getWebElement();
        await this.tools.driver.executeScript("arguments[0].click();", fullScreenButton);
        // sometimes button cannot be pushed
        // await fullScreenButton.click();
        return this.tools.createPage(FullscreenPage);
    }
}