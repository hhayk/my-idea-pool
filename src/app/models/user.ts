export class User {
    private _name: string;
    private _email: string;
    private _avatar_url: string;

    constructor(name: string, email: string, avatar_url: string) {
        this._name = name;
        this._email = email;
        this._avatar_url = avatar_url;
    }

    public get name(): string {
        return this._name;
    }

    public get email(): string {
        return this._email;
    }

    public get avatar_url(): string {
        return this._avatar_url;
    }

    toString(): string {
        return 'Name: ' + this.name +
            ', Email: ' + this.email +
            ', Avatar: ' + this.avatar_url;
    }
}
