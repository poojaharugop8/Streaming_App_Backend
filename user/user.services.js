const UserModel = require('./user.model');

exports.createUser = (data) => {
  return new Promise(function (resolve, reject) {
    data.email = data.email.toLowerCase();
    var userdata = UserModel(data);
    userdata.save().then(
      function (result) {
        console.log('Result of mongodb ', result);
        resolve(result);
      },
      function (error) {
        console.log('Error', error);
        if (error.code == 11000) {
          reject(error);
        }
        reject();
      }
    );
  });
};

exports.findUser = (data) => {
  return new Promise(function (resolve, reject) {
    let queryObj = {
      email: data.email.toLowerCase(),
      password: data.password,
    };
    console.log(queryObj);
    UserModel.findOne(queryObj)
      .then(function (result) {
        console.log('Finding user from DB', result);
        if (result) {
          resolve();
        } else {
          reject('Invalid Credentials');
        }
      })
      .catch(function (error) {
        reject();
        console.log('Error in finding user from DB');
      });
  });
};

exports.findOne = (data) => {
  return new Promise(function (resolve, reject) {
    let queryObj = {
      email: data.email.toLowerCase(),
    };
    console.log(queryObj);
    UserModel.findOne(queryObj)
      .then(function (result) {
        console.log('Finding user from DB', result);
        if (result) {
          resolve(result);
        } else {
          reject('Invalid Credentials');
        }
      })
      .catch(function (error) {
        reject();
        console.log('Error in finding user from DB');
      });
  });
};

// Ashu's code to recover password using EMitter and events

// exports.recoverPassword = (data) => {
//   let emitter = new EventEmitter();
//   console.log('Here we are finding password of user');
//   var queryObj = { email: data.email };
//   UserModel.findOne(queryObj)
//     .then((result) => {
//       console.log('result of db operation', result);
//       if (result) {
//         return emitter.emit('MIl_GAYA', result);
//       } else {
//         return emitter.emit('NOT_FOUND');
//       }
//     })
//     .catch((error) => {
//       return emitter.emit('ERROR');
//     });

//   return emitter;
// };

exports.searchUsers = (data) => {
  return new Promise((resolve, reject) => {
    console.log('Here we will find users from database');
    const query = { "email": { "$regex": data.q, "$options": "i" } };

    UserModel.find(query).then((result) => {
      console.log("Finding users from DB", result);
      if (result) {
        resolve(result)
      }
      else {
        reject()
      }
    })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.updateProfile = (data, cb) => {

  const query = {
    email: data.email,
  }
  var updateQuery = {
    "$set": {
      image: data.image,
      name: data.name,
      profilecompleted: true
    }
  }

  UserModel.findOneAndUpdate(query, updateQuery).then((result) => {
    console.log("Result of update user from db: ", result);
    cb(null, result);
  }).catch((error) => {
    console.log("Error in update user from db: ", error);
    cb(error, null);
  })
}
