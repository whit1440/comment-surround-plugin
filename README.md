# Comment Surround Plugin

The **Comment Surround Plugin** is a simple yet powerful Visual Studio Code extension that allows you to easily surround selected text with a customizable wall of characters, such as `/`, `#`, or `*`. This can be particularly useful for creating visually distinct sections in your code for private methods, configuration blocks, or important notes.

## Features

- **Customizable Surround Character**: Choose between `/`, `#`, or `*` to surround your selected text.
- **Configurable Padding Length**: Set the number of padding characters on each side of your text block.
- **Dynamic Calculation**: The length of the surrounding wall dynamically adjusts based on the length of the longest line in the selected text.

## Usage

1. **Select the text** you want to surround in your code editor.
2. **Run the command**:
   - You can either use the command palette (`Cmd+Shift+P` or `Ctrl+Shift+P`) and search for `Surround`, or you can bind the command to a custom keyboard shortcut.
3. The selected text will be surrounded by the configured character, with padding on each side.

## Configuration

The plugin provides two configuration options that you can adjust according to your needs.

### `comment-surround-plugin.commentType`

- **Type**: `string`
- **Default**: `/`
- **Description**: The character used to create the comment surround wall. You can choose from the following options:
  - `/` - Surround with forward slashes.
  - `#` - Surround with hash symbols.
  - `*` - Surround with asterisks.

### `comment-surround-plugin.paddingSize`

- **Type**: `number`
- **Default**: `5`
- **Description**: The padding length on each side of the text block. This defines how many characters will be added as padding on both sides of the text.

### Configuring via Settings

You can configure these options in your settings file (`settings.json`):

```json
{
    "comment-surround-plugin.commentType": "#",
    "comment-surround-plugin.paddingSize": 8
}
```

### Example

If you select the text `Private Methods Below` and run the command with `/` as the selected character and a padding length of `5`, the text will be transformed into:

```js
/////////////////////////////////
///// Private Methods Below /////
/////////////////////////////////
```

If you choose `*`, the result will be:

```js
/********************************
***** Private Methods Below *****
********************************/
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
