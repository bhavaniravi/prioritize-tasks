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
    draggeditem:null,
    immediatecount:0,
    tasklistcount:0,
    dis:true,
    write:true,
    /*disablehandle:[false],*/
    disablehandle:[true],
    /*writehandle:[true],*/
    }
  }
    addList() {
      this.setState({
        list:[...this.state.list," "],
        disablehandle:[...this.state.disablehandle,true],
       /* writehandle:[...this.state.writehandle,true]*/
      })

      console.log(this.state.disablehandle);

    }

    handleChange(e,index){

        const newlist=this.state.list.slice();
        newlist[index]=e.target.value;
        this.setState({list:newlist});

        /*this.state.list[index]=e.target.value*/

        /*this.setState({ dis: false})*/
        /*this.setState({list : this.state.list})*/

        console.log(this.state.list);
      

    }

    
    delete(e,index){

      console.log(this.state.list);
      this.state.list.splice(index,1)
      console.log(this.state.list);
      this.setState({list:this.state.list})

      this.state.disablehandle.splice(index,1)
      this.setState({disablehandle:this.state.disablehandle})

      /*this.state.writehandle.splice(index,1)
      this.setState({writehandle:this.state.writehandle})*/


      console.log(this.state.disablehandle);

      console.log(this.index);
    }

    /*changeIcon(index){
      this.setState({
        write:!this.state.write,
        dis:!this.state.dis,
      })./
      
      this.state.writehandle[index]=!this.state.writehandle[index]

      this.state.disablehandle[index]=!this.state.disablehandle[index]
      
    }*/
    enabledit(e,index){

      const newlist=this.state.disablehandle.slice();
        newlist[index]=false;
        this.setState({disablehandle:newlist});

      /*this.state.disablehandle[index]=false;*/
      console.log("working");

    }

    enterpressed(e,index){

      if(e.key === 'Enter'){
        
        const newlist=this.state.disablehandle.slice();
        newlist[index]=true;
        this.setState({disablehandle:newlist});

          /*this.state.disablehandle[index]=true;*/

      }
    }

    allowdrop(e){
      e.preventDefault();
    }

    dragstart(e,index){
      e.dataTransfer.setData("text/html",e.target.id);
    }

    drop(e){
        e.preventDefault(); 
        if(this.state.immediatecount>=4 && e.target.className!=="Task-bar"){
          toast("ONLY 4 TASKS ARE ALLOWED FOR AN ACTIVITY ....");

        }
        else if(e.target.className==="App-first"){
            var data=e.dataTransfer.getData("text/html");
          e.target.appendChild(document.getElementById(data));

          this.setState({
              immediatecount:this.state.immediatecount + 1

            })
         }

        else if(e.target.className==="Task-bar" && e.target.className!=="Add-icon"){
            var data1=e.dataTransfer.getData("text/html");
            e.target.appendChild(document.getElementById(data1));
          }


         else{

            toast("PLACE THE LIST CORRECTLY....",{
            position:toast.POSITION.TOP_CENTER
        
            });
          }
        console.log(this.state.immediatecount);
    }


  render(){
    return (
      <div>
          <div className='App-first' onDrop={(e)=>this.drop(e)} onDragOver={(e)=>this.allowdrop(e)}>
              <p className='Text-inbox'>Immediate</p>
              <FontAwesomeIcon className='Trash-icon' id="trashiconid" icon="trash" onClick={(e)=>this.delete(e)}/>

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
                          <div className="To-do"  onDoubleClick={(e)=>this.enabledit(e,index)} >
                              <div>
                                  <input type="text" id={index} value={listvalue} draggable="true" disabled={this.state.disablehandle[index]} onChange={(e)=>this.handleChange(e,index)} onDragStart={(e)=>this.dragstart(e,index)}  onKeyDown={(e)=>this.enterpressed(e,index)}/> 
                                  <FontAwesomeIcon className='Trash-icon' id="trashiconid" icon="trash" onClick={(e)=>this.delete(e)}/>
                              </div>
                              
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
