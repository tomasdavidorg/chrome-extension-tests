import Page from "../Page";
import Editor from "../github-editor/Editor";
import { WebElement, By } from "selenium-webdriver";

export default class OnlineEditorPage extends Page {

    private readonly KOGITO_EDITOR_LOCATOR = By.id("kogito-iframe");

    async getEditor(): Promise<Editor> {
        let editor: WebElement = await this.tools.by(this.KOGITO_EDITOR_LOCATOR).withTimeout(2000).present();
        await this.tools.webElement(editor).scroll();
        return this.tools.createPageFragment(Editor, editor);
    }

}
