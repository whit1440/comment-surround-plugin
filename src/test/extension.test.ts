import { suite, test, before } from 'mocha';
import { strictEqual } from 'assert';
import { window, commands, workspace, ConfigurationTarget, Selection, TextEditorEdit } from 'vscode';

suite('Comment Surround Plugin Test Suite', () => {

	const setEditorText = async (text: string) => {
		const editor = window.activeTextEditor;
		if (editor) {
			await editor.edit((editBuilder: TextEditorEdit) => {
				const entireRange = new Selection(0, 0, editor.document.lineCount, 0);
				editBuilder.delete(entireRange); // Clear all text
				editBuilder.insert(new Selection(0, 0, 0, 0).active, text); // Insert new text
			});
		}
	};

	before(async () => {
		const editor = await workspace.openTextDocument({
			content: ''
		});

		await window.showTextDocument(editor);
	});

	test('Surround with default slash character', async () => {
		const config = workspace.getConfiguration('comment-surround-plugin');
		await config.update('commentType', '/', ConfigurationTarget.Global);
		await config.update('paddingSize', 5, ConfigurationTarget.Global);

		await setEditorText("Private Methods Below 1");

		const selection = new Selection(0, 0, 0, 23);
		const activeEditor = window.activeTextEditor;

		if (activeEditor) {
			activeEditor.selection = selection;

			await commands.executeCommand('comment-surround-plugin.surroundWithSlashes');

			const updatedText = activeEditor.document.getText();
			strictEqual(
				updatedText.trim(),
				'///////////////////////////////////\n' +
				'///// Private Methods Below 1 /////\n' +
				'///////////////////////////////////'
			);
		}
	});

	test('Surround with asterisk character', async () => {
		const config = workspace.getConfiguration('comment-surround-plugin');
		await config.update('commentType', '*', ConfigurationTarget.Global);
		await config.update('paddingSize', 5, ConfigurationTarget.Global);

		await setEditorText("Private Methods Below 2");

		const selection = new Selection(0, 0, 0, 23);
		const activeEditor = window.activeTextEditor;

		if (activeEditor) {
			activeEditor.selection = selection;

			await commands.executeCommand('comment-surround-plugin.surroundWithSlashes');

			const updatedText = activeEditor.document.getText();
			strictEqual(
				updatedText.trim(),
				'/**********************************\n' +
				'***** Private Methods Below 2 *****\n' +
				'**********************************/'
			);
		} else {
			strictEqual("none", "not none");
		}
	});

	test('Padding length configuration', async () => {
		const config = workspace.getConfiguration('comment-surround-plugin');
		await config.update('commentType', '/', ConfigurationTarget.Global);
		await config.update('paddingSize', 3, ConfigurationTarget.Global);

		await setEditorText("Private Methods Below 3");

		const selection = new Selection(0, 0, 0, 23);
		const activeEditor = window.activeTextEditor;

		if (activeEditor) {
			activeEditor.selection = selection;

			await commands.executeCommand('comment-surround-plugin.surroundWithSlashes');

			const updatedText = activeEditor.document.getText();
			strictEqual(
				updatedText.trim(),
				'///////////////////////////////\n' +
				'/// Private Methods Below 3 ///\n' +
				'///////////////////////////////'
			);
		}
	});
});
