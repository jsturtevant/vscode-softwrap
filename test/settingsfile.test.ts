import * as assert from 'assert';
import * as settings from '../src/SettingsFileLocator';
var os = require("os");

suite("setting file should", () => {
    var settingValue = "editor.wrappingColumn";
    var settingsFile;
    
     suiteSetup(() => {
        settingsFile = new settings.SettingsFile(() => settings.EnvironemtType.Mac);
    });
    
    test("be set as 0 if no value in user settings", () => {
       var originalSettingsFile = JSON.stringify({});
       
       var newSettingsFile = settingsFile.SetValue(settingValue, originalSettingsFile);
       
       var expected = CreateSettingsString({ "editor.wrappingColumn": 0});
       assert.equal(expected, newSettingsFile);
    });

    test("be zero if value is greater than zero", () => {
       var originalSettingsFile = JSON.stringify({"editor.wrappingColumn": 300});
       
       var newSettingsFile = settingsFile.SetValue(settingValue, originalSettingsFile);
       
       var expected = CreateSettingsString({ "editor.wrappingColumn": 0,"softwrap.customsetting": 300});
       assert.equal(expected, newSettingsFile);
    });
    
    test("be set back to default if not custom setting", () => {
       var originalSettingsFile = JSON.stringify({"editor.wrappingColumn": 0});
       
       var newSettingsFile = settingsFile.SetValue(settingValue, originalSettingsFile);
       
       var expected = CreateSettingsString({ });
       assert.equal(expected, newSettingsFile);
    });
    
    test("be set back to original if custom setting", () => {
       var originalSettingsFile = JSON.stringify({"editor.wrappingColumn": 0, "softwrap.customsetting": 400});
       
       var newSettingsFile = settingsFile.SetValue(settingValue, originalSettingsFile);
       
       var expected = CreateSettingsString({ "editor.wrappingColumn": 400});
       assert.equal(expected, newSettingsFile);
    });
    
    test("adds settings for custom setting when setting to zero", () => {
       var originalSettingsFile = JSON.stringify({"editor.wrappingColumn": 400});
       
       var newSettingsFile = settingsFile.SetValue(settingValue, originalSettingsFile);
       
       var expected = CreateSettingsString({ "editor.wrappingColumn": 0, "softwrap.customsetting": 400 });
       assert.equal(expected, newSettingsFile);
    });
    
    test("have comments removed", () => {
       var originalSettingsFile = JSON.stringify({});
       originalSettingsFile = "//comments are supported in vscode settings files" + os.EOL + originalSettingsFile;
       
       
       var newSettingsFile = settingsFile.SetValue(settingValue, originalSettingsFile);
       
       var expected = CreateSettingsString({ "editor.wrappingColumn": 0});
       assert.equal(expected, newSettingsFile);
    });
});

function CreateSettingsString(json){
    return JSON.stringify(json, null, 4);
}