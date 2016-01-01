import * as assert from 'assert';
import * as vscode from 'vscode';
import * as settings from '../src/SettingsFileLocator';

suite("settingsLocator", () => {

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