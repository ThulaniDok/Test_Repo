# Allan Gray Software Testing Assessment Answers

## Assignmnet 1 - Test Design and Reasoning

### 1 - What questions would you ask to aid in your testing better?
- Should a member confirm editing their details?
- Can a contact or name be empty?
- Can edited contact be of existing contact

### 2 - In your opinion, what are the three most important things that need to be tested and why?
- User can only edit their details on login (security)
- The user can successfully edit their details 
- A message/email informing the user of updated details sent to their contact address

### 3 - Which layer would you focus your testing efforts on and why?
- I would focus on the client/interface layer because it covers most levels of the system without duplicating effor
- Integration between the microservices will be covered
- Frontend and Backend validation will be covered

### 4 - What dependencies on other micro services could you see that may impact testing?
- Dependency on the Get member microservice in order to edit a member you need to return the member
- Email validation
- Validation microservice 

## Assignmnet 2 - SQL Comprehension

### 1 - How many users does this database contain?
    `SELECT count(*) AS user_count from Users;`

### 2 - How many users were created each calendar year (since the beginning of 2010) in this database?
    `SELECT COUNT(*) AS user_count, YEAR(CreationDate) AS calendar_year 
      FROM Users 
      GROUP BY YEAR(CreationDate)
      HAVING YEAR(CreationDate) >= 2010;`

### 3 - How many posts of type "Question" has the user "Mat Mannion" asked since he joined?
    `SELECT Count(*)
      FROM Posts
      INNER JOIN PostTypes ON Posts.PostTypeId = PostTypes.Id
      WHERE Posts.OwnerDisplayName = 'Mat Mannion'
      AND PostTypes.Name = 'Question';`

### 4 - What is the name of the most reputable "South Africa" user and how many "Enlightened" badges did they receive in 2016?
    `SELECT TOP 1 DisplayName
    , Reputation 
    FROM Users
    WHERE Location = 'South Africa'
    ORDER BY Reputation DESC`

### 5 - Provide another query that returns the same result as the question above. Which is the more optimal query and why?

    SELECT u.DisplayName
    , u.Reputation 
    FROM Users u
    WHERE u.Location = 'South Africa'
    AND u.Reputation =
    (
      SELECT Max(u1.Reputation)
      FROM Users u1
      WHERE u1.Location = u.Location  
    )

### 6 - Did you have to make any assumptions in the queries above? If you did, what were they and what was your thinking?
- I assume that there is only one max count  

## Assignmnet 3 - Code Comprehension

### 1 - What is this test attempting to do?
- This test attempts to get the results of a search entry `Andrew` from the `https://api.com/v1/people` application
- Store the resposne
- Delete the 3rd [2] result from the response and confirm 204 status code returned
- Get the the 3rd result from the application again and confirm that after deletion the result in not found and a 403 status code is returned

### 2 - What are the problems with this test?
- There no comments
- Missing `})` at the end
- Chai assertion librabry missing

### 3 - What other improvements can you suggest?
- Make the description of the test case more descriptive of what the test is doing
- 


    'use strict';
    const chai = require("chai");
    const request = require('request');

    const queryParams = {
        searchPhrase: 'Andrew'
    };

    const it = chai.it;
    const expect = chai.expect;
        
    const url = 'https://api.com/v1/people';

    describe('api test', () => {
      it('test case 1', () => {
        const response = request.get(url, queryParams);
        const personId = response.results[2].id;
        const deleteResponse = request.delete(`url/${personId}`);
        expect(deleteResponse.statusCode).to.eql(204);
        const afterDeleteGet = request.get(`url/${personId}`);
        expect(afterDeleteGet.statusCode).to.eql(404);
        }
      );
    })


## Assignmnet 4 - Ability to write an automated test

### 1 - Given the following code – write an automated test that would be able to verify that the function is working correctly (feel free to use any coding language of your choice):


    'use strict';
    const chai = require('chai').assert;
    const validation = require('validation');

    let number1 = "073-637-8650";
    let number2 = "01125121";
    int number3 = 0763118650;

    describe('App', function() {
      it('validation should return Cellphone number is valid', function(){
        let result = validation(number1);
        assert.equal(result, 'Cellphone number is valid');
      });

      it('validation should be a string', function(){
        let result = validation(number1);
        assert.typeOf(result, 'string');
      });
    });
