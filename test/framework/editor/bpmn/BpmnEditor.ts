import BpmnPalette from "./BpmnPalette";
import { By } from "selenium-webdriver";
import Editor from "../Editor";
import Element from "../../Element";
import SideBar from "../SideBar";
import Locator from "../../Locator";

export default class BpmnEditor extends Editor {

    private static readonly EXPLORE_ICON_LOCATOR: By = By.className("fa-eye");
    private static readonly LOADING_POPUP_LOCATOR: By = By.className("pf-l-bullseye");
    private static readonly CANVAS_LOCATOR: By = By.className("canvas-panel");
    private static readonly PALETTE_LOCATOR: By = By.className("kie-palette");
    private static readonly SIDE_BAR_LOCATOR: By = By.className("qe-docks-bar-E");

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
        const palette: Element = await this.tools.by(BpmnEditor.PALETTE_LOCATOR).getElement();
        return await this.tools.createPageFragment(BpmnPalette, palette);
    }

    private async clickToCanvas(): Promise<void> {
        const canvas: Element = await this.tools.by(BpmnEditor.CANVAS_LOCATOR).getElement();
        await canvas.click();
    }

    public async getSideBar(): Promise<SideBar> {
        const sideBar: Locator = await this.tools.by(BpmnEditor.SIDE_BAR_LOCATOR);
        await sideBar.wait(1000).untilPresent();
        return this.tools.createPageFragment(SideBar, await sideBar.getElement());
    }
}
