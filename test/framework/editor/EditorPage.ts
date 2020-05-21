import Page from "../Page";
import DmnEditor from "./dmn/DmnEditor";
import { By, WebElement } from "selenium-webdriver";
import BpmnEditor from "./bpmn/BpmnEditor";
import Element from "../Element";

export default abstract class EditorPage extends Page {
    private static readonly FRAME_LOCATOR = By.xpath("//iframe[contains(@class,'kogito-iframe') or contains(@id,'kogito-iframe')]");

    private async getEditor(): Promise<Element> {
        const frame = await this.tools.by(EditorPage.FRAME_LOCATOR);
        await frame.wait(2000).untilPresent()
        await frame.scroll();
        return await frame.getElement();
    }

    public async getDmnEditor(): Promise<DmnEditor> {
        const editor: Element = await this.getEditor();
        return this.tools.createPageFragment(DmnEditor, editor);
    }

    public async getBpmnEditor(): Promise<BpmnEditor> {
        const editor: Element = await this.getEditor();
        return this.tools.createPageFragment(BpmnEditor, editor);
    }
}
