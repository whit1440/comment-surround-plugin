import * as vscode from 'vscode';
import { CommentType, wrapper } from './wrapper';


export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.commands.registerCommand('comment-surround-plugin.surround', async () => {
		const configuration = vscode.workspace.getConfiguration('comment-surround-plugin');
		const commentType: CommentType = configuration.get('commentType', '/');
		const paddingSize = configuration.get('paddingSize', 5);

		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			const selection = editor.selection;

			const selectedText = document.getText(selection);
			const finalLine = wrapper(selectedText, commentType, paddingSize);

			await editor.edit(editBuilder => {
				editBuilder.replace(selection, finalLine);
			});
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
