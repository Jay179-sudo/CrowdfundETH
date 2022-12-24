// SPDX-License-Identifier: UNLICENSE
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "../node_modules/hardhat/console.sol";

// import "./Projects.sol";

struct Project{
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
    
}


contract Crowdfund {
    // variables
    Project[] public projects;

    // a contributor can have only one active Project

    address public owner;

    constructor() {
        owner = msg.sender;
        
    }

    function returnProjects() public view returns(Project[] memory)
    {
        return projects;
    }

    function setDetail(
        Project memory pr,
        string memory _title,
        string memory _des,
        address payable _owner,
        uint256 _minimumContrib,
        uint256 _target,
        uint256 _deadline,
        uint256 _id,
        string memory _state,
        uint256 _noContributors
    ) public pure{
        pr.ProjectTitle = _title;
        pr.description = _des;
        pr.owner = _owner;
        pr.minimumContribution = _minimumContrib;
        pr.targetContribution = _target;
        pr.deadline = _deadline;
        pr.id = _id;
        pr.state = _state;
        pr.currentDonations = 0;
        pr.noContributors = _noContributors;
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
        Project memory pr;
        setDetail(pr, _title, _des, _owner, _minimumContrib, _target, _deadline, _id, _state, _noContributors);
        projects.push(pr);
    }

    event Contributed();
    event Extract();
    receive() external payable{}
    function contribute(uint256 id, address payable _to) public payable {
        require(msg.value >= projects[id].minimumContribution, "Amount too low!");

        (bool sent, ) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        // check whether the contribution period has expired or not!
        projects[id].currentDonations += msg.value;
        projects[id].noContributors += 1;
        emit Contributed();
        // check whether the task was completed or not!
    }

    function extract(uint256 id) public payable{
        require(projects[id].currentDonations > projects[id].minimumContribution, "Amount not enough ");
        (bool sent, ) = projects[id].owner.call{value: projects[id].currentDonations}("");
        require(sent, "Failed to sent Ether");

        projects[id].targetContribution -= projects[id].currentDonations;
        projects[id].currentDonations = 0;
        emit Extract();
    }
    
}
