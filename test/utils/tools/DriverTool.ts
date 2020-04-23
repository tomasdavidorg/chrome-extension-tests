import { WebDriver } from "selenium-webdriver";

export default abstract class Tool {
    protected driver: WebDriver;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }
}
