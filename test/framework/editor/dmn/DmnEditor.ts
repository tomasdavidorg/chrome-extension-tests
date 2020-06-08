import { By } from "selenium-webdriver";
import DmnPalette from "./DmnPalette";
import DmnSideBar from "./DmnSideBar";
import Editor from "../Editor";
import Element from "../../Element";
import { performance } from "perf_hooks";

export default class DmnEditor extends Editor {

    private static readonly NAV_BAR_LOCATOR: By = By.className("kie-palette");

    public async getDmnPalette(): Promise<DmnPalette> {
        const palette: Element = await this.getPalette();
        return this.tools.createPageFragment(DmnPalette, palette);
    }

    public async waitUntilLoaded(): Promise<void> {
        await this.enter();

        const startTime = performance.now();
        await this.tools.by(DmnEditor.NAV_BAR_LOCATOR).wait(10000).untilPresent();
        const endTime = performance.now();

        console.debug("Plugin was loaded in " + (endTime - startTime));

        await this.leave();
    }

    public async getSideBar(): Promise<DmnSideBar> {
        const sideBar = this.tools.by(Editor.SIDE_BAR_LOCATOR);
        await sideBar.wait(1000).untilPresent();
        return this.tools.createPageFragment(DmnSideBar, await sideBar.getElement());
    }

    public async dragAndDropAnnotationToCanvas(): Promise<void> {
        const dmnPalette: DmnPalette = await this.getDmnPalette();
        await dmnPalette.dragAndDropAnnotationToCanvas();
    }
}
