import dataList from '../constants/db.json'
import { formatData } from "./formater";

export const liveSearch = (keyword:string) => {
    let isAdvanceSearch = keyword.includes("is:");
    let result:any = []

    if(isAdvanceSearch){
        const keywordAdvance = (keyword.trim().split("is:").slice(1))
        // let group:any = []
        keywordAdvance.forEach(key => {
            // result.push(dataList.filter((data) => data.status.toLowerCase() === key.trim().toLowerCase()))
            for (const data of dataList) {
                if(data.status.toLowerCase() === key.trim().toLowerCase()){
                    result.push(data)
                }
            }
        });
        // console.log('grup', group)
        // result = formatData(result)
    } else {
        for (var i = 0; i < dataList.length; i++) {
            if(dataList[i].name.toLowerCase().includes(keyword.toLowerCase())) {
                result.push(dataList[i])
            }
        }
        // result = formatData(result)
    }

    console.log(result)
    return formatData(result)
}