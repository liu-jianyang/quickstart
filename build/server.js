"use strict";
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var sqlite3 = require("sqlite3");
var port = process.env.PORT || 3000;
var app = express();
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
var router = express.Router();
function openConnection() {
    return new sqlite3.Database('workouts.db');
}
function closeConnection(db) {
    return db.close();
}
router.get('/api/exercises', function (req, res, next) {
    var db = openConnection();
    db.all('SELECT * from EXERCISES', [], function (err, data) {
        db.close();
        if (err)
            throw err;
        res.send(data);
    });
});
router.get('/api/name-mapping', function (req, res, next) {
    var db = openConnection();
    db.all('SELECT * from NAMEMAPPING', [], function (err, data) {
        db.close();
        if (err)
            throw err;
        res.send(data);
    });
});
app.use('/', router);
app.use('/app', express.static(path.resolve(__dirname, 'app')));
app.use('/libs', express.static(path.resolve(__dirname, 'libs')));
// for system.js to work. Can be removed if bundling.
app.use(express.static(path.resolve(__dirname, '.')));
app.use(express.static(path.resolve(__dirname, '../node_modules')));
var renderIndex = function (req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'));
};
app.get('/*', renderIndex);
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('This express app is listening on port:' + port);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRXBFLElBQUksV0FBVyxHQUFHLFVBQUMsR0FBb0IsRUFBRSxHQUFxQjtJQUMxRCxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7QUFDeEQsQ0FBQyxDQUFBO0FBRUQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFFM0IsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7SUFDMUIsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztJQUNwQyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0NBQXdDLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDakUsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XHJcbmltcG9ydCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xyXG5pbXBvcnQgZmF2aWNvbiA9IHJlcXVpcmUoJ3NlcnZlLWZhdmljb24nKTtcclxuaW1wb3J0IGxvZ2dlciA9IHJlcXVpcmUoJ21vcmdhbic7XHJcbmltcG9ydCBjb29raWVQYXJzZXIgPSByZXF1aXJlKCdjb29raWUtcGFyc2VyJyk7XHJcbmltcG9ydCBib2R5UGFyc2VyID0gcmVxdWlyZSgnYm9keS1wYXJzZXInKTtcclxuaW1wb3J0IHNxbGl0ZTMgPSByZXF1aXJlKCdzcWxpdGUzJyk7XHJcblxyXG52YXIgcG9ydDogbnVtYmVyID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwO1xyXG52YXIgYXBwID0gZXhwcmVzcygpO1xyXG5cclxuYXBwLnVzZShmYXZpY29uKHBhdGguam9pbihfX2Rpcm5hbWUsICdmYXZpY29uLmljbycpKSk7XHJcbmFwcC51c2UobG9nZ2VyKCdkZXYnKSk7XHJcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xyXG5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiB0cnVlIH0pKTtcclxuYXBwLnVzZShjb29raWVQYXJzZXIoKSk7XHJcblxyXG52YXIgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuXHJcbmZ1bmN0aW9uIG9wZW5Db25uZWN0aW9uKCkge1xyXG4gIHJldHVybiBuZXcgc3FsaXRlMy5EYXRhYmFzZSgnd29ya291dHMuZGInKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xvc2VDb25uZWN0aW9uKGRiKSB7XHJcbiAgcmV0dXJuIGRiLmNsb3NlKCk7XHJcbn1cclxuXHJcbnJvdXRlci5nZXQoJy9hcGkvZXhlcmNpc2VzJywgZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpIHtcclxuICB2YXIgZGIgPSBvcGVuQ29ubmVjdGlvbigpO1xyXG4gIGRiLmFsbCgnU0VMRUNUICogZnJvbSBFWEVSQ0lTRVMnLCBbXSwgZnVuY3Rpb24oZXJyLCBkYXRhKSB7XHJcbiAgICBkYi5jbG9zZSgpO1xyXG4gICAgaWYoZXJyKSB0aHJvdyBlcnI7XHJcbiAgICByZXMuc2VuZChkYXRhKTtcclxuICB9KTtcclxufSk7XHJcblxyXG5yb3V0ZXIuZ2V0KCcvYXBpL25hbWUtbWFwcGluZycsIGZ1bmN0aW9uKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgdmFyIGRiID0gb3BlbkNvbm5lY3Rpb24oKTtcclxuICBkYi5hbGwoJ1NFTEVDVCAqIGZyb20gTkFNRU1BUFBJTkcnLCBbXSwgZnVuY3Rpb24oZXJyLCBkYXRhKSB7XHJcbiAgICBkYi5jbG9zZSgpO1xyXG4gICAgaWYoZXJyKSB0aHJvdyBlcnI7XHJcbiAgICByZXMuc2VuZChkYXRhKTtcclxuICB9KTtcclxufSk7XHJcblxyXG5hcHAudXNlKCcvJywgcm91dGVyKTtcclxuYXBwLnVzZSgnL2FwcCcsIGV4cHJlc3Muc3RhdGljKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdhcHAnKSkpO1xyXG5hcHAudXNlKCcvbGlicycsIGV4cHJlc3Muc3RhdGljKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdsaWJzJykpKTtcclxuXHJcbi8vIGZvciBzeXN0ZW0uanMgdG8gd29yay4gQ2FuIGJlIHJlbW92ZWQgaWYgYnVuZGxpbmcuXHJcbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4nKSkpO1xyXG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi9ub2RlX21vZHVsZXMnKSkpO1xyXG5cclxudmFyIHJlbmRlckluZGV4ID0gKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpID0+IHtcclxuICAgIHJlcy5zZW5kRmlsZShwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnaW5kZXguaHRtbCcpKTtcclxufVxyXG5cclxuYXBwLmdldCgnLyonLCByZW5kZXJJbmRleCk7XHJcblxyXG52YXIgc2VydmVyID0gYXBwLmxpc3Rlbihwb3J0LCBmdW5jdGlvbigpIHtcclxuICAgIHZhciBob3N0ID0gc2VydmVyLmFkZHJlc3MoKS5hZGRyZXNzO1xyXG4gICAgdmFyIHBvcnQgPSBzZXJ2ZXIuYWRkcmVzcygpLnBvcnQ7XHJcbiAgICBjb25zb2xlLmxvZygnVGhpcyBleHByZXNzIGFwcCBpcyBsaXN0ZW5pbmcgb24gcG9ydDonICsgcG9ydCk7XHJcbn0pOyJdfQ==
