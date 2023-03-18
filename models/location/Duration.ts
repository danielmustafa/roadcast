interface IDuration {
    seconds: number
    toHms(): string
}

export default class Duration implements IDuration {
    seconds: number

    constructor(seconds: number) {
        this.seconds = seconds
    }

    toHms(): string {
        this.seconds = Number(this.seconds);
        var h = Math.floor(this.seconds / 3600);
        var m = Math.floor(this.seconds % 3600 / 60);
        var s = Math.floor(this.seconds % 3600 % 60);

        var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
        return hDisplay + mDisplay + sDisplay;
    }


}