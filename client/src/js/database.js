import { openDB } from 'idb';


const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async ( content) => {
  // console.error('putDb not implemented');
  console.log('Put to the database');

  // create a connection to the IndexedDB and the version 
  const jatedb = await openDB('jate', 1);

  // create a new transaction, specify the store and data privileges 
  const tx = jatedb.transaction('jate', 'readwrite');

  // open up the desired object store 
  const store = tx.objectStore('jate');

  // adds and update data to the database
  const request = store.put({ content: content });

  // confirmation of request 
  const result = await request;
  console.log('🚀 - data saved to the database', result);



};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // console.error('getDb not implemented');
  console.log('GET from the database');

  // create a connection to the IndexedDB and the version
  const jatedb = await openDB('jate', 1);

  // create a new transaction, specify the store and data privileges 
  const tx = jatedb.transaction('jate', 'readonly');

  // open up the desired object store 
  const store = tx.objectStore('jate');

  // adds and update data to the database
  const request = store.getAll();

  // confirmation of request 
  const result = await request;
  console.log('result.value', result);
  return result?.value;

};

initdb();
