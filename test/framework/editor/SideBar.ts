import { By } from "selenium-webdriver";
import Element from "../Element";
import Explorer from "./Explorer";
import Locator from "../Locator";
import PageFragment from "../PageFragment";
import Properties from "./Properties";

export default class SideBar extends PageFragment {

    private static readonly PROP_BUTTON_LOCATOR = By.xpath("//div[./button[@data-title='Properties']]");
    private static readonly EXPLORER_BUTTON_LOCATOR = By.xpath("//div[./button[@data-title='Explore Diagram' or @data-title='Explore diagram']]");
    private static readonly EXPANDED_BAR_LOCATOR = By.className("qe-docks-bar-expanded-E");

    public async waitUntilLoaded(): Promise<void> {
        await this.tools.by(SideBar.EXPLORER_BUTTON_LOCATOR).wait(1000).untilPresent();
    }

    protected async openSideBar(byIcon: Element): Promise<Element> {
        const randomNumber = Math.random();
        const expandedBar: Locator = this.tools.by(SideBar.EXPANDED_BAR_LOCATOR);
        console.log(randomNumber + "##A## Sidebar is visible: "+ await expandedBar.wait(1000).isVisible());
        await this.tools.makeScreenshots(randomNumber + "##A##");
        await byIcon.click();

        await expandedBar.wait(5000).untilVisible();
        console.log(randomNumber + "##B## Sidebar is visible: "+ await expandedBar.wait(1000).isVisible());
        await this.tools.makeScreenshots(randomNumber + "##B##");
        // move to make the tooltip diappear 
        await byIcon.offsetMove(-200, 0);
        return await expandedBar.getElement();
    }

    public async openExplorer(): Promise<Explorer> {
        const diagramButton: Element = await this.tools.by(SideBar.EXPLORER_BUTTON_LOCATOR).wait(2000).untilPresent();
        const sideBar = await this.openSideBar(diagramButton);
        return this.tools.createPageFragment(Explorer, sideBar);
    }

    public async closeActiveSideBar(): Promise<void> {
        const activeSideBar: Element = await this.root.findElement(By.className("active"));
        await activeSideBar.click();
    }

    public async openProperties(): Promise<Properties> {
        const propButton = await this.tools.by(SideBar.PROP_BUTTON_LOCATOR).getElement();
        const sideBar = await this.openSideBar(propButton);
        return this.tools.createPageFragment(Properties, sideBar);
    }
}
