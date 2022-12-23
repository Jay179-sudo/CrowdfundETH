// SPDX-License-Identifier: UNLICENSE
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "../node_modules/hardhat/console.sol";

enum State {
    Fundraising,
    Expired,
    Successful
}

struct details {
    string ProjectTitle;
    string description;
    uint256 minimumContribution;
    uint256 targetContribution;
    uint256 deadline;
    uint256 id;
    string state;
    uint256 currentDonations;
    uint256 noContributors;
}

contract Project {
    // variables
    string ProjectTitle;
    string description;
    address payable owner;
    uint256 minimumContribution;
    uint256 targetContribution;
    uint256 deadline;
    uint256 id;
    string state;
    uint256 currentDonations;
    uint256 noContributors;

    constructor(
        // string memory _title,
        // string memory _des,
        // address payable _owner,
        // uint256 _minimumContrib,
        // uint256 _target,
        // uint256 _deadline,
        // uint256 _id,
        // string memory _state,
        // uint256 _noContributors
    ) {
        // ProjectTitle = _title;
        // description = _des;
        // owner = _owner;
        // minimumContribution = _minimumContrib;
        // targetContribution = _target;
        // deadline = _deadline;
        // id = _id;
        // state = _state;
        // currentDonations = 0;
        // noContributors = _noContributors;
    }

    // modifier

    modifier isOwner() {
        require(
            msg.sender == owner,
            "You dont have access to perform this operation !"
        );
        _;
    }

    // getters

    function getDetails() public view returns (details memory) {
        return
            details(
                ProjectTitle,
                description,
                minimumContribution,
                targetContribution,
                deadline,
                id,
                state,
                currentDonations,
                noContributors
            );
    }

    // setter

    

    // functions
    
}
