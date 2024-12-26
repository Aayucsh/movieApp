
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',                    
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGNkZTViYzQwZWQ3Y2RmMjdkOGI2NTdlZjcyNWUxZCIsIm5iZiI6MTczMTUyNTU3OS44MjA1MTQyLCJzdWIiOiI2NzM0YzIxYjEyZDcyOTAxMGI5MjVmNmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.if4iNDjT4Guq5o7dYchTNL637PbqRCk6cBHIEZlAqsc'
  }
});

export default instance;