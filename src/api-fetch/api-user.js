//For all of these functions, we will just pass in the object literal which we'll send to the server
//let USERNAME_COOKIE; //Having troubles, for some reason this variable isnt updating

//Basically, you're currently writing your error statuses incorrectly. Anything that causes a not-success should go into error immediatley.
//For now, give a success boolean in the request body and we'll use that.

function create_user(param, on_success) {

    return generic_fetch("/register","POST", param, on_success);
}

function login(param, on_success) { //Stores username in a cookie/global variable

    return generic_fetch("/auth","POST", param, on_success);

}


function logout(param, on_success) { 
    return generic_fetch("/user/"+get_username()+"/logout","GET", param, on_success);

}

//Events fetch

function add_event(param, on_success) {
    return generic_fetch("/user/"+get_username()+"/events","POST", param, on_success);
}

function unresolved_events(param, on_success) {
    return generic_fetch("/user/"+get_username()+"/events","GET", param, on_success);
}

function update_event(param, on_success) {
    return generic_fetch("/user/"+get_username()+"/events","PUT", param, on_success);
}

function delete_event(param, on_success) {
    return generic_fetch("/user/"+get_username()+"/events","DELETE", param, on_success);
}


//Courses fetch

function add_course(param, on_success) {
    return generic_fetch("/user/"+get_username()+"/courses","POST", param, on_success);
}

function current_courses(param, on_success) {
    return generic_fetch("/user/"+get_username()+"/courses","GET", param, on_success);
}

function update_course(param, on_success) {
    return generic_fetch("/user/"+get_username()+"/courses","PUT", param, on_success);
}

function delete_course(param, on_success) {
    return generic_fetch("/user/"+get_username()+"/courses","DELETE", param, on_success);
}

//User-info fetch

function user_info(param, on_success) {
    console.log(get_username());
    return generic_fetch("/user/"+get_username(),"GET", param, on_success);
}

function update_userinfo(param, on_success) {
    return generic_fetch("/user/"+get_username(),"PUT", param, on_success);
}

function delete_user(param, on_success) {
    return generic_fetch("/user/"+get_username(),"DELETE", param, on_success);
}


//Adding a university

function define_university(param, on_success){
    return generic_fetch("/university","POST", param, on_success);
}

//University courselist

function university_courselist(param, on_success) {
    //NOTE: param will be the university name
    return generic_fetch("/university/"+param+"/courselist","GET", param, on_success);
}

//Really no need to have access to this from the frontend
// function add_to_university_courselist(param, on_success) {
//     //NOTE: param will be the university name
//     return generic_fetch("/university/"+param+"/courselist","GET", param, on_success);
// }

//Generic fetch gets a promise from server_fetch() and the .then .catch chaining acts as blocking which resolves the promise
function generic_fetch(endpoint, method, data, f) {
    server_fetch(endpoint, method, data)
    .then(res=>res.json())
    .then((response)=>{
        if (response.success){
            console.log("Fetch success");
            f(response); //Running the on_success function which gets passed in
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

    if (cookieValue !== undefined){
        return cookieValue.split('=')[1];
    }
    else {
        return null;
    }

}

function clear_username() {
    //Clears username cookie
    document.cookie = "username=;";

}

export {
    create_user, login, logout, 
    add_event, delete_event, update_event, unresolved_events,
    add_course, delete_course, update_course, current_courses,
    user_info, update_userinfo, delete_user,
    define_university, university_courselist,
    get_username, clear_username
}