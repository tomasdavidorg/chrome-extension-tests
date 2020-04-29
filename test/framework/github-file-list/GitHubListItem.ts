import PageFragment from "../PageFragment";
import { By, WebElement } from "selenium-webdriver";
import GitHubEditorPage from "../github-editor/GitHubEditorPage";

export default class GitHubListItem extends PageFragment {

    private readonly LINK_LOCATOR: By = By.xpath(".//a[@class='js-navigation-open ']");
    private readonly LINK_TO_ONLINE_EDITOR: By = By.xpath(".//a[@title='Open in Online Editor']");

    public async load(): Promise<void> {
        await this.tools.by(this.LINK_TO_ONLINE_EDITOR).withTimeout(5000).present();
    }

    public async open(): Promise<GitHubEditorPage> {
        const link: WebElement = await this.tools.webElement(this.root).find(this.LINK_LOCATOR);
        await link.click();
        return this.tools.createPage(GitHubEditorPage);
    }

    public async getLinkToOnlineEditor(): Promise<string> {
        const linkToOnlineEditor: WebElement = await this.tools.webElement(this.root).find(this.LINK_TO_ONLINE_EDITOR);
        return linkToOnlineEditor.getAttribute("href");
    }
}
