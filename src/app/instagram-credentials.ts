export abstract class InstagramCredentials {
    clientId: String;
    
    abstract getAccessToken(): String;

    abstract setAccessToken(value: String) : void;
}