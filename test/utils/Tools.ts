import { WebDriver, By } from "selenium-webdriver"
import Screenshot from "./tools/ScreenShot"
import Locator from "../framework/Locator";
import Page from "../framework/Page"
import PageFragment from "../framework/PageFragment";
import Clipboard from "./tools/Clipboard";
import Driver from "./tools/Driver";
import Element from "../framework/Element";

export default class Tools {

    private static readonly SCREENSHOTS_DIR: string = "screenshots";

    public readonly driver: WebDriver;

    public readonly screenShot: Screenshot;

    public readonly clipboard: Clipboard;

    private constructor(driver: WebDriver) {
        this.driver = driver;
        this.screenShot = new Screenshot(this.driver, Tools.SCREENSHOTS_DIR);
        this.clipboard = new Clipboard(this.driver);
    }

    public static async init(): Promise<Tools> {
        return new Tools(await Driver.init());
    }

    public async finish(testName: string): Promise<void> {
        const screenShotName: string = testName + "_screenshot_after_test";
        await this.driver.switchTo().defaultContent();
        await this.screenShot.takeHtml(screenShotName);
        await this.screenShot.takePng(screenShotName);
        await this.driver.quit();
    }

    public pause(timeout: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    public by(by: By): Locator {
        return new Locator(this.driver, by);
    }

    public async openPage<T extends Page>(type: { new(tools: Tools): T }, url: string): Promise<T> {
        await this.driver.get(url);
        return await this.createPage(type);
    }

    public async createPage<T extends Page>(type: { new(tools: Tools): T }): Promise<T> {
        return Page.create(type, this);
    }

    public async createPageFragment<T extends PageFragment>(type: { new(tools: Tools, root: Element): T }, root: Element): Promise<T> {
        return PageFragment.create(type, this, root)
    }
}
