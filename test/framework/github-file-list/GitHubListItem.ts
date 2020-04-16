import PageFragment from "../PageFragment";
import { By, WebElement } from "selenium-webdriver";

export default class GitHubListItem extends PageFragment {

    private readonly LINK_LOCATOR: By = By.xpath(".//a[@class='js-navigation-open ']");
    private readonly LINK_TO_ONLINE_EDITOR: By = By.xpath(".//a[@title='Open in Online Editor']");

    public async open(): Promise<void> {
        const link: WebElement = await this.tools.take(this.root).find(this.LINK_LOCATOR);
        await link.click();
    }

    public async getLinkToOnlineEditor(): Promise<string> {
        const linkToOnlineEditor: WebElement = await this.tools.take(this.root).withTimeout(3000).find(this.LINK_TO_ONLINE_EDITOR);
        return linkToOnlineEditor.getAttribute("href");
    }
}
