// SPDX-License-Identifier: UNLICENSE
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "../node_modules/hardhat/console.sol";

import "./Projects.sol";
contract Crowdfund {
    // variables
    Project[] public projects;

    // a contributor can have only one active Project

    address public owner;

    constructor() {
        owner = msg.sender;
        console.log("Crowdfund contract");
    }

    function returnProjects() public view returns(Project[] memory)
    {
        return projects;
    }

    function addProject(
        string memory _title,
        string memory _des,
        address payable _owner,
        uint256 _minimumContrib,
        uint256 _target,
        uint256 _deadline,
        string memory _state,
        uint256 _noContributors) public {
        
        uint256 _id = projects.length;
        Project pr = Project(_owner);
        pr.setDetail(_title, _des, _owner, _minimumContrib, _target, _deadline, _id, _state, _noContributors);
        projects.push(pr);
    }
}
