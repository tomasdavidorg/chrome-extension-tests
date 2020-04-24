import PageFragment from "../PageFragment";
import { By, WebElement } from "selenium-webdriver";

export default class Explorer extends PageFragment {

    private readonly ITEM_LOCATOR = By.className("gwt-Anchor");

    private async getItems(): Promise<WebElement[]> {
        return await this.tools.by(this.ITEM_LOCATOR).getWebElements();
    }

    private async getNodes(): Promise<WebElement[]> {
        let items: WebElement[] = await this.getItems();
        items.shift();
        return items;
    }

    private async getNode(name: string): Promise<WebElement> {
        for (let node of await this.getNodes()) {
            if (await node.getText() === name) {
                return node;
            }
        }
        throw new Error("Node '" + name + "' was not found.")
    }

    async getProcessName(): Promise<string> {
        let items: WebElement[] = await this.getItems();
        return await items[0].getText();
    }

    async getNodeNames(): Promise<string[]> {
        let nodes: WebElement[] = await this.getNodes();
        return Promise.all(nodes.map(node => node.getText()));
    }

    async selectNode(name: string): Promise<void> {
        let node: WebElement = await this.getNode(name);
        await node.click();
    }
}
