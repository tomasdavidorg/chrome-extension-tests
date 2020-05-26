import { WebDriver, WebElement, By } from "selenium-webdriver";
import WaitOperation from "./WaitOperation";
import Element from "./Element";

export default class LocatorOperation {

    private readonly driver: WebDriver
    private readonly by: By;

    constructor(driver: WebDriver, by: By) {
        this.driver = driver;
        this.by = by;
    }

    public wait(timeout?: number): WaitOperation {
        return new WaitOperation(this.driver, this.by, timeout);
    }

    public async getElement(): Promise<Element> {
        const webElement: WebElement = await this.driver.findElement(this.by);
        return new Element(webElement);
    }

    public async getElements(): Promise<Element[]> {
        const webElements: WebElement[] = await this.driver.findElements(this.by);
        return webElements.map(webElement => new Element(webElement));
    }
}
