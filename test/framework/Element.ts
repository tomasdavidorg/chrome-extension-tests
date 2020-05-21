import { WebElement, WebDriver } from "selenium-webdriver";

export default class Element {

    private readonly webElement: WebElement;

    constructor(webElement: WebElement) {
        this.webElement = webElement;
    }

    public getWebElement(): WebElement {
        return this.webElement;
    }

    public async clickJs(): Promise<void> {
        await this.getDriver().executeScript("arguments[0].click();", await this.webElement);
    }

    public async click(): Promise<void> {
        await this.webElement.click();
    }

    public async scroll(): Promise<void> {
        await this.getDriver().executeScript("arguments[0].scrollIntoView(true);", this.webElement);
    }

    public async getAttribute(attributeName: string): Promise<string> {
        return await this.webElement.getAttribute(attributeName)
    }

    private getDriver(): WebDriver {
        return this.webElement.getDriver();
    }
}