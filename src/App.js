import React from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusCircle,faTrash,faPencilAlt,faCheck} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from  '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import'react-toastify/dist/ReactToastify.css';
import FlipMove from 'react-flip-move';

library.add(faPlusCircle,faTrash,faPencilAlt,faCheck)

toast.configure()


class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
    list:[],
    immediate:[],
    draggeditem:null,
    count:0,
    dis:true,
    write:true,
    disablehandle:[true],
    writehandle:[true],
    }
  }
    addList() {
      this.setState({
        list:[...this.state.list," "],
        disablehandle:[...this.state.disablehandle,true],
        writehandle:[...this.state.writehandle,true]
      })
    }

    handleChange(e,index){
      this.state.list[index]=e.target.value
/*
      /*this.setState({ dis: false})*/
      this.setState({list : this.state.list})

      console.log(this.state.list);
      console.log(this.state.immediate);
    }

    
    delete(e,index){

      console.log(this.state.list);
      this.state.list.splice(index,1)
      console.log(this.state.list);
      this.setState({list:this.state.list})

      this.state.disablehandle.splice(index,1)
      this.setState({disablehandle:this.state.disablehandle})

      this.state.writehandle.splice(index,1)
      this.setState({writehandle:this.state.writehandle})


      console.log(this.state.disablehandle);

      console.log(this.index);
    }

    changeIcon(index){
      this.setState({
        write:!this.state.write,
        dis:!this.state.dis,
      })
      this.state.writehandle[index]=!this.state.writehandle[index]

      this.state.disablehandle[index]=!this.state.disablehandle[index]
    }


    allowdrop(e){
      e.preventDefault();
  
    }

    dragstart(e,index){
      e.dataTransfer.setData("text/html",e.target.id);
    }

    drop(e){
      e.preventDefault();
      var data=e.dataTransfer.getData("text/html");
      e.target.appendChild(document.getElementById(data));
      
    }


  render(){
    return (
      <div>
          <div className='App-first' onDrop={(e)=>this.drop(e)} onDragOver={(e)=>this.allowdrop(e)}>
              <p className='Text-inbox'>Immediate</p>
          </div>
          <div className='App-second'>
              <p className='Text-inbox'>Efficient</p>
          </div>
          <div className='App-third'>
              <p className='Text-inbox'>Interruption</p>
          </div>
          <div className='App-fourth'>
              <p className='Text-inbox'>Timewaste</p>
          </div>
          <div className="Task-bar" onDrop={(e)=>this.drop(e)} onDragOver={(e)=>this.allowdrop(e)}>
              <p className='Task-header'> Task-list</p>
              {
                  this.state.list.map((listvalue,index)=>{
                    
                    return(
                        <div key={index}>
                          <div className="To-do" >
                              <FontAwesomeIcon className='Trash-icon' icon="trash" onClick={(e)=>this.delete(e,index,listvalue)}  />
                              <div onClick={()=>this.changeIcon(index) }>
                                {
                                  this.state.writehandle[index]?
                                  <FontAwesomeIcon className='Pencil-icon' icon="pencil-alt" />
                                  :<FontAwesomeIcon className='Done' icon="check"/>
                                }
              
                              </div>
                              <input type="text" id={index} value={listvalue} disabled={this.state.disablehandle[index]} onChange={(e)=>this.handleChange(e,index)}  draggable="true" onDragStart={(e)=>this.dragstart(e,index)}/> 
                           </div>
                      </div>
                    )
                          
                  })
                  
              }
                    
              <FontAwesomeIcon className='Add-icon' icon="plus-circle" onClick={(e)=>this.addList(e)}/>
          </div>
      </div>


    );

  }
}

export default App;
