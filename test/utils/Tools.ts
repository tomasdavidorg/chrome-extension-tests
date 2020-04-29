import { WebDriver, By, WebElement } from "selenium-webdriver"
import Screenshot from "./tools/ScreenShot"
import ByOperation from "./tools/ByOperation";
import Page from "../framework/Page"
import PageFragment from "../framework/PageFragment";
import WebElementOperation from "./tools/WebElementOperation"
import Clipboard from "./tools/Clipboard";
import Driver from "./tools/Driver";

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

    public pause(timeout: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    public by(by: By): ByOperation {
        return new ByOperation(this.driver, by);
    }

    public webElement(webElement: WebElement): WebElementOperation {
        return new WebElementOperation(this.driver, webElement);
    }

    public async createPage<T extends Page>(type: { new(tools: Tools): T }): Promise<T> {
        const page: T = new type(this);
        await page.load();
        return page;
    }

    public async createPageFragment<T extends PageFragment>(type: { new(tools: Tools, parent: WebElement): T }, parent: WebElement): Promise<T> {
        const pageFragment = new type(this, parent);
        await pageFragment.load();
        return pageFragment;
    }
}
