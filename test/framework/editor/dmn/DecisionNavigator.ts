import PageFragment from "../../PageFragment";
import { By, WebElement } from "selenium-webdriver";

export default class DecisionNavigator extends PageFragment {

    private static readonly DECISION_GRAPH_LOCATOR: By = By.id("decision-graphs-content");
    private static readonly ITEM_LOCATOR: By = By.xpath("//li[@data-field='item']");

    public async load(): Promise<void> {
        await this.tools.by(DecisionNavigator.DECISION_GRAPH_LOCATOR).wait(1000).untilPresent();
    }

    private async getItems(): Promise<WebElement[]> {
        return await this.tools.by(DecisionNavigator.ITEM_LOCATOR).getWebElements();
    }

    private async getNodes(): Promise<WebElement[]> {
        const items: WebElement[] = await this.getItems();
        items.shift(); // remove DMN name
        return items;
    }

    public async getDmnName(): Promise<string> {
        const items: WebElement[] = await this.getItems();
        return await items[0].getAttribute("title");
    }

    public async getNodeNames(): Promise<string[]> {
        const nodes: WebElement[] = await this.getNodes();
        return Promise.all(nodes.map(node => node.getAttribute("title")));
    }

    public async selectNode(name: string): Promise<void> {
        await this.tools.by(By.xpath(`//li[@data-field='item'][@title='${name}']/div`)).click();
    }
}