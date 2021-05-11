const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:8080"],
  methods: ["GET", "POST", "PUT"],
  credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  session({
    key: "userId",
    secret: "reactsuchdifficult",
    saveUninitialized: false,
    resave: false,
    cookie: {
      expires: 60 * 60 * 2400,
      user: "",
      loggedIn: false,
    }
  }));

////////////////// Backend//////////////////
app.use(bodyParser.json());

const { query } = require('./db')

app.use((req, res, next) => {
  if (!app.locals.acc) {
    req.session.acc = "guest";
    app.locals.acc = "guest"
  }
  next();
})

// 後台登入
app.post("/backend/login", async (req, res) => {
  let backendAccount = req.body.account;
  let backendPassword = req.body.password;
  let re = await query(`select account, password from member_information where account='${backendAccount}'`);
  if (re[0] === undefined) {
    res.send('0')
  } else {
    let accResult = re[0].account;
    let pswResult = re[0].password;
    if (accResult === backendAccount) {
      if (backendPassword === pswResult) {
        console.log('login success');
        req.session.acc = backendAccount;
        app.locals.acc = req.session.acc;
        res.send('1');
      } else {
        console.log('passwrong is wrong');
        res.send('0')
      }
    } else {
      res.send('0')
    }
  }
})
app.get("/backend/login", (req, res) => {
  if (req.session.acc == 'guest') {
    res.send(app.locals.acc)
  } else {
    res.send(app.locals.acc)
  }
})

app.get('/backend/logout', (req, res) => {
  req.session.destroy();
  app.locals.acc = "";
})

// 後台資料
let sqlQuery = "";
let gameList = "";
let item = ['betTime', 'id', 'gameType', 'object', 'bets', 'moneyBefore', 'status', 'result', 'moneyAfter'];

// 縮短sql語句
function handleSql(event) {
  let apple = item.map(e => {
    let bee = `${event}.` + e;
    return bee;
  });
  return apple.toString();
}

