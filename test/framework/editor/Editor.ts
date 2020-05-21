import { By, WebElement } from "selenium-webdriver";
import PageFragment from "../PageFragment";
import SideBar from "./SideBar"
import Element from "../Element";

export default abstract class Editor extends PageFragment {

    protected static readonly SIDE_BAR_LOCATOR: By = By.className("qe-docks-bar-E");
    private static readonly CANVAS_LOCATOR: By = By.className("canvas-panel");
    private static readonly PALLETTE_LOCATOR: By = By.className("kie-palette");

    public async enter(): Promise<void> {
        await this.tools.driver.switchTo().frame(await this.root.getWebElement());
    }

    public async leave(): Promise<void> {
        await this.tools.driver.switchTo().defaultContent();
    }

    public async getSideBar(): Promise<SideBar> {
        const sideBar = await this.tools.by(Editor.SIDE_BAR_LOCATOR);
        await this.tools.by(Editor.SIDE_BAR_LOCATOR).wait(1000).untilPresent();
        return this.tools.createPageFragment(SideBar, await sideBar.getElement());
    }

    protected async getPalette(): Promise<Element> {
        return await this.tools.by(Editor.PALLETTE_LOCATOR).getElement();
    }

    protected async clickToCanvas(): Promise<void> {
        await this.tools.by(Editor.CANVAS_LOCATOR).click();
    }
}
