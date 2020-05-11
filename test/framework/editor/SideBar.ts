import PageFragment from "../PageFragment";
import Explorer from "./Explorer";
import Properties from "./Properties";
import { By, WebElement } from "selenium-webdriver";

export default class SideBar extends PageFragment {

    private static readonly PROP_BUTTON_LOCATOR = By.xpath(".//button[@data-title='Properties']");
    private static readonly EXPLORER_BUTTON_LOCATOR = By.xpath(".//button[@data-title='Explore Diagram' or @data-title='Explore diagram']");
    private static readonly EXPANDED_BAR_LOCATOR = By.className("qe-docks-bar-expanded-E");

    public async load(): Promise<void> {
        await this.tools.by(SideBar.EXPLORER_BUTTON_LOCATOR).withTimeout(1000).present();
    }

    protected async openSideBar(byIcon: WebElement): Promise<WebElement> {
        await byIcon.click();
        return await this.tools.by(SideBar.EXPANDED_BAR_LOCATOR).withTimeout(2000).getWebElement();
    }

    public async openExplorer(): Promise<Explorer> {
        const diagramButton: WebElement = await this.tools.by(SideBar.EXPLORER_BUTTON_LOCATOR).getWebElement();
        const sideBar = await this.openSideBar(diagramButton);
        return this.tools.createPageFragment(Explorer, sideBar);
    }

    public async closeActiveSideBar(): Promise<void> {
        const activeSideBar: WebElement = await this.tools.webElement(this.root).withTimeout(1000).find(By.className("active"));
        await activeSideBar.click();
    }

    public async openProperties(): Promise<Properties> {
        const propButton = await this.tools.by(SideBar.PROP_BUTTON_LOCATOR).getWebElement();
        const sideBar = await this.openSideBar(propButton);
        return this.tools.createPageFragment(Properties, sideBar);
    }
}
