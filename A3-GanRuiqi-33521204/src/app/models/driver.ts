export class Driver {
    _id?: string;
    driverId: string;
    driverName: string;
    driverDepartment: DriverDepartment;
    driverLicence: string;
    driverIsActive: boolean;
    driverCreatedAt: string;
    assigned_packages: string[];

    constructor() {
        this.driverId = this.generateId(); // Generating the driver ID
        this.driverName = "";
        this.driverDepartment = DriverDepartment.Food; // Default department
        this.driverLicence = "";
        this.driverIsActive = true;
        this.driverCreatedAt = this.currentDay(); // Setting the current date
        this.assigned_packages = []
    }

    // Function to generate a random driver ID
    generateId(): string {
        const ranNum = Math.floor(Math.random() * 100).toString(); // Generating a random number
        const rString = this.randomString(3, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'); // Calling random string function
        return "D" + ranNum + "-33-" + rString;
    }

    // Helper function to generate a random string of given length
    randomString(length: number, chars: string): string {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    // Function to get the current date in DD/MM/YYYY format
    currentDay(): string {
        const currentdate = new Date();
        const date = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear();
        return date;
    }
}

// Enum to define possible driver departments
export enum DriverDepartment {
    Food = "Food",
    Furniture = "Furniture",
    Electronic = "Electronic"
}
