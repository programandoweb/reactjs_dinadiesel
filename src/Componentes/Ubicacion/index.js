import React, {Component} from 'react';

function Iframe(props){
  return(
    <div className="content">
      <iframe title="Ubicación" src={props.src} height={props.height} width={props.width}  />
    </div>
  )
}

class Ubicacion extends Component {
  render(){
    return(
      <Iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3922.1245829519703!2d-71.67651998524231!3d10.56942296587068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e8990d696b20fd9%3A0x6596a784da71f304!2sDina+Diesel+C.A.!5e0!3m2!1sen!2sco!4v1545889739009" width="100%" height="450"  allowfullscreen/>
    )
  }
}
export default Ubicacion;
