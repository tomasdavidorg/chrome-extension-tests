import Editor from "../Editor";
import BpmnPalette from "./BpmnPalette";
import { By, WebElement } from "selenium-webdriver";
import { performance } from "perf_hooks";

export default class BpmnEditor extends Editor {

    private static readonly EXPLORE_ICON_LOCATOR: By = By.className("fa-eye");

    public async load(): Promise<void> {
        await this.enter();

        const startTime = performance.now();
        await this.tools.by(BpmnEditor.EXPLORE_ICON_LOCATOR).withTimeout(10000).getWebElement();
        const endTime = performance.now();

        console.debug("Plugin was loaded in " + (endTime - startTime));

        await this.leave();
    }

    public async dragAndDropStartEventToCanvas() {
        const bpmnPalette: BpmnPalette = await this.getBpmnPalette()
        await bpmnPalette.dragAndDropStartEventToCanvas();
        await this.clickToCanvas();
    }

    private async getBpmnPalette(): Promise<BpmnPalette> {
        const palette: WebElement = await this.getPalette();
        return await this.tools.createPageFragment(BpmnPalette, palette);
    }
}
