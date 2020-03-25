import { WebDriver, By, until } from 'selenium-webdriver';
import { performance } from 'perf_hooks';
import { expect } from "chai";
import Tool from "./tools/Tool"
import Driver from "./tools/Driver"
import Tools from './tools/Tools';
import Wait from './tools/Wait';
import GitHubList from "./framework/github-file-list/GitHubList"
import GitHubListItem from './framework/github-file-list/GitHubListItem';


describe("Simple test", () => {

    let driver: WebDriver;
    let tools: Tools;

    beforeEach(async () => {
        driver = await Driver.init();
        tools = new Tools(driver);
    });


    it("just test", async () => {
        const EXPECTED_LINK = "/kiegroup/kie-wb-playground/master/evaluation/src/main/resources/evaluation.bpmn";

        await driver.get("https://github.com/kiegroup/kie-wb-playground/blob/master/evaluation/src/main/resources/");

        let fileName = "evaluation.bpmn";
        
        let gitHubList: GitHubList = tools.createPage(GitHubList);
        let gitHubFile: GitHubListItem = await gitHubList.getFile(fileName)
        let linkText = await gitHubFile.getLinkToOnlineEditor();
        expect(linkText).contains(EXPECTED_LINK);
        await gitHubFile.open();
      
        let seeAsSourceButton = await tools.find(By.xpath("//button[@data-testid='see-as-source-button']"))
            .withTimeout(2000)
            .present();
        await driver.wait(until.elementIsEnabled(seeAsSourceButton), 25000);

        let kogitoFrame = await driver.wait(until.elementLocated(By.className("kogito-iframe")), 2000);

        await driver.executeScript("arguments[0].scrollIntoView(true)", kogitoFrame)

        await driver.switchTo().frame(kogitoFrame);

        let startTime = performance.now();
        await tools.find(By.className("fa-eye")).withTimeout(25000).present();;
        let endTime = performance.now();

        console.log("Plugin was loaded in " + (endTime - startTime));

        await driver.switchTo().defaultContent();

        await driver.findElement(By.xpath("//button[@data-testid='copy-link-button']")).click();
        let clipboadText = await new Tool(driver).getClipboarContent()

        expect(clipboadText).contains(EXPECTED_LINK);

    })

    afterEach(async () => {
        await driver.switchTo().defaultContent();
        await tools.screenShot.takeHtml("screenshot_after_test");
        await tools.screenShot.takePng("screenshot_after_test");
        await driver.quit();
    });
})
