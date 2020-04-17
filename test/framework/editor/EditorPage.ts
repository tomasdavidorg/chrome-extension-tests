import Page from "../Page";
import Editor from "./Editor";
import { By, WebElement } from "selenium-webdriver";

export default abstract class EditorPage extends Page {
    private readonly KOGITO_EDITOR_FRAME_LOCATOR = By.className("kogito-iframe");

    public async getEditor(): Promise<Editor> {
        let editor: WebElement = await this.tools.by(this.KOGITO_EDITOR_FRAME_LOCATOR).withTimeout(2000).present();
        await this.tools.webElement(editor).scroll();
        return this.tools.createPageFragment(Editor, editor);
    }
}
