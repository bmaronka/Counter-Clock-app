class App extends React.Component {
    state = {
        activeClock: true,
    }

    handleClick = () => {
        this.setState(prevState => ({
            activeClock: !prevState.activeClock,
        }))
    }

    render() {
        return (
            <>
                <h1>Multiplication Counter</h1>
                <Counter />
                <h1>Clock</h1>
                <SwitchButton click={this.handleClick} active={this.state.activeClock} />
                <br />
                {this.state.activeClock && <Clock />}
            </>
        )
    }
}

class Counter extends React.Component {
    state = {
        result: 1,
        ratio: 2,
    };

    handleMultiplication = () => {
        this.setState((prevState) => ({
            result: prevState.result * prevState.ratio,
        }))
    }

    componentDidUpdate() {
        if (this.state.result > 1000 && this.state.ratio === 2) {
            this.setState(() => ({
                ratio: 0.5,
            }))
        } else if (this.state.result < 1 && this.state.ratio === .5) {
            this.setState(() => ({
                ratio: 2,
            }))
        }
    }

    render() {
        return (
            <>
                <button onClick={this.handleMultiplication}>{`Multiply by ${this.state.ratio}`}</button>
                <h2>Multiplication result: {this.state.result}</h2>
            </>
        )
    }
}

class Clock extends React.Component {
    state = {
        time: this.getTime(),
    };

    getTime() {
        const currentTime = new Date();

        return ({
            hours: currentTime.getHours(),
            minutes: currentTime.getMinutes(),
            seconds: currentTime.getSeconds(),
        })
    }

    setTime = () => {
        const time = this.getTime()

        this.setState({
            time,
        })
    }

    componentDidMount() {
        this.intervalIndex = setInterval(this.setTime, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalIndex)
    }

    render() {
        const { hours, minutes, seconds } = this.state.time;

        return (
            <>
                {hours > 9 ? hours : `0${hours}`} : {minutes > 9 ? minutes : `0${minutes}`} : {seconds > 9 ? seconds : `0${seconds}`}
            </>
        )
    }
}

const SwitchButton = props => (
    <button onClick={props.click}>{props.active ? 'Turn off' : 'Turn on'}</button>
)

ReactDOM.render(<App />, document.getElementById('root'));