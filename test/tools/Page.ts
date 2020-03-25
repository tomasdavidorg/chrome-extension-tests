import Tools from "../tools/Tools";

export default class Page {

    protected tools: Tools;

    constructor(tools: Tools) {
        this.tools = tools;
    }
}
