import { By } from "selenium-webdriver";
import PageFragment from "../PageFragment";
import SideBar from "./SideBar"
import Pallette from "./Pallette"
import { performance } from "perf_hooks";

export default class Editor extends PageFragment {

    private static readonly TOOLS_LOCATOR: By = By.className("fa-eye");
    private static readonly SIDE_BAR_LOCATOR: By = By.className("qe-docks-bar-E");
    private static readonly CANVAS_LOCATOR: By = By.className("canvas-panel");
    private static readonly PALLETTE_LOCATOR: By = By.xpath("//div[@data-i18n-prefix='BS3PaletteWidgetViewImpl.']");

    public async load(): Promise<void> {
        await this.enter();

        const startTime = performance.now();
        await this.tools.by(Editor.TOOLS_LOCATOR).withTimeout(10000).getWebElement();
        const endTime = performance.now();

        console.debug("Plugin was loaded in " + (endTime - startTime));

        await this.leave();
    }

    async enter(): Promise<void> {
        await this.tools.driver.switchTo().frame(this.root);
    }

    async leave(): Promise<void> {
        await this.tools.driver.switchTo().defaultContent();
    }

    async getSideBar(): Promise<SideBar> {
        const sideBar = await this.tools.by(Editor.SIDE_BAR_LOCATOR).withTimeout(1000).getWebElement();
        return this.tools.createPageFragment(SideBar, sideBar);
    }

    async dragAndDropStartEventToCanvas() {
        const palletteElement = await this.tools.by(Editor.PALLETTE_LOCATOR).getWebElement();
        const pallette = await this.tools.createPageFragment(Pallette, palletteElement);
        await pallette.dragAndDropStartEventToCanvas();
        const canvas = await this.tools.by(Editor.CANVAS_LOCATOR).getWebElement();
        await canvas.click();
    }
}
