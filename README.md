# Softwrap
You can find more details about the extension and implemtation at http://www.jamessturtevant.com/posts/Softwrap-a-Visual-Studio-Code-Extension/.   Also see [Important Notes] below.

## Soft wrap in VS Code
To enable Soft wrap in VS Code you have to open your user settings file ([open command pallet](https://code.visualstudio.com/Docs/editor/codebasics#_command-palette), type 'settings', select 'Open User Settings') and add the following line:

{% highlight json %}
{
// there might be other custom settings you have in this file.
"editor.wrappingColumn": 0
}
{% endhighlight %}  

## Softwrap Extension
Manually opening the User Setting file and editing the editor.wrappingColumn value was going to get old quickly. So I did what any programmer would do... automate the process.

The result is Softwrap, an extension for VS Code, that enable you to quickly switch back and for between a "soft wrap" and your more friendly code wrap. Using Softwrap is simple:

1. Open Command Pallet
2. Type 'Softwrap' in the command window
3. Hit Enter.

That is it! Softwrap will toggle on/off and preserve the value it was previously set to even if you had a custom value for ```editor.wrappingColumn``` already set in your User Settings file. You can check out the source at my [GitHub repository](https://github.com/jsturtevant/vscode-softwrap).

## Get it
You can find it at the Visual Studio Market Place:

https://marketplace.visualstudio.com/items/jsturtevant.softwrap

## Important Notes
### Reading and Writing the User Settings File
The limitation I ran into when trying to write to the User Settings file was that there is no VS Code API for it [(see github issue)](https://github.com/Microsoft/vscode/issues/1396).  Again, I got a [quick response on twitter](https://twitter.com/ErichGamma/status/678667459621031936) that this was something that is under consideration but not yet implemented.  The suggestion was to directly modify the file itself as a work around.

This was fairly simple to do because VS Code is sitting on top of [Electron](http://electron.atom.io/) and we can leverage all the power and infrastructure of Node.js and the strong ecosystem that comes with it.  It was easy enough to use the [File System module](https://nodejs.org/api/fs.html) to read/write the User Settings file.

### VSCode JSON Schema
VS Code uses a custom JSON schema that allows comments in the settings file.  My current implementation does not support comments and **will strip them out**.  This is probably not the best way to handle the situation but will have to do for now.