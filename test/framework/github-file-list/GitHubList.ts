
import { WebElement, By } from "selenium-webdriver";
import Page from "../../tools/Page";
import GitHubListItem from "./GitHubListItem";

export default class GitHubList extends Page {

    public async getFile(name: string) {
        let parent: WebElement = await this.tools.find(By.xpath(`//tr[*//a[text()='${name}']]`)).present();
        return this.tools.pageFragment(GitHubListItem, parent);
    }
}
