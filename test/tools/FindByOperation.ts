
import { WebDriver, WebElement, By, until } from "selenium-webdriver"
import WebElementOperation from "./WebElementOperation"

export default class FindByOperation {
    private driver: WebDriver;
    private by: By;
    private timeout: number = 0;

    constructor(driver: WebDriver, by: By) {
        this.driver = driver;
        this.by = by;
    }

    withTimeout(timeout: number): FindByOperation {
        this.timeout = timeout;
        return this;
    }

    present(): Promise<WebElement> {
        return this.driver.wait(until.elementLocated(this.by), this.timeout);
    }

    async enabled(): Promise<WebElementOperation> {
        let webElement = await this.present();
        return new WebElementOperation(this.driver, webElement);
    }
}