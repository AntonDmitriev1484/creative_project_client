//For all of these functions, we will just pass in the object literal which we'll send to the server
let USERNAME_COOKIE; //Having troubles, for some reason this variable isnt updating

function create_user(param) {
    return server_fetch("/register", "POST", param)
    .then(res=>res.json())
    .then((response)=>{
        if (response.status === 200){
            console.log("User creation success");
        }
        else{
            console.log(response.message);
        }
        
        console.log(JSON.stringify(response)+" api-user");
        return response;

    })
    .catch((error)=>console.error("Error",error));
}

function login(param) { //Stores username in a cookie/global variable

    return server_fetch("/auth", "POST", param)
    .then(response=>response.json())
    .then((response)=>{
        console.log(response.status); //Apparently response.status is only available at the error block, not in here https://github.com/2muchcoffeecom/ngx-restangular/issues/98
        //Maybe just send a boolean in the body of the request????
        //Thats why its never making it in here and setting and cookie values. Which in turn, is why my user get request isn't working.
        if (response.status === 200){
            console.log("Login success");
            document.cookie = "username= "+param.username+";"; //Document.cookie not working, for now we'll store it as a global variable
            USERNAME_COOKIE = param.username;
            console.log(USERNAME_COOKIE+" from login")
        }
        else{
            console.log(response.message);
        }
        
        console.log(JSON.stringify(response)+" api-user");
        return response;

    })
    .catch((error)=>console.error("Error",error));
}



function logout(param) { 
    server_fetch("/user/"+get_username()+"/logout", "GET", param)
    .then(res=>res.json())
    .then((response)=>{
        if (response.status === 200){
            console.log("Logout success");
            
            //Note this still needs to scrub the cookie from the browser
        }
        else{
            console.log(response.message);
        }
        
        console.log(JSON.stringify(response)+" api-user");
        return response;

    })
    .catch((error)=>console.error("Error",error));
}

//Events fetch

function add_event(param) {
    return generic_fetch("/user/"+get_username()+"/event","POST", param);
}

function unresolved_events(param) {
    return generic_fetch("/user/"+get_username()+"/event","GET", param);
}

function update_event(param) {
    return generic_fetch("/user/"+get_username()+"/event","PUT", param);
}

function delete_event(param) {
    return generic_fetch("/user/"+get_username()+"/event","DELETE", param);
}


//Courses fetch

function add_course(param) {
    return generic_fetch("/user/"+get_username()+"/course","POST", param);
}

function current_courses(param) {
    return generic_fetch("/user/"+get_username()+"/event","GET", param);
}

function update_course(param) {
    return generic_fetch("/user/"+get_username()+"/event","PUT", param);
}

function delete_course(param) {
    return generic_fetch("/user/"+get_username()+"/event","DELETE", param);
}

//User-info fetch

function user_info(param) {
    console.log("user_info() "+get_username());
    return generic_fetch("/user/"+get_username(),"GET", param);
}

function update_userinfo(param) {
    return generic_fetch("/user/"+get_username(),"PUT", param);
}

function delete_user(param) {
    return generic_fetch("/user/"+get_username(),"DELETE", param);
}


//Adding a university

function define_university(param){
    return generic_fetch("/university","POST", param);
}

//University courselist

function university_courselist(param) {
    //NOTE: param will be the university name
    return generic_fetch("/university/"+param+"/courselist","GET", param);
}

//Really no need to have access to this from the frontend
// function add_to_university_courselist(param) {
//     //NOTE: param will be the university name
//     return generic_fetch("/university/"+param+"/courselist","GET", param);
// }

//Generic fetch gets a promise from server_fetch() and the .then .catch chaining acts as blocking which resolves the promise
async function generic_fetch(endpoint, method, data) {
    server_fetch(endpoint, method, data)
    .then(res=>res.json())
    .then((response)=>{
        if (response.status === 200){
            console.log("Logout success");
        }
        else{
            console.log(response.message);
        }
        console.log(JSON.stringify(response));
        return response;

    })
    .catch((error)=>console.error("Error",error));
}


function server_fetch(endpoint, method, data, headers={"content-type": "application/json"}) {
    let url = "http://ec2-44-203-76-180.compute-1.amazonaws.com:3456"+endpoint;

    let json;
    if (method ==="GET") {
        json = {'headers':headers,
        'method':method
        };
    } else {
        json = {'headers':headers,
        'method':method,
        'body':JSON.stringify(data)
        };
    }


    console.log("Sent json: ");
    console.log(json);
    return  fetch(url, json);
    //Returns the fetch() promise, each method which calls this can determine how they want to resolve this promise
}


function get_username() {
    //Code taken from Mozilla
    //https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
    let cookieValue = document.cookie.split('; ').find(row => row.startsWith('username='));
    //end of code citation

    // if (cookieValue !== undefined){
    //     return cookieValue.split('=')[1];
    // }
    // else {
    //     return null;
    // }

    return USERNAME_COOKIE;
}

export {
    create_user, login, logout, 
    add_event, delete_event, update_event, unresolved_events,
    add_course, delete_course, update_course, current_courses,
    user_info, update_userinfo, delete_user,
    define_university, university_courselist,
    get_username
}