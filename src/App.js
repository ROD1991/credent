import React, { Component } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactToPrint from 'react-to-print';
import Draggable from 'react-draggable';
import 'react-tabs/style/react-tabs.css';
import domtoimage from 'dom-to-image';
import icono from './img/IMP.png';
import cleaner from './img/cleaner.png';
import sup from './img/sup.png';
import post from './img/sup2.png';


class App extends Component {



   downloadHandler(event){
   
    event.preventDefault();
    
    var node = document.getElementById('tarj');
    
    var options = {
      quality: 0.95, 
      
  };

    domtoimage.toPng(node,options)
      .then(function(dataUrl) {
      console.log(dataUrl);
      console.log("funcion1")
        var img = new Image();
        img.src = dataUrl;
        document.getElementById("divtab3").appendChild(img);
      })
      .catch(function(error) {
        console.error('oops, something went wrong!', error);
      });
  

  }



  downloadHandler2 = async () => {
    
    var node = document.getElementById('tarj2');
    var options = {
      quality: 0.95, 
      
  };
   domtoimage.toPng (node,options)
      .then(function (dataUrl) {
        
        console.log(dataUrl);

      console.log("funcion2")
        var img = new Image();
        img.src = dataUrl;
         document.getElementById("divtab3").appendChild(img);
      })
      .catch(function(error) {
        console.error('oops, something went wrong!', error);
      }); 
}

  cleaner(event){
   
    event.preventDefault();
   
    
    var opcion = window.confirm ('Esta seguro de borrar el contenido');
    if (opcion === true) {
      window.location.replace('');
     
	} else {
	   
	}
  }
  state = {
    activeDrags: 0,
    deltaPosition: {
      x: 0, y: 0
    },
    controlledPosition: {
      x: -400, y: 200
    }
  };


  

