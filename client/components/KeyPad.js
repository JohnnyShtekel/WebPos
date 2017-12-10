import React from 'react';
import PointTarget from 'react-point';
import '../assets/styles/keypad.css';
import {addItem} from '../api/itemsAPI'

class AutoScalingText extends React.Component {

   constructor(props) {
        super(props);
        this.state = {
          scale: 1
        }
    }
  
  componentDidUpdate() {
    const { scale } = this.state
    
    const node = this.node
    const parentNode = node.parentNode
    
    const availableWidth = parentNode.offsetWidth
    const actualWidth = node.offsetWidth
    const actualScale = availableWidth / actualWidth
    
    if (scale === actualScale)
      return
    
    if (actualScale < 1) {
      this.setState({ scale: actualScale })
    } else if (scale < 1) {
      this.setState({ scale: 1 })
    }
  }
  
  render() {
    const { scale } = this.state
    
    return (
      <div
        className="auto-scaling-text"
        style={{ transform: `scale(${scale},${scale})` }}
        ref={node => this.node = node}
      >{this.props.children}</div>
    )
  }
}

// -------------------------------------------------------------------

class CalculatorDisplay extends React.Component {
  render() {
    const { value, ...props } = this.props
    
    const language = navigator.language || 'en-US'
    let formattedValue = parseFloat(value).toLocaleString(language, {
      useGrouping: true,
      maximumFractionDigits: 6
    })
    
    
    return (
      <div {...props} className="calculator-display">
        <AutoScalingText>{value}</AutoScalingText>
      </div>
    )
  }
}

class CalculatorDisplay1 extends React.Component {
  render() {
    const { value, ...props } = this.props
    
    const language = navigator.language || 'en-US'
    let formattedValue = parseFloat(value).toLocaleString(language, {
      useGrouping: true,
      maximumFractionDigits: 6
    })
    
    
    return (
      <div {...props} className="calculator-display1">
        <AutoScalingText>{value}</AutoScalingText>
      </div>
    )
  }
}

// -------------------------------------------------------------------
class CalculatorKey extends React.Component {
  render() {
    const { onPress, className, ...props } = this.props
    
    return (
      <PointTarget onPoint={onPress}>
        <button className={`calculator-key ${className}`} {...props}/>
      </PointTarget>
    )
  }
}


// -------------------------------------------------------------------

class Calculator extends React.Component {
  state = {
    value: null,
    displayValue: '',
    operator: null,
    waitingForOperand: false,
    numOfitems:1,
    highDisplay:"Please Scan/Enter Item Code",
    isMultOperatorActive: false,
    tempDisplay: ''

  };
  
  clearAll() {
    console.log("clear");
    this.setState({
      value: null,
      displayValue: '',
      operator: null,
      waitingForOperand: false
    })
  }

  clearDisplay() {
    console.log("clearall");
    this.setState({
      displayValue: ''
    })
  }
  
  clearLastChar() {
    console.log("clearLastChar");
    const { displayValue } = this.state
    
    this.setState({
      displayValue: displayValue.substring(0, displayValue.length - 1) || ''
    })
  }
  
  toggleSign() {
    console.log("clearLastChar");
    const { displayValue } = this.state
    const newValue = parseFloat(displayValue) * -1
    
    this.setState({
      displayValue: String(newValue)
    })
  }
  
  inputPercent() {
    const { displayValue } = this.state
    const currentValue = parseFloat(displayValue)
    
    if (currentValue === 0)
      return
    
    const fixedDigits = displayValue.replace(/^-?\d*\.?/, '')
    const newValue = parseFloat(displayValue) / 100
    
    this.setState({
      displayValue: String(newValue.toFixed(fixedDigits.length + 2))
    })
  }
  
  inputDot() {
    const { displayValue } = this.state
    
    if (!(/\./).test(displayValue)) {
      this.setState({
        displayValue: displayValue + '.',
        waitingForOperand: false
      })
    }
  }
  
  inputDigit(digit) {
    const { displayValue, waitingForOperand,numOfitems} = this.state
    
    if (waitingForOperand) {
      this.setState({
        numOfitems: numOfitems * parseInt(digit),
        waitingForOperand: false
      })
    } else {
      this.setState({
        displayValue: displayValue === '0' ? String(digit) : displayValue + digit
      })
    }
  }


  
  
