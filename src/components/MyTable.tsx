import { BiCheckCircle, BiMessageSquareX, BiEdit, BiCameraMovie, BiCommentError } from "react-icons/bi";
import { ReactElement, useState, useEffect } from "react"
import videoProjectServices from "../services/VideoProjectService"
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from "react-bootstrap-table2-paginator";
// import { columns } from "../utils/videoProjectTable";
import { AiOutlineSearch } from "react-icons/ai";
import { liveSearch } from "../utils/search";
import { Loader } from "./Loader";
import { FiX } from "react-icons/fi";
import { IData } from '../interfaces/IData'
import './MyTable.css'

const statusBody = (cell:string) => {
    if(cell === "Completed"){
        return <span className="text-success" > <BiCheckCircle/> {cell}</span>
    } else if(cell === "Editing"){
        return <span className="text-primary" > <BiEdit/> {cell}</span>
    } else if(cell === "Incomplete"){
      return <span className="text-danger" > <BiMessageSquareX/> {cell}</span>
    } else if(cell === "Shooting"){
      return <span className="warning-text" > <BiCameraMovie/> {cell}</span>
    } else if(cell === "Feedback"){
      return <span className="text-info" > <BiCommentError/> {cell}</span>
    } else {
        return <span className="text-dark" >{cell}</span>
    }
}



const MyTable = ():ReactElement => {
    const [data, setData] = useState(Array<IData>)
    const [keyword, setKeyword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isCloseInput, setIsCloseInput] = useState(false)
    const [message, setMessage] = useState('')
    const [isShowMessage, setIsShowMessage] = useState(false)

    const handleSearch = () => {
        setIsLoading(true)
        const data = liveSearch(keyword)
        if(data.message === 'error'){
            setMessage("Invalid Search, please check again!")
            setIsShowMessage(true)
            setTimeout(()=> {
                setIsShowMessage(false)
            }, 3000)
        } else {
            setData(data.result)
        }
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
        onSizePerPageChange: () => {
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
        sizePerPageList: [
          {
            text: '5', value: 5
          }, 
          {
            text: '10', value: 10
          }, 
          {
            text: '20', value: 20
          }, 
          {
            text: '50', value: 50
          }, 
          {
            text: 'All', value: data.length
          }]
    };

    const columns = [
        {
            dataField: "name",
            text: "Name",
        },
        {
            dataField: "type",
            text: "Type",
        },
        {
            dataField: "status",
            text: "Status",
            formatter: statusBody,
        },
        {
            dataField: "createdOn",
            text: "Created",
            sort: true,
            onSort: () => {
                setIsLoading(true)
                setTimeout(()=> {
                    setIsLoading(false)
                }, 500)
            }
        }
    ];

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
        // setKeyword('')
        // setIsCloseInput(false)
        setData(videoProjectServices.getAllDateFormated())
    }, [])

    return(
        <div className="container bg-white rounded p-4" >
            <h1 className="mb-5" >Hi, i'am Andar</h1>
            <div className="input-group mb-3 position-relative">
                {isCloseInput ? <FiX className="close-input" onClick={handleCloseInput} /> : null}
                <input type="text" 
                    className="form-control shadow-none" 
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

            { isShowMessage ? (
                <div className="alert alert-danger" role="alert">
                    {message}
                </div>
            ) : null }

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