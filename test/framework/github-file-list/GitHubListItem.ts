import PageFragment from "../PageFragment";
import { By } from "selenium-webdriver";

export default class GitHubListItem extends PageFragment {

    private readonly LINK_LOCATOR: By = By.xpath(".//a[@class='js-navigation-open ']");
    private readonly LINK_TO_ONLINE_EDITOR: By = By.xpath(".//a[@title='Open in Online Editor']");

    public async open(): Promise<void> {
        (await this.tools.take(this.root).find(this.LINK_LOCATOR)).click();
    }

    public async getLinkToOnlineEditor(): Promise<string> {
        return (await this.tools.take(this.root).withTimeout(3000).find(this.LINK_TO_ONLINE_EDITOR)).getAttribute("href");
    }
}
