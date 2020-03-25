import { WebDriver, WebElement, By, until } from "selenium-webdriver"

export default class WebElementOperation {

    private driver: WebDriver;
    private webElement: WebElement;
    private timeout: number = 0; 

    constructor(driver: WebDriver, webElement: WebElement) {
        this.driver = driver;
        this.webElement = webElement;
    }

    withTimeout(timeout: number): WebElementOperation {
        this.timeout = timeout;
        return this;
    }

    async find(by: By) {
        this.driver.wait(async () => (await this.webElement.findElements(by)).length == 1, this.timeout);
        return await this.webElement.findElement(by);
    }
}