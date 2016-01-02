# Softwrap
Manually opening the User Setting file and editing the editor.wrappingColumn value was going to get old quickly. So I did what any programmer would do... automate the process.

The result is Softwrap, an extension for VS Code, that enable you to quickly switch back and for between a "soft wrap" and your more friendly code wrap. Using Softwrap is simple:

1. Open Command Pallet
2. Type 'Softwrap' in the command window
3. Hit Enter.

That is it! Softwrap will toggle on/off and preserve the value it was previously set to even if you had a custom value for ```editor.wrappingColumn``` already set in your User Settings file. You can check out the source at my [GitHub repository](https://github.com/jsturtevant/vscode-softwrap).

You can find more about the extension at http://www.jamessturtevant.com/posts/Softwrap-a-Visual-Studio-Code-Extension/.    

## Get it
You can find it at the Visual Studio Market Place:

https://marketplace.visualstudio.com/items/jsturtevant.softwrap

## Important Note
VS Code uses a custom JSON schema that allows comments in the settings file.  My current implementation does not support comments and **will strip them out**.  This is probably not the best way to handle the situation but will have to do for now.