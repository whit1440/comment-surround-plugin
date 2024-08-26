export type CommentType = '*' | '#' | '/';

export const wrapper = (str: string, type: CommentType, paddingSize: number, indentation: string) => {
    const lines = str.split('\n').map(line => line.replace(indentation, ''));
    const longestLine = lines.reduce((acc, line) => {
        return acc >= line.length ? acc : line.length;
    }, 0);
    const lineLength = longestLine + (paddingSize * 2) + 2; // added 2 for space on each side of content

    const slashLine = indentation + type.repeat(type === '*' ? lineLength - 1 : lineLength);
    let padding = type.repeat(paddingSize);
    const blockedText = lines.map(line => `${padding} ${line}${' '.repeat(longestLine - line.length)} ${padding}`).map(line => `${indentation}${line}`);
    const paddedText = blockedText.join('\n');
    const updatedLines = [slashLine, paddedText, slashLine].join('\n');
    return type === '*' ? `/${updatedLines}/` : `${updatedLines}`;
};