const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let disposable = vscode.commands.registerCommand('AutoIncreasement.Change', function () {
	});
	const editor = vscode.window.activeTextEditor;
	const document = editor.document;

	if (editor) {
		var firstLine = editor.document.lineAt(0);
		var lastLine = editor.document.lineAt(editor.document.lineCount - 1);
		var textRange = new vscode.Range(firstLine.range.start, lastLine.range.end);
		let result = document.getText(textRange);
		let index = 0;
		while (result.indexOf("{@}") > 0) {
			result = result.replace("{@}", index.toString());
			index++;
		}
		editor.edit(doc => {
			doc.replace(textRange, result);
		})
	}
	context.subscriptions.push(disposable);

}
function deactivate() { }
module.exports = {
	activate,
	deactivate
}
