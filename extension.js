// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const child= require('child_process');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "easytypescript" is now active!');
    let didSaveEvent = vscode.workspace.onDidSaveTextDocument((doc)=>{
        if(doc.fileName.endsWith('.ts')){
            child.exec(`tsc ${doc.fileName}`,(err)=>{
                if(!err){
                    vscode.window.showInformationMessage('编译成功')
                }else{
                    vscode.window.showErrorMessage(err)
                }
            })
        }
    })
    context.subscriptions.push(didSaveEvent);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
