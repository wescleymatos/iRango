const getAll = (connect) => {
  return connect()
    .then(db => db.collection('restaurantes')
      .find({})
      .toArray()
      .then(documents => ({db, documents}))
    )
    .then(({db, documents}) => {
      db.close();
      return documents;
    });
};

const create = (connect, restaurante) => {
  return connect()
    .then(db => db.collection('restaurantes')
      .insertOne(restaurante)
      .then(db => db)
    )
    .then(db => db.close());
};

const remove = (connect, restauranteId) => {
  return connect()
    .then(db => db.collection('restaurantes')
      .deleteOne({ _id: restauranteId })
      .then(db => db)
    )
    .then(db => db.close());
};

module.exports = {
  getAll,
  create,
  remove
};
