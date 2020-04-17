import { By, WebElement, until } from "selenium-webdriver";
import Page from "../Page";
import OnlineEditorPage from "../online-editor/OnlineEditorPage"
import FullscreenPage from "../fullscreen-editor/FullscreenPage"
import EditorPage from "../editor/EditorPage";

export default class GitHubEditorPage extends EditorPage {

    private readonly SEE_AS_SOURCE_BUTTON_LOCATOR = By.xpath("//button[@data-testid='see-as-source-button']");
    private readonly ONLINE_EDITOR_BUTTON_LOCATOR = By.xpath("//button[@data-testid='open-ext-editor-button']");
    private readonly COPY_LINK_BUTTON_LOCATOR = By.xpath("//button[@data-testid='copy-link-button']");
    private readonly SEE_AS_DIAGRAM_BUTTON_LOCATOR = By.xpath("//button[@data-testid='see-as-diagram-button']");
    private readonly FULL_SCREEN_BUTTON_LOCATOR = By.xpath("//button[@data-testid='go-fullscreen-button']");
    private readonly SOURCE_VIEW_LOCATOR = By.xpath("//div[@itemprop='text']");
    private readonly KOGITO_CONTAINER_LOCATOR = By.className("kogito-iframe-container");

    async copyLinkToOnlineEditor(): Promise<void> {
        (await this.tools.by(this.COPY_LINK_BUTTON_LOCATOR).present()).click();
    }

    async seeAsSource(): Promise<void> {
        let seeAsSourceButton = await this.tools.by(this.SEE_AS_SOURCE_BUTTON_LOCATOR)
            .withTimeout(2000)
            .present();

        await this.tools.webElement(seeAsSourceButton).withTimeout(5000).enabled();
        await seeAsSourceButton.click();
    }

    async seeAsDiagram() {
        await (await this.tools.by(this.SEE_AS_DIAGRAM_BUTTON_LOCATOR).present()).click();
    }

    async isSourceVisible(): Promise<boolean> {
        let sourceWebEl: WebElement = await this.tools.by(this.SOURCE_VIEW_LOCATOR).present();
        return this.tools.webElement(sourceWebEl).withTimeout(1000).isVisible();
    }

    async isEditorVisible(): Promise<boolean> {
        let editorContainer: WebElement = await this.tools.by(this.KOGITO_CONTAINER_LOCATOR).present();
        return this.tools.webElement(editorContainer).withTimeout(1000).isVisible();
    }

    async openOnlineEditor(): Promise<OnlineEditorPage> {
        let onlineEditorButton: WebElement = await this.tools.by(this.ONLINE_EDITOR_BUTTON_LOCATOR).withTimeout(2000).present();
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
        let fullScreenButton: WebElement = await this.tools.by(this.FULL_SCREEN_BUTTON_LOCATOR).present();
        await fullScreenButton.click();
        return this.tools.createPage(FullscreenPage);
    }
}