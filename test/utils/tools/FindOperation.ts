import { WebDriver, WebElement, By, until } from "selenium-webdriver";

export default class FindOperation {
    private readonly driver: WebDriver;
    private readonly by: By;
    private timeout: number = 0;

    constructor(driver: WebDriver, by: By) {
        this.driver = driver;
        this.by = by;
    }

    withTimeout(timeout: number): FindOperation {
        this.timeout = timeout;
        return this;
    }

    present(): Promise<WebElement> {
        return this.driver.wait(until.elementLocated(this.by), this.timeout);
    }
}
