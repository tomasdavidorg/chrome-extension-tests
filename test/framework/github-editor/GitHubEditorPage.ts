import { By, WebElement } from "selenium-webdriver";
import Page from "../Page";
import Editor from "./Editor"

export default class GitHubEditorPage extends Page {

    private readonly SEE_AS_SOURCE_BUTTON_LOCATOR = By.xpath("//button[@data-testid='see-as-source-button']");
    private readonly ONLINE_EDITOR_BUTTON_LOCATOR = By.xpath("//button[@data-testid='open-ext-editor-button']");
    private readonly COPY_LINK_BUTTON_LOCATOR = By.xpath("//button[@data-testid='copy-link-button']");
    private readonly SEE_AS_DIAGRAM_BUTTON_LOCATOR = By.xpath("//button[@data-testid='see-as-diagram-button']");
    private readonly FULL_SCREEN_BUTTON_LOCATOR = By.xpath("//button[@data-testid='go-fullscreen-button']");
    private readonly KOGITO_EDITOR_LOCATOR = By.className("kogito-iframe");

    async copyLinkToOnlineEditor(): Promise<void> {
        (await this.tools.find(this.COPY_LINK_BUTTON_LOCATOR).present()).click();
    }

    async seeAsSource(): Promise<void> {
        let seeAsSourceButton = await this.tools.find(this.SEE_AS_SOURCE_BUTTON_LOCATOR)
            .withTimeout(2000)
            .present();

        this.tools.take(seeAsSourceButton).withTimeout(5000).enabled();
    }

    async getEditor(): Promise<Editor> {
        let editor: WebElement = await this.tools.find(this.KOGITO_EDITOR_LOCATOR).withTimeout(2000).present();
        await this.tools.take(editor).scroll();
        return this.tools.createPageFragment(Editor, editor);
    }
}