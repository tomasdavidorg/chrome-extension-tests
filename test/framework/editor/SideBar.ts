import PageFragment from "../PageFragment"
import Explorer from "./Explorer"
import { By, WebElement } from "selenium-webdriver";

export default class SideBar extends PageFragment {
    private readonly PROP_BUTTON_LOCATOR = By.xpath(".//button[@data-title='Properties']");
    private readonly EXPLORER_BUTTON_LOCATOR = By.xpath(".//button[@data-title='Explore Diagram']");
    private readonly EXPANDED_BAR = By.className("qe-static-workbench-panel-view");

    async openExplorer(): Promise<Explorer> {
        let diagramButton: WebElement = await this.tools.by(this.EXPLORER_BUTTON_LOCATOR).getWebElement();
        await diagramButton.click();
        let explorer: WebElement = await this.tools.by(this.EXPANDED_BAR).withTimeout(2000).getWebElement();
        return this.tools.createPageFragment(Explorer, explorer);
    }

    async openProperties(): Promise<void> {
        let propButton = await this.tools.by(this.PROP_BUTTON_LOCATOR).getWebElement();
        await propButton.click();
    }
}
