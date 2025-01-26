const replicaSet = "rs0";
rs.initiate({
    _id: replicaSet,
    members: [{ _id: 0, host: "localhost:27017" }]
});