// metodos de actions
export default {
    accessDimenu(context, accessDimenu) {
        context.commit("IngresoDimenu", accessDimenu);
    },
    getCurrency() {
        return new Promise((resolve, reject) => {
            if (localStorage.getItem("currency") === null) {
                localStorage.setItem("currency", "$");
            }
            window.master.get("menu/information/GetCurrency/" + window.localAccountID + "/" + window.localorgdata)
                .then(response => {
                    if (response.data.status) {
                        localStorage.setItem("currency", response.data.currency);
                        resolve(true);
                    } else {
                        reject(false);
                    }
                })
                .catch(error => {
                    console.log(error);
                    reject(false);
                });
        });
    },
    getCategories(context, i) {
        return new Promise((resolve, reject) => {
            window.master.get("categories/" + window.localuserdata + "/" + i.id)
                .then((response) => {
                    resolve(response.data.result);
                }).catch((error) => {
                    console.log(error);
                    reject(false);
                });
        });
    }
};
