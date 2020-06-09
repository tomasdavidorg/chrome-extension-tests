import { By } from "selenium-webdriver";
import EditorPage from "../editor/EditorPage";
import Element from "../Element";

export default class GitHubPrPage extends EditorPage {

    private static readonly SEE_AS_DIAGRAM_BUTTON_LOCATOR = By.xpath("//button[text()='See as diagram']");
    private static readonly CLOSE_DIAGRAM_BUTTON_LOCATOR = By.xpath("//button[text()='Close diagram']");
    private static readonly ORIGINAL_BUTTON_LOCATOR = By.xpath("//button[text()='Original']");
    private static readonly CHANGES_BUTTON_LOCATOR = By.xpath("//button[text()='Changes']");
    private static readonly RAW_CONTENT_LOCATOR = By.className("js-file-content");

    public async waitUntilLoaded(): Promise<void> {
        await this.tools.by(GitHubPrPage.SEE_AS_DIAGRAM_BUTTON_LOCATOR).wait(1000).untilPresent();
    }

    public async isSourceOpened(): Promise<boolean> {
        return await this.tools.by(GitHubPrPage.RAW_CONTENT_LOCATOR).wait(2000).isVisible();
    }

    public async isDiagramOpened(): Promise<boolean> {
        return await this.tools.by(EditorPage.FRAME_LOCATOR).wait(2000).isPresent();
    }

    public async seeAsDiagram(): Promise<void> {
        const seeAsDiagramButton: Element = await this.tools.by(GitHubPrPage.SEE_AS_DIAGRAM_BUTTON_LOCATOR).getElement();
        await seeAsDiagramButton.click();
    }

    public async closeDiagram(): Promise<void> {
        const closeDiagramButton: Element = await this.tools.by(GitHubPrPage.CLOSE_DIAGRAM_BUTTON_LOCATOR).getElement();
        await closeDiagramButton.click();
    }

    public async original(): Promise<void> {
        const originalButton: Element = await this.tools.by(GitHubPrPage.ORIGINAL_BUTTON_LOCATOR).getElement();
        await originalButton.clickJs();
        await this.tools.by(GitHubPrPage.CHANGES_BUTTON_LOCATOR).wait(2500).untilEnabled();
    }

    public async changes(): Promise<void> {
        const changesButton: Element = await this.tools.by(GitHubPrPage.CHANGES_BUTTON_LOCATOR).getElement();
        await changesButton.clickJs();
        await this.tools.by(GitHubPrPage.ORIGINAL_BUTTON_LOCATOR).wait(2500).untilEnabled();

    }
}
