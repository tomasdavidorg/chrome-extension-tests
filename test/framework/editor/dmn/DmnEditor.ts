import Editor from "../Editor";
import DmnPalette from "./DmnPallette"
import DmnSideBar from "./DmnSideBar"
import { By, WebElement } from "selenium-webdriver";
import { performance } from "perf_hooks";

export default class DmnEditor extends Editor {

    private static readonly NAV_BAR_LOCATOR: By = By.className("kie-palette");

    public async getDmnPalette(): Promise<DmnPalette> {
        const pallette: WebElement = await this.getPalette();
        return this.tools.createPageFragment(DmnPalette, pallette);
    }

    public async load(): Promise<void> {
        await this.enter();

        const startTime = performance.now();
        await this.tools.by(DmnEditor.NAV_BAR_LOCATOR).wait(10000).untilPresent();
        const endTime = performance.now();

        console.debug("Plugin was loaded in " + (endTime - startTime));

        await this.leave();
    }

    public async getSideBar(): Promise<DmnSideBar> {
        const sideBar = await this.tools.by(Editor.SIDE_BAR_LOCATOR).withTimeout(1000).getWebElement();
        return this.tools.createPageFragment(DmnSideBar, sideBar);
    }
}
