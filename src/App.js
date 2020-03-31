import React from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusCircle,faTrash,faPencilAlt,faCheck} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from  '@fortawesome/react-fontawesome';
import FlipMove from 'react-flip-move';

library.add(faPlusCircle,faTrash,faPencilAlt,faCheck)


class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
    list:[],
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


  render(){
    return (
      <div>
          <div className='App-first' >
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
          <div className="Task-bar">
              <p className='Task-header'> Task-list</p>
              {
                  this.state.list.map((listvalue,index)=>{
                    
                    return(
                        <div key={index}>
                          <div className="To-do">
                              <FontAwesomeIcon className='Trash-icon' icon="trash" onClick={(e)=>this.delete(e,index)}/>
                              <div onClick={()=>this.changeIcon(index) }>
                                {
                                  this.state.writehandle[index]?
                                  <FontAwesomeIcon className='Pencil-icon' icon="pencil-alt" />
                                  :<FontAwesomeIcon className='Done' icon="check" />
                                }
              
                              </div>
                              <input type="text" value={listvalue} disabled={this.state.disablehandle[index]} onChange={(e)=>this.handleChange(e,index)}/> 
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
