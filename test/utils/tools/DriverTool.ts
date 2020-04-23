import { WebDriver } from "selenium-webdriver";

export default abstract class DriverTool {
    protected readonly driver: WebDriver;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }
}
