// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as settings from '../src/SettingsFileLocator';
import * as env from '../src/environmentdetection';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "softwrap" is now active!'); 

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    var disposable = vscode.commands.registerCommand('extension.softwrap', () => {
        // The code you place here will be executed every time your command is executed
        var message = "failed to change";
        
        var settingsfile =  new settings.SettingsFileLocator(env.EnvironmentDetection);
        
        fs.readFile(process.env.HOME + settingsfile.GetPath(), 'utf8', function(err, data) {
            if (err) {
                vscode.window.showInformationMessage('Softwrap unable to modify settings file.');
            }
            
            console.log('before:' + data);

            // there is a comment in the settings.json file.  remove it.
            var usersettings = JSON.parse(data.replace(/\/\/.*/,""));

            if ("editor.wrappingColumn" in usersettings) {
                var wrappingcolumn = usersettings["editor.wrappingColumn"];

                if (wrappingcolumn > 0) {
                    usersettings["editor.wrappingColumn"] = 0;
                    message = "on";
                }else{
                    usersettings["editor.wrappingColumn"] = 300;
                    message = "off";
                }
            }else{
                // the default setting is 300 so if not already set then add it.
                usersettings["editor.wrappingColumn"] = 0;
            }
            
            data = JSON.stringify(usersettings, null, 4);
            
            fs.writeFile(process.env.HOME + '/Library/Application Support/Code/User/settings.json',data);
               
            console.log(data);
            
             // Display a message box to the user
             vscode.window.showInformationMessage('Softwrap ' + message);
        });
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

