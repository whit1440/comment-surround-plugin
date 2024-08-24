import { suite, test, before } from 'mocha';
import { strictEqual } from 'assert';
import { CommentType, wrapper } from '../wrapper';

type TestData = {
    padding: number,
    character: CommentType,
    input: string,
    result: string
};

const testData: TestData[] = [
    {
        padding: 5,
        character: "/",
        input: "example",
        result: "" +
            "///////////////////\n" +
            "///// example /////\n" +
            "///////////////////"
    },
    {
        padding: 5,
        character: "#",
        input: "example",
        result: "" +
            "###################\n" +
            "##### example #####\n" +
            "###################"
    },
    {
        padding: 3,
        character: "*",
        input: "example",
        result: "" +
            "/**************\n" +
            "*** example ***\n" +
            "**************/"
    }
];

suite("wrapper function tests", () => {
    testData.forEach((data: TestData) => {
        test(`should wrap with given character ${data.character} and padding ${data.padding}`, () => {
            const result = wrapper(data.input, data.character, data.padding);
            strictEqual(result, data.result);
        });
    });
});