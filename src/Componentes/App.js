/*Dependencias*/
import React,{Component} from "react";

/*Componentes*/
import Header   from './Basico/Header'
import Content  from './Basico/Content'
import Footer   from './Basico/Footer'

/*Data*/
class App extends Component {
  render(){
    return(
      <div className="App">
        <Header/>
          <Content/>
        <Footer/>
      </div>
    )
  }
}

export default App;
