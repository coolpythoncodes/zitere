// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Radenu is ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;
    using SafeERC20 for IERC20;
    
    Counters.Counter private orderId;
    IERC20 public transferToken;

    enum OrderState {INITIATED, ACCEPTED, COMPLETED, FUFILLED, CANCELLED, INDISPUTE}
    
    uint256 private _totalSupply;
    mapping(address => uint256) private _balances;

    /* ========== CONSTRUCTOR ========== */
    /**
     * @dev The constructor sets the stable coin implementation and the default roles.
     *
     * @param _transferToken The stable coin implementation address.
     **/
    constructor(address _transferToken) {
        transferToken = IERC20(_transferToken);
    }

    struct Order{
        uint256 amount;
        uint256 accountNumber;
        string accountName;
        string bankName;
        string country;
        uint128 exchangeRate;
        address payable sender;
        address payable receiver;
        uint256 orderId;
        uint128 duration;
        uint256 timeInitiated;
        OrderState state;
    }

    Order[] public order;
    mapping (address => Order) public acceptedOrder;
   
     /**
     * @dev Helper fucntion to create an order with minimum details.
     *
     * @param _amount The amount to send.
     * @param _accountNumber The recipient local bank account number.
     * @param _accountName The account name of the recipient  to send.
     * @param _bankName The bank name of the recipient.
     * @param _country The local country of the recipient.
     * @param _exchangeRate The converting exchange rate.
     **/
    function _initOrder(
        uint256 _amount, 
        uint256 _accountNumber, 
        string memory _accountName, 
        string memory _bankName,
        string memory _country,
        uint128 _exchangeRate) internal 
        
        {
            uint256 value = _amount - mintFee(_amount);
            order.push(
                Order({
                    amount: value,
                    accountNumber: _accountNumber,
                    accountName: _accountName,
                    bankName: _bankName,
                    country: _country,
                    exchangeRate: _exchangeRate,
                    sender: payable(msg.sender),
                    receiver: payable(address(0)),
                    orderId: nextOrderId(),
                    duration: 0,
                    timeInitiated: block.timestamp,
                    state: OrderState.INITIATED
                })
            );
    }

    /**
     * @notice Creates an order with the details of the amount to to be fufilled.
     *
     * @param _amount The amount to send.
     * @param _accountNumber The recipient local bank account number.
     * @param _accountName The account name of the recipient  to send.
     * @param _bankName The bank name of the recipient.
     * @param _country The local country of the recipient.
     * @param _exchangeRate The converting exchange rate.
     **/
    function createOrder (
        uint256 _amount, 
        uint256 _accountNumber, 
        string memory _accountName, 
        string memory _bankName,
        string memory _country,
        uint128 _exchangeRate
        ) 
        external nonReentrant
    {
        _initOrder(_amount, _accountNumber, _accountName, _bankName, _country, _exchangeRate);
        require(_amount >= 10, "Cannot send less than 10");
        require(transferToken.balanceOf(msg.sender) >= _amount, "RADENU: Insufficient amount");
        _totalSupply += _amount;
        transferToken.safeTransferFrom(msg.sender, address(this), _amount);
        emit OrderInitiated(msg.sender, _amount, block.timestamp);
    }

     /**
     * @notice Accepts an order.
     *
     * @param _orderId The id of the order being accepted.
     **/
    function acceptOrder(uint256 _orderId) external nonReentrant {
        require(acceptedOrder[msg.sender].receiver == address(0), "FORBIDEN: Pending order");
        Order memory _acceptedOrder = findAndProcessOrder(_orderId);
        acceptedOrder[msg.sender] = _acceptedOrder;
        emit OrderAccepted(_acceptedOrder.sender, msg.sender, _acceptedOrder.amount, block.timestamp);
    }

    /**
     * @notice Marks an order as completed when called.
     *
     * @param _orderId The id of the orderId to be marked as completed.
     **/
    function completeOrder(uint256 _orderId) external nonReentrant {
        Order[] memory _openOrder = order;
        for (uint256 i = 0; i < _openOrder.length; i++){
                if(_openOrder[i].orderId == _orderId) {
                    require(_openOrder[i].receiver == address(msg.sender), "RADENU:FORBIDDEN");
                    order[i].state = OrderState.COMPLETED;
                     emit OrderCompleted(
                         _openOrder[i].sender, 
                         msg.sender, 
                         _openOrder[i].amount, 
                         block.timestamp
                         );
                }
                 acceptedOrder[msg.sender].state = OrderState.COMPLETED;
        }
    }

    /**
     * @notice Relesase payment to the party who pays the local currecny 
     *
     * @param _orderId The id of the orderId of the completed order.
     **/
    function releasePayment(uint256 _orderId) external nonReentrant {
        Order[] memory _openOrder = order;
        for (uint256 i = 0; i < _openOrder.length; i++){
                if(_openOrder[i].orderId == _orderId) {
                    require(
                        _openOrder[i].sender == msg.sender &&
                        _openOrder[i].state == OrderState.COMPLETED,
                        "RADENU: FORBIDDEN"
                        );
                    uint256 amount = order[i].amount;
                    order[i].state = OrderState.FUFILLED;
                    delete acceptedOrder[_openOrder[i].receiver];
                    _totalSupply -= amount;
                    transferToken.transfer(_openOrder[i].receiver, amount);
                    emit OrderFufilled(
                         _openOrder[i].sender, 
                         _openOrder[i].receiver, 
                         _openOrder[i].amount, 
                         block.timestamp
                         );
                }       
        }

    }

     /**
     * @notice Cancels an order when is has not been accepted to be proccessed 
     *
     * @param _orderId The id of the order to be cancelled.
     **/
    function cancelOrder(uint256 _orderId) external nonReentrant {
        Order[] memory _openOrder = order;
        for (uint256 i = 0; i < _openOrder.length; i++){
                if(_openOrder[i].orderId == _orderId) {
                    require(
                        _openOrder[i].sender == msg.sender &&
                        _openOrder[i].state == OrderState.INITIATED,
                        "RADENU: FORBIDDEN"
                    );
                    order[i].state = OrderState.CANCELLED;
                    uint256 amount = _openOrder[i].amount;
                    uint256 total = amount + mintFee(amount);
                    transferToken.transfer(msg.sender, total);
                    emit OrderCancelled(
                         msg.sender, 
                         amount, 
                         block.timestamp
                         );
                }       
        }

    }

    /**
     * @notice Used to raise dispute to be mediated by an admin
     *
     * @param _orderId The id of the order in dispute.
     **/
    function openDispute(uint256 _orderId) external nonReentrant {
        Order[] memory _openOrder = order;
        for (uint256 i=0; i < _openOrder.length; i++){
                if(_openOrder[i].orderId == _orderId) {
                    require(
                        order[i].receiver == msg.sender || 
                        order[i].sender == msg.sender, 
                        "RADENU: FORBIDDEN"
                        );
                    order[i].state = OrderState.INDISPUTE;
                    emit OrderDisputed(
                         _openOrder[i].sender, 
                         _openOrder[i].receiver, 
                         _openOrder[i].amount, 
                         block.timestamp
                         );
                }
        }
    }

     /**
     * @notice Used for dispute resolution to credit users after a resolution has been reached 
     *
     * @param user The address of the user to be credited.
     * @param _orderId The id of the order in dispute.
     **/
    function creditUser(address user, uint256 _orderId) external nonReentrant onlyOwner{
        Order[] memory _openOrder = order;
        for (uint256 i=0; i < _openOrder.length; i++){
                if(_openOrder[i].orderId == _orderId) {
                    uint256 amount = order[i].amount;
                    _totalSupply -= amount;
                    transferToken.transfer(user, amount);
                    emit OrderDisputed(
                         _openOrder[i].sender, 
                         _openOrder[i].receiver, 
                         _openOrder[i].amount, 
                         block.timestamp
                         );
                }
        }
    }

    /**
    * @notice Returns the total order in the smart country
    * @return Order[] The identifier of the pool
    **/
    function getTotalOrder() external view returns (Order[] memory){
        return order; 
    }

    /**
    * @notice Calculates the protocol fee for each transaction 
    * @param amount The fee is calaculated from the amount
    **/
    function mintFee(uint256 amount) internal pure returns (uint256){
        return (uint256(1) / uint256(500)) *  amount;
    }

    // ============ SUPPORTING FUNCTIONS ============

    function nextOrderId() private returns (uint256) {
        orderId.increment();
        return orderId.current(); 
    }

    function orderTotal() external view returns (uint256) {
        return orderId.current();
    }

    function findAndProcessOrder(uint256 id) internal returns (Order memory){
        Order[] memory _openOrder = order;
        for (uint256 i=0; i < _openOrder.length; i++){
                if(_openOrder[i].orderId == id) {
                    require(
                        order[i].receiver == address(0), 
                        "FORBIDDEN: Order Accepted by Someone Else"
                        );
                    order[i].receiver = payable(msg.sender);
                    order[i].state = OrderState.ACCEPTED;
                    order[i].duration = uint128 (block.timestamp);
                    return _openOrder[i];
                }
        }
        revert('Not found');
    }

    // ============ OWNER-ONLY ADMIN FUNCTIONS ============

    function withdraw() public onlyOwner  {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    function withdrawTokens(IERC20 token) 
    public onlyOwner
    {
        uint256 balance = token.balanceOf(address(this));
        token.transfer(msg.sender, balance);
    }
    
    //EVENTS
    event OrderInitiated(address indexed sender, uint256 amount, uint256 when);
    event OrderAccepted(address indexed sender, address indexed reciever, uint256 amount, uint256 when);
    event OrderCompleted(address indexed sender, address indexed reciever, uint256 amount, uint256 when);
    event OrderFufilled(address indexed sender, address indexed reciever, uint256 amount, uint256 when);
    event OrderCancelled(address indexed sender, uint256 amount, uint256 when);
    event OrderDisputed(address indexed sender, address indexed reciever, uint256 amount, uint256 when);
    event UserCredited(address indexed sender, uint256 amount, uint256 when);
   
}