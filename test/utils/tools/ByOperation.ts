import { WebDriver, WebElement, By, until, error } from "selenium-webdriver";
import WaitOperation from "./WaitOperation";

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

    public withTimeout(timeout: number): ByOperation {
        this.timeout = timeout;
        return this;
    }

    public async getWebElement(): Promise<WebElement> {
        return await this.driver.wait(until.elementLocated(this.by), this.timeout);
    }

    public async getWebElements(): Promise<WebElement[]> {
        return await this.driver.wait(until.elementsLocated(this.by), this.timeout);
    }

    public async clickJs(): Promise<void> {
        await this.driver.executeScript("arguments[0].click();", await  this.getWebElement());
    }
}
