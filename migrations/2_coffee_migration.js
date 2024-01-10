const Coffee = artifacts.require("./coffee.sol");
//khai báo hợp đồng thông minh "Coffee" và liên kết nó với tệp Solidity "coffee.sol" trong thư mục hiện tại. 
//Điều này cho phép Truffle biết rằng chúng ta muốn triển khai hợp đồng Coffee.

module.exports = function (deployer) {
  deployer.deploy(Coffee);
};
//Đoạn mã này sẽ triển khai hợp đồng Coffee khi chạy lệnh triển khai (deploy) thông qua Truffle.