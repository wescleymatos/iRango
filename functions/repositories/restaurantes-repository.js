const getAll = (connect) => {
  return connect()
    .then(db => db.collection('restaurantes')
      .find({})
      .toArray()
      .then(documents => documents)
    );
};

const create = (connect, restaurante) => {
  return connect()
    .then(db => db.collection('restaurantes')
      .insertOne(restaurante)
    );
};

const remove = (connect, restauranteId) => {
  return connect()
    .then(db => db.collection('restaurantes')
      .deleteOne({ _id: restauranteId })
    );
};

module.exports = {
  getAll,
  create,
  remove
};
