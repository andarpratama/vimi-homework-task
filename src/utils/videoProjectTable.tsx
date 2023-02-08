import { BiCheckCircle, BiMessageSquareX, BiEdit, BiCameraMovie, BiCommentError } from "react-icons/bi";

export const statusBody = (cell:string) => {
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

export const columns = [
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
      sort: true
    }
  ];