import { WebElement, By } from "selenium-webdriver";
import Page from "../Page";
import GitHubListItem from "./GitHubListItem";

export default class GitHubListPage extends Page {

    private static readonly ITEM_LOCATOR = By.xpath("//tr[@class='js-navigation-item']");

    public async load(): Promise<void> {
        this.tools.by(GitHubListPage.ITEM_LOCATOR).wait(1000).untilPresent();
    }

    public async getFile(name: string): Promise<GitHubListItem> {
        const itemLocator: By = By.xpath(`//tr[.//a[text()='${name}']]`);
        const item: WebElement = await this.tools.by(itemLocator).withTimeout(5000).getWebElement();
        return this.tools.createPageFragment(GitHubListItem, item);
    }
}
