export interface Interaction{
    id? : number, 
    typeInteraction : string, 
    utilisateur : {  id: number|null};
    publication : {  id?: number},
}