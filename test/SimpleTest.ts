import { WebDriver, By, until } from 'selenium-webdriver';
import { performance } from 'perf_hooks';
import { expect } from "chai";
import Tool from "./tools/Tool"
import Driver from "./tools/Driver"
import Tools from './tools/Tools';

describe("Simple test", () => {

    let driver: WebDriver;
    let tools: Tools;
    let testName: string;

    beforeEach(async () => {
        driver = await Driver.init();
        tools = new Tools(driver);
    });


    it("just test", async () => {

        await driver.get("https://github.com/kiegroup/kie-wb-playground/blob/master/evaluation/src/main/resources/");
        

        const EXPECTED_LINK = "/kiegroup/kie-wb-playground/master/evaluation/src/main/resources/evaluation.bpmn";


        let linkToOnlineEditr = await driver.wait(until.elementLocated(By.xpath("//a[@title='Open in Online Editor']")), 2000);

        let linkText = await linkToOnlineEditr.getAttribute("href");
        expect(linkText).contains(EXPECTED_LINK);

        await driver.findElement(By.linkText("evaluation.bpmn")).click();

        let seeAsSourceButton = await driver.wait(until.elementLocated(By.xpath("//button[@data-testid='see-as-source-button']")), 2000);

        await driver.wait(until.elementIsEnabled(seeAsSourceButton), 25000);

        let kogitoFrame = await driver.wait(until.elementLocated(By.className("kogito-iframe")), 2000);

        await driver.executeScript("arguments[0].scrollIntoView(true)", kogitoFrame)

        await driver.switchTo().frame(kogitoFrame);

        let startTime = performance.now();
        await driver.wait(until.elementLocated(By.className("fa-eye")), 25000);
        let endTime = performance.now();

        console.log("Plugin was loaded in " + (endTime - startTime));

        await driver.switchTo().defaultContent();

        await driver.findElement(By.xpath("//button[@data-testid='copy-link-button']")).click();
        let clipboadText = await new Tool(driver).getClipboarContent()

        expect(clipboadText).contains(EXPECTED_LINK);
        
    })

    afterEach(async () => {
        await driver.switchTo().defaultContent();
        let screenshot = tools.screenshot()
        await screenshot.takeHtml("screenshot_after_test");
        await screenshot.takePng("screenshot_after_test");
        await driver.quit();
    });
})
