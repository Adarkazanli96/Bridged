// We will be using Solidity version 0.5.4
pragma solidity 0.5.4;

// Importing SafeMath Implementation
//import { SafeMath } from "../libraries/SafeMath.sol";
import '../libraries/SafeMath.sol';

contract Campaign {
    using SafeMath for uint256;

    // a campaign is always in one of these 3 states
    enum State {
        // user-defined type
        Fundraising,
        Expired,
        Successful
    }

    // State variables
    address payable public creator;
    uint256 public amountGoal; // required to reach at least this much, else everyone gets refund
    uint256 public currentBalance;
    uint256 public accumulatedTotal;
    uint256 public raiseBy;
    string public title;
    string public description;
    string public photoHash;
    State public state = State.Fundraising; // initialize on create
    mapping(address => uint256) public contributions;
    uint public contributers;

    // Event that will be emitted whenever funding will be received
    event FundingReceived(
        address contributor,
        uint256 amount,
        uint256 totalFunded,
        State currentState
    );
    // Event that will be emitted whenever the campaign starter has received the funds
    event CreatorPaid(address recipient);

    // Modifier to check current state
    modifier inState(State _state) {
        require(state == _state);
        _;
    }

    constructor(
        address payable campaignStarter,
        string memory campaignTitle,
        string memory campaignDesc,
        uint256 fundRaisingDeadline,
        uint256 goalAmount,
        string memory _photoHash
    ) public {
        creator = campaignStarter;
        title = campaignTitle;
        description = campaignDesc;
        amountGoal = goalAmount;
        raiseBy = fundRaisingDeadline;
        currentBalance = 0;
        accumulatedTotal = 0;
        contributers = 0;
        photoHash = _photoHash;
    }

    /** @dev Function to fund a certain campaign.
      */
    function contribute() external payable inState(State.Fundraising) {
        require(msg.sender != creator);
        if(contributions[msg.sender] == 0) contributers++;
        contributions[msg.sender] = contributions[msg.sender].add(msg.value);
        currentBalance = currentBalance.add(msg.value);
        accumulatedTotal = currentBalance;
        if (now > raiseBy && currentBalance >= amountGoal) {
            state = State.Successful;
            payOut();
        } else if (now > raiseBy) {
            state = State.Expired;
        }
        emit FundingReceived(msg.sender, msg.value, accumulatedTotal, state);
    }

    /** @dev Function to give the received funds to campaign starter.
      */
    function payOut() internal inState(State.Successful) returns (bool) {
        uint256 totalRaised = currentBalance;
        currentBalance = 0;

        if (creator.send(totalRaised)) {
            emit CreatorPaid(creator);
            return true;
        } else {
            currentBalance = totalRaised;
            state = State.Successful;
        }

        return false;
    }

    /** @dev Function to retrieve donated amount when a campaign expires.
      */
    function getRefund() public inState(State.Expired) returns (bool) {
        require(contributions[msg.sender] > 0);

        uint256 amountToRefund = contributions[msg.sender];
        contributions[msg.sender] = 0;

        if (!msg.sender.send(amountToRefund)) {
            contributions[msg.sender] = amountToRefund;
            return false;
        } else {
            currentBalance = currentBalance.sub(amountToRefund);
        }

        return true;
    }

    /** @dev Function to get specific information about the campaign.
      * @return Returns all the campaign's details
      */
    function getDetails()
        public
        view
        returns (
            address payable campaignStarter,
            string memory campaignTitle,
            string memory campaignDesc,
            uint256 deadline,
            State currentState,
            uint256 currentAmount,
            uint256 totalFunded,
            uint256 goalAmount,
            string memory _photoHash,
            uint256 backers
        )
    {
        campaignStarter = creator;
        campaignTitle = title;
        campaignDesc = description;
        deadline = raiseBy;
        currentState = state;
        currentAmount = currentBalance;
        totalFunded = accumulatedTotal;
        goalAmount = amountGoal;
        _photoHash = photoHash;
        backers = contributers;
    }
}
