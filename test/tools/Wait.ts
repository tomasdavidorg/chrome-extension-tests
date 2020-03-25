import { WebDriver, WebElement } from "selenium-webdriver";
import WebElementOperation from "./WebElementOperation";

export default class Wait {

    driver: WebDriver;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    pause(timeout: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    forElement(webElement: WebElement): WebElementOperation {
        return new WebElementOperation(this.driver, webElement);
    }
}