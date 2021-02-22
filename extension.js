const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let disposable = vscode.commands.registerCommand('AutoIncreasement.Change', function () {
		const editor = vscode.window.activeTextEditor;
		const document = editor.document;
	
		if (editor) {
			var firstLine = editor.document.lineAt(0);
			var lastLine = editor.document.lineAt(editor.document.lineCount - 1);
			var textRange = new vscode.Range(firstLine.range.start, lastLine.range.end);
			var result = document.getText(textRange);
			var index = 0;
			while (result.indexOf("`@`") > 0) {
			vscode.window.showInformationMessage(index);
				result = result.replace("`@`", index.toString());
				index++;
			}
			editor.edit(doc => {
				doc.replace(textRange, result);
			});
			// vscode.window.showInformationMessage(result);
		}
	});
	

	
	context.subscriptions.push(disposable);
}
function deactivate() { }
module.exports = {
	activate,
	deactivate
}
