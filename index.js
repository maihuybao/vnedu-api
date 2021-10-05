const express = require('express')
const axios = require('axios')
const app = express()
const port = 8888

app.get('/lay_ma_hoc_sinh', (req, res) => {
  const sdt = req.query.sdt
  axios.get(`https://hocbadientu.vnedu.vn/sllservices/index.php?callback=jQuery1124023870072991314606_1633355228308&call=solienlac.search&search=${sdt}&tinh_id=1&_=1633355228309`).then(function (response) {
    var output = `[${response.data.split("jQuery1124023870072991314606_1633355228308([")[1].split("])")[0]}]`
	res.end(output)
  })
})
app.get('/lay_diem', (req,res) => {
  const mahocsinh = req.query.mahocsinh
  const password = req.query.password
  const namhoc = req.query.namhoc
  axios.get(`https://hocbadientu.vnedu.vn/sllservices/index.php?callback=jQuery11240292460164900759_1633359633643&call=solienlac.checkSll&mahocsinh=${mahocsinh}&tinh_id=1&password=${password}&namhoc=${namhoc}&dot_diem_id=0&_=1633359633650`).then(function(response){
	var result = response.data
	cookie = response.headers['set-cookie']
	var output = `${result.split("jQuery11240292460164900759_1633359633643(")[1].split(")")[0]}`
	if (JSON.parse(output).success == false){
	res.end(output)}
	else{axios.get(`https://hocbadientu.vnedu.vn/sllservices/index.php?callback=jQuery112400980034106252865_1633356538647&call=solienlac.getSodiem&mahocsinh=${mahocsinh}&key=d33e425220d1f1184a9fb9a477055fd6&namhoc=${namhoc}&tinh_id=1&dot_diem_id=0&_=1633356538653`,{headers:{"cookie":cookie}}).then(function(response){res.end(response.data.split("jQuery112400980034106252865_1633356538647(")[1].split(")")[0])})
	}
})
  })
app.listen(port, () => {
  console.log(`Server dang hoat dong tai http://localhost:${port}`)
})

