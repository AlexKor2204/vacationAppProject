class Vacation{
    id: number = 0;
    description: string ="";
    destination: string = "";
    image: any ="";
    startDate: Date = new Date();
    endDate: Date = new Date();
    price: string = "";
    followers?: number | undefined;
}
export default Vacation;