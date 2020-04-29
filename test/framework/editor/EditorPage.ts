import Page from "../Page";
import Editor from "./Editor";
import { By, WebElement } from "selenium-webdriver";

export default abstract class EditorPage extends Page {
    private static readonly FRAME_LOCATOR = By.xpath("//iframe[contains(@class,'kogito-iframe') or contains(@id,'kogito-iframe')]");

    public async getEditor(): Promise<Editor> {
        let editor: WebElement = await this.tools.by(EditorPage.FRAME_LOCATOR).withTimeout(2000).getWebElement();
        await this.tools.webElement(editor).scroll();
        return this.tools.createPageFragment(Editor, editor);
    }
}
