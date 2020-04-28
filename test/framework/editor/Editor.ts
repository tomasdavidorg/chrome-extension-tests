import { By } from "selenium-webdriver";
import PageFragment from "../PageFragment";
import SideBar from "./SideBar"
import Pallette from "./Pallette"
import { performance } from "perf_hooks";

export default class Editor extends PageFragment {

    private readonly TOOLS_LOCATOR: By = By.className("fa-eye");
    private readonly SIDE_BAR_LOCATOR: By = By.className("qe-docks-bar-E");
    private readonly CANVAS_LOCATOR: By = By.className("canvas-panel");
    private readonly PALLETTE_LOCATOR: By = By.xpath("//div[@data-i18n-prefix='BS3PaletteWidgetViewImpl.']");

    async enter(): Promise<void> {
        await this.tools.driver.switchTo().frame(this.root);
    }

    async leave(): Promise<void> {
        await this.tools.driver.switchTo().defaultContent();
    }

    public async load(): Promise<void> {
        await this.enter();

        let startTime = performance.now();
        await this.tools.by(this.TOOLS_LOCATOR).withTimeout(25000).getWebElement();
        let endTime = performance.now();
        console.log("Plugin was loaded in " + (endTime - startTime));

        await this.leave();
    }

    async getSideBar(): Promise<SideBar> {
        let sideBar = await this.tools.by(this.SIDE_BAR_LOCATOR).withTimeout(1000).getWebElement();
        return this.tools.createPageFragment(SideBar, sideBar);
    }

    async dragAndDropStartEventToCanvas() {
        const palletteElement = await this.tools.by(this.PALLETTE_LOCATOR).getWebElement();
        const pallette = await this.tools.createPageFragment(Pallette, palletteElement);
        const canvas = await this.tools.by(this.CANVAS_LOCATOR).getWebElement();
        await pallette.dragAndDropStarEventTo(canvas);
    }
}
