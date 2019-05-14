var methods = {};
const axios = require("axios");
var helpers = require('handlebars-helpers')();
const Handlebars = require("hbs");
Handlebars.registerHelper(helpers);
var usersArray;
var usersArraySkills;



methods.auxDataSkill = function () {
    let dataSkill = {
        "status": {
            "code": "200",
            "message": "Función dinámica de skills: Dispone de habilidades tecnicas de los usuarios."
        },
        "response": {
            "count": 11,
            "data": [
                {
                        "id":"de752804-41d0-11e9-b210-d663bd873d93",
                        "skills": {
                        ".Net": 25,
                        "HTML": 50,
                        "Docker": 15,
                        "Oracle bbdd": 10
                        }

                },
                {
                    "id":"de751dc8-41d0-11e9-b210-d663bd873d93",
                    "skills": {
                        "NodeJS": 2,
                        "HTML": 4,
                        "Angular": 6,
                        "SQL": 2
                    }

                },
                {
                    "id":"de75203e-41d0-11e9-b210-d663bd873d93",
                    "skills": {
                        "NodeJS": 2,
                        "HTML": 5,
                        "Ionic": 5,
                        "Oracle bbdd": 3
                    }

                },
                {
                    "id":"de7521ba-41d0-11e9-b210-d663bd873d93",
                    "skills": {
                        "C/C++": 8,
                        "JQuery": 9,
                        "Ionic": 3,
                        "Postgres": 6
                    }

                },
                {
                    "id":"de7513aa-41d0-11e9-b210-d663bd873d93",
                    "skills": {
                        "C/C++": 8,
                        "HTML": 6,
                        "Docker": 1,
                        "SQL": 5
                    }

                },
                {
                    "id":"de751756-41d0-11e9-b210-d663bd873d93",
                    "skills": {
                        "java": 6,
                        "JQuery": 6,
                        "Angular": 2,
                        "Oracle bbdd": 7
                    }

                },
                {
                    "id":"de75197c-41d0-11e9-b210-d663bd873d93",
                    "skills": {
                        "java": 9,
                        "HTML": 9,
                        "Ionic": 10,
                        "SQL": 3
                    }

                },
                {
                    "id":"de751c4c-41d0-11e9-b210-d663bd873d93",
                    "skills": {
                        ".Net": 1,
                        "HTML": 2,
                        "Angular": 7,
                        "Postgres": 1
                    }

                },
                {
                    "id":"de7523cc-41d0-11e9-b210-d663bd873d93",
                    "skills": {
                        "java": 8,
                        "JQuery": 3,
                        "Docker": 9,
                        "Oracle bbdd": 1
                    }

                },
                {
                    "id":"de752534-41d0-11e9-b210-d663bd873d93",
                    "skills": {
                        "java": 7,
                        "JQuery": 6,
                        "Docker": 3,
                        "SQL": 1
                    }

                },
                {
                    "id":"71021a9b-641c-4a38-8680-6368485d248f",
                    "skills": {
                        "php": 3,
                        "JQuery": 5,
                        "Angular": 2,
                        "Oracle bbdd": 9
                    }
                }
            ]
        }
    };

    return dataSkill;
};
methods.getUserData = function () {
    return usersArray;
};

methods.deleteUser = function (id) {
    console.log('Eliminando usuario del array');
    for(let usrdl in usersArray){
        if(usersArray[usrdl].id === id){
           delete usersArray[usrdl].id;
            console.log('Usuario eliminado del array');
        }
    }

    return usersArray;
};

methods.editUserById = function(user){
    let datos = {};
    let idUser = "";
    let nameUser = "";
    let lastnameUser = "";
    let jobtitleUser = "";
    let emailUser = "";
    console.log('Usuario a editar: '+user);
    for (let us in user.body){
            console.log(user.body[us]);
            idUser = user.body['id'];
            nameUser = user.body['name'];
            lastnameUser = user.body['lastname'];
            jobtitleUser = user.body['jobtitle'];
            emailUser = user.body['email'];
            //Disponible para editar
            //Retornar solo los valores sin cambiar el array

    }

    for(let usr in usersArray){
        console.log(usersArray[usr].info.profession);
        if(usersArray[usr].id === idUser){
            usersArray[usr].firstName = nameUser;
            usersArray[usr].lastname = nameUser;
            usersArray[usr].info.profession = jobtitleUser;
            usersArray[usr].email = emailUser;
        }
    }

    datos = {
      id: idUser,
      name: nameUser,
      lastname: lastnameUser,
      jobtitle: jobtitleUser,
      email: emailUser
    };

    console.log(JSON.stringify(datos));
    return datos;

};

