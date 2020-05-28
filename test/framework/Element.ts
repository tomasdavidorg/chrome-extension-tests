import { By, WebDriver, WebElement, } from "selenium-webdriver";
import ElementWaitOperation from "./ElementWaitOperation";

export default class Element {

    private readonly webElement: WebElement;

    constructor(webElement: WebElement) {
        this.webElement = webElement;
    }

    public wait(timeout?: number): ElementWaitOperation {
        return new ElementWaitOperation(this, timeout);
    }

    public async dragAndDrop(x: number, y: number): Promise<void> {
        await this.click();

        // no other way of drag and drop works
        const actions = this.getDriver().actions();
        await actions.move({ origin: this.webElement, x, y }).perform();
        await actions.click().perform();
    }

    public async getText(): Promise<string> {
        return this.webElement.getText();
    }

    public async clickJs(): Promise<void> {
        await this.getDriver().executeScript("arguments[0].click();", await this.webElement);
    }

    public async click(): Promise<void> {
        await this.webElement.click();
    }

    public async offsetClick(x: number, y: number): Promise<void> {
        const actions = this.getDriver().actions();
        await actions.move({ origin: await this.webElement, x, y }).perform();
        await actions.click().perform();
    }

    public async scroll(): Promise<void> {
        await this.getDriver().executeScript("arguments[0].scrollIntoView(true);", this.webElement);
    }

    public async getAttribute(attributeName: string): Promise<string> {
        return await this.webElement.getAttribute(attributeName);
    }

    public async findElement(by: By): Promise<Element> {
        return new Element(await this.webElement.findElement(by));
    }

    public async findElements(by: By): Promise<Element[]> {
        const webElements = await this.webElement.findElements(by);
        return webElements.map(webElement => new Element(webElement));
    }

    public async enterFrame(): Promise<void> {
        await this.getDriver().switchTo().frame(this.webElement);
    }

    public async leaveFrame(): Promise<void> {
        await this.getDriver().switchTo().defaultContent();
    }

    public async markWithRedColor(): Promise<void> {
        await this.getDriver().executeScript("arguments[0].style.backgroundColor = '#ff0000';", this.webElement);  
    }

    private getDriver(): WebDriver {
        return this.webElement.getDriver();
    }
}
