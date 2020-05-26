import { By } from "selenium-webdriver";
import EditorPage from "../editor/EditorPage";

export default class OnlineEditorPage extends EditorPage {
    
    private static readonly TOOLBAR_LOCATOR: By = By.className("kogito--editor__toolbar");

    public async waitUntilLoaded(): Promise<void> {
        await this.tools.by(OnlineEditorPage.TOOLBAR_LOCATOR).wait(2000).untilPresent();
    }
}
