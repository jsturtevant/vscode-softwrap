// 
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as settings from '../src/SettingsFileLocator';

// Defines a Mocha test suite to group tests of similar kind together
suite("settingsLocator", () => {

	// Defines a Mocha unit test
	test("if mac then is mac path", () => {
		var settingslocator = new settings.SettingsFileLocator(() => {return settings.EnvironemtType.Mac;});
            
        assert.equal(settingslocator.GetPath(), "/Library/Application Support/Code/User/settings.json")
	});
    
    test("if windows then is windows path", () => {
		var settingslocator = new settings.SettingsFileLocator(() => {return settings.EnvironemtType.Windows;});
            
        assert.equal(settingslocator.GetPath(), "\Code\User\settings.json")
	});
    
     test("if linux then is linux path", () => {
		var settingslocator = new settings.SettingsFileLocator(() => {return settings.EnvironemtType.Linux;});
            
        assert.equal(settingslocator.GetPath(), "/.config/Code/User/settings.json")
	});
});