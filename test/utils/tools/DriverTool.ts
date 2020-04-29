import { WebDriver } from "selenium-webdriver";

export default abstract class DriverTool {
    protected readonly driver: WebDriver;

    public constructor(driver: WebDriver) {
        this.driver = driver;
    }
}
