import Tools from './utils/Tools';


describe("DMN test", () => {

    let tools: Tools;

    beforeEach(async () => {
        tools = await Tools.init();

    });

    it(async () => {
        //https://github.com/kiegroup/kogito-examples/blob/stable/dmn-quarkus-example/src/main/resources/Traffic%20Violation.dmn
    })

    afterEach(async () => {
        tools.finish();
    });
});