import React, {Component} from 'react';
class Contacto extends Component {
  render(){
    return(
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col">
              <img alt="Contacto"  src="images/about.jpg" className="img-resposive"  />
              <div className="p-3">
                <h2>
                  ¡Quieres comunicarte
                </h2>
                <h4>
                  con nosotros!
                </h4>
                <p>
                  Llámanos ahora mismo al: +582617317343
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Contacto;
