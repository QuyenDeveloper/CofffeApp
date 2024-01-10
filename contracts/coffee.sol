// SPDX-License-Identifier: MIT 
pragma solidity 0.8.13;
contract coffee {
    struct Memo {

        string name;
        string typename;
        string location;
        string message;
        uint256 timestamp;
        address from;
    }
    //dai dien cho ghi chu

    Memo[] public memos;
    //mang luu tru ghi chu 
    address payable owner;
    //luu tru dia chi nguoi so huu hop dong
    //address payable cho phep nhan eth

    constructor() {
        owner = payable(msg.sender); //gan dia chi nguoi gui thong qua msg.sender
    }

    function buyCoffee(
        string calldata name,
        string calldata typename,
        string calldata location,
        string calldata message
        //Hàm này nhận các tham số name, typename, location và message để tạo một ghi chú mới
    ) external payable {
        require(msg.value > 0, "Please enter right amount");
        owner.transfer(msg.value);
        memos.push(
            //ghi chú mới được thêm vào mảng memos.
            Memo(name, typename, location, message, block.timestamp, msg.sender)
        );
    }

    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }
}
