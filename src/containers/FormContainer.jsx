import React from 'react';
// Import Syles
import './style.css';
// Import components
import CheckBox from './../components/CheckBox';
import RadioButton from './../components/RadioButton';
import Input from './../components/Input';
import Rate from './../components/Rate';

class FormContainer extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            checkedRadioButton: 'USD',
            inputAmountValue: '',
            // todayDate: new Date().toISOString().slice(0, 10),
            todayBlock: false,
            sevenBlock: false,
            thirtyBlock: false,
            yearBlock: false,
            //Checked
            todayBlockChecked: false,
            sevenBlockChecked: false,
            thirtyBlockChecked: false,
            yearBlockChecked: false,
            //Rates
            todayRate: '',
            todayDate: '',
            sevenDaysRate: '',
            sevenDaysDate: '',
            thirtyDaysRate: '',
            thirtyDaysDate: '',
            yearRate: '',
            yearDate: '',

            //
            selectedCurrencyApi: 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&date=',
        }
    }

    changedRadioButton = (e) => {
        let currencyValue;

        const currencyChoice = (e) => {
            if (e.target.value === "USD") {
                currencyValue = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&date=';
            } else if (e.target.value === "EUR") {
                currencyValue = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=EUR&date=';
            } else if (e.target.value === "GBP") {
                currencyValue = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=GBP&date=';
            } else if (e.target.value === "PLN") {
                currencyValue = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=PLN&date=';
            }
            return currencyValue;
        }
        currencyChoice(e);

        this.setState({
            todayBlock: false,
            sevenBlock: false,
            thirtyBlock: false,
            yearBlock: false,
            todayBlockChecked: false,
            sevenBlockChecked: false,
            thirtyBlockChecked: false,
            yearBlockChecked: false,
            checkedRadioButton: e.target.value,
            selectedCurrencyApi: currencyValue
        })
    }

    handleChange = (e) => {
        this.setState({
            inputAmountValue: e.target.value
        })
    }

    isCheckedCheckbox = (e) => {
        switch(e.target.name) {
            case "todayRate": 
                this.setState({
                    todayBlockChecked: !this.state.todayBlockChecked
                })
                break;
            case "sevenDaysRate":
                this.setState({
                    sevenBlockChecked: !this.state.sevenBlockChecked
                })
                break;
            case "thirtyDaysRate":
                this.setState({
                    thirtyBlockChecked: !this.state.thirtyBlockChecked
                })
                break;
            case "yearAgoRate":
                this.setState({
                    yearBlockChecked: !this.state.yearBlockChecked
                })
                break;
        }
    }

    handleChackBox = (event) => {
        const date = new Date();
        const days = 86400000;

        switch (event.target.name) {
            case "todayRate": 
                const todayDate = new Date();
                const todayResult = todayDate.toISOString().slice(0, 10).replace(/-/g, "");
                const todayHttp = this.state.selectedCurrencyApi + todayResult + '&json';

                fetch(todayHttp)
                    .then((response) => response.json())
                    .then((responseData) => {
                        this.setState({
                            todayRate: responseData[0].rate,
                            todayDate: date.toISOString().slice(0, 10),
                            todayBlock: !this.state.todayBlock
                        });
                    })
                    .catch(error => {
                        console.log('request failed', error)
                    })
                break;
            case "sevenDaysRate": 
                const sevenDaysAgo = new Date(date - (7 * days))
                const sevenDaysResult = sevenDaysAgo.toISOString().slice(0, 10).replace(/-/g, "");
                const http = this.state.selectedCurrencyApi + sevenDaysResult + '&json'

                fetch(http)
                    .then((response) => response.json())
                    .then((responseData) => {
                        this.setState({
                            sevenDaysRate: responseData[0].rate,
                            sevenDaysDate: sevenDaysAgo.toISOString().slice(0, 10),
                            sevenBlock: !this.state.sevenBlock
                        });
                    })
                    .catch(error => {
                        console.log('request failed', error)
                    })
                break;
            case "thirtyDaysRate": 
                const thirtyDaysAgo = new Date(date - (30 * days))
                const thirtyDaysResult = thirtyDaysAgo.toISOString().slice(0, 10).replace(/-/g, "");
                const thirtyDaysHttp = this.state.selectedCurrencyApi + thirtyDaysResult + '&json'

                fetch(thirtyDaysHttp)
                    .then((response) => response.json())
                    .then((responseData) => {
                        this.setState({
                            thirtyDaysRate: responseData[0].rate,
                            thirtyDaysDate: thirtyDaysAgo.toISOString().slice(0, 10),
                            thirtyBlock: !this.state.thirtyBlock
                        });
                    })
                    .catch(error => {
                        console.log('request failed', error)
                    })
                break;
            case "yearAgoRate": 
            const yearAgo = new Date(date - (365 * days))
            const yearResult = yearAgo.toISOString().slice(0, 10).replace(/-/g, "");
            const yearHttp = this.state.selectedCurrencyApi + yearResult + '&json'
            console.log(yearHttp)

            fetch(yearHttp)
                .then((response) => response.json())
                .then((responseData) => {
                    this.setState({
                        yearRate: responseData[0].rate,
                        yearDate: yearAgo.toISOString().slice(0, 10),
                        yearBlock: !this.state.yearBlock
                    });
                })
                .catch(error => {
                    console.log('request failed', error)
                })
                break;
            default:
                console.log("CheckBox name is undefined");
        }
    }

    test = () => {
        console.log("sevenDaysRate", this.state.sevenDaysRate);
    }

    render() {
        return(
            <div className="formContainer">
                <div className="currencyChoice">
                    <div className="radioButtonsBlock">
                        <RadioButton
                            label="USD"
                            id="1"
                            value="USD"
                            checked={this.state.checkedRadioButton === "USD"}
                            changed={this.changedRadioButton}
                        />
                        <RadioButton
                            label="EUR"
                            id="2"
                            value="EUR"
                            checked={this.state.checkedRadioButton === "EUR"}
                            changed={this.changedRadioButton}
                        />
                        <RadioButton
                            label="GBP"
                            id="3"
                            value="GBP"
                            checked={this.state.checkedRadioButton === "GBP"}
                            changed={this.changedRadioButton}
                        />
                        <RadioButton
                            label="PLN"
                            id="4"
                            value="PLN"
                            checked={this.state.checkedRadioButton === "PLN"}
                            changed={this.changedRadioButton}
                        />
                    </div>
                    <Input
                        name="amount"
                        value={this.state.inputAmountValue}
                        handleChange={this.handleChange}
                    />
                </div>

                <button onClick={this.test}>Test</button>
                <div className="currencyResultBlock">
                    <div className="currencyResult">
                        <CheckBox
                            name="todayRate"
                            value={this.state.todayBlock}
                            label="Today rate"
                            handleChange={this.handleChackBox}
                            checked={this.state.todayBlockChecked}
                            isChange={this.isCheckedCheckbox}
                        />
                        <Rate
                            todayDate={this.state.todayDate}
                            todayRate={this.state.todayRate}
                            amount={(this.state.inputAmountValue * this.state.todayRate)}
                            display={this.state.todayBlock}
                        />
                    </div>
                    <div className="currencyResult">
                        <CheckBox
                            name="sevenDaysRate"
                            value={this.state.sevenBlock}
                            label="7 days ago rate"
                            handleChange={this.handleChackBox}
                            checked={this.state.sevenBlockChecked}
                            isChange={this.isCheckedCheckbox}
                        />
                        <Rate
                            todayDate={this.state.sevenDaysDate}
                            todayRate={this.state.sevenDaysRate}
                            amount={(this.state.inputAmountValue * this.state.sevenDaysRate)}
                            display={this.state.sevenBlock}
                        />
                    </div>
                    <div className="currencyResult">
                        <CheckBox
                            name="thirtyDaysRate"
                            value={this.state.thirtyBlock}
                            label="30 days ago rate"
                            handleChange={this.handleChackBox}
                            checked={this.state.thirtyBlockChecked}
                            isChange={this.isCheckedCheckbox}
                        />
                        <Rate
                            todayDate={this.state.thirtyDaysDate}
                            todayRate={this.state.thirtyDaysRate}
                            amount={(this.state.inputAmountValue * this.state.thirtyDaysRate)}
                            display={this.state.thirtyBlock}
                        />
                    </div>
                    <div className="currencyResult">
                        <CheckBox
                            name="yearAgoRate"
                            value={this.state.yearBlock}
                            label="One year ago rates"
                            handleChange={this.handleChackBox}
                            checked={this.state.yearBlockChecked}
                            isChange={this.isCheckedCheckbox}
                        />
                        <Rate
                            todayDate={this.state.yearDate}
                            todayRate={this.state.yearRate}
                            amount={(this.state.inputAmountValue * this.state.yearRate)}
                            display={this.state.yearBlock}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default FormContainer;