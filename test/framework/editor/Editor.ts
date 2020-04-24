import { By } from "selenium-webdriver";
import PageFragment from "../PageFragment";
import SideBar from "./SideBar"
import { performance } from "perf_hooks";

export default class Editor extends PageFragment {

    private readonly TOOLS_LOCATOR: By = By.className("fa-eye");
    private readonly SIDE_BAR_LOCATOR: By = By.className("qe-docks-bar-E");

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
}
