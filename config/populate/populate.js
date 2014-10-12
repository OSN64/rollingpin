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
                return;
            });
          });
      
        }
        populate(0, function(){
          return next();
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
        return;
    });
  }
  populate(list, 0, function(){
    return next();
  });
});
}