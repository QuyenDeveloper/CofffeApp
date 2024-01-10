// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

contract Migrations {
  address public owner = msg.sender;
  uint public last_completed_migration;//last_completed_migration để lưu trữ phiên bản hoàn thành cuối cùng.

  modifier restricted() {
    require(
      msg.sender == owner,
      "This function is restricted to the contract's owner"
    );
    //Modifier "restricted" được định nghĩa. Modifier này áp dụng cho một hàm và yêu cầu rằng chỉ có chủ sở hữu hợp đồng mới có thể gọi hàm. 
    //Nếu không, một ngoại lệ sẽ được ném với thông báo "This function is restricted to the contract's owner"
    _;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
    }
}
