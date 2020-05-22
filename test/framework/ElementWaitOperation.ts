import Element from "./Element";

export default class ElementWaitOperation {

    private readonly element: Element;
    private readonly timeout: number;

    public constructor(element: Element, timeout?: number) {
        this.element = element;
        this.timeout = timeout === undefined ? 100 : timeout;
    }

    // TODO hasChildElement, ...
}
