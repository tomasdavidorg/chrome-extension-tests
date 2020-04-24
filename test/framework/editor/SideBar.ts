import PageFragment from "../PageFragment";
import Explorer from "./Explorer";
import Properties from "./Properties";
import { By, WebElement } from "selenium-webdriver";

export default class SideBar extends PageFragment {
    private readonly PROP_BUTTON_LOCATOR = By.xpath(".//button[@data-title='Properties']");
    private readonly EXPLORER_BUTTON_LOCATOR = By.xpath(".//button[@data-title='Explore Diagram']");
    private readonly EXPANDED_BAR = By.className("qe-static-workbench-panel-view");

    private async openSideBar(byIcon: WebElement): Promise<WebElement> {
        await byIcon.click();
        return await this.tools.by(this.EXPANDED_BAR).withTimeout(2000).getWebElement();
    }

    async openExplorer(): Promise<Explorer> {
        let diagramButton: WebElement = await this.tools.by(this.EXPLORER_BUTTON_LOCATOR).getWebElement();
        let sideBar = await this.openSideBar(diagramButton);
        return this.tools.createPageFragment(Explorer, sideBar);
    }

    async openProperties(): Promise<Properties> {
        let propButton = await this.tools.by(this.PROP_BUTTON_LOCATOR).getWebElement();
        let sideBar = await this.openSideBar(propButton);
        return this.tools.createPageFragment(Properties, sideBar);
    }
}
