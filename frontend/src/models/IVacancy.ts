export interface IVacancy {
    id: string;
    title: string;
    img: string;
    price: string;
    city: ICity
    shortDescription: string
    fullDescription: string
}
export interface ICity{
    name: string
    id: string
}