methods.getUserById = function(id){

    let usuario = methods.getAllData();
    console.log('------------------------------------- usuario ------------------------');
    //console.log(usuario);
    for (let u in usuario){
        if(usuario[u].id === id){
            console.log("ha sido encontrado el usuario: "+usuario[u].id);
            return usuario[u];
        }
    }

    return "Usuario no esta disponible"

};

methods.getSkills = function (id) {
    let usersSelect = {};
    console.log("-----------------------Skills------------------------------------")

        let dataSkillEdit = methods.auxDataSkill();
        let usersArraySkills;

        let sendSkill={};



        console.log("Perfil id: "+id);
        for (let attributeSkill in dataSkillEdit) {
            //console.log('atributto: ', attributeSkill);
            if (attributeSkill === "response") {
                //console.log("------------response---------");
                usersArraySkills = (dataSkillEdit[attributeSkill].data);


            }
            //console.log(usersArraySkills);

            for(let j in usersArraySkills){
                //console.log(usersArraySkills[j].skills);
                if(usersArraySkills[j].id === id) {
                    usersSelect = usersArraySkills[j].skills;
                }

            }
           // console.log('usuario select: '+usersSelect);
        }

        let infoUser = methods.getUserById(id);
        //console.log(infoUser);
    for (let u in usersSelect){
       // console.log(u, usersSelect[u]);
    }
    usersSelect['infoUser'] = infoUser;
    return usersSelect;
};

methods.getAllData = function () {
    //inicio getData
    axios.get('http://netzone.cl/bntf/api.users.prueba/skeleton/api/users', {
        headers: {
            token: '%ca7b=E]bV?t_M8C(Q]qU{qzQTPJOX/%AoKVv3S`Z`"Uxh]uwBfnooPJ%DW9)]m'
        },
        json: true,
    }).then(function (response) {
        //console.log(JSON.stringify(response.data));
        jsonData = response.data;
        dataUser();


    }).catch(function (response) {
       // console.log(response);
    });

    function dataUser() {

        for(let attribute in jsonData){
            //console.log('atributto: ',attribute);
            if (attribute === "response"){
                usersArray=(jsonData[attribute].data);
            }

        }

        for(let attribute3 in usersArray){
            var names = helpers.split(usersArray[attribute3].name_complete,",");
            var date = helpers.split(usersArray[attribute3].birthdate,"-");
            usersArray[attribute3].firstName = names[0];
            usersArray[attribute3].lastName = names[1];
            usersArray[attribute3].dvRut = digito(usersArray[attribute3].rut);
            usersArray[attribute3].edad = new Date().getFullYear() - date[2];
            if(usersArray[attribute3].format_image === 0){
                usersArray[attribute3].imagenPerfil = usersArray[attribute3].url_image;
            } else{
                usersArray[attribute3].imagenPerfil = 'http://www.nextfrontierinclusion.org/wp-content/uploads/job-manager-uploads/files/2017/12/user2-160x160.jpg';
            }
           // console.log(usersArray[attribute3]);
        }

    }

    function reverseString(str) {
        reverseRut = str.toString();
        let newStr = "";
        for (let i = reverseRut.length-1; i >= 0; i--){
            newStr += reverseRut[i];
        }
        return newStr;
    }

    function digito(rut)
    {
        let rut2 = reverseString(rut);
        let suma = 0;
        let multiplicador = 1;

        for (var j=0; j<rut2.toString().length;j++){
            multiplicador++;
            if (multiplicador === 8){
                multiplicador = 2;
            }
            suma += rut2[j]*multiplicador;
        }

        suma = 11 - (suma % 11);
        if (suma === 11)
        {
            return "0";
        }
        else if (suma === 10)
        {
            return "K";
        }
        else
        {
            return suma;
        }
    }

//fin getData
    return usersArray;
};

exports.data = methods;