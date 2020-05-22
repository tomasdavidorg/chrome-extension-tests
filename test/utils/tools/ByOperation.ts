import { WebDriver, WebElement, By, until, error } from "selenium-webdriver";
import WaitOperation from "./WaitOperation";
import Element from "../../framework/Element";

export default class ByOperation {

    private readonly driver: WebDriver
    private readonly by: By;
    private timeout: number = 100;

    constructor(driver: WebDriver, by: By) {
        this.driver = driver;
        this.by = by;
    }

    public wait(timeout?: number) {
        return new WaitOperation(this.driver, this.by, timeout);
    }

    public async getElement(): Promise<Element> {
        const webElement: WebElement = await this.driver.wait(until.elementLocated(this.by), this.timeout);
        return new Element(webElement);
    }

    public async getElements(): Promise<Element[]> {
        const webElements: WebElement[] = await this.driver.findElements(this.by);
        return webElements.map(webElement => new Element(webElement));
    }

    public withTimeout(timeout: number): ByOperation {
        this.timeout = timeout;
        return this;
    }

    public async click(): Promise<void> {
        const element: Element = await this.getElement();
        await element.click();
    }

    public async clickJs(): Promise<void> {
        const element: Element = await this.getElement();
        await element.clickJs();
    }

    public async scroll(): Promise<void> {
        const element: Element = await this.getElement();
        await element.scroll();
    }

    public async getAttribute(attributeName: string): Promise<string> {
        const element: Element = await this.getElement();
        return await element.getAttribute(attributeName);
    }
}
