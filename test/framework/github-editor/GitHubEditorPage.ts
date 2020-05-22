import { By } from "selenium-webdriver";
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

    public async waitUntilLoaded(): Promise<void> {
        await this.tools.by(GitHubEditorPage.KOGITO_TOOLBAR_LOCATOR).wait(2000).untilPresent();
    }

    public async copyLinkToOnlineEditor(): Promise<void> {
        await this.tools.by(GitHubEditorPage.COPY_LINK_BUTTON_LOCATOR).click();
        await this.tools.by(GitHubEditorPage.COPY_LINK_ALERT_LOCATOR).wait(1000).untilPresent();
        await this.tools.by(GitHubEditorPage.COPY_LINK_ALERT_LOCATOR).wait(5000).untilAbsent();        
    }

    public async seeAsSource(): Promise<void> {
        await this.tools.by(GitHubEditorPage.SEE_AS_SOURCE_BUTTON_LOCATOR).click();
    }

    public async seeAsDiagram(): Promise<void> {
        await this.tools.by(GitHubEditorPage.SEE_AS_DIAGRAM_BUTTON_LOCATOR).click();
    }

    public async isSourceVisible(): Promise<boolean> {
        return await this.tools.by(GitHubEditorPage.SOURCE_VIEW_LOCATOR).wait(1000).isVisible();
    }

    public async isEditorVisible(): Promise<boolean> {
        return await this.tools.by(GitHubEditorPage.KOGITO_CONTAINER_LOCATOR).wait(1000).isVisible();
    }

    public async openOnlineEditor(): Promise<OnlineEditorPage> {
        const onlineEditorButton = this.tools.by(GitHubEditorPage.ONLINE_EDITOR_BUTTON_LOCATOR);
        await onlineEditorButton.wait(2000).untilPresent();
        await onlineEditorButton.click();

        await this.tools.driver.wait(async () => {
            const windowHandles = await this.tools.driver.getAllWindowHandles();
            return (windowHandles.length > 1);
        }, 5000);

        const windowHandles = await this.tools.driver.getAllWindowHandles();

        await this.tools.driver.switchTo().window(windowHandles[1]);

        return this.tools.createPage(OnlineEditorPage);
    }

    public async fullScreen(): Promise<FullscreenPage> {
        // sometimes button cannot be pushed by regural click
        await this.tools.by(GitHubEditorPage.FULL_SCREEN_BUTTON_LOCATOR).clickJs()
        
        return this.tools.createPage(FullscreenPage);
    }
}