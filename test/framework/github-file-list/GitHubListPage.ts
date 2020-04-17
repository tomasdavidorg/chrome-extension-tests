import { WebElement, By } from "selenium-webdriver";
import Page from "../Page";
import GitHubListItem from "./GitHubListItem";

export default class GitHubListPage extends Page {

    public async getFile(name: string): Promise<GitHubListItem> {
        const itemLocator: By = By.xpath(`//tr[*//a[text()='${name}']]`);
        const item: WebElement = await this.tools.by(itemLocator).withTimeout(1000).present();
        return this.tools.createPageFragment(GitHubListItem, item);
    }
}
