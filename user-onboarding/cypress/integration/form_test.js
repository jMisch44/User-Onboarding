describe("User Onboarding App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  const userNameInput = () => cy.get("input[name=userName]");
  const emailInput = () => cy.get("input[name=email]");
  const passwordInput = () => cy.get("input[name=password]");
  const TOSCheckbox = () => cy.get("input[name=Terms]");
  const submitBtn = () => cy.get("button[id='submit-button']");

  it("Sanity check to make sure tests work", () => {
    expect(1 + 1).to.equal(2);
    expect(2 + 2).not.to.equal(5);
    expect({}).not.to.equal({});
    expect({}).to.eql({});
  });

  it("Check if elements are rendering to the page", () => {
    userNameInput().should("exist");
    emailInput().should("exist");
    passwordInput().should("exist");
    TOSCheckbox().should("exist");
    submitBtn().should("exist");

    cy.contains("Submit").should("exist");
  });

  describe("Filling out the inputs, clicking checkbox, and checking button", () => {
    it("Can navigate to the site", () => {
      cy.url().should("include", "localhost");
    });

    it("Submit button should start out disabled", () => {
      submitBtn().should("be.disabled");
    });

    it("Can type in inputs", () => {
      userNameInput()
        .should("have.value", "")
        .type("Qwerty")
        .should("have.value", "Qwerty");

      emailInput()
        .should("have.value", "")
        .type("email@email.com")
        .should("have.value", "email@email.com");

      passwordInput()
        .should("have.value", "")
        .type("password")
        .should("have.value", "password");

      TOSCheckbox().should("not.be.checked").check().should("be.checked");
    });

    it("The submit button enables when all required fields are fill out", () => {
      userNameInput().type("Qwerty");
      emailInput().type("email@email.com");
      passwordInput().type("password");
      TOSCheckbox().check();
      submitBtn().should("not.be.disabled");
    });
  });
  describe("Checking all input fields validations", () => {
    it("Checking if validation for username input is working", () => {
      userNameInput().type("Qw");
      cy.contains("user name must be 3 characters long");
    });

    it("Checking if validation for email input is working", () => {
      emailInput().type("MayB");
      cy.contains("must be a valid email address");
    });

    it("Checking if validation for password input is working", () => {
      passwordInput().type("Hi");
      cy.contains("password must be at least 6 characters long");
    });

    it("Checking if validation for the Terms of Service checkbox is working", () => {
      TOSCheckbox().check().uncheck();
      cy.contains("this must be one of the following values: true");
    });
  });

  describe("Adding a new User", () => {
    it("Can submit a new member", () => {
      userNameInput().type("Qwerty");
      emailInput().type("email@email.com");
      passwordInput().type("password");
      TOSCheckbox().check();
      submitBtn().click();
      cy.contains("Qwerty");
    });
    it("Clears the input fields after clicking submit", () => {
      userNameInput().type("Qwerty");
      emailInput().type("email@email.com");
      passwordInput().type("password");
      TOSCheckbox().check();
      submitBtn().click();
      cy.contains("Qwerty");
      userNameInput().should("have.value", "");
      emailInput().should("have.value", "");
      passwordInput().should("have.value", "");
    });
  });
});
