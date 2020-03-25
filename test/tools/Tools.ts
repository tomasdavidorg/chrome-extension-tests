import { WebDriver, By, WebElement } from "selenium-webdriver"
import Wait from "./Wait"
import Screenshot from "./ScreenShot"
import FindByOperation from "./FindByOperation";
import Page from "./Page"
import PageFragment from "./PageFragment";
import WebElementOperation from "./WebElementOperation"


export default class Tools {

    private static readonly SCREENSHOTS_DIR: string = "screenshots";

    readonly driver: WebDriver;

    readonly wait: Wait;

    readonly screenShot: Screenshot

    constructor(driver: WebDriver) {
        this.driver = driver;
        this.wait = new Wait(this.driver);
        this.screenShot = new Screenshot(this.driver, Tools.SCREENSHOTS_DIR);
    }

    public find(by: By) {
        return new FindByOperation(this.driver, by);
    }

    public take(webElement: WebElement) {
        return new WebElementOperation(this.driver, webElement);
    }

    public createPage<T extends Page>(type: { new(tools: Tools): T }) {
        return new type(this);
    }

    public pageFragment<T extends PageFragment>(type: { new(tools: Tools, parent: WebElement): T }, parent: WebElement) {
        return new type(this, parent);
    }
}
