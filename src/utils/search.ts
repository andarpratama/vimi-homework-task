import dataList from '../constants/db.json'
import { formatData } from "./formater";

export const liveSearch = (keyword:string) => {
    let isAdvanceSearch = keyword.includes("is:") || keyword.includes("not:")
    let result:any = []

    if(isAdvanceSearch){
        const keywordCoba = keyword.split(' ')
        const group:any = []
        keywordCoba.forEach(key => {
            const subKey = key.split(':')
            if(subKey[0] === 'is'){
                const childKey = subKey[1].split('=')
                if(childKey[0].toLowerCase() === 'status'){
                    for (const data of dataList) {
                        if(data.status.toLowerCase() === childKey[1].toLowerCase()){
                            group.push(data)
                        }
                    }
                }

                if(childKey[0].toLowerCase() === 'type'){
                    for (const data of dataList) {
                        if(result.type.toLowerCase() === childKey[1].toLowerCase()){
                            group.push(data)
                        }
                    }
                }
            }

            if(subKey[0] === 'not'){
                const notData = []
                const childKey = subKey[1].split('=')
                if(childKey[0].toLowerCase() === 'status'){
                    for (const data of group) {
                        if(data.status.toLowerCase() !== childKey[1].toLowerCase()){
                            notData.push(data)
                        }
                    }
                }

                if(childKey[0].toLowerCase() === 'type'){
                    for (const data of group) {
                        if(data.type.toLowerCase() !== childKey[1].toLowerCase()){
                            console.log('1')
                            notData.push(data)
                        }
                    }
                }

                result = notData
            }
        });
    } else {
        for (var i = 0; i < dataList.length; i++) {
            if(dataList[i].name.toLowerCase().includes(keyword.toLowerCase())) {
                result.push(dataList[i])
            }
        }
    }

    console.log(result)
    return formatData(result)
}