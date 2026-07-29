class LoginPageComponents{

     get emailInput() { 
        return $('#email'); 
    }
    
    get passwordInput() { 
        return $('#password'); 
    }

    get loginButton() { 
        return $('input[data-test="login-submit"]'); 
    }

    get errorMessage() {
        return $('.help-block');
    }
}

module.exports = new LoginPageComponents();