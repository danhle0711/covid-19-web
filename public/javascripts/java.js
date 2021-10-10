var vueinst = new Vue({
    el: "#body",

    data: {
        selectedService: 'mainpage',

        profile: {
            firstName: '',
            lastName: '',
            DOB: '',
            email: '',
            phoneNumber: '',
            username: '',
            password: ''
        },

        // profileTemp: {
        //     firstName: '',
        //     lastName: '',
        //     DOB: '',
        //     email: '',
        //     phoneNumber: '',
        //     username: '',
        //     password: ''
        // },

        dataTable: ["Name", "Cases - Cumulative", "Cases in the last 24 hours", "Deaths - Cumulative", "Deaths in the last 24 hours"],
        dataTableInfo: [
            {Name: "Americas", CasesCumulative: "243242424", Cases24h: "24324", DeathsCumulative: "23424", Deaths24h: "24324"},
            {Name: "Americas", CasesCumulative: "243242424", Cases24h: "24324", DeathsCumulative: "23424", Deaths24h: "24324"},
            {Name: "Americas", CasesCumulative: "243242424", Cases24h: "24324", DeathsCumulative: "23424", Deaths24h: "24324"},
            {Name: "Americas", CasesCumulative: "243242424", Cases24h: "24324", DeathsCumulative: "23424", Deaths24h: "24324"},
            {Name: "Americas", CasesCumulative: "243242424", Cases24h: "24324", DeathsCumulative: "23424", Deaths24h: "24324"},
            {Name: "Americas", CasesCumulative: "243242424", Cases24h: "24324", DeathsCumulative: "23424", Deaths24h: "24324"},
        ],

        titleForm: ["Name", "DOB", "Nationality"],

        personForm: {
            name: '',
            DOB: '',
            country: ''
        },

        peopleForm: [
            {name: "Harry", DOB: "01/05/2000", nation: "Vietnam"},
            {name: "Potter", DOB: "01/05/2000", nation: "Austria"},
            {name: "Paul", DOB: "01/05/2000", nation: "England"},

        ],

        accountLogin: {
            email: '',
            password: ''
        },

        accountRegister: {
            firstName: '',
            lastName: '',
            DOB: '',
            email: '',
            phoneNumber: '',
            password: '',
            username:'',

        }


    },

    methods: {
        addPerson: function() {
            var newPerson=JSON.parse(JSON.stringify(this.personForm));
            this.peopleForm.push(newPerson);
        },

        redirectToLogin: function() {
            window.location.href="/login.html";
        },

        redirectToRegister: function() {
            window.location.href="/register.html";
        },

        login: function() {
            var xhttp = new XMLHttpRequest();
            var _this=this;
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status < 400) {
                    //router gửi thông tin, bây giờ nhận thông tin và lưu trong 1 variable
                    var info_received=JSON.parse(this.responseText);
                    // _this.user.username=info_received.username;
                    // _this.user.email=info_received.email;
                    // _this.user.fullname=info_received.fullname;
                    // console.log(_this.user);

                    window.location.href=info_received.redirectPath;
                } else if (this.readyState == 4 && this.status >= 400) {
                    document.getElementById("loginFailed").innerHTML="Login failed!";
                }
            };
            xhttp.open("POST", "/login", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(this.accountLogin));

        },

        logout: function() {
            var xhttp = new XMLHttpRequest();
            var _this=this;
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    //do sth here
                    window.location.href="/index.html";

                }
            };
            xhttp.open("POST", "/logout", true);
            xhttp.send();
        },

        register: function() {
            var xhttp = new XMLHttpRequest();
            var _this=this;
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    //do sth here

                    document.getElementById("successfullyRegistered").innerHTML=this.responseText;


                }
            };
            xhttp.open("POST", "/register", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(this.accountRegister));
        },

        userInfo: function() {
            var xhttp = new XMLHttpRequest();
            var _this = this;
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    //do sth here
                    var info = JSON.parse(this.responseText);
                    //rows (thông tin từ database) là array nên info cũng là array
                    _this.profile.firstName = info[0].firstName;
                    _this.profile.lastName = info[0].lastName;
                    _this.profile.DOB = info[0].DOB;
                    _this.profile.email = info[0].email;
                    _this.profile.phoneNumber = info[0].phoneNumber;
                    _this.profile.username = info[0].username;
                    _this.profile.password = info[0].password;
                    console.log(JSON.parse(info[0]));

                    // _this.profileTemp.firstName = info[0].firstName;
                    // _this.profileTemp.lastName = info[0].lastName;
                    // _this.profileTemp.DOB = info[0].DOB;
                    // _this.profileTemp.email = info[0].email;
                    // _this.profileTemp.phoneNumber = info[0].phoneNumber;
                    // _this.profileTemp.username = info[0].username;
                    // _this.profileTemp.password = info[0].password;

                    // firstName: '',
                    // lastName: '',
                    // DOB: '',
                    // email: '',
                    // phoneNumber: '',
                    // username: '',
                    // password: ''

                }
            };
            xhttp.open("GET", "/userInfo", true);
            xhttp.send();
        },

        updateProfileSubmit: function() {
            var xhttp = new XMLHttpRequest();
            var _this=this;
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    //do sth here

                }
            };
            xhttp.open("POST", "/updateProfileSubmit", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(this.profile));
        },

        updateProfileCancel: function() {
            var xhttp = new XMLHttpRequest();
            var _this=this;
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    //do sth here

                }
            };
            xhttp.open("POST", "/updateProfileCancel", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(this.profile));
        },


        getAPI: function() {
            var xhttp = new XMLHttpRequest();
            var _this=this;
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    //do sth here
                    console.log(JSON.parse(this.response));

                }
            };
            xhttp.open("GET", "https://api.ncovvn.xyz/wom", true);
            xhttp.send();
        }


    },


});

mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaGxlMDcxMSIsImEiOiJja3RmaTA5Y28wOGluMnVtdWhiNmdrd2U2In0.gp2Go2OZ-jy0mpj_iQuBiA';
    const map = new mapboxgl.Map({
    container: 'mapboxMap', // container ID
    style: 'mapbox://styles/danhle0711/cktfj2nhs3c0b18qrb1v777v7', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9 // starting zoom
});
//ncovvn.
var xValues1 = [50,60,70,80,90,100,110,120,130,140,150];
var yValues1 = [7,8,8,9,9,9,10,11,14,14,15];

new Chart("mainpageStatsCountryChart1", {
  type: "line",
  data: {
    labels: xValues1,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1)",
      borderColor: "rgba(0,0,255,1)",
      data: yValues1
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 6, max:16}}],
    }
  }
});