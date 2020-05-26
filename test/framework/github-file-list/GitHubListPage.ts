import { By } from "selenium-webdriver";
import Page from "../Page";
import GitHubListItem from "./GitHubListItem";
import Element from "../Element";

export default class GitHubListPage extends Page {

    private static readonly ITEM_LOCATOR: By = By.xpath("//tr[@class='js-navigation-item']");

    public async waitUntilLoaded(): Promise<void> {
        await this.tools.by(GitHubListPage.ITEM_LOCATOR).wait(1000).untilPresent();
    }

    public async getFile(name: string): Promise<GitHubListItem> {
        const item: Element = await this.tools.by(By.xpath(`//tr[.//a[text()='${name}']]`))
            .wait(5000)
            .untilPresent();
        return this.tools.createPageFragment(GitHubListItem, item);
    }
}
