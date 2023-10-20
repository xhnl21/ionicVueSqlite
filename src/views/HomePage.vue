<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Inbox</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Inbox</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item v-for="item in items">
          demo
        </ion-item>
        <!-- <MessageListItem v-for="message in messages" :key="message.id" :message="message" /> -->
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  IonItem,
} from '@ionic/vue';
import MessageListItem from '@/components/MessageListItem.vue';
import { getMessages, Message } from '@/data/messages';
import { ref } from 'vue';

import { onIonViewWillEnter, onIonViewDidEnter, onIonViewWillLeave, onIonViewDidLeave } from '@ionic/vue';
import { SQLiteConnection, CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';
  	const items = ref<any>();
    const db = ref<SQLiteDBConnection>();
	const sqlite = ref<SQLiteConnection>();
    onIonViewDidEnter(async () => {
      sqlite.value = new SQLiteConnection(CapacitorSQLite);
      const ret = await sqlite.value.checkConnectionsConsistency();
      const isConn = (await sqlite.value.isConnection("db_vite", false)).result;
      if (ret.result && isConn) {
      db.value = await sqlite.value.retrieveConnection("db_vite", false);
      } else {
      db.value = await sqlite.value.createConnection("db_vite", false, "no-encryption", 1, false);
      }
      loadData();
      console.log('Home page did enter');
    });

    onIonViewDidLeave(() => {
    //   console.log('Home page did leave');
    });

    onIonViewWillEnter(() => {
    //   console.log('Home page will enter');
    });

    onIonViewWillLeave(async() => {
		  await sqlite.value?.closeConnection("db_vite",false);
      	console.log('Home page will leave');
    });
  
	const loadData = async () => {
		await db.value?.open();
		const select = await db.value?.query(`SELECT * FROM test`);
		console.log(`res: ${JSON.stringify(select)}`);
    // const messages = select?.values;
		await db.value?.close();
    items.value = select?.values;
	}
// const messages = ref<Message[]>(getMessages());
const refresh = (ev: CustomEvent) => {
  setTimeout(() => {
    ev.detail.complete();
  }, 3000);
};
</script>
