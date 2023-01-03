import React, { Component } from 'react';
import App from './App';

class NutriKit extends Component {
    constructor(props){
        super(props);
        this.state={data: ""}
    }

    deleteItem = (id) => {
        fetch('http://localhost:5000/menu/delete/' + String(id), 
        {method: 'DELETE'})
        .then(
            (response) => 
            {
              if (response.status === 200)
              {
                this.fetchData()
                return (response.json()) ;
              }
              else
              {
                  console.log("HTTP error:" + response.status + ":" +  response.statusText);
                  window.alert("An error occured.")
                  return ([ ["status ", response.status]]);
              }
            }
            )
        .catch((error) => 
                {console.log(error);
        })
    }

    updateItem = (id, body) => {
        const hdr = {'Content-Type': 'application/json'}
        body = JSON.stringify(body)

        fetch('http://localhost:5000/menu/update/' + Number(id), {
          headers: hdr,
          method: 'PUT',
          body: body
        })
        .then(
            (response) => 
            {
              if (response.status === 200)
              {
                this.fetchData()
                return (response.json()) ;
              }
              else
              {
                  console.log("HTTP error:" + response.status + ":" +  response.statusText);
                  window.alert("An error occured.")
                  return ([ ["status ", response.status]]);
              }
            }
            )
        .catch((error) => 
                {console.log(error);
        })
    }

    addItem = (body) => {
        const hdr = {'Content-Type': 'application/json'}
        // console.log(body)
        body = JSON.stringify(body)
  
        fetch('http://localhost:5000/menu/add', {
          headers: hdr,
          method: 'POST',
          body: body
        })
        .then(
            (response) => 
            {
              if (response.status === 200)
              {
                this.fetchData()
                return (response.json()) ;
              }
              else
              {
                  console.log("HTTP error:" + response.status + ":" +  response.statusText);
                  window.alert("An error occured.")
                  return ([ ["status ", response.status]]);
              }
            }
            )
        .catch((error) => 
                {console.log(error);
        })
    }

    updateData = (apiResponse) => {
        this.setState({data: apiResponse})
        // console.log(this.state.data)
    }

    fetchData = () => {
         fetch('http://localhost:5000/menu')
         .then(
             response => response.json() 
             )
         .then (jsonOutput =>
                  {
                    this.updateData(jsonOutput)
                  }
              )
    }

    componentDidMount(){
        this.fetchData();
    }
    
    render(){return(
      <App
        data={this.state.data}
        deleteItem={this.deleteItem}
        updateItem={this.updateItem}
        addItem={this.addItem}
      />
    )}
}

export default NutriKit;