  handleChange = color => this.setState({ color })

  
  handleDrag = (e, ui) => {
    const {x, y} = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    });
  };

  onStart = () => {
    this.setState({activeDrags: ++this.state.activeDrags});
  };

  onStop = () => {
    this.setState({activeDrags: --this.state.activeDrags});
  };

  // For controlled component
  adjustXPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {x, y} = this.state.controlledPosition;
    this.setState({controlledPosition: {x: x - 10, y}});
  };

  adjustYPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {controlledPosition} = this.state;
    const {x, y} = controlledPosition;
    this.setState({controlledPosition: {x, y: y - 10}});
  };

  onControlledDrag = (e, position) => {
    const {x, y} = position;
    this.setState({controlledPosition: {x, y}});
  };

  onControlledDragStop = (e, position) => {
    this.onControlledDrag(e, position);
    this.onStop();
  };
  
  /*preview*/


  constructor(props) {

    super(props);

    this.state = {

      file: '',

      imagePreviewUrl: ''

    };

    this._handleImageChange = this._handleImageChange.bind(this);

    this._handleSubmit = this._handleSubmit.bind(this);

   }

 

  _handleSubmit(e) {

    e.preventDefault();

    // TODO: do something with -> this.state.file

  }



  _handleImageChange(e) {

    e.preventDefault();



    let reader = new FileReader();

    let file = e.target.files[0];



    reader.onloadend = () => {

      this.setState({

        file: file,

        imagePreviewUrl: reader.result

      });

    }



    reader.readAsDataURL(file)

  }

  /*fin de preview */


  

  state = {

    nombre: "",

    cargo: "",

    plantilla: "",

    foto: "",

    num: [],

    num2: [],

    color:[],

    color2:[],
  };


               valueToState = ({ name, value,  type , file}) => {

                    this.setState(() => {

                

                return { [name]: type === "file" ? file : value };

               

              });

  };
 
 
  render(){
    
 
  const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    
    let {imagePreviewUrl} = this.state;

    let $imagePreview = null;

    if (imagePreviewUrl) {

      $imagePreview = (<img src={imagePreviewUrl}  />);

    }


       return (
      

       <div class="App-form">
         <div className="divtab">
       <img  width="180px" height="50px" borderRadius="20px"/>
        <form>

        <div class="container" style={{borderStyle:"ridge",borderRadius:10,width:440,marginLeft:0,height:540}}>
          <h1>CREDENCIALES</h1><br>
          </br>
          <h4>Datos del colaborador</h4>
         
          <div class="row">
            <div class="col-md-10">
              <div class="row form-group">
              <div class="col-md-3">Nombre </div>
              <div class="col-md-8"><input type="text" maxlength="60" disabled={!this.state.plantilla} name="nombre"   class="form-control"  onChange={event => this.valueToState(event.target)}/></div>
              </div>
              <div class="row form-group">
              <div class="col-md-3">Plantilla </div>
              <div class="col-md-8">
                        <select class="custom-select custom-select-sm" name="plantilla"    onChange={event => this.valueToState(event.target)}>
                                <option selected value={this.state.texto} name="plantilla">Seleccione Empresa</option>
                                <option value="emp1seg" name="plantilla" >EMPRESA 1</option>
                                <option value="emp2" name="plantilla" >EMPRESA 2</option>
                                <option value="emp3" name="plantilla" >EMPRESA 3</option>
                              
                             
                          </select></div>
              </div>
              <div class="row form-group">
              <div class="col-md-3">Gerencia </div>
              <div class="col-md-8"><input type="text"  name="cargo" maxlength="65" disabled={!this.state.plantilla}  class="form-control"  onChange={event => this.valueToState(event.target)}/></div>
              </div>
              <div class="row form-group pull-left">
              <div class="col-md-3">Foto </div>
              <div class="col-md-8">
              <form onSubmit={this._handleSubmit}>         
                <div class="custom-file">
                <input type="file" class="custom-file-input" id="customFile" disabled={!this.state.plantilla} onChange={this._handleImageChange} />
                <label class="custom-file-label" for="customFile">Seleccione Foto</label>
                </div>
              </form>
            </div>
              </div>
            </div>
            
            
          </div>
          <hr></hr>
          <h4>Estilo de Fuente</h4>
          <div class="row" >
            <div class="col-md-10">
            <div class="row form-group">
              <div class="col-md-4">T. nombre </div>
              <div class="col-md-3"> <input min="0" max="4" type="number" name="num2" align="left" class="form-control" disabled={!this.state.plantilla} onChange={event => this.valueToState(event.target)} /></div>
              <div class="col-md-2">Color</div>
              <div class="col-md-3"><input disabled={!this.state.plantilla} type="color" name="color"   class="form-control" onChange={event => this.valueToState(event.target)} /></div>
              </div>
              <div class="row form-group">
              <div class="col-md-4">T. gerencia</div>
              <div class="col-md-3"><input  min="0" max="4" type="number" name="num" align="left" class="form-control" disabled={!this.state.plantilla} onChange={event => this.valueToState(event.target)} /></div>
              <div class="col-md-2">Color</div>
              <div class="col-md-3"><input disabled={!this.state.plantilla} type="color" name="color2"   class="form-control" onChange={event => this.valueToState(event.target)} /></div>
              </div>
            </div>
            <div class="col-md-4">
            </div>
          </div>
        </div>
        </form>

        </div>
     


     <div className="panel" >
      <div className="hedpan">
      <div className="centhe">
     <h2 >PANEL</h2>
     </div>
     </div>
       <div className="divtab2" id="divtab2"  style={{media:"print"}} > 
       <div className="tarj" id="tarj">
       <div  className={this.state.plantilla}  style={{media:"print"}} >
       <Draggable {...dragHandlers}>
       <div className={this.state.plantilla + "logo1"}  style={{media:"print"}} ></div>
       </Draggable>
       <Draggable {...dragHandlers} >
       <div className={this.state.plantilla + "logo2"}  style={{media:"print"}} ></div>
       </Draggable>
       <Draggable {...dragHandlers}>
       <div className={this.state.plantilla + "foto"}  style={{media:"print"}} >           

                     {$imagePreview}

       </div>
       </Draggable>
       <Draggable {...dragHandlers}>
       <div className={this.state.plantilla + "texto"} style={{media:"print"}} size={this.state.num} >
       <font style={{media:"print"}} size={this.state.num2} max-size="5" color={this.state.color} >{this.state.nombre}</font>
       </div> 
       </Draggable>
       <Draggable {...dragHandlers}>      
       <div className={this.state.plantilla + "texto_area"} style={{media:"print"}} size={this.state.num}  >
       <p>
       <font style={{media:"print"}} size={this.state.num}  color={this.state.color2}>{this.state.cargo} </font>
       </p>
       </div> 
       </Draggable>       
      </div>
 </div>
          </div>

         
       <div className="divtab3" id="divtab3" ref={el => (this.componentRef = el)}  style={{media:"print"}} >
       </div>
      

       <div className="divtab4" id="divtab4" >
       <div className="tarj2" id="tarj2">
       <div className={this.state.plantilla + "2"}  style={{media:"print"}}   ></div> 
       </div>
       </div>
       </div>
       <div className="panelboton">
      
       <div className="btn_imp3">
             <ReactToPrint
             trigger={() => <button data-toggle="tooltip" data-placement="top" title="Imprimir" className="btn btn-primary" disabled={!this.state.plantilla} onClick={this.downloadHandler2.bind(this)} href="#"><img src={icono}logo height="50px" width="50px"/></button>}
             content={() => this.componentRef}
             />
      </div>
        
          <div className="btn_imp">
          <button data-toggle="tooltip"  title="Enviar Parte Superior" className="btn btn-success" disabled={!this.state.plantilla} onClick={this.downloadHandler.bind(this)}  href="#"><img src={sup}logo height="50px" width="50px"/></button>
          </div>
        
          <div className="btn_imp2">
          <button data-toggle="tooltip"  title="Enviar Parte Posterior" className="btn btn-danger"  disabled={!this.state.plantilla} onClick={(event) => {this.downloadHandler2(event)}} href="#"><img src={post}logo height="50px" width="50px"/></button>
          </div>
          <div className="btn_imp4">
          <button data-toggle="tooltip"  title="Limpiar contenido" className="btn btn-warning" disabled={!this.state.plantilla} onClick={this.cleaner.bind(this)} href="#"><img src={cleaner}logo height="50px" width="50px"/></button>
          </div>
          </div>
  </div>               
     
    );

  }

}


export default App;