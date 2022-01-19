# Allan Gray Software Testing Assessment Answers

## Assignmnet 1 - Test Design and Reasoning

### 1 - What questions would you ask to aid in your testing better?
- Can a name or contact be updated with an empty value?
- Can a user edit a contact to with existing contact?
- Are there audit log requirements for updating details?

### 2 - In your opinion, what are the three most important things that need to be tested and why?
- Can a user edit their details without login? This is for security reasons and making sure that a user can only edit their details.
- Can the user successfully edit their name and contact. This is the main requirement of the feature. 
- Is a message/email informing the user of updated details sent to their contact address? This is to confirm and inform the user that their details have be changed.

### 3 - Which layer would you focus your testing efforts on and why?
- I would focus on the client/interface layer because it covers most levels of the system without duplicating effor.
- It covers itntegration between the microservices.
- It also covers frontend and Backend validation.

### 4 - What dependencies on other micro services could you see that may impact testing?
- Dependency on the `Get member data` microservice. In order to edit a member you need to return the member frist.
- Validation microservice to validate input details.
- Email validation to confirm the new email is valid.

## Assignmnet 2 - SQL Comprehension

### 1 - How many users does this database contain?
    16619434
    
    `SELECT count(*) AS user_count from Users;`

### 2 - How many users were created each calendar year (since the beginning of 2010) in this database?
    199187  - 2010
    358678  - 2011
    678713  - 2012
    1122149 - 2013
    1174418 - 2014
    1251970 - 2015
    1514977 - 2016
    1725978 - 2017
    1643667 - 2018
    1717720 - 2019
    2201488 - 2020
    2793586 - 2021
    137269  - 2022
    
    `SELECT COUNT(*) AS user_count, YEAR(CreationDate) AS calendar_year 
      FROM Users 
      GROUP BY YEAR(CreationDate)
      HAVING YEAR(CreationDate) >= 2010;`

### 3 - How many posts of type "Question" has the user "Mat Mannion" asked since he joined?
    3
    
    `SELECT Count(*)
      FROM Posts
      INNER JOIN PostTypes ON Posts.PostTypeId = PostTypes.Id
      WHERE Posts.OwnerDisplayName = 'Mat Mannion'
      AND PostTypes.Name = 'Question';`

### 4 - What is the name of the most reputable "South Africa" user and how many "Enlightened" badges did they receive in 2016?
    `SELECT TOP 1 DisplayName as name
    , Reputation 
    FROM Users
    INNER JOIN UserId ON Users.Id = Badges.UserId
    WHERE Location = 'South Africa'
    AND Bedges.UserId = name.Id
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
- I assume that there is only one max(Reputation) record returned

## Assignmnet 3 - Code Comprehension

### 1 - What is this test attempting to do?
- This test attempts to get the results of a search entry `Andrew` from the `https://api.com/v1/people` application.
- Store the response as `response`.
- Delete the 3rd [2] result from response and confirm 204 status code returned.
- Get the the 3rd result from the application again and confirm that after deletion the result in not found and a 403 status code is returned.

### 2 - What are the problems with this test?
- There no comments.
- Missing `})` at the end.
- Chai assertion librabry missing.

### 3 - What other improvements can you suggest?
- Make the description of the test case more descriptive of what the test is doing.
- below is an fixed snipet of the test:

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

### 1 - Write an automated test that would be able to verify that the function is working correctly:

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
