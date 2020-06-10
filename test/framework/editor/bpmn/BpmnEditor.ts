
import BpmnPalette from "./BpmnPalette";
import { By } from "selenium-webdriver";
import Editor from "../Editor";
import Element from "../../Element";

export default class BpmnEditor extends Editor {

    private static readonly EXPLORE_ICON_LOCATOR: By = By.className("fa-eye");

    public async waitUntilLoaded(): Promise<void> {
        await this.enter();
        await this.tools.by(BpmnEditor.EXPLORE_ICON_LOCATOR).wait(10000).untilPresent();
        await this.leave();
    }

    public async dragAndDropStartEventToCanvas(): Promise<void> {
        const bpmnPalette: BpmnPalette = await this.getBpmnPalette();
        await bpmnPalette.dragAndDropStartEventToCanvas();
        await this.clickToCanvas();
    }

    private async getBpmnPalette(): Promise<BpmnPalette> {
        const palette: Element = await this.getPalette();
        return await this.tools.createPageFragment(BpmnPalette, palette);
    }
}
