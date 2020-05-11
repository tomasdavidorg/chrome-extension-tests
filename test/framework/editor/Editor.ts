import { By, WebElement } from "selenium-webdriver";
import PageFragment from "../PageFragment";
import SideBar from "./SideBar"

export default abstract class Editor extends PageFragment {

    protected static readonly SIDE_BAR_LOCATOR: By = By.className("qe-docks-bar-E");
    private static readonly CANVAS_LOCATOR: By = By.className("canvas-panel");
    private static readonly PALLETTE_LOCATOR: By = By.className("kie-palette");

    public async enter(): Promise<void> {
        await this.tools.driver.switchTo().frame(this.root);
    }

    public async leave(): Promise<void> {
        await this.tools.driver.switchTo().defaultContent();
    }

    public async getSideBar(): Promise<SideBar> {
        const sideBar = await this.tools.by(Editor.SIDE_BAR_LOCATOR).withTimeout(1000).getWebElement();
        return this.tools.createPageFragment(SideBar, sideBar);
    }

    protected async getPalette(): Promise<WebElement> {
        return await this.tools.by(Editor.PALLETTE_LOCATOR).getWebElement();
    }

    protected async clickToCanvas(): Promise<void> {
        const canvas = await this.tools.by(Editor.CANVAS_LOCATOR).getWebElement();
        await canvas.click();
    }
}
