import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#c02418',   
        secondary: '#B0B0B0',  
        accent: '#82B1FF',     
        error: '#FF5252',      
        info: '#2196F3',       
        success: '#4CAF50',    
        warning: '#FF9800',    
      },
      dark: {
        primary: '#F44336',   
        secondary: '#B0B0B0',  
        accent: '#FF4081',     
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FF9800',
      },
    },
  },
});
