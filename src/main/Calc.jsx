import React, { Component } from 'react'
import Button from '../Components/Button'
import Display from '../Components/Display'
import './Calc.css'

const intialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values:[0, 0],
    current:0
}

export default class Calc extends Component{
    state = { ...intialState }
    
    constructor(props) {
        super(props)

        this.clear = this.clear.bind(this)
        this.addVal = this.addVal.bind(this)
        this.setOperation = this.setOperation.bind(this)
    }
    
    clear() {
        this.setState({ ...intialState })
    }

    setOperation(operation) {
        console.log(operation)

        if(this.state.current === 0)
            this.setState({operation, current : 1, clearDisplay : true })
        else{
            const equals = operation === '='
            const currentOperation = this.state.operation
            const values = [...this.state.values]

            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            }   
            catch(e) {
                values[0] = this.state.values[0]
            }
            
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current : equals ? 0 : 1, 
                clearDisplay : !equals,
                values: values 
            })
        }

    }

    addVal(val) {
        if(val === '.' && this.state.displayValue.includes('.'))
            return

        const clearDisplay = this.state.displayValue === '0' 
            || this.state.clearDisplay

        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + val

        this.setState({displayValue, clearDisplay:false})

        if(val !== '.'){
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]

            values[i] = newValue

            this.setState({ values })
        }
    }

    render() {
        return (
            <div className='calc'>
                <Display value={this.state.displayValue}></Display>
                <Button click={this.clear} label="AC" triple></Button>
                <Button click={this.setOperation} label="/" operation></Button>
                <Button click={this.addVal} label="7"></Button>
                <Button click={this.addVal} label="8"></Button>
                <Button click={this.addVal} label="9"></Button>
                <Button click={this.setOperation} label="x" operation></Button>
                <Button click={this.addVal} label="4"></Button>
                <Button click={this.addVal} label="5"></Button>
                <Button click={this.addVal} label="6"></Button>
                <Button click={this.setOperation} label="-" operation></Button>
                <Button click={this.addVal} label="1"></Button>
                <Button click={this.addVal} label="2"></Button>
                <Button click={this.addVal} label="3"></Button>
                <Button click={this.setOperation} label="+" operation></Button>
                <Button click={this.addVal} label="0" double></Button>
                <Button click={this.addVal} label="."></Button>
                <Button click={this.setOperation} label="=" operation></Button>
            </div>)
    }
}