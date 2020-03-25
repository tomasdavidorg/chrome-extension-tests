import PageFragment from "../../tools/PageFragment";
import { By } from "selenium-webdriver";

export default class GitHubListItem extends PageFragment {

    private readonly LINK_LOCATOR: By = By.xpath(".//a[@class='js-navigation-open ']");
    private readonly LINK_TO_ONLINE_EDITOR: By = By.xpath(".//a[@title='Open in Online Editor']");

    public async open(): Promise<void> {
        (await this.tools.take(this.parent).find(this.LINK_LOCATOR)).click();
    }

    public async getLinkToOnlineEditor(): Promise<string> {
        return (await this.tools.take(this.parent).withTimeout(2000).find(this.LINK_TO_ONLINE_EDITOR)).getAttribute("href");
    }
}