app.post('/backend/gameList', async (req, res) => {
  let sqlQuery1 = "";
  let sqlQuery2 = "";
  gameList = req.body.gameList;
  time = req.body.time;
  switch (gameList.length) {
    case 1:
      sqlQuery1 = `select betTime,id,gameType,object,bets,moneyBefore,status,result,moneyAfter from ${gameList[0]}`;
      if (time !== undefined) {
        sqlQuery2 = `where betTime between '${time[0]}' and '${time[1]}'`
      } else {
        sqlQuery2 = ""
      }
      sqlQuery = sqlQuery1 + " " + sqlQuery2 + " order by betTime";
      break;
    case 2:
      sqlQuery1 = `
            select ${handleSql('a')} from ${gameList[0]} a 
            union
            select ${handleSql('b')} from ${gameList[1]} b 
            `;
      if (time !== undefined) {
        sqlQuery2 = `where betTime between '${time[0]}' and '${time[1]}' `
      } else {
        sqlQuery2 = ""
      }
      sqlQuery = sqlQuery1 + " " + sqlQuery2 + " order by betTime";
      break;
    case 3:
      sqlQuery1 = `
            select ${handleSql('a')} from ${gameList[0]} a 
            union
            select ${handleSql('b')} from ${gameList[1]} b 
            union 
            select ${handleSql('c')} from ${gameList[2]} c 
            `;
      if (time !== undefined) {
        sqlQuery2 = `where betTime between '${time[0]}' and '${time[1]}' `
      } else {
        sqlQuery2 = ""
      }
      sqlQuery = sqlQuery1 + " " + sqlQuery2 + " order by betTime";
      break;
    case 4:
      sqlQuery1 = `
            select ${handleSql('a')} from ${gameList[0]} a 
            union
            select ${handleSql('b')} from ${gameList[1]} b 
            union 
            select ${handleSql('c')} from ${gameList[2]} c 
            union
            select ${handleSql('d')} from ${gameList[3]} d 
            `;
      if (time !== undefined) {
        sqlQuery2 = `where betTime between '${time[0]}' and '${time[1]}' `
      } else {
        sqlQuery2 = ""
      }
      sqlQuery = sqlQuery1 + " " + sqlQuery2 + " order by betTime";
      break;
    case 5:
      sqlQuery1 = `
            select ${handleSql('a')} from ${gameList[0]} a 
            union
            select ${handleSql('b')} from ${gameList[1]} b 
            union 
            select ${handleSql('c')} from ${gameList[2]} c 
            union
            select ${handleSql('d')} from ${gameList[3]} d 
            union
            select ${handleSql('e')} from ${gameList[4]} e 
            `;
      if (time !== undefined) {
        sqlQuery2 = `where betTime between '${time[0]}' and '${time[1]}' `
      } else {
        sqlQuery2 = ""
      }
      sqlQuery = sqlQuery1 + " " + sqlQuery2 + " order by betTime";

      break;
    case 6:
      sqlQuery1 = `
            select ${handleSql('a')} from ${gameList[0]} a 
            union
            select ${handleSql('b')} from ${gameList[1]} b 
            union 
            select ${handleSql('c')} from ${gameList[2]} c 
            union
            select ${handleSql('d')} from ${gameList[3]} d 
            union
            select ${handleSql('e')} from ${gameList[4]} e 
            union
            select ${handleSql('f')} from ${gameList[5]} f 
            `;
      if (time !== undefined) {
        sqlQuery2 = `where betTime between '${time[0]}' and '${time[1]}' `
      } else {
        sqlQuery2 = ""
      }
      sqlQuery = sqlQuery1 + " " + sqlQuery2 + " order by betTime";
      break;
    case 7:
      sqlQuery1 = `
            select ${handleSql('a')} from ${gameList[0]} a 
            union
            select ${handleSql('b')} from ${gameList[1]} b 
            union 
            select ${handleSql('c')} from ${gameList[2]} c 
            union
            select ${handleSql('d')} from ${gameList[3]} d 
            union
            select ${handleSql('e')} from ${gameList[4]} e 
            union
            select ${handleSql('f')} from ${gameList[5]} f 
            union 
            select ${handleSql('g')} from ${gameList[6]} g 
            `;
      if (time !== undefined) {
        sqlQuery2 = `where betTime between '${time[0]}' and '${time[1]}' `
      } else {
        sqlQuery2 = ""
      }
      sqlQuery = sqlQuery1 + " " + sqlQuery2 + " order by betTime";
      break;
    case 8:
      sqlQuery1 = `
            select ${handleSql('a')} from ${gameList[0]} a 
            union
            select ${handleSql('b')} from ${gameList[1]} b 
            union 
            select ${handleSql('c')} from ${gameList[2]} c 
            union
            select ${handleSql('d')} from ${gameList[3]} d 
            union
            select ${handleSql('e')} from ${gameList[4]} e 
            union
            select ${handleSql('f')} from ${gameList[5]} f 
            union 
            select ${handleSql('g')} from ${gameList[6]} g 
            union 
            select ${handleSql('h')} from ${gameList[7]} h
            `;
      if (time !== undefined) {
        sqlQuery2 = `where betTime between '${time[0]}' and '${time[1]}' `
      } else {
        sqlQuery2 = ""
      }
      sqlQuery = sqlQuery1 + " " + sqlQuery2 + " order by betTime";
      break;
    case 9:
      sqlQuery1 = `
            select ${handleSql('a')} from ${gameList[0]} a 
            union
            select ${handleSql('b')} from ${gameList[1]} b 
            union 
            select ${handleSql('c')} from ${gameList[2]} c 
            union
            select ${handleSql('d')} from ${gameList[3]} d 
            union
            select ${handleSql('e')} from ${gameList[4]} e 
            union
            select ${handleSql('f')} from ${gameList[5]} f 
            union 
            select ${handleSql('g')} from ${gameList[6]} g 
            union 
            select ${handleSql('h')} from ${gameList[7]} h
            union 
            select ${handleSql('i')} from ${gameList[8]} i
            `;
      if (time !== undefined) {
        sqlQuery2 = `where betTime between '${time[0]}' and '${time[1]}' `
      } else {
        sqlQuery2 = ""
      }
      sqlQuery = sqlQuery1 + " " + sqlQuery2 + " order by betTime";
      break;
    default:
      break;
  }
})

// get會員資料
app.get('/backend/getMember', async (req, res) => {
  let re = await query("select * from member_information where account='steven'", []);
  res.send(JSON.stringify(re));
})

// get總下注金額
app.get('/backend/getTotalBets', async (req, res) => {
  let re = await query(`select sum(bets) bet from (${sqlQuery}) aaa`, []);
  res.send(JSON.stringify(re[0].bet));
})

// get注單數量
app.get('/backend/getCount', async (req, res) => {
  let re = await query(`select count(*) cnt from (${sqlQuery}) bbb`, []);
  res.send(JSON.stringify(re[0].cnt));
})

// get輸贏總金額
app.get('/backend/getResults', async (req, res) => {
  let re = await query(`select sum(result) results from (${sqlQuery}) ccc`, []);
  res.send(JSON.stringify(re[0].results));
})

// get遊戲明細
app.get('/backend/fetchGame', async (req, res) => {
  let re = await query(sqlQuery, []);
  res.send(JSON.stringify(re));
})

// get會員資訊
app.get('/backend/member', async (req, res) => {
  let re = await query('select * from member_information', []);
  res.send(JSON.stringify(re))
})
// get會員錢包
app.get('/backend/getThirdPartyMoney', async (req, res) => {
  let re = await query('select * from thirdpart_moneybag', []);
  console.log(JSON.stringify(re));
  res.send(JSON.stringify(re[0]));
})

app.listen(3001)