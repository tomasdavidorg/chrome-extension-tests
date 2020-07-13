import BpmnPalette from "./BpmnPalette";
import { By } from "selenium-webdriver";
import Editor from "../Editor";
import Element from "../../Element";

export default class BpmnEditor extends Editor {

    private static readonly EXPLORE_ICON_LOCATOR: By = By.className("fa-eye");
    private static readonly LOADING_POPUP_LOCATOR: By = By.className("pf-l-bullseye");

    public async waitUntilLoaded(): Promise<void> {
        await this.enter();
        if (await this.tools.by(BpmnEditor.LOADING_POPUP_LOCATOR).wait(5000).isPresent()) {
            await this.tools.by(BpmnEditor.LOADING_POPUP_LOCATOR).wait(15000).untilAbsent();
        }
        await this.tools.by(BpmnEditor.EXPLORE_ICON_LOCATOR).wait(5000).untilPresent();
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
