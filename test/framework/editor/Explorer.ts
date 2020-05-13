import PageFragment from "../PageFragment";
import { By, WebElement } from "selenium-webdriver";

export default class Explorer extends PageFragment {

    private static readonly PANEL_LOCATOR = By.xpath("//div[@data-field='explorerPanelBody']");
    private static readonly ITEM_LOCATOR = By.className("gwt-Anchor");

    public async load(): Promise<void> {
        this.tools.by(Explorer.PANEL_LOCATOR).wait(1000).untilPresent();
    }

    private async getItems(): Promise<WebElement[]> {
        return await this.tools.by(Explorer.ITEM_LOCATOR).getWebElements();
    }

    private async getNodes(): Promise<WebElement[]> {
        const items: WebElement[] = await this.getItems();
        items.shift();
        return items;
    }

    private async getNode(name: string): Promise<WebElement> {
        for (const node of await this.getNodes()) {
            if (await node.getText() === name) {
                return node;
            }
        }
        throw new Error("Node '" + name + "' was not found.");
    }

    public async getProcessName(): Promise<string> {
        const items: WebElement[] = await this.getItems();
        return await items[0].getText();
    }

    public async getNodeNames(): Promise<string[]> {
        const nodes: WebElement[] = await this.getNodes();
        return Promise.all(nodes.map(node => node.getText()));
    }

    public async selectNode(name: string): Promise<void> {
        const node: WebElement = await this.getNode(name);
        await node.click();
    }
}
