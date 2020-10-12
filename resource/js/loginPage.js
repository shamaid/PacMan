var username;

$("#loginForm").validate({

    rules: {
        username_login: {
        required: true
      },
      password_login: {
        required: true,
      }
    },
  
    messages: {
        username_login: {
        required: "Please eneter your username"
      },
      password_login: {
        required: "Please eneter your password",
      }
    },
  
  });

    
      $(document).ready(function(e){
        $('#loginForm').submit(function(){
          
         username = $('#username_login').val(); 
         password = $('#password_login').val(); 
         const userFound = users.find(user => user.username===username);
         
         if(userFound)
         {
              if(userFound.password===password)
                    {
                      console.log(username);
                      $('#username_login').val("");
                      $('#password_login').val(""); 
                      $('#mainWindow').children().hide();
                      $('#logo').show();
                       $('#nav').show();
                       $('#settings').show();
                       $('#footer').show()
                       
                       return false;
                    }   
              else{
                alert("Wrong Password");
              }
         }   
         else{
                  alert("The user dosn't exists")
         }
          
          return false;
      });
      });
      //   var storage_user = users.find(user => user.username === username);

      //     console.log(username);
      //     console.log(password);
      //     console.log(storage_user);

      //     if(storage_user === null){
      //       alert("Wrong Username");
      //       return false;
      //     }else{
      //       if(storage_user.password === password ){
    
      //         alert("good");

      //          $('#mainWindow').children().hide()
      //          $('#logo').show()
      //          $('#nav').show()
      //          $('#settings').show()
      //          $('#footer').show()  
      //       }else{
      //         alert("Wrong Password");
      //         return false;
      //       }
      //     }

      //   });
      // });
       
     // let username = $('#loginForm').find('input[name="username_login"]').val();
     // let password = $('#loginForm').find('input[name="password_login"]').val();
     // let storage_password = localStorage.getItem(username);

      

     

     
    
  
 
      // console.log(username);
      // console.log(password);
      // console.log(storage_password);

      

       
        //go to settings

        


        // $("#header").show();
        // $("#header-left").show();
        // $("#header-center").show();
        // $("#header-right").show();
        // $("#sidenav").show();
        // $("#settings_page").show();
        // $("#random_settings").show();
        // $("#save_settings").show();
  
  
      
      // else if (password === storage_password) {
      //   //go to settings

      //   $("#gameUser")[0].value = username;
      //   gameUser = $("#gameUser")[0].value;

      //   $('#mainWindow').children().hide()
      //   $('#logo').show()
      //   $('#nav').show()
      //   $('#settings').show()
      //   $('#footer').show()  
        
        // $("div").hide();
  
        // $("#header").show();
        // $("#header-left").show();
        // $("#header-center").show();
        // $("#header-right").show();
        // $("#sidenav").show();
        // $("#settings_page").show();
        // $("#random_settings").show();
        // $("#save_settings").show();
      //}
     // else if(storage_password === null){
      //  alert("Wrong Username");
      //  return false;
     // }
     // else {
        //alert("Wrong Password or Username");
      //  alert("Wrong Password");
      //  return false;
     // }
  
  