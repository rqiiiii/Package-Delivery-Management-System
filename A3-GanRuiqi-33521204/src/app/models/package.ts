export class Package {
    _id?: string;
    packageId: string;
    packageTitle: string;
    packageWeight: number;
    packageDestination: string;
    packageDescription: string;
    packageCreatedAt: string;
    packageIsAllocated: boolean;
    driverId: any; // or you could use a reference type

    constructor() {
        this.packageId = this.generateId(); // Generate package ID
        this.packageTitle = "";
        this.packageWeight = 0;
        this.packageDestination = "";
        this.packageDescription = "";
        this.packageCreatedAt = this.currentDay(); // Set creation date
        this.packageIsAllocated = false;
        this.driverId = ""; // This will hold the driver's ID
    }

    /**
     * Generates a unique package ID in the format "P<randomString>-RG-<randomNum>".
     * @returns {string} The generated package ID.
     */
    generateId(): string {
        const ranNum = Math.floor(Math.random() * 1000).toString();
        const rString = this.randomString(2, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
        return "P" + rString + "-RG-" + ranNum;
    }

    /**
     * Generates a random string of a specified length using the provided characters.
     * @param {number} length - The length of the random string to be generated.
     * @param {string} chars - The characters to be used for generating the string.
     * @returns {string} The generated random string.
     */
    randomString(length: number, chars: string): string {
        let result = '';
        for (let i = length; i > 0; --i) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
    }

    /**
     * Returns the current date in the format "day/month/year".
     * @returns {string} The current date.
     */
    currentDay(): string {
        const currentdate = new Date();
        const date = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear();
        return date;
    }
}
