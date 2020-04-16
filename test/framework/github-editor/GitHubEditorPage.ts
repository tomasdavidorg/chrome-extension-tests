import { By, WebElement, until } from "selenium-webdriver";
import Page from "../Page";
import Editor from "./Editor"
import OnlineEditorPage from "../online-editor/OnlineEditorPage"

export default class GitHubEditorPage extends Page {

    private readonly SEE_AS_SOURCE_BUTTON_LOCATOR = By.xpath("//button[@data-testid='see-as-source-button']");
    private readonly ONLINE_EDITOR_BUTTON_LOCATOR = By.xpath("//button[@data-testid='open-ext-editor-button']");
    private readonly COPY_LINK_BUTTON_LOCATOR = By.xpath("//button[@data-testid='copy-link-button']");
    private readonly SEE_AS_DIAGRAM_BUTTON_LOCATOR = By.xpath("//button[@data-testid='see-as-diagram-button']");
    private readonly FULL_SCREEN_BUTTON_LOCATOR = By.xpath("//button[@data-testid='go-fullscreen-button']");
    private readonly KOGITO_EDITOR_LOCATOR = By.className("kogito-iframe");
    private readonly SOURCE_VIEW_LOCATOR = By.xpath("//div[@itemprop='text']");
    private readonly KOGITO_CONTAINER_LOCATOR = By.className("kogito-iframe-container");

    async copyLinkToOnlineEditor(): Promise<void> {
        (await this.tools.find(this.COPY_LINK_BUTTON_LOCATOR).present()).click();
    }

    async seeAsSource(): Promise<void> {
        let seeAsSourceButton = await this.tools.find(this.SEE_AS_SOURCE_BUTTON_LOCATOR)
            .withTimeout(2000)
            .present();

        await this.tools.take(seeAsSourceButton).withTimeout(5000).enabled();
        await seeAsSourceButton.click();
    }

    async seeAsDiagram() {
        await (await this.tools.find(this.SEE_AS_DIAGRAM_BUTTON_LOCATOR).present()).click();
    }

    async getEditor(): Promise<Editor> {
        let editor: WebElement = await this.tools.find(this.KOGITO_EDITOR_LOCATOR).withTimeout(2000).present();
        await this.tools.take(editor).scroll();
        return this.tools.createPageFragment(Editor, editor);
    }

    async isSourceVisible(): Promise<boolean> {
        let sourceWebEl: WebElement = await this.tools.find(this.SOURCE_VIEW_LOCATOR).present();
        return this.tools.take(sourceWebEl).withTimeout(1000).isVisible();
    }

    async isEditorVisible(): Promise<boolean> {
        let editorContainer: WebElement = await this.tools.find(this.KOGITO_CONTAINER_LOCATOR).present();
        return this.tools.take(editorContainer).withTimeout(1000).isVisible();
    }

    async openOnlineEditor(): Promise<OnlineEditorPage> {
        let onlineEditorButton: WebElement = await this.tools.find(this.ONLINE_EDITOR_BUTTON_LOCATOR).present();
        onlineEditorButton.click();

        await this.tools.driver.wait(async () => {
            let windowHandles = await this.tools.driver.getAllWindowHandles();
            return (windowHandles.length > 1);
        }, 5000);

        let windowHandles = await this.tools.driver.getAllWindowHandles();

        await this.tools.driver.switchTo().window(windowHandles[1]);

        return this.tools.createPage(OnlineEditorPage);
    }
}