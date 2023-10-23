<!-- src/views/MyPage.vue -->

<template>
    <ion-page>
        <ion-content>
            <ion-button @click="exportDatabase">Export Database</ion-button>
            <ion-button @click="createDatabase">Create Database</ion-button>
            <ion-button @click="openDatabase">Open Database</ion-button>
            <ion-button @click="closeDatabase">Close Database</ion-button>
            <ion-button @click="createData">Create Data</ion-button>
            <ion-button @click="readData">Read Data</ion-button>
            <ion-button @click="updateData">Update Data</ion-button>
            <ion-button @click="deleteData">Delete Data</ion-button>
        </ion-content>
    </ion-page>
</template>
   
<script>
import {
    IonContent,
    IonPage,
    IonButton,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import database from '@/database/index';

export default defineComponent({
    name: 'MyPage',
    components: {
        IonContent,
        IonPage,
        IonButton, 
    },
    methods: {
        async createDatabase() {
            await database.methods.createDatabase();
        },

        async openDatabase() {
            await database.methods.openDatabase();
        },

        async closeDatabase() {
            await database.methods.closeDatabase();
        },
        async readData() {
            const sql = 'SELECT * FROM test';
            try {
                const result = await database.methods.executeSql(sql);
                if (result.values.length > 0) {
                    console.log('Read data:', result.values);
                } else {
                    console.log('No data found');
                }
            } catch (error) {
                console.error('Error reading data:', error);
            }
        },
        async createData() {
            const sql = 'INSERT INTO test (id, name) VALUES (?, ?)';
            const params = [1697683701987, 'John Doe'];

            try {
                await database.methods.executeSql(sql, params);
                console.log('Data created successfully');
            } catch (error) {
                console.error('Error creating data:', error);
            }
        },
        async updateData() {
            const sql = 'UPDATE test SET name = ? WHERE id = ?';
            const params = ['Master Dragon', 1697683701987];
            try {
                await database.methods.executeSql(sql, params);
                console.log('Data updated successfully');
            } catch (error) {
                console.error('Error updating data:', error);
            }
        },
        async deleteData() {
            const sql = 'DELETE FROM test WHERE id = ?';
            const params = [1697684193700];
            try {
                await database.methods.executeSql(sql, params);
                console.log('Data deleted successfully');
            } catch (error) {
                console.error('Error deleting data:', error);
            }
        },
        async exportDatabase() {
            await database.methods.exportDatabase();
        }
    },
    setup() {
        return {
            IonContent,
            IonPage,
            IonButton,
        }
    }
});
</script>

<style scoped>
/* Add your styles here */
</style>
