export const isLoggined = (req, res, next) => {
  // logout요청은 로그인 한 유저만 통과(true) -> false
  if (req.isAuthenticated()) {
    // req.isAuthenticated() === ture (로그인 한 상태)
    // 로그인 시 isAuthenticated -> false -> true
    next(); // 로그인 한 유저는 true, 로그인 안한 유저는 false
  } else {
    res.send('잘못된 접근입니다.');
  }
};

export const isNotLoggined = (req, res, next) => {
  if (!req.isAuthenticated()) {
    //req.isAuthenticated() === false
    // login 요청은 로그아웃한 유저만 통과 (false) 통과
    next();
  } else {
    res.send('로그인한 유저는 접근할 수 없습니다.');
  }
};

//isAuthenticated()  -> deserialize() 함수를 호출한다
