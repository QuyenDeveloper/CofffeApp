import { ethers } from "ethers";
import PropTypes from 'prop-types';
import { useState } from "react";
import Select from 'react-select'
import '../css/buy.css'

const Buy = ({state}) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const customStyles = {
        option: provided => ({
          ...provided,
          color: 'black'
        })
      }
    const options = [
        { value: '2', label: 'Trà sữa socola - 2 ETH' },
        { value: '1', label: 'Cà phê - 1 ETH' },
        { value: '2', label: 'Trà sữa thái xanh - 2 ETH' },
        { value: '1', label: 'Trà đào - 1 ETH' },
        { value: '2', label: 'Sinh tố kiwi  - 2 ETH' },
        { value: '2', label: 'Sinh tố bưởi - 2 ETH' },
        { value: '5', label: 'Cacao nóng đặc biệt - 5 ETH' },
      ]
    const buyCoffee = async(event) => {
        event.preventDefault();

        const {contract}= await state;
        const name = document.querySelector("#name").value;
        const typename = selectedOption.label;
        const location = document.querySelector("#location").value;
        const message = document.querySelector("#message").value;
        const cost = selectedOption.value;
        const payAmount = {value:ethers.parseEther(cost)}
        try {
            const transaction = await contract.buyCoffee(name,typename,location,message,payAmount);
            await transaction.wait();
            alert("Transaction successful");
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }
    return <>
    <form onSubmit={buyCoffee} className="buy-form">
      
      <Select
        placeholder="Chọn đồ uống"
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        styles={customStyles}
        id="typename"
        className="select-field"
        required
      />
      <input id="name" className="input-field" placeholder="Name" required/>
      <input id="location" className="input-field" placeholder="Location" required/>
      <input id="message" className="input-field" placeholder="Message" required/>
      <button className="buy-button">Buy</button>
    </form>
  </>  
}
Buy.propTypes = {
    state: PropTypes.shape({
        contract: PropTypes.object.isRequired,
    }).isRequired,
}
export default Buy;