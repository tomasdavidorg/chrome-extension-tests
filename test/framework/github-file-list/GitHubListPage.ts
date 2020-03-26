import { WebElement, By } from "selenium-webdriver";
import Page from "../Page";
import GitHubListItem from "./GitHubListItem";

export default class GitHubListPage extends Page {

    public async getFile(name: string): Promise<GitHubListItem> {
        let parent: WebElement = await this.tools.find(By.xpath(`//tr[*//a[text()='${name}']]`)).present();
        return this.tools.createPageFragment(GitHubListItem, parent);
    }
}
