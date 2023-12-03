import "../style.css";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faXmark, faTrashCan, faPlus, faStar, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faTrashCan, faPlus, faStar, faXmark, faPenToSquare)

app.use(router)
.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')