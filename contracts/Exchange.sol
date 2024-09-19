//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Token.sol";

contract Exchange {
    address public feeAccount;
    uint256 public feePercent;
    mapping(address => mapping(address => uint256)) public tokens;
    mapping (uint256 => _Order) public orders;
    uint256 public odersCount;
    mapping(uint256 =>bool)public orderCancelled;
    mapping(uint256 =>bool)public orderFilled;
    
    event Deposit(
        address token,
         address user,
          uint256 amount, 
          uint256 balance
          
    );

    struct _Order {
        //Attributes of an order 
        uint256 id; //unique identifier for order
        address user; //user who made the order
        address tokenGet; // address of the token they recieve
        uint amountGet;  // ammount they reciece
        address tokenGive; //address of token they give
        uint amountGive;  // amount they give
        uint256 timestamp; // when order was created
        

    }
    event Order(
         uint256 id,
        address user, 
        address tokenGet, 
        uint amountGet, 
        address tokenGive, 
        uint amountGive,
        uint256 timestamp
    );
     event Trade(
         uint256 id,
        address user, 
        address tokenGet, 
        uint amountGet, 
        address tokenGive, 
        uint amountGive,
        address creator,
        uint256 timestamp
    );
    event Withdraw( 
        address token, 
        address user,
         uint256 amount, 
         uint256 balance
    );
    event Cancel(
        uint256 id,
        address user,
        address tokenGet,
        uint256 amountGet,
        address tokenGive,
        uint256 amountGive,
        uint256 timestamp
    );

    constructor(address _feeAccount, uint256 _feePercent) {
        feeAccount = _feeAccount;
        feePercent = _feePercent;
    }


    // ------------------------
    // DEPOSIT & WITHDRAW TOKEN

    function depositToken(address _token, uint256 _amount) public {
        // Transfer tokens to exchange
        require(Token(_token).transferFrom(msg.sender, address(this), _amount));

        // Update user balance
        tokens[_token][msg.sender] = tokens[_token][msg.sender] + _amount;

        // Emit an event
        emit Deposit(_token, msg.sender, _amount, tokens[_token][msg.sender]);
    }

    function withdrawToken(address _token, uint256 _amount) public{

      require(tokens[_token][msg.sender]>=_amount);
      // update user balance
        Token(_token).transfer(msg.sender , _amount);
      //transfer tokens to user
      tokens[_token][msg.sender] = tokens[_token][msg.sender]- _amount ;
      //emit event
      emit Withdraw(_token, msg.sender , _amount, tokens[_token][msg.sender]);

    }

    function balanceOf(address _token, address _user)
        public
        view
        returns (uint256)
    {
        return tokens[_token][_user];
    }

    //token  give(the token they want to spend)- which token, and how much

    //token get(the token they want to recieve)- which tokens, and how much?
    function makeOrder(address _tokenGet, uint256 _amountGet, address _tokenGive, uint256 _amountGive) public{
        
        require(balanceOf(_tokenGive, msg.sender)>=_amountGive);
        
        odersCount++;
        orders[odersCount]=_Order(odersCount,msg.sender, _tokenGet, _amountGet,_tokenGive, _amountGive, block.timestamp); 

        emit Order(
            odersCount,
            msg.sender,
             _tokenGet, 
             _amountGet,
             _tokenGive,
             _amountGive, 
            block.timestamp
        );
        }
    function cancelOrder(uint256 _id) public{
        //fetch order
        _Order storage _order= orders[_id];

         //ensure the caller of the function us the owner of the order
        require(address(_order.user)== msg.sender);
        //order must exist
        require(_order.id == _id);
        
        //cancel the order
        orderCancelled[_id]= true;

       

        emit Cancel(
            _order.id,
            msg.sender,
            _order.tokenGet,
            _order.amountGet,
            _order.tokenGive,
            _order.amountGive,
            block.timestamp
        );
    }
    function fillOrder(uint _id) public{

        //fetch order

        _Order storage _order = orders[_id];

        //swapping token (trading)
         _trade(
            _order.id,
            _order.user,
            _order.tokenGet,
            _order.amountGet,
            _order.tokenGive,
            _order.amountGive
        );

        orderFilled[_order.id]=true;
    }

    function _trade(uint _orderId, address _user, address _tokenGet, uint256 _amountGet,address _tokenGive, uint256 _amountGive )internal{
        //do trade here...abi
        //Fee is paid by the user who filled the order(msg.sender)
        //fee is deducted from _amountGet
        uint256 _feeAmount= (_amountGet * feePercent) / 100;
        
        //Execute the trade
        //msg.sender is the user who filled the order. while the _user is who created the order
        tokens[_tokenGet][msg.sender]= tokens[_tokenGet][msg.sender]- (_amountGet + _feeAmount);
        tokens[_tokenGet][_user]=tokens[_tokenGet][_user] + _amountGet;

        //charge fees
        tokens[_tokenGet][feeAccount]= tokens[_tokenGet][feeAccount]+ _feeAmount ;

        tokens[_tokenGive][_user]= tokens[_tokenGive][_user]-_amountGive;
        
        tokens[_tokenGive][msg.sender]= tokens[_tokenGive][msg.sender]+ _amountGive;

        emit Trade(
            
            _orderId,
            msg.sender,
            _tokenGet,
            _amountGet,
            _tokenGive,
            _amountGive,
            _user,
            block.timestamp
        );

    }

}
