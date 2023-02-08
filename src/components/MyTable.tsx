import { ReactElement, useState, useEffect } from "react"
import videoProjectServices from "../services/VideoProjectService"
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from "react-bootstrap-table2-paginator";
import { columns } from "../utils/videoProjectTable";
import { AiOutlineSearch } from "react-icons/ai";
import { liveSearch } from "../utils/search";
import { Loader } from "./Loader";
import { FiX } from "react-icons/fi";
import { IData } from '../interfaces/IData'
import './MyTable.css'

const MyTable = ():ReactElement => {
    const [data, setData] = useState(Array<IData>)
    const [keyword, setKeyword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isCloseInput, setIsCloseInput] = useState(false)

    const handleSearch = () => {
        setIsLoading(true)
        const result = liveSearch(keyword)
        setData(result)
        setTimeout(()=> {
            setIsLoading(false)
        }, 1000)
    }

    const options = {
        onPageChange: () => {
            setIsLoading(true)
            setTimeout(()=> {
                setIsLoading(false)
            }, 500)
        },
        sizePerPage: 5,
        firstPageText: 'First',
        prePageText: 'Back',
        nextPageText: 'Next',
        lastPageText: 'Last',
    };

    const handleCloseInput = () => {
        setIsLoading(true)
        setKeyword("")
        setIsCloseInput(false)
        setData(videoProjectServices.getAllDateFormated())
        setTimeout(()=> {
            setIsLoading(false)
        }, 1000)
    }

    useEffect(()=> {
        setKeyword('')
        setIsCloseInput(false)
        setData(videoProjectServices.getAllDateFormated())
    }, [])

    return(
        <div className="container bg-white rounded p-4" >
            <h1 className="mb-5" >Hi, i'am Andar</h1>
            <div className="input-group mb-3 position-relative">
                {isCloseInput ? <FiX className="close-input" onClick={handleCloseInput} /> : null}
                <input type="text" 
                    className="form-control" 
                    placeholder="Search" aria-label="Username" 
                    aria-describedby="basic-addon1"
                    value={keyword} 
                    onChange={(e)=> {
                        setKeyword(e.target.value)
                        if(e.target.value !== ''){
                            setIsCloseInput(true)
                        } else {
                            setIsCloseInput(false)
                        }
                    }}
                />
                <div className="input-group-prepend">
                    <button className="btn btn-primary" 
                        id="basic-addon1"
                        onClick={handleSearch}
                    >
                        <AiOutlineSearch/>
                    </button>
                </div>
            </div>

            <div className="position-relative" >
                { isLoading ? <Loader /> : null }
                <BootstrapTable
                    bootstrap4
                    keyField="id"
                    data={data}
                    columns={columns}
                    pagination={paginationFactory(options)}
                />
            </div>
        </div>
    )
}

export default MyTable