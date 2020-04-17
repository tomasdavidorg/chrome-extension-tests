import { WebDriver, By, WebElement } from "selenium-webdriver"
import Wait from "./tools/Wait"
import Screenshot from "./tools/ScreenShot"
import ByOperation from "./tools/ByOperation";
import Page from "../framework/Page"
import PageFragment from "../framework/PageFragment";
import WebElementOperation from "./tools/WebElementOperation"
import Clipboard from "./tools/Clipboard";
import Driver from "./tools/Driver";

export default class Tools {

    private static readonly SCREENSHOTS_DIR: string = "screenshots";

    readonly driver: WebDriver;

    readonly wait: Wait;

    readonly screenShot: Screenshot;

    readonly clipboard: Clipboard;

    private constructor(driver: WebDriver) {
        this.driver = driver;
        this.wait = new Wait(this.driver);
        this.screenShot = new Screenshot(this.driver, Tools.SCREENSHOTS_DIR);
        this.clipboard = new Clipboard(this.driver);
    }

    public static async init(): Promise<Tools> {
        return new Tools(await Driver.init());
    }

    public by(by: By) {
        return new ByOperation(this.driver, by);
    }

    public webElement(webElement: WebElement): WebElementOperation {
        return new WebElementOperation(this.driver, webElement);
    }

    public createPage<T extends Page>(type: { new(tools: Tools): T }) {
        return new type(this);
    }

    public createPageFragment<T extends PageFragment>(type: { new(tools: Tools, parent: WebElement): T }, parent: WebElement) {
        return new type(this, parent);
    }
}
