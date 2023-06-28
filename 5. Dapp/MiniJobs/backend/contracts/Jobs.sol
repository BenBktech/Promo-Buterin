// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

///@title A Mini Job Smart contract
///@author Ben BK
contract Jobs {

    struct Job {
        address author;
        address worker;
        string description;
        uint price;
        bool isFinished;
    }

    Job[] jobs;

    event jobAdded(address indexed author, string description, uint price, uint id, bool isFinished);
    event jobTaken(address indexed worker, uint id);
    event jobIsFinishedAndPaid(address indexed author, address indexed worker, uint id, uint pricePaid);

    ///@notice Allows to add a new job 
    ///@param _description the complete description of the job
    function addJob(
        string calldata _description
    ) external payable {
        Job memory thisJob = Job(msg.sender, address(0), _description, msg.value, false);
        jobs.push(thisJob);
        emit jobAdded(msg.sender, _description, msg.value, jobs.length - 1, false);
    }

    ///@notice Allows to take the job
    ///@param _id the index of the job in the jobs array
    function takeJob(uint _id) external {
        require(msg.sender != jobs[_id].author, "The author cannot take the job");
        require(jobs[_id].worker == address(0), "Job already taken");
        jobs[_id].worker = msg.sender;
        emit jobTaken(msg.sender, _id);
    }

    ///@notice Allows to end the job and to pay the worker
    ///@param _id the id of the job in the jobs array
    function setIsFinishedAndPay(uint _id) external {
        require(jobs[_id].worker != address(0), "Job not taken yet");
        require(msg.sender == jobs[_id].author, "You are not the author of this job");
        require(!jobs[_id].isFinished, "This job is already finished and paid");
        (bool received, ) = jobs[_id].worker.call{value: jobs[_id].price}('');
        if(received) {
            jobs[_id].isFinished = true;
        }
        else {
            revert("The worker has not been paid, reverting the transaction...");
        }
        emit jobIsFinishedAndPaid(jobs[_id].author, jobs[_id].worker, _id, jobs[_id].price);
    }
}