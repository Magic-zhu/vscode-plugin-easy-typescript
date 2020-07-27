// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const child= require('child_process');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

const checkEnv =()=>{
    return new Promise((resolve,reject)=>{
        child.exec('tsc -v',(err)=>{
            if(!err){
                resolve()
            }else{
                reject(err)
            }
        })
    })
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('"easytypescript" is now active!');
    checkEnv().then(()=>{
        vscode.window.setStatusBarMessage('easy typescript 正在使用中');
        let didSaveEvent = vscode.workspace.onDidSaveTextDocument((doc)=>{
            vscode.window.showWarningMessage('编译中......')
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
    }).catch((err)=>{
        console.log(err)
        vscode.window.showErrorMessage('please npm install typescript -g')
    })
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
