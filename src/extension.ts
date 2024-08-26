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

			// Get the full lines of the selection
			const startLine = selection.start.line;
			const endLine = selection.end.line;
			const fullRange = new vscode.Range(startLine, 0, endLine, document.lineAt(endLine).text.length);
			const selectedText = document.getText(fullRange);

			// Determine indentation of the first line
			const firstLineText = document.lineAt(startLine).text;
			const indentationMatch = firstLineText.match(/^[\t ]*/);
			const indentation = indentationMatch ? indentationMatch[0] : '';

			// Wrap the text while preserving the indentation
			const finalLine = wrapper(selectedText, commentType, paddingSize, indentation);

			await editor.edit(editBuilder => {
				editBuilder.replace(fullRange, finalLine);
			});
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
