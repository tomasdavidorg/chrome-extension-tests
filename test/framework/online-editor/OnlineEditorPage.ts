import EditorPage from "../editor/EditorPage"
import { By } from "selenium-webdriver";

export default class OnlineEditorPage extends EditorPage {

    private static readonly TOOLBAR_LOCATOR = By.className("kogito--editor__toolbar");

    public async load(): Promise<void> {
        await this.tools.by(OnlineEditorPage.TOOLBAR_LOCATOR).withTimeout(2000).present();
    }
}
