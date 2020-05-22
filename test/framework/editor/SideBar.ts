import PageFragment from "../PageFragment";
import Explorer from "./Explorer";
import Properties from "./Properties";
import { By, WebElement } from "selenium-webdriver";
import Element from "../Element";

export default class SideBar extends PageFragment {

    private static readonly PROP_BUTTON_LOCATOR = By.xpath(".//button[@data-title='Properties']");
    private static readonly EXPLORER_BUTTON_LOCATOR = By.xpath(".//button[@data-title='Explore Diagram' or @data-title='Explore diagram']");
    private static readonly EXPANDED_BAR_LOCATOR = By.className("qe-docks-bar-expanded-E");

    public async waitUntilLoaded(): Promise<void> {
        await this.tools.by(SideBar.EXPLORER_BUTTON_LOCATOR).wait(1000).untilPresent();
    }

    protected async openSideBar(byIcon: Element): Promise<Element> {
        await byIcon.click();
        const expandedBar = this.tools.by(SideBar.EXPANDED_BAR_LOCATOR)
        await expandedBar.wait(2000).untilPresent();
        return await expandedBar.getElement()
    }

    public async openExplorer(): Promise<Explorer> {
        const diagramButton: Element = await this.tools.by(SideBar.EXPLORER_BUTTON_LOCATOR).getElement();
        const sideBar = await this.openSideBar(diagramButton);
        return this.tools.createPageFragment(Explorer, sideBar);
    }

    public async closeActiveSideBar(): Promise<void> {
        const activeSideBar: Element = await this.root.findElement(By.className("active"));
        //const activeSideBar: WebElement = await this.tools.webElement(this.root.getWebElement()).withTimeout(1000).find(By.className("active"));
        await activeSideBar.click();
    }

    public async openProperties(): Promise<Properties> {
        const propButton = await this.tools.by(SideBar.PROP_BUTTON_LOCATOR).getElement();
        const sideBar = await this.openSideBar(propButton);
        return this.tools.createPageFragment(Properties, sideBar);
    }
}
