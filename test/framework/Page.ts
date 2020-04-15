import Tools from "../utils/Tools";

export default class Page {

    protected tools: Tools;

    public constructor(tools: Tools) {
        this.tools = tools;
    }
}
