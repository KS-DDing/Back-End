# Back-End

## config 파일

- db_info.js 파일 /src/config폴더에 추가하고 정보 집어넣을것

```
module.exports = (function () {
  return {
    local: {
      host: 'localhost',
      port: '3396',
      user: 'root',
      password: '',
      database: 'monolithic',
    },
    real: {
      host: '',
      port: '',
      user: '',
      password: '',
      database: '',
    },
    dev: {
      host: '',
      port: '',
      user: '',
      password: '',
      database: '',
    },
  };
})();
```
