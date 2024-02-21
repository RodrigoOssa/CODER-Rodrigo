import fs from 'fs';

class DBRodrah {
    #PATH = './db.json'
    constructor() {
        !fs.existsSync(this.#PATH) ?
            fs.writeFileSync(this.#PATH, '[]') :
            null
    }

    getDB() {
        console.log("Obteniendo la base de datos");
        return JSON.parse(fs.readFileSync(this.#PATH, 'utf-8'))
    }

    setDB(newObj) {
        let objArray = this.getDB();
        newObj.id = (objArray.length + 1).toString();
        objArray.push(newObj);
        fs.writeFileSync(this.#PATH, JSON.stringify(objArray));
        console.log("Elemento agregado");
        return null
    }

    updateDB(newObj) {
        let objArray = this.getDB();
        let haveChange = false;
        let newObjArray = objArray.map(itemDB => {
            console.log(itemDB)
            if (itemDB.id === newObj.id) {
                console.log("Hubo una coincidencia", itemDB)
                for (let key in itemDB) {
                    if (itemDB[key] !== newObj[key]) {
                        haveChange = true;
                        itemDB[key] = newObj[key]
                    }
                }
            }
            return itemDB
        })
        if (haveChange) {
            console.log("Objeto modificado")
            fs.writeFileSync(this.#PATH, JSON.stringify(newObjArray))
            return haveChange
        } else {
            console.log("No hubieron cambios")
            return haveChange
        }
    }

    deleteDB(id) {
        let objArray = this.getDB();
        if (objArray.find(itemDB => itemDB.id === id)) {
            let newObjArray = objArray.filter(itemDB => itemDB.id !== id)
            fs.writeFileSync(this.#PATH, JSON.stringify(newObjArray))
            console.log("Objeto eliminado")
            return true
        } else {
            console.log("El elemento a eliminar no existe")
            return false
        }
    }
}

export default DBRodrah;