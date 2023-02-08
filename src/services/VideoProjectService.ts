import data from '../constants/db.json'
import { toCapitalize, dateFormater } from '../utils/formater';

class VideoProjectServices {
    static getAll(){
        return data
    }

    static getAllDateFormated(){
        return data.map(i => {
            return {...i, 
                createdOn: dateFormater(i.createdOn), 
                status: toCapitalize(i.status),
                type: toCapitalize(i.type)
             }
        })
    }

    static getByName(){
        
    }
}

export default VideoProjectServices