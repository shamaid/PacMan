
 var user = {
    'firstname': '',
    'lastname': '',
    'username': '',
    'password': '',
    'email': '',
    'date': ''
  }

/**
 * only for Registration page
 */
$(document).ready(function(e){
    $('#signupForm').submit(function(){
        if ($(this).valid() !== true) {
        }else{

        
        /**
         * what the sumbit button will do
         */
       

        user['firstname'] =  $("#firstname").val();
        user['lastname'] =  $("#lastname").val();
        user['username'] =  $("#username").val();
        user['password'] =  $("#password").val();
        user['email'] =  $("#email").val();
        user['birth'] =  $("#birth").val();



        // user.firstname =  $("#firstname").val();
        // user.lastname =  $("#lastname").val();
        // user.username =  $("#username").val();
        // user.password =  $("#password").val();
        // user.email =  $("#email").val();
        // user.birth =  $("#birth").val();

        users.push(user);
        localStorage.setItem('users',JSON.stringify(users))


        $('#mainWindow').children().hide()
        $('#logo').show()
        $('#nav').show()
        $('#login').show()
        $('#footer').show()
    

        //let username = $('#signupForm').find('input[name="username"]').val();
        //let password = $('#signupForm').find('input[name="password"]').val();
        //localStorage.setItem(username, password);
        //go to home page!
    }
        return false;
    

});
});

/*check valid name*/
$.validator.addMethod("checkValidName", function (value, element) {
    return /^[^0-9]+$/.test(value);
    }),
    
/*check valid password*/
$.validator.addMethod("checkValidPassword", function (value, element) {
    return /^(?=.*[a-zA-Z\d].*)[a-zA-Z\d\*]{6,}$/.test(value);
    });
    
/*check valid date*/
$.validator.addMethod("checkValidDate", function (value, element) {
    return Date.now() - new Date(value).getTime() > 0;
    });

    /*check valid name*/
$.validator.addMethod("checkNameExists", function (value, element) {
    console.log(value);
    

    for (var i = 0; i < users.length; i++) {
        if (users[i].username == value) {
            console.log(users[i].username);
            return false;
        }
    }
    return true;
     
    }),



    // validate signup form on keyup and submit
    $('#signupForm').validate({
        errorElement: 'div',
        rules: {
            firstname:{
                required: true,
                checkValidName: true
            },
            lastname:{
                required: true,
                checkValidName: true
            },
            username: {
                required: true,
                checkNameExists: true,
                minlength: 2
            },
            password: {
                required: true,
                checkValidPassword: true,
                minlength: 6
            },
            email: {
                required: true,
                email: true
            },
            date: {
                required: true,
                checkValidDate: true
            }
        },
        messages: {
           firstname: {
               required: "Please enter your first name name",
               checkValidName: "The name can only contain letters"
            },
            lastname: {
                required: "Please enter your last name name",
                checkValidName: "The name can only contain letters"
             },
            username: {
                required: "Please enter a username",
                checkNameExists: "This username already exists",
                minlength: "Your username must consist of at least 2 characters"
            },
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 6 characters long",
                checkValidPassword: "The password must contain only numbers and letters"
            },
            email:{
                required: "Please enter an email address"
            },
            date: {
                required: "Pleasr enter a birthday",
                checkValidDate: "This date is in the future, please enter a valid date"
            },
        }
    });

