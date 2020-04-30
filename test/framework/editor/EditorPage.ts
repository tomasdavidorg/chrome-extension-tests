import Page from "../Page";
import DmnEditor from "./dmn/DmnEditor";
import { By, WebElement } from "selenium-webdriver";
import BpmnEditor from "./bpmn/BpmnEditor";

export default abstract class EditorPage extends Page {
    private static readonly FRAME_LOCATOR = By.xpath("//iframe[contains(@class,'kogito-iframe') or contains(@id,'kogito-iframe')]");

    private async getEditor(): Promise<WebElement> {
        const editor: WebElement = await this.tools.by(EditorPage.FRAME_LOCATOR).withTimeout(2000).getWebElement();
        await this.tools.webElement(editor).scroll();
        return editor;
    }

    public async getDmnEditor(): Promise<DmnEditor> {
        const editor: WebElement = await this.getEditor();
        return this.tools.createPageFragment(DmnEditor, editor);
    }

    public async getBpmnEditor(): Promise<BpmnEditor> {
        const editor: WebElement = await this.getEditor();
        return this.tools.createPageFragment(BpmnEditor, editor);
    }
}
