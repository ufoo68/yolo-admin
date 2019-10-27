import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import axios from 'axios'
import NumericInput from 'react-numeric-input'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '---',
      point: 0
    }
  }
  

  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
    }
  }
  handleError = err => {
    console.error(err)
  }


  render() {
    const post = () => {
      axios.put(`https://maidoary.herokuapp.com/customers/${this.state.result}`, {
        point: this.state.point
      })
      .then(() => {
        alert(`submit : ${this.state.point}`)
      })
      .catch((e) => {
        alert(e)
      })
    }
    return (
      <div class="App">
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
        />
        <div class="id">User ID : {this.state.result}</div>
        <div class="input">
          <NumericInput value={this.state.point} min={-2} max={2}
          onChange={(e) => {
            this.setState({point: e.valueOf()})
          }} />
        </div>
        {this.state.result === '---' ? 
          <button disabled class="submitButton">QRコードをスキャンしてください</button>
        :
          <button onClick={post} class="submitButton">ポイントを加算</button>
        }
      </div>
    )
  }
}
export default App;