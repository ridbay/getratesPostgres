const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();
const User = require("../src/models/user");

const sampleUser = {
  name: "Ridwan balogun",
  email: "balogunridwan@gmail.com",
  password: "123456",
};

chai.use(chaiHttp);

describe("Sign Up API", function () {
  it("Should success if credential is valid", function (done) {
    // use chai-http to make a request to the server
    chai
      .request(server)
      // send a POST request to signin route
      .post("/api/v1/signup")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      //send sample user
      .send(sampleUser)
      //wait for response
      //check that the response status is = 200(success)
      .expect(200)
      //check that the content type is json
      .expect("Content-Type", /json/)
      .expect(function (response) {
        //check that the body of the response is not empty
        expect(response.body).not.to.be.empty;
        //check that the body of the response is an object
        expect(response.body).to.be.an("object");
      })
      .end(done);
  });
});
describe("Login API", function () {
  it("Should success if credential is valid", function (done) {
    // use chai-http to make a request to the server
    chai
      .request(server)
      // send a POST request to signin route
      .post("/api/v1/signin")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      //send sample user
      .send(sampleUser)
      //wait for response
      //check that the response status is = 200(success)
      .expect(200)
      //check that the content type is json
      .expect("Content-Type", /json/)
      .expect(function (response) {
        //check that the body of the response is not empty
        expect(response.body).not.to.be.empty;
        //check that the body of the response is an object
        expect(response.body).to.be.an("object");
      })
      .end(done);
  });
});

//Dump truck to delete all sample users created after each test above
after(() => {
  User.deleteMany({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
});
