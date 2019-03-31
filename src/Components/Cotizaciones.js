import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

import {apiRest} from '../ApiRest';

class Cotizaciones extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      citas:{},
      items:0
    };

    let data_post  =   {
      "action":"ListarMisCotizaciones",
      "Key":localStorage.getItem('Key'),
    };
    if(localStorage.getItem('Key')){
      apiRest(this.props.globalprops.ApiRest,data_post,{  "store":"ListarMisCotizaciones",
                                                          "props":this.props,
                                                          "content":localStorage,
                                                          "preRender":this.preRender,
                                                        });
    }
  }

  handleClick=(tarea)=>{
    let servicios = [];
    if(tarea.servicio){
      Object.entries(tarea.servicio).map((value,key) => (
        servicios.push(<span key={key}> {value[1]}<br/> </span>)
      ))
    }else if(tarea.procura_repuestos){
      Object.entries(tarea.procura_repuestos).map((value,key) => (
        servicios.push(<span key={key}> {value[1]}<br/> </span>)
      ))
    }else if(tarea.mantenimientos){
      Object.entries(tarea.mantenimientos).map((value,key) => (
        servicios.push(<span key={key}> {value[1]}<br/> </span>)
      ))
    }
    let imprime = <span>
                    <b>Requerimiento:</b>
                    <br/>
                    {servicios}
                    <br/>
                    Atención desde <b> {tarea.fecha_inicio  }</b>
                  </span>;
    this.props.handleClickModal(imprime,tarea.marcas + ' ' + tarea.placa);
  }

  preRender=(data)=>{
    this.setState({ items: Object.entries(data.tareas) });
  }

  render(){
    if(this.state.items.length>0){
      return (
        <div>
          <List dense>
            { this.state.items.map(value => (
                <ListItem key={value[1].tarea_id} onClick={()=>this.handleClick(value[1])}>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                  <ListItemText className="Separator"
                    primary={"Vehículo "+value[1].marcas + ', ' + value[1].modelo + ", placas " + value[1].placa}
                    secondary={"Fecha atención: " +value[1].fecha_inicio}
                  />
                </ListItem>
              ))
            }
          </List>
        </div>
      )
    }else{
      return (
        <div>
          Sin solicitudes pendientes
        </div>
      )
    }

  }
}

export default Cotizaciones