  performOperation(nextOperator) {    
    const { value, displayValue, operator ,numOfitems,isMultOperatorActive,tempDisplay} = this.state
    const inputValue = parseFloat(displayValue)

    if (value == null) {
      this.setState({
        value: inputValue
      })
    } else if (nextOperator) {
      const currentValue = value || 0
      
      console.log("value: " + value)
      let newValue = "";
      let waitingForOperand =false;
      let highDisplay = "Please Scan/Enter Item Code";
      var isMultOperatorActiveLocal = false
      var tempDisplayLocal = ""

   switch(nextOperator) {
    case "r1":
        newValue = displayValue.substring(0,displayValue.length -1)
        break;
    case "=":
        if(isMultOperatorActive){
          newValue = addItem(tempDisplay,numOfitems);
        }
        else{
          newValue = addItem(displayValue,numOfitems);
        }
        
        break;
    case "*":
        highDisplay = "QTY " + displayValue
        waitingForOperand = true;
        isMultOperatorActiveLocal = true;
        tempDisplayLocal = displayValue

        break;

     }


      this.setState({
        value: newValue,
        displayValue: String(newValue),
        waitingForOperand : waitingForOperand,
        highDisplay : highDisplay,
        tempDisplay : tempDisplayLocal,
        isMultOperatorActive: isMultOperatorActiveLocal 
      })
    }

    

    
    
    this.setState({
      operator: nextOperator
    })
  }

  
  
  handleKeyDown = (event) => {
    let { key } = event
    
    if (key === 'Enter')
      key = '='
    
    if ((/\d/).test(key)) {
      event.preventDefault()
      this.inputDigit(parseInt(key, 10))
    } else if (key in CalculatorOperations) {
      event.preventDefault()
      this.performOperation(key)
    } else if (key === '.') {
      event.preventDefault()
      this.inputDot()
    } else if (key === '%') {
      event.preventDefault()
      this.inputPercent()
    } else if (key === 'Backspace') {
      event.preventDefault()
      this.clearLastChar()
    } else if (key === 'Clear') {
      event.preventDefault()
      
      if (this.state.displayValue !== '0') {
        this.clearDisplay()
      } else {
        this.clearAll()
      }
    }
  };
  
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }
  
  render() {
    const { displayValue,highDisplay } = this.state;
    const stam = '<<';
    const stam1 = 'OK';
    const clearDisplay = displayValue !== '0';
    const clearText = clearDisplay ? 'C' : 'C';
    
    return (
      <div className="calculator">
        <CalculatorDisplay1 value={highDisplay}/>
        <CalculatorDisplay1 value={displayValue}/>
        <CalculatorDisplay value={""}/>
        <CalculatorDisplay value={""}/>
        <div className="calculator-keypad">
          <div className="input-keys">
            <div className="function-keys">
              
            </div>
            <div className="digit-keys">
              <CalculatorKey className="key-0" onPress={() => this.inputDigit(0)}>0</CalculatorKey>
              <CalculatorKey className="key-dot" onPress={() => this.inputDot()}>●</CalculatorKey>
              <CalculatorKey className="key-clear" onPress={() => clearDisplay ? this.clearDisplay() : this.clearAll()}>{clearText}</CalculatorKey>              
              <CalculatorKey className="key-1" onPress={() => this.inputDigit(1)}>1</CalculatorKey>
              <CalculatorKey className="key-2" onPress={() => this.inputDigit(2)}>2</CalculatorKey>
              <CalculatorKey className="key-3" onPress={() => this.inputDigit(3)}>3</CalculatorKey>
              <CalculatorKey className="key-4" onPress={() => this.inputDigit(4)}>4</CalculatorKey>
              <CalculatorKey className="key-5" onPress={() => this.inputDigit(5)}>5</CalculatorKey>
              <CalculatorKey className="key-6" onPress={() => this.inputDigit(6)}>6</CalculatorKey>
              <CalculatorKey className="key-7" onPress={() => this.inputDigit(7)}>7</CalculatorKey>
              <CalculatorKey className="key-8" onPress={() => this.inputDigit(8)}>8</CalculatorKey>
              <CalculatorKey className="key-9" onPress={() => this.inputDigit(9)}>9</CalculatorKey>
            </div>
          </div>
          <div className="operator-keys">
            <CalculatorKey className="key-divide" onPress={() => this.performOperation('r1')}>{stam}</CalculatorKey>
            <CalculatorKey className="key-multiply" onPress={() => this.performOperation('*')}>X</CalculatorKey>
            <CalculatorKey className="key-equals" onPress={() => this.performOperation('=')}>{stam1}</CalculatorKey>
          </div>
        </div>
      </div>
    )
  }
}


export default Calculator

