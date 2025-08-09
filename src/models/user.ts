

class Geolocation {
    lat!: number;
    long!: number;

    constructor(lat: number = 0, long: number = 0) {
        this.lat = lat;
        this.long = long;
    }
}

class Address {
    city!: string;
    street!: string;
    number!: string;
    zipcode!: string;
    geolocation!: Geolocation;

    constructor(
        city = '',
        street = '',
        number = '',
        zipcode = '',
        geolocation?: Geolocation
    ) {
        this.city = city;
        this.street = street;
        this.number = number;
        this.zipcode = zipcode;
        this.geolocation = geolocation
            ? new Geolocation(geolocation.lat, geolocation.long)
            : new Geolocation();
    }

    get fulladdress() {
        return `${this.city}, ${this.street}, building ${this.number}`;
    }
}

class UserName {
    firstname!: string;
    lastname!: string;

    constructor(firstname: string = '', lastname: string = '') {
        this.firstname = firstname;
        this.lastname = lastname;
    }

    get fullname() {
        return `${this.firstname} ${this.lastname}`;
    }
}

type JsonAddress = Partial<{
    city: string;
    geolocation: Geolocation,
    street: string;
    number: string;
    zipcode: string;
}>;
type JsonUserName = Partial<{
    firstname: string;
    lastname: string;
}>;

export class UserModel {
    id!: number;
    email!: string;
    username!: string;
    password!: string;
    name!: UserName;
    address!: Address;
    phone!: string;

    constructor(
        id = 0,
        email = '',
        username = '',
        password = '',
        name: JsonUserName,
        address: JsonAddress,
        phone: string
    ) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.password = password;
        this.name = new UserName(name.firstname, name.lastname);
        this.address = new Address(address.city, address.street, address.number, address.zipcode, address.geolocation);
        this.phone = phone;
    }

    static fromJson(json: Record<string, any>) {
        return new UserModel(json.id, json.email, json.username, json.password, json.name, json.address, json.phone);
    }

    static toJson(user: UserModel) {
        return user instanceof UserModel ? 
            {
                address: {
                    city: user.address.city,
                    street: user.address.street,
                    number: user.address.number,
                    zipcode: user.address.zipcode,
                    geolocation: user.address.geolocation
                },
                email: user.email,
                name: {
                    firstname: user.name.firstname,
                    lastname: user.name.lastname
                },
                password: user.password,
                phone: user.phone,
                username: user.username
            }:
            null;
    }
}
