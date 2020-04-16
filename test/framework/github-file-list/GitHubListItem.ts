import PageFragment from "../PageFragment";
import { By, WebElement } from "selenium-webdriver";
import GitHubEditorPage from "../github-editor/GitHubEditorPage";

export default class GitHubListItem extends PageFragment {

    private readonly LINK_LOCATOR: By = By.xpath(".//a[@class='js-navigation-open ']");
    private readonly LINK_TO_ONLINE_EDITOR: By = By.xpath(".//a[@title='Open in Online Editor']");

    public async open(): Promise<GitHubEditorPage> {
        const link: WebElement = await this.tools.take(this.root).find(this.LINK_LOCATOR);
        await link.click();
        return this.tools.createPage(GitHubEditorPage);
    }

    public async getLinkToOnlineEditor(): Promise<string> {
        const linkToOnlineEditor: WebElement = await this.tools.take(this.root).withTimeout(3000).find(this.LINK_TO_ONLINE_EDITOR);
        return linkToOnlineEditor.getAttribute("href");
    }
}
