import moment from 'moment';
import { IData } from '../interfaces/IData';

export const toCapitalize = (word:string) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

export const dateFormater = (date:string) => {
    return moment(date).format('MMMM D, YYYY')
}

export const formatData = (data:Array<IData>) => {
    return data.map((i:IData) => {
        return {...i, 
            createdOn: dateFormater(i.createdOn), 
            status: toCapitalize(i.status),
            type: toCapitalize(i.type)
         }
    })
}