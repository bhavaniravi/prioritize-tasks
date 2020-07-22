import React,{useState} from 'react';
import {Container,Row,Col,Card,CardBody,CardTitle,Input} from 'reactstrap'
import {FaPlusCircle,FaTrash} from "react-icons/fa"
import {ToastContainer,toast} from "react-toastify"


import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


const myList = []
const editable = []
const immediateArray = []
const efficientArray = []
const interruptionArray = []
const timewasteArray = []

var count = 0;


const App = () => {
  const [createList,setCreateList] = useState(0)
  const [readonly,setReadonly] = useState(true)
  const [changed,setChanged] = useState(0)
  const [draggedTask,setDraggedTask] =useState("")
  const [notification,setNotification] =useState(true)
  const [isDropped,setIsDropped] = useState(true)

  const notify = (message) => {
    toast(message,{onClose: () => setNotification(true)})   
  }


  const clickable = () =>{
    myList.push("")
    editable.push(true)
    setCreateList(createList +1) 
    // console.log(document.getElementByClass("trash-icon").parentElement.nodeName);   
  }
  const removeList = (list,index) =>{ 
    // console.log(); 
    list.splice(index,1)
    editable.splice(index,1)
    setCreateList(createList -1)
  }
  const editList = (index) =>{
    editable.splice(index,1,false)
    setReadonly(!readonly)
  }

  const onEnteringValue = (event,index) =>{
    var enteredValue = event.target.value
    myList.splice(index,1,enteredValue)
    setChanged(changed+1)
  }

  const disableEdit = (event,index) =>{
    if(event.key === "Enter"){
      editable.splice(index,1,true)
      setReadonly(!readonly)
    }
  }
  const dragStarted = (event,index,list) =>{
    event.preventDefault()
    if(isDropped === true){
      list.map((item,i)=>((i===index)?setDraggedTask(item):""))
      list.splice(index,1)
      setIsDropped(false)
      
    }
    setChanged(changed+1)
  }
  const draggedOver = (event) =>{
    event.preventDefault()
  }
  const dropped = (event) =>{
    event.preventDefault()
    count = count + 1
    setIsDropped(true)  
    if(event.currentTarget.id === "immediate"){
      if(immediateArray.length>=4){
        if(notification === true){
          setNotification(false)
          notify("Only four tasks are allowed in each category!!!")
        }
        myList.push(draggedTask)
      }
      else if(draggedTask === ""){
        if(notification === true){
          setNotification(false)
          notify("Empty task is not allowed!!!")
        }
        myList.push(draggedTask)
      }
      else{
        if((count % 2) !== 0){
        immediateArray.push(draggedTask)
        }
      }
    }
    else if(event.currentTarget.id === "efficient"){
      if(efficientArray.length>=4){
        if(notification === true){
          setNotification(false)
          notify("Only four tasks are allowed in each category!!!")
        }
        myList.push(draggedTask)
      }
      else if(draggedTask === ""){
        if(notification === true){
          setNotification(false)
          notify("Empty task is not allowed!!!")
        }
        myList.push(draggedTask)
      }
      else{
        if((count % 2) !== 0){
        efficientArray.push(draggedTask)
        }
      }
    }
    else if(event.currentTarget.id === "interruption"){
      if(interruptionArray.length>=4){
        if(notification === true){
          setNotification(false)
          notify("Only four tasks are allowed in each category!!!")
        }
        myList.push(draggedTask)
      }
      else if(draggedTask === ""){
        if(notification === true){
          setNotification(false)
          notify("Empty task is not allowed!!!")
        }
        myList.push(draggedTask)
      }
      else{
        if((count % 2) !== 0){
        interruptionArray.push(draggedTask)
        }
      }
    }
    else if(event.currentTarget.id === "timewaste"){
      if(timewasteArray.length>=4){
        if(notification === true){
          setNotification(false)
          notify("Only four tasks are allowed in each category!!!")
        }
        myList.push(draggedTask)
      }
      else if(draggedTask === ""){
        if(notification === true){
          setNotification(false)
          notify("Empty task is not allowed!!!")
        }
        myList.push(draggedTask)
      }
      else{
        if((count % 2) !== 0){
        timewasteArray.push(draggedTask)
        }
      }
    }
    else{      
        if((count % 2) !== 0){
          myList.push(draggedTask)
        count = count+1
        }
    }    
    setChanged(changed+1)
  }






  return (
    <div className="App" id="App" onDragOver={(event)=>draggedOver(event)} onDrop={(event)=>dropped(event)}>
      <Container fluid={true}>
        <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ width: "30vw" ,textAlign:"center", fontWeight:"bold"}}/>
        <Row>
          {/* 1st column */}
          <Col lg="4" md="4" sm="4">
            <Row>
              <Card className="immediate scrollable" id="immediate" onDragOver={(event)=>draggedOver(event)} onDrop={(event)=>dropped(event)}>
                <CardBody>
                  <CardTitle>immediate</CardTitle>
                  <div>
                  {
                    immediateArray.map((item,index)=>{
                      return(
                        <div draggable="true" onDrag={(event)=>{dragStarted(event,index,immediateArray)}}>
                          <Input type="text" className="my-list" readOnly={true} value={immediateArray[index]}/>
                          <FaTrash className="trash-icon" onClick={()=>{removeList(efficientArray,index)}}/>
                        </div>
                      )
                    })
                  }
                  </div>
                </CardBody>
              </Card>
            </Row>
            <Row>
              <Card className="interruption scrollable" id="interruption" onDragOver={(event)=>draggedOver(event)} onDrop={(event)=>dropped(event)}>
                <CardBody>
                  <CardTitle>interruption</CardTitle>
                  <div className="no-drop">
                  {
                    interruptionArray.map((item,index)=>{
                      return(
                        <div draggable="true" onDrag={(event)=>{dragStarted(event,index,interruptionArray)}}>
                          <Input type="text" className="my-list" readOnly={true} value={interruptionArray[index]}/>
                          <FaTrash className="trash-icon" onClick={()=>{removeList(interruptionArray,index)}}/>
                        </div>
                      )
                    })
                  }
                  </div>
                </CardBody>
              </Card>
            </Row>
          </Col>

          {/* 2nd column */}
          <Col lg="4" md="4" sm="4">
            <Row>
              <Card className="efficient scrollable" id="efficient" onDragOver={(event)=>draggedOver(event)} onDrop={(event)=>dropped(event)}>
                <CardBody>
                  <CardTitle >efficient</CardTitle>
                  <div className="no-drop">
                  {
                    efficientArray.map((item,index)=>{
                      return(
                        <div draggable="true" onDrag={(event)=>{dragStarted(event,index,efficientArray)}}>
                          <Input type="text" className="my-list" readOnly={true} value={efficientArray[index]}/>
                          <FaTrash className="trash-icon" onClick={()=>{removeList(efficientArray,index)}}/>
                        </div>
                      )
                    })
                  }
                  </div>
                </CardBody>
              </Card>
            </Row>
            <Row>
              <Card className="timewaste scrollable" id="timewaste" onDragOver={(event)=>draggedOver(event)} onDrop={(event)=>dropped(event)}>
                <CardBody>
                  <CardTitle>timewaste</CardTitle>
                  <div className="no-drop">
                  {
                    timewasteArray.map((item,index)=>{
                      return(
                        <div draggable="true" onDrag={(event)=>{dragStarted(event,index,timewasteArray)}}>
                          <Input type="text" className="my-list" readOnly={true} value={timewasteArray[index]}/>
                          <FaTrash className="trash-icon" onClick={()=>{removeList(timewasteArray,index)}}/>
                        </div>
                      )
                    })
                  }
                  </div>
                </CardBody>
              </Card>
            </Row>
          </Col>

          {/* 3rd column */}
          <Col lg="4" md="4" sm="4">
            <h3 className="task-list">Task-list</h3>
            <div>
            {
              myList.map((item,index)=>{
                return(
                  <div draggable="true" onDrag={(event)=>{dragStarted(event,index,myList)}} className="no-drop">
                    <Input type="text" className="my-list" readOnly={editable[index]} onDoubleClick={()=>{editList(index)}} onInput={(event)=>{onEnteringValue(event,index)}} onKeyPress={(event)=>{disableEdit(event,index)}} value={myList[index]}/>
                    <FaTrash className="trash-icon" onClick={()=>{removeList(myList,index)}}/>
                  </div>
                )
              })
            }
            </div>
            <Row>
              <FaPlusCircle className="add-icon" onClick={clickable}/>
            </Row>
          </Col>
        </Row>


      </Container>
    </div>
  );
}

export default App;
