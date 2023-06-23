function showBookings(e){
    const  Axios = axios.create()
    let ele = document.getElementById
    ('displayAllBookings')
    ele.hidden = false  
    let frontpage = document.querySelector(".display")
    // let temp = frontpage.innerHtml 
   frontpage.hidden = true 
    Axios.get('/bookings/get').then(
        (r) =>{
            console.log(r)
           let bookings = r.data 
           let length = bookings.length 
           let tag  = ""
           console.log(bookings)
           for(let i = 0 ;i< length ; i++)
           {
            
            let _id = bookings[i]._id 
            let roomsBooked = bookings[i].roomsBooked
            let rB = ""
            console.log("length of the rooms : "+roomsBooked.length)
            let j ; 
            for( j = 0 ;j<roomsBooked.length ; j ++)
            {
                rB  = rB+" " +  roomsBooked[j] 
            }
            console.log(roomsBooked)
            console.log(bookings[i].accountId)
            x = j*2000
            const amount = (x).toString()
            const bookingId = (bookings[i]._id).toString()
            const ob= amount +bookingId
            const obj = parseInt(ob)
            tag = tag + `        <ul class="card card${i}" type="none">
            <li class="prop">_id  : ${bookings[i]._id}</li>
            <li class="prop">rooms:  ${rB}</li>
            <li class="prop">transactions : <button class="Btn " onclick="transaction(this)">648adac74762208c98887d44</button>
                        
            <button class="Btn " onclick="transaction()">transaction_id2</button>
            </li>
            <li id="trans${i}"></li>
            <li class="prop amount">amount : ${j*2000} </li>
            <li >
            <span class="prop">checkIn : ${bookings[i].checkIn}</span>
            <span  class="prop">checkOut : ${bookings[i].checkOut}</span>
           </li>
            <li class="prop">  <button onclick="delCard(${bookings[i]._id})" class="Btn danger">cancel</button> 
            <button onclick="payNow(${obj})" class="right Btn green">pay now </button></li>
        </ul>`
           }
           tag = '<button onclick="takeBack()">back</button>' + tag ; 
          ele.innerHTML = tag      

        }
    )
    .catch(e =>{console.log(e)})
   
    
}
function delCard(e)
{
     document.querySelector(`.card${e}`).remove()
     let bookingId = e.toString()
     let leadingZeros = 5- bookingId.length 
     for(let i = 0 ; i<leadingZeros ; i++)
     bookingId = "0" + bookingId
     let Axios = axios.create() 
     Axios.post('bookings/delete',{"bookingId":bookingId}).then(r=>{
         alert(" successfully removed ")
     })
}
async function payNow(obj)
{
    
    let bookingId = obj%100000
    let amount = Math.round(obj/100000)
    alert(amount)
    var url = "/payments/order";
     var params = {
         amount: amount,
         currency: "INR",
         receipt: "wthcoding001",
         payment_capture: '1'
     } 
     let Axios = axios.create()
     var xmlHttp = new XMLHttpRequest();
     xmlHttp.open("POST", url, false);
     xmlHttp.setRequestHeader("Content-type", "application/json");
     xmlHttp.send(JSON.stringify(params));
     res = JSON.parse(xmlHttp.responseText);
     var order_id = res.sub.id 
     console.log(order_id)
  
     var options = {
     "key":"rzp_test_bN8pZAzSf06b6x" ,
     "currency": "INR",
     "name": "The Rose Home Stay",
     "description": "The Rose Home Stay Transaction",
     "order_id": order_id,
     "handler": function(r) {
         const postData = {
             p_id : r.razorpay_payment_id,
             o_id : r.razorpay_order_id,
             sign : r.razorpay_signature,
         }
         Axios.post('/payments/order/post',postData).then(
             r =>{
                 console.log(r.data+"has been saved")
             }
         )
         .catch(e =>{console.log(e)})
     }
 };  
 var rzp1 = new Razorpay(options);
 rzp1.open();

}
function transaction(e){
let id = e.innerText 
const Axios = axios.create() 
const ele = document.getElementById('trans0')
Axios.get('payments/getOne').then(r=>{

})
ele.innerHTML = `<ul style="background-color:yellow"><li>its the transaction</li></ul>`
}
function takeBack(){
     document.querySelector('.display').hidden = false
     document.querySelector('#displayAllBookings').hidden = true  
     document.querySelector('#displayAllTransactions').hidden =  true 
}
function displayAllTransactions(e)
{
     console.log(e)

    const ele = document.querySelector('#displayAllTransactions')
     const  Axios = axios.create()
     ele.hidden = false 
     const frontpage = document.querySelector('.display')
     frontpage.hidden = true 
     Axios.get('/payments/get').then((r)=>{
        console.log(r.data)  
        const transactions = r.data 
        let tag = ""
        for(let i = 0 ; i<transactions.length ; i++)
        {
            const {_id,mode,amount,accountId,bookingId} =   transactions[i]
            console.log(_id , mode, amount,accountId,bookingId)
            tag = tag + `        <ul class="card" type="none">
            <li class="prop">_id  : ${_id}</li>
            <li class="prop">mode:  ${mode}</li>
            <li class="prop">transactions : <button class="Btn " onclick="transaction()">booking_id : ${bookingId}</button>
                              
            </li>
            <li class="prop">  <button class="Btn danger">cancel</button>  <button class="right Btn green">pay now </button></li>
        </ul>`
        }
        tag = '<button onclick="takeBack()">back</button>' + tag ; 
        ele.innerHTML = tag         
         
     })
}