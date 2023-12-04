const { rejects } = require('assert');
const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('auto-increment.Change', async function () {
		const editor = vscode.window.activeTextEditor;
		const document = editor.document;
		if (!editor) {
			vscode.window.showInformationMessage('No editor is active.');
			return;
		}
		let startNumber = parseInt(await vscode.window.showInputBox({ prompt: 'Start Index', placeHolder: '0', value: '0', validateInput: (value) => { parseInt(value); return isNaN(value) ? 'Not A Number' : null; } }));
		let digitNumber = parseInt(await vscode.window.showInputBox({ prompt: 'Digit Number', placeHolder: '1', value: '1', validateInput: (value) => { parseInt(value); return isNaN(value) ? 'Not A Number' : null; } }));
		let stepNumber = parseInt(await vscode.window.showInputBox({ prompt: 'Step Number', placeHolder: '1', value: '1', validateInput: (value) => { parseInt(value); return isNaN(value) ? 'Not A Number' : null; } }));

		let firstLine = editor.document.lineAt(0);
		let lastLine = editor.document.lineAt(editor.document.lineCount - 1);
		let textRange = new vscode.Range(firstLine.range.start, lastLine.range.end);
		let result = document.getText(textRange);
		let index = startNumber;
		while (result.indexOf('{@}') >= 0) {
			result = result.replace("{@}", String(index).padStart(digitNumber, 0));
			index+=stepNumber;
		}
		editor.edit(doc => {
			doc.replace(textRange, result);
		});
		deactivate();

	});



	context.subscriptions.push(disposable);
}
function deactivate() { }
module.exports = {
	activate,
	deactivate
}
