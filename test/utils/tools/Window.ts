import {WebDriver} from "selenium-webdriver";

export default class Window {

    private readonly driver: WebDriver;

    public constructor(driver: WebDriver) {
        this.driver = driver;
    }

    public async scrollToTop(): Promise<void> {
        await this.driver.executeScript("window.scrollTo(0, 0);");
    }

    public async switchToSecondWindow(): Promise<void> {
        await this.waitForSecondWindow();
        const windowHandles: string[] = await this.driver.getAllWindowHandles();
        if (windowHandles.length > 1 ) {
            await this.driver.switchTo().window(windowHandles[1]);  
        } else {
            throw new Error("Second window was not found.");
        }   
    }

    private async waitForSecondWindow(): Promise<void> {
        await this.driver.wait(async () => {
            const windowHandles: string[] = await this.driver.getAllWindowHandles();
            return (windowHandles.length > 1);
        }, 5000);
    }
}