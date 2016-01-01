

export enum EnvironemtType {
    Mac,
    Linux,
    Windows
}

// https://code.visualstudio.com/docs/customization/userandworkspace
// http://stackoverflow.com/a/26227660/697126 - get user data 
export class SettingsFileLocator {
    environment :EnvironemtType;
    
    
    public constructor(enviromentDectection: () => EnvironemtType){
        this.environment = enviromentDectection();
    }
    
    public GetPath() : string {
        
        switch(this.environment){
            case EnvironemtType.Linux:
                return process.env.HOME + '/.config/Code/User/settings.json';
            case EnvironemtType.Mac:
                 return process.env.HOME + '/Library/Application Support/Code/User/settings.json';
            case EnvironemtType.Windows:
                return process.env.APPDATA + '\\Code\\User\\settings.json'
        }
    }
    
}