import React, {Component} from 'react';
class NuevaCita extends Component {
  render(){
    return(
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col">
              <img alt="Nosotros" src="images/about.jpg" className="img-resposive"  />
              <div className="p-3">
                <h2>
                  ¡Conozca un poco sobre nosotros
                </h2>
                <h4>
                  y qué hacemos!
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default NuevaCita;
