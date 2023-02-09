import dataList from '../constants/db.json'
import { IData } from '../interfaces/IData';
import { formatData } from "./formater";

export const liveSearch = (keyword:string) => {
    let isAdvanceSearch = keyword.includes("is:") || keyword.includes("not:")
    let result:Array<IData> = []
    let message:string = ''

    if(isAdvanceSearch){
        const keywordCoba = keyword.split(' ')
        const group:Array<IData> = []
        keywordCoba.forEach(key => {
            const subKey = key.split(':')
            if(subKey[0] === 'is'){
                const childKey = subKey[1].split('=')
                if(childKey[0].toLowerCase() === 'status'){
                    result = dataList.filter((data) => data.status.toLowerCase() === childKey[1].toLowerCase())
                } else if(childKey[0].toLowerCase() === 'type'){
                    result = dataList.filter((data) => data.type.toLowerCase() === childKey[1].toLowerCase())
                } else {
                    message = 'error'
                }
            } else if(subKey[0] === 'not'){
                if(subKey[1] !== undefined){
                    if(subKey[1].includes('=')){
                        const childKey = subKey[1].split('=')
                        if(childKey[0].toLowerCase() === 'status'){
                            result = result.filter((data) => data.status.toLowerCase() !== childKey[1].toLowerCase())
                        } else if(childKey[0].toLowerCase() === 'type'){
                            result = result.filter((data) => data.type.toLowerCase() !== childKey[1].toLowerCase())
                        } {
                            message = 'message'
                        }
                    }
                } else {
                    message = 'error'
                }
            } else {
                message = 'error'
            }

        });
    } else {
        for (var i = 0; i < dataList.length; i++) {
            if(dataList[i].name.toLowerCase().includes(keyword.toLowerCase())) {
                result.push(dataList[i])
            }
        }
    }

    result = formatData(result)
    return {result, message}
}