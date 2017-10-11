const getAll = (ref) => {
  return ref.child('restaurants').once('value')
    .then((snapshot) => {
      let result = [];
      snapshot.forEach((snap) => {
        result.push(snap.val());
      });

      return result;
    });
};

const create = (ref, data) => {
  return ref.child('restaurants').push().set(data);
};

const remove = (ref, data) => {
  return ref.child('restaurants').push().set(data);
};

module.exports = {
  getAll,
  create,
  remove
};
