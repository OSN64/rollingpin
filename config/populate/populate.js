module.exports.menuItems = function (next) {
  var request = require("request");
  Menuitem.destroy().exec(function(){
    request("https://www.kimonolabs.com/api/ck4h8vp8?apikey=r9T5X56o63Gt2qyDqFuEmMnVc0BOCEGA",
    function(err1, response1, foodie) {
      var foodArr = ("" + JSON.parse(foodie).results.words[0].word).split(/\n/);
      function randomDescription(next){
        var wordCount = (Math.floor(Math.random() * 6) + 1);
        var description = foodArr[(Math.floor(Math.random() * foodArr.length) + 0)];
        for (;wordCount > 0; wordCount-- ){
          description += ( ", " + foodArr[( Math.floor(Math.random() * ( foodArr.length - 1 ) ) + 0 )] );
          if (wordCount == 1)
            return next( (description + " and " + foodArr[( Math.floor(Math.random() * ( foodArr.length - 1 ) ) + 0 )]) );
        }
      }
      request("https://www.kimonolabs.com/api/axhcy3qu?apikey=r9T5X56o63Gt2qyDqFuEmMnVc0BOCEGA",
      function(err, response, body) {
        body = JSON.parse(body);
        function populate(item, cb){
          var params = {};
          randomDescription(function(description){
            params.name = body.results.appetizers[item].appetizer.text;
            params.price = (Math.floor(Math.random() * 45) + 10);
            params.description = description;

            Menuitem.create(params, function(err, menuitem) {
              if (err) {
                console.log(err);
              }
              console.log("Added: " + menuitem.name + "\n\t Price: $" + 
                menuitem.price + "\n\t Description: " + menuitem.description);
              if ( body.results.appetizers.hasOwnProperty([ (item + 1) ]) ){
                populate( (item + 1) );
              }
              else
                return next();
            });
          });
      
        }
        populate(0, function(){
          next();
        });
      });
    });
  });
};

module.exports.defaultUsers = function (next) {

  list = {users: [
    {name: "admin", email: "admin@os.xanth.io", password: "password", admin: true},
    {name: "supervisor", email: "supervisor@os.xanth.io", password: "password", admin: true}
  ]};
  User.destroy().exec(function(){
    function populate(list, item, cb){
      var params = {};
      params.name = list.users[item].name;
      params.email = list.users[item].email;
      params.password = list.users[item].password;
      params.admin = list.users[item].admin;
      params.pasConfirmation = list.users[item].password;
      User.create(params, function(err, user) {
        if (err) {
          console.log( "err ----> " + JSON.stringify(err) );
          return;
        }
        console.log("Added: " + user.name +
          "\n\t User email: " + user.email +
          "\n\t User password: " + user.password +
          "\n\t User admin: " + user.admin );
        if ( list.users.hasOwnProperty([ (item + 1) ]) ){
          populate( list, item + 1, cb );
        }
        else
          return next();
      });
    }
    populate(list, 0, function(){
      next();
    });
  });
};


module.exports.defaultCustomers = function (next) {

  list = {customers: [
    {nameFirst: "Adam", nameLast: "Miller", phoneNo: "0423086359", cCardNo: "4479656401333201",
      cCardExpMon: "08", cCardExpYear: "2015", cCardName: "Adam Miller", addr: "45-47 Canal Lane, Lofthouse, Wakefield, West Yorkshire WF3 3HT, UK"},
    {nameFirst: "Guy", nameLast: "Montgomery", phoneNo: "0423086358", cCardNo: "4539435433803053",
      cCardExpMon: "08", cCardExpYear: "2015", cCardName: "Guy Montgomery", addr: "4 Winchfawr, Merthyr Tydfil, Merthyr Tydfil CF48, UK"},
    {nameFirst: "Tim", nameLast: "Batt", phoneNo: "0423086357", cCardNo: "371903883311470",
      cCardExpMon: "08", cCardExpYear: "2015", cCardName: "Tim Batt", addr: "36 Green Close, Renishaw, Sheffield, Derbyshire S21 3WS, UK"},
  
  ]};
  Customer.destroy().exec(function(){
    function populate(list, item, cb){
      var params = {};
      params.nameFirst = list.customers[item].nameFirst;
      params.nameLast = list.customers[item].nameLast;
      params.phoneNo = list.customers[item].phoneNo;
      params.cCardNo = list.customers[item].cCardNo;
      params.cCardExpMon = list.customers[item].cCardExpMon;
      params.cCardExpYear = list.customers[item].cCardExpYear;
      params.cCardName = list.customers[item].cCardName;
      params.addr = list.customers[item].addr;

      Customer.create(params, function(err, customer) {
        if (err) {
          console.log( "err ----> " + JSON.stringify(err) );
          return;
        }
        console.log("Added: " + customer.cCardName +
          "\n\t User Phone: " + customer.phoneNo );
        if ( list.customers.hasOwnProperty([ (item + 1) ]) ){
          populate( list, item + 1, cb );
        }
        else
          return next();
      });
  }
    populate(list, 0, function(){
      next();
    });
  });
};