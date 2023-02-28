export type CustomersInput = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    emergency_phone: string,
    passport: string,
    seat: number,
  }

export type GuidesInput = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    languages: string,
    bio: string,
    databaseAccessLevel: number,
}

export type BusesInput={
  Name:string,Description:string,Tour_Guide:string, Total_Seat:number,Empty_Seat:number,Full_Seat:number,Patent:string
}