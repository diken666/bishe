var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter  = require('./routes/register');
var userLoginRouter = require('./routes/userLogin');
var carInfoRouter = require('./routes/carInfo');
var colletctionRouter = require('./routes/collection');
var showCollectionRouter = require('./routes/collectionShow');
var carAllInfoRouter = require('./routes/carAllInfo');
var commentRouter = require('./routes/comment');
var getCommentRouter = require('./routes/getComment');
var commentLikeRouter = require('./routes/commentLike');
var feedbackErrorRouter = require('./routes/feedbackError');
var testRouter = require('./routes/test');
var getUserInfoRouter = require('./routes/getUserInfo');
var getChatMsgRouter = require('./routes/getChatMsg');
var getTwoPersonChatMsgRouter = require('./routes/getTwoPersonChatMsg');
var insertChatMsgRouter = require('./routes/insertChatMsg');
var delCollectionRouter = require('./routes/delCollection');
var getFriendsListRouter = require('./routes/getFriendsList');
var getSearchUserInfoRouter = require('./routes/getSearchUserInfo');
var addFriendRouter = require('./routes/addFriend');
var removeFriendRouter = require('./routes/removeFriend');
var submitQuesitionRouter = require('./routes/submitQuestion');
var getUserQuestionRouter = require('./routes/getUserQuestion');
var getUserAllQuestionRouter = require('./routes/getUserAllQuestion');
var getQuestionRouter = require('./routes/getQuestion');
var getQuestionCommentRouter = require('./routes/getQuestionComment');
var likeQuestionCommentRouter = require('./routes/likeQuestionComment');
var readQuestionRouter = require('./routes/readQuestion');
var submitQuestionCommentRouter = require('./routes/submitQuestionComment');
var getHistoryRouter = require('./routes/getHistory');
var delHistoryRouter = require('./routes/delHistory');
var addHistoryRouter = require('./routes/addHistory');
var addUserReportRouter = require('./routes/addUserReport');
var getUserReportRouter = require('./routes/getUserReport');
var addSaleCarInfoRouter = require('./routes/addSaleCarInfo');
var getCarEvaluateInfoRouter = require('./routes/getCarEvaluateInfo');
var getUserSaleCarInfoRouter = require('./routes/getUserSaleCarInfo');

// 管理员页面
var manageLoginRouter = require('./routes/manageLogin');
var managerPageRouter = require('./routes/managerPage');
var getAllUserInfoRouter = require('./routes/getAllUserInfo');
var updateUserInfoRouter = require('./routes/updateUserInfo');
var deleteUserInfoRouter = require('./routes/deleteUserInfo');
var carInfoStoreRouter = require('./routes/carInfoStore');
var delCommentAndFeedbackErrRouter = require('./routes/delCommentAndFeedbackErr');
var getAllQuestionRouter = require('./routes/getAllQuestion');
var delQuestionRouter = require('./routes/delQuestion');
var delQuestionCommentRouter = require('./routes/delQuestionComment');
var getUserChatInfoRouter = require('./routes/getUserChatInfo');
var delChatInfoRouter = require('./routes/delChatInfo');
var getAllUserReportRouter = require('./routes/getAllUserReport');
var passReportRouter = require('./routes/passReport');
var delReportRouter = require('./routes/delReport');
var getAllSaleCarInfoRouter = require('./routes/getAllSaleCarInfo');
var addLookCarPlaceRouter = require('./routes/addLookCarPlace');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/userLogin', userLoginRouter);
app.use('/carInfo', carInfoRouter);
app.use('/collection', colletctionRouter);
app.use('/showCollection', showCollectionRouter);
app.use('/carAllInfo', carAllInfoRouter);
app.use('/comment', commentRouter);
app.use('/getComment', getCommentRouter);
app.use('/commentlike', commentLikeRouter);
app.use('/feedbackError', feedbackErrorRouter);
app.use('/test', testRouter);
app.use('/getUserInfo', getUserInfoRouter);
app.use('/getChatMsg', getChatMsgRouter);
app.use('/gettwopersonchatmsg', getTwoPersonChatMsgRouter);
app.use('/insertchatmsg', insertChatMsgRouter);
app.use('/delcollection', delCollectionRouter);
app.use('/getfriendslist', getFriendsListRouter);
app.use('/getsearchuserinfo', getSearchUserInfoRouter);
app.use('/addfriend', addFriendRouter);
app.use('/removefriend', removeFriendRouter);
app.use('/submitquestion', submitQuesitionRouter);
app.use('/getuserquestion', getUserQuestionRouter);
app.use('/getquestion', getQuestionRouter);
app.use('/getquestioncomment', getQuestionCommentRouter);
app.use('/likequestioncomment', likeQuestionCommentRouter);
app.use('/readquestion', readQuestionRouter);
app.use('/submitquestioncomment', submitQuestionCommentRouter);
app.use('/getuserallquestion', getUserAllQuestionRouter);
app.use('/gethistory', getHistoryRouter);
app.use('/delhistory', delHistoryRouter);
app.use('/addhistory', addHistoryRouter);
app.use('/adduserreport', addUserReportRouter);
app.use('/getuserreport', getUserReportRouter);
app.use('/addsalecarinfo', addSaleCarInfoRouter);
app.use('/getcarevaluateinfo', getCarEvaluateInfoRouter);
app.use('/getusersalecarinfo', getUserSaleCarInfoRouter);

// 管理员页面
app.use('/managelogin', manageLoginRouter);
app.use('/managerpage', managerPageRouter);
app.use('/getalluserinfo', getAllUserInfoRouter);
app.use('/updateuserinfo', updateUserInfoRouter);
app.use('/deleteuserinfo', deleteUserInfoRouter);
app.use('/carinfostore', carInfoStoreRouter);
app.use('/delcommentandfeedbackerr', delCommentAndFeedbackErrRouter);
app.use('/getallquestion', getAllQuestionRouter);
app.use('/delquestion', delQuestionRouter);
app.use('/delquestioncomment', delQuestionCommentRouter);
app.use('/getuserchatinfo', getUserChatInfoRouter);
app.use('/delchatinfo', delChatInfoRouter);
app.use('/getalluserreport', getAllUserReportRouter);
app.use('/passreport', passReportRouter);
app.use('/delreport', delReportRouter);
app.use('/getallsalecarinfo', getAllSaleCarInfoRouter);
app.use('/addlookcarplace', addLookCarPlaceRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
