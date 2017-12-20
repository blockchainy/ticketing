// truffle syntax

Storage.new()
    .then(res => {
        sc = Storage.at(res.address)
    });

Storage.deployed()
    .then(instance => instance.get.call())
    .then(result => storeData = result)

Storage.deployed()
    .then(instance => instance.set.sendTransaction(42))
    .then(result => newStorageData = result)

Storage.deployed()
    .then(instance => {
        meta = instance;
        return meta.get()
    })