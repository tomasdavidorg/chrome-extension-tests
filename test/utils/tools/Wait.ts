import { WebDriver, WebElement } from "selenium-webdriver";
import WebElementOperation from "./WebElementOperation";

export default class Wait {

    private readonly driver: WebDriver;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    pause(timeout: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
}