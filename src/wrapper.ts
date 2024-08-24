export type CommentType = '*' | '#' | '/';

export const wrapper = (str: string, type: CommentType, paddingSize: number) => {
    const lines = str.split('\n');
    const longestLine = lines.reduce((acc, line) => {
        return acc >= line.length ? acc : line.length;
    }, 0);
    const lineLength = longestLine + (paddingSize * 2) + 2; // added 2 for space on each side of content

    const slashLine = type.repeat(type === '*' ? lineLength - 1 : lineLength);
    let padding = type.repeat(paddingSize);
    const blockedText = lines.map(line => `${padding} ${line}${' '.repeat(longestLine - line.length)} ${padding}`);
    const paddedText = blockedText.join('\n');
    return type === '*' ? `/${slashLine}\n${paddedText}\n${slashLine}/` : `${slashLine}\n${paddedText}\n${slashLine}`;
};